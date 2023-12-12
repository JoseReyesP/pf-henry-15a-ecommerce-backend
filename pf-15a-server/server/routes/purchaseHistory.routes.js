import express from "express";
import authCtrl from "../controllers/auth.controller.js";
import purchaseHistoryCtrl from "../controllers/purchaseHistory.controller.js";

const router = express.Router();

router
  .route("/api/purchaseHistory")
  .get(purchaseHistoryCtrl.list)
  .post(authCtrl.requireSignin, purchaseHistoryCtrl.create);

router
  .route("/api/purchaseHistory/:purchaseHistoryId")
  .get(purchaseHistoryCtrl.read)
  .put(authCtrl.requireSignin, purchaseHistoryCtrl.update)
  .delete(authCtrl.requireSignin, purchaseHistoryCtrl.remove);

router.param("purchaseHistoryId", purchaseHistoryCtrl.purchaseHistoryByID);

export default router;
