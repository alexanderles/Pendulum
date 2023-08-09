import mongoose from 'mongoose';

const pendulumsSchema = new mongoose.Schema({
    topic: String,
    address: String,
    price: float,
    auctionStartingPrice: float,
    auctionMinBidStep: float,
    auctionMinDuration: float,
    auctionEndTime: float,
    leadingBidder: String,
    leadingBid: float,
    createdOn: { type: Date, default: Date.now },
}, { collection: "pendulums" });

export default pendulumsSchema;