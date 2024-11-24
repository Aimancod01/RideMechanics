import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "TourCustomer", required: true },
    paymentId: { type: String, required: true },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("TourPayment", paymentSchema);