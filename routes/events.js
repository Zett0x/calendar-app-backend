/*
    Event Routes
    /api/events
*/

//Todas tienen que pasar por la validacion del JWT

// const { Router } = require("express");
const { Router } = require("express");
//const { check } = require("express-validator");
const router = Router();
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

const { validateJWT } = require("../middlewares/validate-jwt");

//Obtener eventos
router.get("/", [validateJWT], getEvents);

//Crear nuevo evento

router.post("/", [validateJWT], createEvent);

// actualizar evento

router.put("/:id", [validateJWT], updateEvent);
router.delete("/:id", [validateJWT], deleteEvent);

module.exports = router;
