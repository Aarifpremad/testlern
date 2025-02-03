let { User, Product } = require("../models/model");

exports.addFavorite = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required." });
        }

        const user = req.user;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        const index = user.favorites.indexOf(productId);

        if (index > -1) {
            // If product is already in favorites, remove it
            user.favorites.splice(index, 1);
            await user.save();
            return res.status(200).json({ success: true, message: "Product removed from favorites.", fav: user.favorites });
        } else {
            // If product is not in favorites, add it
            user.favorites.push(productId);
            await user.save();
            return res.status(200).json({ success: true, message: "Product added to favorites.", fav: user.favorites });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Something went wrong.", error: error.message });
    }
};
