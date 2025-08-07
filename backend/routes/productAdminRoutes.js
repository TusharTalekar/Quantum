const express = require("express");
const Product = require("../Models/Product");
const { protect, admin } = require("../middleware/authMiddleware");
const { route } = require("./adminRoutes");

const router = express.Router();

// @ GET /api/admin/products
// @ get all products
// @access private/admin
router.get("/", protect, admin, async (req, res) => {

    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;