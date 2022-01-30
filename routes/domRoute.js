const domController = require('../controllers/domController')

const express = require('express')

const domRoute = express.Router()

domRoute.get('/user/create', domController.createBg)

domRoute.put('/user/update', domController.domUpdate)

domRoute.get('/', domController.getDom)



module.exports = domRoute