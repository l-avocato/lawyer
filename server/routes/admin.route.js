const express = require('express')
const routerAdmin = express.Router()
const {getAllAdmins,getAdminById,addAdmin,deleteAdmin,updateAdmin} = require('../controllers/admin.controller')


routerAdmin.get('/getAdmins', getAllAdmins)
routerAdmin.get('/admin/:id', getAdminById)
routerAdmin.post('/addAdmin', addAdmin)
routerAdmin.delete('/deleteAdmin/:id', deleteAdmin)
routerAdmin.put('/updateAdmin/:id', updateAdmin)


module.exports=routerAdmin