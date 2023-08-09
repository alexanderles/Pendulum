import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    displayName: String,
    profilePic: String,
    isExpert: Boolean,
    createdOn: { type: Date, default: Date.now },
}, { collection: "users" });

export default usersSchema;