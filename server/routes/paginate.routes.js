import express from "express";
import paginateController from "../controllers/paginate.controller.js";

const router = express.Router();

router.route("/api/paginado").get(paginateController.paginate);

export default router;