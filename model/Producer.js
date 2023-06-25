const Mongoose = require("mongoose");
const ProducerSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Producer = Mongoose.model("producer", ProducerSchema);
module.exports = Producer;
