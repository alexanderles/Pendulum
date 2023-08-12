import mongoose from "mongoose";

const pendulumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  count: {
    type: Number,
    required: [true, "Please provide a count"],
  },
  address: {
    type: String,
    required: [true, "Please provide an address"],
    unique: true,
  },
});

const Pendulum = mongoose.models.pendulums || mongoose.model("pendulums", pendulumSchema);

export default Pendulum;
