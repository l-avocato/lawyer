const express = require("express");
const routerLawyer = express.Router();
const {
  getAllLawyers,
  getLawyerId,
  add,
  deleteLawyer,
  update,
  searchLawyer,
  searchLawyerByfield,
  verifyLawyer,
  blockLawyer,
  updateAvailability,
  getLawyersByCategoryAndRating,
  getLawyerByEmail,
} = require("../controllers/lawyer.controller");

routerLawyer.get("/allLawyers", getAllLawyers);

routerLawyer.get("/getLawyerId/:id", getLawyerId);

routerLawyer.get("/getLawyerByEmail/:email", getLawyerByEmail);

routerLawyer.post("/addLawyer", add);

routerLawyer.delete("/deleteLawyer/:id", deleteLawyer);

routerLawyer.put("/updateLawyer/:id", update);

routerLawyer.post("/searchLawyer", searchLawyer);

routerLawyer.post("/searchLawyerByfield", searchLawyerByfield);

routerLawyer.put("/verifyLawyer/:id", verifyLawyer);

routerLawyer.put("/blockLawyer/:id", blockLawyer);

routerLawyer.put("/updateAvailability/:id", updateAvailability);

routerLawyer.get(
  "/getByFilter/:categoryName/:minRating",
  getLawyersByCategoryAndRating,
);

module.exports = routerLawyer;
