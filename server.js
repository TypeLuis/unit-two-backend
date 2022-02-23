/// Importing modules

const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const rowdy = require('rowdy-logger')
const videosRoute = require('./routes/videosRoute')
const userRoute = require('./routes/userRoute')
const domRoute = require('./routes/domRoute')



// declaring variables
const app = express()
const PORT = process.env.PORT || 3001
const routesReport = rowdy.begin(app)



app.use(morgan('tiny'))
app.use(cors()) // makes this talkable through a fetch(localhost URL)
app.use(express.json()) // converts into json data when needs to

app.get('/', (req, res) => {
    res.json({ ok: 'ok' })
})


// this means everytime '/user' is used, it'll go to userRoute file
app.use('/user', userRoute)
app.use('/user/videos', videosRoute)
app.use('/dom', domRoute)



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
    routesReport.print()
})