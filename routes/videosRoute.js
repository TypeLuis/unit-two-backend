const videosController = require('../controllers/videosController')

const express = require('express')

const videosRoute = express.Router()

videosRoute.post('/:userId', videosController.userCreateVideo)
videosRoute.delete('/:id', videosController.userDeleteVideo)
videosRoute.get('/', videosController.userGetVideo)








module.exports = videosRoute