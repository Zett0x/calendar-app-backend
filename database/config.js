const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    console.log("Connecting with database...");
    await mongoose.connect(process.env.DB_CNN);
    console.log("Connection with database stablished");
  } catch (error) {
    console.log(error);
    throw new Error("Error al conectarse con la base de datos");
  }
};

module.exports = {
  dbConnection,
};
