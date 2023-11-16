const sequalize = require("sequelize");
const { Note } = require("../models/index");

module.exports = {
  getAllNote: async (req, res) => {
    try {
      const allNotes = await Note.findAll({});
      res.status(200).send(allNotes);
    } catch (error) {
      throw error;
    }
  },
  getNote: async (req, res) => {
    try {
      const oneNote = await Note.findOne({
        where: { id: req.params.id },
      });
      res.status(200).send(oneNote);
    } catch (error) {
      throw error;
    }
  },

  add: async (req, res) => {
    try {
      const newNote = await Note.create(req.body);
      res.status(201).send(newNote);
    } catch (error) {
      throw error;
    }
  },
  remove: async (req, res) => {
    try {
      const noteDeleted = await Note.destroy({
        where: { id: req.params.id }
      });
      res.json(noteDeleted);
    } catch (error) {
      throw error;
    }
  },
  update: async function (req, res) {
    try {
      const result = await Note.update(req.body, {
          where: {
              id: req.params.id
          }
      })
      res.status(200).send(result)
  } catch (error) {
      res.status(500).send({
          error: error.message
      })
  }
  }
}
