const showModel = require("../model/Show");

// title,description,runTime,
exports.addShow = async (req, res, next) => {
  const { title, description, runTime, category, actorIds, producerIds, directorIds } =
    req.body;
  try {
    await showModel.create({
      title,
      description,
      runTime,
      category,
      details:{
        actors: actorIds,
        producers: producerIds,
        directors: directorIds,
      }
    });
    res.status(200).json({ message: "Added successfully" });
  } catch (err) {
    console.error(err);
  }
};

exports.findShowById = async (req, res, next) => {
  const { id } = req.query;
  try {
    const show = await showModel
      .findOne({ _id: id })
      .populate("details.actors")
      .populate("details.producers")
      .populate("details.directors");
    res.status(200).json(show);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.findAllShow = async (req, res, next) => {
  try {
    const showList = await showModel.find();
    if (showList) {
      return res.status(200).json(showList);
    }else{
      return res.status(404).json({message:'No show found'});
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({error:error.message});
  }
};
