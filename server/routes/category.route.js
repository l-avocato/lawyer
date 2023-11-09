const express = require('express')
const routerCategory = express.Router()
const {getAllCategories,getCategoryById,addCategory,deleteCategory,updateCategory}= require('../controllers/category.controller')


routerCategory.get('/allCategories',getAllCategories)

routerCategory.get('/getCategoryById/:id',getCategoryById)

routerCategory.post('/addCategory',addCategory)

routerCategory.delete('/deleteCategory/:id',deleteCategory)

routerCategory.put('/updateCategory/:id',updateCategory)

module.exports = routerCategory