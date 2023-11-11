const express = require('express');
const route = express.Router()

const  { getAllEdges, addEdge, deleteEdge, updateEdge, getAllEdge }= require("../controllers/edge.controller")


route.get("/getAll/edge", getAllEdge)
route.post ("/add", addEdge)
route.delete("/deleteEdge/:id", deleteEdge)
route.put("/update/:id", updateEdge)

module.exports = route
