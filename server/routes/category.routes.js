import express from "express";
import categoryCtrl from "../controllers/category.controller.js";
import authCtrl from "../controllers/auth.controller.js"

const router = express.Router();

router
    .route("/api/category")
    .get(categoryCtrl.list)
    .post(authCtrl.requireSignin, categoryCtrl.create);

router
    .route("/api/category/:categoryId")
    .put(authCtrl.requireSignin, categoryCtrl.update)
    .delete(authCtrl.requireSignin, categoryCtrl.softDelete);

router.param("categoryId", categoryCtrl.categoryById);

export default router;