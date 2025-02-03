const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to User model
            required: true
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product', // Reference to Product model
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                    default: 1
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ],
        totalPrice: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ['active', 'ordered', 'cancelled'],
            default: 'active'
        }
    },
    { timestamps: true }
);

// Automatically update total price before saving
CartSchema.pre('save', function (next) {
    this.totalPrice = this.products.reduce((total, item) => total + item.price * item.quantity, 0);
    next();
});

module.exports = mongoose.model('Cart', CartSchema);
