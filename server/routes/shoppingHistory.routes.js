import express from "express";
const {list,create,historyById} =require("../controllers/shoppingHistory.controller.js");
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router
.route("/api/shoppingHistory")
.get(list)
.post(authCtrl.requireSignin, authCtrl.hasAuthorization, create);

router
.route("/api/shoppingHistory/id")
.get(historyById)