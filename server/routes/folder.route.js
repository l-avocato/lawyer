const express = require('express');
const route = express.Router()

const  { getAllFolder, addFolder, deleteFolder, updateFolder, getAllFolderbyName }= require("../controllers/Folder.controller")


route.get("/getAll/:id", getAllFolder )
route.get("/getAll/:name", getAllFolderbyName)
route.post ("/add", addFolder)
route.delete("/deleteEdge/:id", deleteFolder)
route.put("/update/:id", updateFolder)

module.exports = route
