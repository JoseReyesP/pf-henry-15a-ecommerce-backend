import express from "express";
import filtersCtrl from "../controllers/filters.controller.js";

const router = express.Router();

router.route("/api/filter").get(filtersCtrl.filter);

export default router;