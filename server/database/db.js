import mongoose from "mongoose";

const DBConnection = async () => {
  const DB_URL = `mongodb://SanjayNarukulla:Sanjay%40123@file-sharing-project-shard-00-00.dbwii.mongodb.net:27017,file-sharing-project-shard-00-01.dbwii.mongodb.net:27017,file-sharing-project-shard-00-02.dbwii.mongodb.net:27017/?ssl=true&replicaSet=atlas-2lhgh1-shard-0&authSource=admin&retryWrites=true&w=majority&appName=file-sharing-project`;
  try {
    await mongoose.connect(DB_URL, { useNewUrlParser: true });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error while connecting with database", error.message);
  }
};

export default DBConnection;
