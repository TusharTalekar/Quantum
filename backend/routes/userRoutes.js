const express = require("express");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST / api / users / register
// register a new user
// @access public

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Registration logic
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists." });

        user = new User({ name, email, password });
        await user.save();

        // res.status(201).json({
        //     user: {
        //         _id: user._id,
        //         name: user.name,
        //         email: user.email,
        //         role: user.role
        //     },
        // });

        // Cretae JWT payload
        const payload = { user: { id: user._id, role: user.role } };

        // Sign and return the token along with user data 
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "40h" },
            (err, token) => {
                if (err) throw err;
                //Send user nad token in response
                res.status(201).json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    },
                    token,
                });
            });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// @route POST /api/users/login 
// @desc Authenticate user
// @access public 
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email 
        let user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        const isMatch = await user.matchPassword(password);

        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Cretae JWT payload
        const payload = { user: { id: user._id, role: user.role } };

        // Sign and return the token along with user data 
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "40h" },
            (err, token) => {
                if (err) throw err;
                //Send user nad token in response
                res.json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    },
                    token,
                });
            });

    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");

    }
})

// @ route  GET /api/users/profile 
// @desc get logged-in user's profi le (Protected route)
// @access Private
router.get("/profile", protect, async (req, res) => {
    res.json(req.user);
})




module.exports = router;