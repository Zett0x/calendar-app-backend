const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();
const cors = require("cors");

// crear el servidor de express

const app = express();

//base de datos
dbConnection();

//CORS

app.use(cors());

const PORT = process.env.PORT;

//directorio publico

app.use(express.static("public"));

//lectura y parseo del body

app.use(express.json());

//routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

//TODO: CRUD: Eventos

//escuchar peticiones

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
