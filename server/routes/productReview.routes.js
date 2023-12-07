import express from "express";
import authCtrl from "../controllers/auth.controller.js";
import productReviewCtrl from "../controllers/product.controller.js";

const router = express.Router();

router
  .route("/api/productReview")
  .get(productReviewCtrl.list)
  .post(authCtrl.requireSignin, productReviewCtrl.create);

router
  .route("/api/productReview/:productReviewId")
  .get(productReviewCtrl.read)
  .put(authCtrl.requireSignin, productReviewCtrl.update)
  .delete(authCtrl.requireSignin, productReviewCtrl.remove);

router.param("productReviewId", productReviewCtrl.productByID);

export default router;
