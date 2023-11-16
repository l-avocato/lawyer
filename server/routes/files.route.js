const express = require('express');
const route = express.Router()

const  { getAllFiles, addFile, deleteFile, updateFile }= require("../controllers/Files.controller")


route.get("/getAll/files", getAllFiles)
route.post ("/add", addFile)
route.delete("/deleteEdge/:id", deleteFile)
route.put("/update/:id", updateFile)

module.exports = route
