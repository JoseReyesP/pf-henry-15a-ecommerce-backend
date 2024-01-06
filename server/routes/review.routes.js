import express from "express";
import authCtrl from "../controllers/auth.controller.js";
import reviewCtrl from "../controllers/review.controller.js";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router
  .route("/api/review")
  .get(reviewCtrl.list)
  .post(authCtrl.requireSignin, reviewCtrl.create);

router
  .route("/api/review/:reviewId")
  .get(reviewCtrl.read)
  .put(authCtrl.requireSignin, reviewCtrl.update)
  .delete(authCtrl.requireSignin, reviewCtrl.remove);

router.param("reviewId", reviewCtrl.reviewByID);

export default router;
