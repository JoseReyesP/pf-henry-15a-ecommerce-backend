// this is for local connection to mongodb
// const config = {
//   env: process.env.NODE_ENV || "development",
//   port: process.env.PORT || 3001,
//   jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
//   mongoUri:
//     process.env.MONGODB_URI ||
//     process.env.MONGO_HOST ||
//     "mongodb://" +
//       (process.env.IP || "localhost") +
//       ":" +
//       (process.env.MONGO_PORT || "27017") +
//       "/mernproject",
// };

// this is mongodb Atlas connection
const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    "mongodb+srv://relujo:1095reyes@cluster0.wonxugf.mongodb.net/pf-henry?retryWrites=true&w=majority",
};

export default config;
