// this is for local connection to mongodb
const DBUser = "relujo";
const DBPassword = "1095reyes";
const DBUrl = `mongodb+srv://${DBUser}:${DBPassword}@cluster0.wonxugf.mongodb.net/pf-henry?retryWrites=true&w=majority`;
const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: DBUrl,
  apiSendGrid:
    process.env.apiSendGrid ||
    "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",
  henrucciEmail: "henrucciwebsite@gmail.com",
};

// this is mongodb Atlas connection
// const config = {
//   env: process.env.NODE_ENV,
//   port: process.env.PORT,
//   jwtSecret: process.env.JWT_SECRET,
//   mongoUri:process.env.mongoUri
//    ,
// };

export default config;
