import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";
import productCtrl from "../controllers/product.controller.js";

const router = express.Router();

router
  .route("/api/product")
  .get(productCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.create);

router
  .route("/api/product/:productId")
  .get(productCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.update)
  .delete(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    productCtrl.remove
  );

router.param("productId", productCtrl.productByID);

export default router;
