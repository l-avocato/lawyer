const express = require("express");
const routerFave = express.Router();
const {
  getFaveByUserId,
  add,
  removeFave,
  checkHeart,
} = require("../controllers/favorites.controller");

routerFave.get("/getFave/:email", getFaveByUserId);
routerFave.get("/checkHeart/:email/:lawyerId", checkHeart);

routerFave.post("/add/:email", add);

routerFave.delete("/remove/:email/:lawyerId", removeFave);

module.exports = routerFave;
