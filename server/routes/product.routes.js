import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";
import productCtrl from "../controllers/product.controller.js";

const router = express.Router();

router.route("/api/product").get(productCtrl.list).post(productCtrl.create);

router
  .route("/api/product/:productId")
  .get(productCtrl.read)
  .put(authCtrl.requireSignin, productCtrl.update)
  .delete(authCtrl.requireSignin, productCtrl.remove);

router.param("productId", productCtrl.productByID);

export default router;