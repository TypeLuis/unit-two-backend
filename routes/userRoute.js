const userController = require('../controllers/userController')

const express = require('express')

const userRoute = express.Router()

userRoute.post('/', userController.newUser)

userRoute.post('/search', userController.userSearch)

userRoute.post('/login', userController.login)

userRoute.get('', userController.findProfile)

userRoute.post('/posts/:userId', userController.userCreatePost)

userRoute.get('/posts', userController.userGetPosts)

userRoute.delete('/posts/:id', userController.userDeletePost)

userRoute.put('/posts/:id', userController.userUpdatePost)

module.exports = userRoute