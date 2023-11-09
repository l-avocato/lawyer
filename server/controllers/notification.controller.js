const sequalize =require('sequelize')
const {db}= require('../models/index')


module.exports = {

    async getNotification(req, res) {
        try {
            const notification = await db.Notification.findAll({
                where: {
                    userId: req.params.id
                }
            })
            res.status(200).send(notification)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    async addNotification(req, res) {
        try {
            const notification = await db.Notification.create({
                userId: req.body.userId,
                message: req.body.message,
                isRead: req.body.isRead
            })
            res.status(200).send(notification)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    async deleteNotification(req, res) {
        try {
            const notification = await db.Notification.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(notification)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    async updateNotification(req, res) {
        try {
            const notification = await db.Notification.update({
                isRead: req.body.isRead
            }, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(notification)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    async getAllNotifications(req, res) {
        try {
            const notification = await db.Notification.findAll()
            res.status(200).send(notification)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    async getNotificationById(req, res) {
        try {
            const notification = await db.Notification.findOne({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(notification)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    async getNotificationsByUser(req, res) {
        try {
            const notification = await db.Notification.findAll({
                where: {
                    userId: req.params.id
                }
            })
            res.status(200).send(notification)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    async getNotificationsByLawyer(req, res) {
        try {
            const notification = await db.Notification.findAll({
                where: {
                    lawyerId: req.params.id
                }
            })
            res.status(200).send(notification)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    

}