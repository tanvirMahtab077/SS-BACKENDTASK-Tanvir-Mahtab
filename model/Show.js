const Mongoose = require("mongoose");
const ShowSchema = new Mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    runTime: {
      type: String,
      minlength: 6,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    details: {
      actors: [{ type: Mongoose.Types.ObjectId, ref: "actor" }],
      directors: [{ type: Mongoose.Types.ObjectId, ref: "director" }],
      producers: [{ type: Mongoose.Types.ObjectId, ref: "producer" }],
    },
  },
  {
    timestamps: true,
  }
);

const Show = Mongoose.model("show", ShowSchema);
module.exports = Show;
