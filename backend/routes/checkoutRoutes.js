const express = require("express");
const Checkout = require("../Models/Checkout");
const Cart = require("../Models/Cart");
const Product = require("../Models/Product");
const Order = require("../Models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
// @route POST /api/checkout
// @desc create new checkout session 
// @access Private
router.post("/", protect, async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ message: "no items in checkout" });
    }

    try {
        // create ne checkout session 
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems: checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false,
        });
        console.log(`Ckeckout created for user: ${req.user._id}`);
        res.status(202).json(newCheckout);

    } catch (err) {
        console.error("Error creating ckeckout session:", err);
        res.status(500).json({ message: "Server error" });
    }
});


// @route PUT /api/checkout/:id/pay
// @desc update checkout to mark as pay after successful payment 
// @access private
router.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found." });
        }
        if (paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();

            res.status(200).json(checkout);
        } else {
            res.status(400).json({ message: "Invalid Payment Status" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// @POST /api/checkout/:id/finalize
// finalize and convert to order
// @access private
router.post("/:id/finalize", protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found." });
        }
        if (checkout.isPaid && !checkout.isFinalized) {
            // create final order 
            const finalOrder = await Order.create({
                // copy data from checkout to new order
                user: checkout.user,
                orderItems: checkout.orderItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,
            });

            // mark checkout as finalized 
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            // delete cart associated with that user 
            await Cart.findOneAndDelete({ user: checkout.user });
            res.status(201).json(finalOrder);
        } else if (checkout.isFinalized) {
            res.status(400).json({ message: "Checkout already finalized." });
        } else {
            res.status(400).json({ message: "Checkout is not paid." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });

    }
});

module.exports = router;