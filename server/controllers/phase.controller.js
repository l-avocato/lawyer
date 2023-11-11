const sequalize = require("sequelize");
const { Phase } = require("../models/index");

module.exports = {
  getAllPhases: async (req, res) => {
    try {
      const allPhases = await Phase.findAll({});
      res.status(200).send(allPhases);
    } catch (error) {
      throw error;
    }
  },
  getPhaseId: async (req, res) => {
    try {
      const onePhase = await Phase.findOne({
        where: { id: req.params.id },
      });
      res.status(200).send(onePhase);
    } catch (error) {
      throw error;
    }
  },

  add: async (req, res) => {
    try {
      const newPhase = await Phase.create(req.body);
      res.status(201).send(newPhase);
    } catch (error) {
      throw error;
    }
  },
  remove: async (req, res) => {
    console.log(req.params.id)
    try {
      const phaseDeleted = await Phase.destroy({
        where: { id: req.params.id }
      });
      res.json(phaseDeleted);
    } catch (error) {
      throw error;
    }
  },
  update: async function (req, res) {
    try {
      const result = await Phase.update(req.body, {
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
