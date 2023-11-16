const sequalize =require('sequelize')
const {Files}= require('../models/index')

module.exports = {
    getAllFiles: async (req, res) => {
        try {
          const allEdges = await Files.findAll({});
          res.status(200).send(allEdges);
        } catch (error) {
          throw error;
        }
      },
    
    addFile: async function (req, res) {
        try {
            const file = await Files.create(req.body)
            res.status(200).send(file)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    deleteFile: async function (req, res) {
        try {
            const Files = await Files.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(Files)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    updateFile: async function (req, res) {
        try {
            const file = await Files.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(file)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },

}