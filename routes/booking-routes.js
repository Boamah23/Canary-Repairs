'use strict'

const Router = require('koa-router')

const dbName = 'website.db'

const Bookings = require('../modules/booking')
const router = new Router()

router.post('/book', async ctx => {
	try {
		const body = ctx.request.body
		console.log(ctx.params.id)
		const quote = await new Bookings(dbName)
		await quote.submitBooking(body.technicianName, body.quote, body.datetime)
		return ctx.redirect('/booking/1')

	}catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

router.get('/quotes', async ctx => {
	try {
		const data = {}
		const quote = await new Bookings(dbName)
		data.requested = await quote.getQuote()
		await ctx.render('quotes', data)
	}catch(err) {
		console.log(err.message)
		ctx.render('quotes', {msg: err.message})
	}
})

router.get('/accept/:reportID', async ctx => {
	try{
		console.log(`reportID: ${ctx.params.reportID}`)
		const accept = await new Bookings(dbName)
		await accept.acceptQuote(ctx.params.reportID)
		await ctx.redirect('/quotes')

	}catch(err) {
		await ctx.render('error', {message: err.message})

	}
})

router.get('/deny/:reportID', async ctx => {
	try{
		console.log(`reportID: ${ctx.params.reportID}`)
		const deny = await new Bookings(dbName)
		await deny.denyQuote(ctx.params.reportID)
		await ctx.redirect('/quotes')

	}catch(err) {
		await ctx.render('error', {message: err.message})

	}
})

router.get('/update/:reportID', async ctx => {
	try{
		console.log(`reportID: ${ctx.params.reportID}`)
		const update = await new Bookings(dbName)
		await update.signOff(ctx.params.reportID)
		await ctx.redirect('/pendingJobs')

	}catch(err) {
		await ctx.render('error', {message: err.message})

	}
})


router.get('/booking/:reportID', async ctx => {
	try {
		console.log(`reportID: ${ctx.params.reportID}`)
		const data = {}
		const job = await new Bookings(dbName)
		data.reported = await job.book(ctx.params.reportID)
		await ctx.render('booking', data)
	}catch(err) {
		console.log(err.message)
		ctx.render('jobList', {msg: err.message})
	}
})

module.exports = router
