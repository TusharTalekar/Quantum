const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./Models/Product");
const User = require("./Models/User");
const Cart = require("./Models/Cart");
const products = require("./data/products");

dotenv.config();

//connect to mongodb
mongoose.connect(process.env.MONGO_URI);

// function ot seed data
const seedData = async () => {
    try {
        // clear existing data 
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        // create default admin user 
        const createdUser = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: "123456",
            role: "admin"
        });

        // assign default user id to each product
        const userID = createdUser._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: userID }
        });

        // insert productsinto database 
        await Product.insertMany(sampleProducts);

        console.log("Product data seeded successfully!");
        process.exit();

    } catch (err) {
        console.error("Error sending data : ", err);
        process.exit(1);
    }
}

seedData();