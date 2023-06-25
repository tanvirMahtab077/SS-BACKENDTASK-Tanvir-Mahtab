const Mongoose = require("mongoose");
const ActorSchema = new Mongoose.Schema(
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

const Actor = Mongoose.model("actor", ActorSchema);
module.exports = Actor;
