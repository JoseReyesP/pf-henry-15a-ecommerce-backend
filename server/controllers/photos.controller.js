import Photos from "../models/photos.model.js";

const create = async (req, res) => {
  const { name } = req.body;
  console.log("create called");
  try {
    const exists = await Photos.exists({ name });
    if (!req.body.photoData) {
      throw new Error("not valid photo data provided");
    }
    if (exists) {
      throw new Error("Photo already exists");
    } else {
      await Photos.create(req.body);
      console.log(req.body.name, "was created");
      res.setHeader("Content-Security-Policy", "img-src 'self' data:;");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
      return res.status(200).json({ message: "Photo successfuly saved!" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const list = async (req, res) => {
  try {
    const photos = await Photos.find({ isDeleted: false }).select("_id");
    res.setHeader("Content-Security-Policy", "img-src 'self' data:;");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    res.status(200).json(photos);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const photoById = async (req, res, next, id) => {
  try {
    const photo = await Photos.findById(id);
    req.photo = photo;
    next();
  } catch (error) {
    return res.status(400).json({ error: "Could not retreive Photo" });
  }
};

const read = (req, res) => {
  res.setHeader("Content-Security-Policy", "img-src 'self' data:;");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  return res.json(req.photo.photoData.data);
};

const update = async (req, res) => {
  const photo = req.photo;
  try {
    await Photos.findByIdAndUpdate(photo._id, { $set: req.body });
    res.setHeader("Content-Security-Policy", "img-src 'self' data:;");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    res.status(200).json({ message: "Photo updated!" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const photo = req.photo;
  try {
    if (req.body.type == "soft") {
      await Photos.findByIdAndUpdate(photo._id, {
        $set: { isDeleted: true },
      });
      res.status(200).json({ message: "Photo SoftDeleted!" });
    } else {
      await Photos.findByIdAndDelete(photo._id);
      res.status(200).json({ message: "Photo deleted!" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export default { create, list, photoById, update, remove, read };
