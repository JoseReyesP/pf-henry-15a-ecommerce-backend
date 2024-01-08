import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
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
import purchaseHistoryRoutes from "./routes/purchaseHistory.routes.js";
import filterRoutes from "./routes/filters.routes.js";
import photosRoutes from "./routes/photos.routes.js";

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3001",
    "http://localhost:3000",
    "https://pf-henry-15a-ecommerce-frontend.vercel.app",
    "https://admindashboard.up.railway.app",
  ],

  credentials: true,
  methods: "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "Cache-Control",
  ],
  optionSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

//project's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());

app.use(helmet());

// Routes
app.get("/", (req, res) => {
  res.redirect("https://admindashboard.up.railway.app");
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
app.use("/", photosRoutes);

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
