#!/usr/bin/env node

//Routes File

'use strict'

/* MODULE IMPORTS */
const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const staticDir = require('koa-static')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')

/* ROUTES IMPORTS */
const user = require('./routes/user-routes')
const booking = require('./routes/booking-routes')
const reports = require('./routes/reports-routes')

/* IMPORT CUSTOM MODULES */


const app = new Koa()
const router = new Router()

/* CONFIGURING THE MIDDLEWARE */
app.keys = ['darkSecret']
app.use(staticDir(`${__dirname}/public/images`))
app.use(staticDir('public'))
app.use(bodyParser())
app.use(session(app))
app.use(views(`${__dirname}/views`, { extension: 'handlebars' }, {map: { handlebars: 'handlebars' }}))
app.use(user.routes())
app.use(booking.routes())
app.use(reports.routes())

const defaultPort = 8080
const port = process.env.PORT || defaultPort


app.use(router.routes())
module.exports = app.listen(port, async() => console.log(`listening on port ${port}`))
