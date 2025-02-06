
let {Product , Cart ,User } = require('../models/model'); // Cart Model
let Service = require('../service');

exports.addToCart = async (req, res) => {
    try {
        const {  productId, quantity ,price } = req.body;
        if ( !productId || !quantity) {
            return res.status(400)
            .json(Service.response(false, " Product ID, and Quantity are required." , null));
            
        }

        const userId = req.user._id ;

        const product = await Product.findById(productId);
        if (!product) 
        return res.status(404)
        .json(Service.response(false, "Product not found." , null));


        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, products: [] });
        }

        // Check if product already exists in cart
        const existingProduct = cart.products.find(p => p.product.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
            existingProduct.price = price;
        } else {
            cart.products.push({ product: productId, quantity, price: price });
        }

        await cart.save();
        return res.status(200)
        .json(Service.response(true, "Product added to cart" , cart));
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Something went wrong.", error: error.message });
    }
};

// Get cart details
exports.getCart = async (req, res) => {
    try {
        const userId  = req.user._id;
        const cart = await Cart.findOne({ user: userId }).populate('products.product');
        
        return res.status(200)
        .json(Service.response(true, "Get Cart"  , cart));
    
    } catch (error) {
        console.error(error);
        return res.status(500)
        .json(Service.response(false, "Something went wrong" , null));
    }
};

// Update product quantity in cart
exports.updateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let userId = req.user._id
        let cart = await Cart.findOne({ user: userId });

        if (!cart)
         return res.status(404)
        .json(Service.response(false, "Something went wrong" , null));
        

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex === -1) return res.status(404)
        .json(Service.response(false, "Product not found in cart" , null));
            
    
        cart.products[productIndex].quantity = quantity;
        await cart.save();

        return res.status(200)
        .json(Service.response(true,  "Cart updated successfully."  , cart));

    } catch (error) {
        console.error(error);
        return res.status(500)
        .json(Service.response(false, "Something went wrong" , null));
        
    }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
    try {
        const {  productId } = req.body;
        let userId = req.user._id ;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) return res.status(404)
            .json(Service.response(false, "Cart not found."  , null));
        
        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        await cart.save();

        return res.status(200)
        .json(Service.response(true,  "Product removed from cart." , cart));
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Something went wrong.", error: error.message });
    }
};

// Clear entire cart
exports.clearCart = async (req, res) => {
    try {
        const userId  = req.user._id

        let cart = await Cart.findOne({ user: userId });

        if (!cart) return res.status(404)
            .json(Service.response(false, "Cart not found."  , null));
            

        cart.products = [];
        await cart.save();

        return res.status(200)
        .json(Service.response(true,  "Cart cleared successfully." , cart));
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Something went wrong.", error: error.message });
    }
};
