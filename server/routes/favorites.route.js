const express = require("express");
const routerFave = express.Router();
const {
  getFaveByUserId,
  add,
  removeFave,
} = require("../controllers/favorites.controller");

routerFave.get("/getFave/:email", getFaveByUserId);

routerFave.post("/add/:email", add);

routerFave.delete("/remove/:email", removeFave);

module.exports = routerFave;
