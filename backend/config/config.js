import dotenv from "dotenv";
dotenv.config();

export default {
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/alumni_db"
  }
};
