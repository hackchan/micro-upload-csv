import express from 'express'
import routers from './network/routing'
const app = express()

//setting
app.set('port', 5000)

//middlewares
app.use(express.static('public'))
app.use('/static', express.static(__dirname + 'public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//routers
routers(app)

export default app
