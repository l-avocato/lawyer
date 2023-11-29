const express = require('express')
const routerNote = express.Router()
const { getAllNote, getNote, add, remove, update,addNote } = require('../controllers/note.controller')


routerNote.get('/allNotes/:id', getAllNote )
routerNote.get('/note/:id', getNote )
routerNote.post('/addNote', add)
routerNote.post('/createNote', addNote)
routerNote.delete('/note/:id', remove)
routerNote.put('/note/:id', update)

module.exports=routerNote