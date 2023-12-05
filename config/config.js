// this is for local connection to mongodb
const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    "mongodb+srv://relujo:1095reyes@cluster0.wonxugf.mongodb.net/pf-henry?retryWrites=true&w=majority",
};

// // this is mongodb Atlas connection
// const config = {
//   env: process.env.NODE_ENV,
//   port: process.env.PORT
//   jwtSecret: process.env.JWT_SECRET,
//   mongoUri:
//     "mongodb+srv://relujo:1095reyes@cluster0.wonxugf.mongodb.net/pf-henry?retryWrites=true&w=majority",
// };

export default config;
