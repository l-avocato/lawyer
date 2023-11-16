const sequalize = require("sequelize");
const { Process } = require("../models/index");

module.exports = {
  getAllProcess: async (req, res) => {
    try {
      const allProcess = await Process.findAll({});
      res.status(200).send(allProcess);
    } catch (error) {
      throw error;
    }
  },
  getProcessId: async (req, res) => {
    try {
      const onProcess = await Process.findOne({
        where: { id: req.params.id },
      });
      res.status(200).send(onProcess);
    } catch (error) {
      throw error;
    }
  },

  add: async (req, res) => {
    try {
      const newProcess = await Process.create(req.body);
      res.status(201).send(newProcess);
    } catch (error) {
      throw error;
    }
  },
  remove: async (req, res) => {
    console.log(req.params.id)
    try {
      const processDeleted = await Process.destroy({
        where: { id: req.params.id }
      });
      res.json(processDeleted);
    } catch (error) {
      throw error;
    }
  },
  update: async function (req, res) {
    try {
      const result = await Process.update(req.body, {
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
