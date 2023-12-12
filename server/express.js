import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import Template from "../template.js"; // this will be use to provide an AdminDashboard
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import paginateRoutes from "./routes/paginate.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import searchRoutes from "./routes/search.routes.js";
import purchaseHistoryRoutes from "./routes/search.routes.js";
import filterRoutes from "./routes/filters.routes.js";

const app = express();

//project's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
const corsOptions = {
  origin: ["admindashboard.up.railway.app", "http://localhost:3000"],
  credentials: true,
  methods: "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  allowedHeaders:
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json",
};
app.use(cors(corsOptions));
app.use(helmet());

// Routes
app.use(express.static(path.join(__dirname, "admin-dashboard/build")));
app.get("/", (req, res) => {
  //res.status(200).send(Template());
  //res.sendFile(path.join(__dirname, "admin-dashboard/build", "index.html"));
  res.redirect("admindashboard.up.railway.app");
});
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", adminRoutes);
app.use("/", categoryRoutes);
app.use("/", productRoutes);
app.use("/", paginateRoutes);
app.use("/", reviewRoutes);
app.use("/", searchRoutes);
app.use("/", purchaseHistoryRoutes);
app.use("/", filterRoutes);

// Error handling
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
