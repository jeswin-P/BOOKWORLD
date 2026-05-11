const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const db_connect = async () => {
  try {

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {

    console.log("❌ Database Connection Error:", error.message);
    process.exit(1);

  }
};

module.exports = db_connect;