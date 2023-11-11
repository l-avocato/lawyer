const sequalize =require('sequelize')
const {Edge}= require('../models/index')

module.exports = {
    getAllEdge: async (req, res) => {
        try {
          const allEdges = await Edge.findAll({});
          res.status(200).send(allEdges);
        } catch (error) {
          throw error;
        }
      },
    
    addEdge: async function (req, res) {
        try {
            const edges = await Edge.create(req.body)
            res.status(200).send(edges)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    deleteEdge: async function (req, res) {
        try {
            const edges = await Edge.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(edges)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    updateEdge: async function (req, res) {
        try {
            const edges = await Edge.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(edges)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },

}