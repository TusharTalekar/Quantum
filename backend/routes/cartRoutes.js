const express = require("express");
const Cart = require("../Models/Cart");
const Product = require("../Models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// helper function to get cart by userid or guestid 
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    }
    return null;
};

// @route POST /api/cart 
// @desc Add product to cart for guest or logged in user
// @access Public
router.post("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found." });

        // determine if user is logged in or guest
        let cart = await getCart(userId, guestId);

        // if cart exists update it 
        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) =>
                    p.productId.toString() === productId &&
                    p.size === size &&
                    p.color === color
            );

            // if product already exists update quantity 
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                // add new product
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                });
            }

            // recalculate total price 
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);

            await cart.save();
            return res.status(200).json(cart);
        } else {
            // create new cart for guest or user 
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0].url,
                        price: product.price,
                        size,
                        color,
                        quantity,
                    },
                ],
                totalPrice: product.price * quantity,
            });
            return res.status(201).json(newCart);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});


// @route PUT /api/cart 
// @desc update product quantity
// @access public 
router.put("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart not found." });
        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );

        if (productIndex > -1) {
            // update quantity
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            } else {
                // remove if quantityis 0
                cart.products.splice(productIndex, 1);
            }
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});


// @route DELETE /api/cart 
// @desc remove product from cart 
// @access public
router.delete("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart not found." });
        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );
        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);

            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});


// @route GET /api/cart 
// @desc get logged-in user's or guest cart 
// @access public
router.get("/", async (req, res) => {
    const { userId, guestId } = req.query;

    try {
        const cart = await getCart(userId, guestId);
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ message: "Cart not found." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


// @route POST /api/cart/merge
// @desc merge guest cart ans user cart
// @access private 
router.post("/merge", protect, async (req, res) => {
    const { guestId } = req.body;
    try {
        // Find guest cart and user cart 
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: req.user._id });

        if (guestCart) {
            if (guestCart.products.length === 0) {
                return res.status(400).json({ message: "Guest cart is empty." });
            }

            if (userCart) {
                // merge 
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex(
                        (item) =>
                            item.productId.toString() === guestItem.productId.toString() &&
                            item.size === guestItem.size &&
                            item.color === guestItem.color
                    );
                    // if item exists update quantity 
                    if (productIndex > -1) {
                        userCart.products[productIndex].quantity += guestItem.quantity;
                    } else {
                        // add guestItem
                        userCart.products.push(guestItem);
                    }
                });
                userCart.totalPrice = userCart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);

                await userCart.save();

                // remove guest cart after merging 
                try {
                    Cart.findOneAndDelete({ guestId });
                } catch (err) {
                    console.error("Error deleting guest cart : ", err);
                }
                res.status(200).json(userCart);
            } else {
                // if user has not any existing cart 
                guestCart.user = req.user._id;
                guestCart.guestId = undefined;
                await guestCart.save();

                res.status(200).json(guestCart);
            }
        } else {
            if (userCart) {
                // guestCart has already been merged 
                return res.status(200).json(userCart);
            }
            res.status(404).json({ message: "guest cart not found." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
