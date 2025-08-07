const express = require("express");
const Subscriber = require("../Models/Subscriber");

const router = express.Router();

// @ POST /api/subscribe
// @ handle newsletter subscription
// @access public
router.post("/subscribe", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required." });
    }

    try {
        // check if email already subscribed
        let subscriber = await Subscriber.findOne({ email });
        if (subscriber) {
            return res.status(400).json({ message: "Email is already subscribed." });
        }

        // create new subscriber
        subscriber = new Subscriber({ email });
        await subscriber.save();

        res.status(201).json({ message: "Successfully subscribed to newletter!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;