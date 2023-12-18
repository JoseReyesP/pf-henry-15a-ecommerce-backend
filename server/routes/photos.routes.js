import express from "express";
import photosCtrl from "../controllers/photos.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router
  .route("/api/photos")
  .get(photosCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, photosCtrl.create);

router
  .route("/api/photos/:photoId")
  .get(photosCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, photosCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, photosCtrl.remove);

router.param("photoId", photosCtrl.photoById);

export default router;
