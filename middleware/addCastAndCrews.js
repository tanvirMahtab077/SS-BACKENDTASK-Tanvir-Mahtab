// This middleware has been implemented for creating actors, directors and producers before creating a show. 
const showModel = require("../model/Show");
const actorModel = require("../model/Actor");
const directorModel = require("../model/Director");
const producerModel = require("../model/Producer");

exports.addCastAndCrews = async (req, res, next) => {
  const { title, actors, directors, producers } = req.body;
  const show = await showModel.findOne({ title });
  if (show) {
    return res.status(400).json({ message: "This show is already added" });
  }
 
  try {
    const addedActors = await actorModel.create(actors);
    const addedDirector = await directorModel.create(directors);
    const addedProducer = await producerModel.create(producers);
    const actorIds = addedActors.map((actor) => actor._id);
    const directorIds = addedDirector.map((director) => director._id);
    const producerIds = addedProducer.map((producer) => producer._id);
    req.body.actorIds = actorIds;
    req.body.directorIds = directorIds;
    req.body.producerIds = producerIds;
    next();
  } catch (err) {
    console.error(err);
  }
};
