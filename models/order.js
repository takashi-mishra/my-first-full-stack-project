// Order Schema
const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userNumber: { type: Number, required: true },
    userAddress: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    productName: { type: String, required: true },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending' }
});

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;
