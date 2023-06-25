const Mongoose = require("mongoose");
const DirectorSchema = new Mongoose.Schema(
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

const Director = Mongoose.model("director", DirectorSchema);
module.exports = Director;
