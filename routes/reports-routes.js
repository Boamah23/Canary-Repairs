'use strict'

const Router = require('koa-router')
const dbName = 'website.db'

const Reports = require('../modules/reports')
const router = new Router()

router.get('/reports', async ctx => await ctx.render('reports'))

router.post('/report', async ctx => {
	try {
		const body = ctx.request.body
		console.log(body)
		const report = await new Reports(dbName)
		await report.addReport(body.applianceType,
			body.applianceAge,body.manufacturer,body.faultDescription,body.customerName,body.customerAddress)
		return ctx.redirect('/reports')
	}catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

router.get('/jobList', async ctx => {
	try {
		const data = {}
		const job = await new Reports(dbName)
		data.reported = await job.getReport()
		await ctx.render('jobList', data)
	}catch(err) {
		console.log(err.message)
		ctx.render('jobList', {msg: err.message})
	}
})


router.get('/pendingJobs', async ctx => {
	try {
		const data = {}
		const jobs = await new Reports(dbName)
		data.reportList = await jobs.getJob()
		await ctx.render('pendingJobs', data)
	}catch(err) {
		console.log(err.message)
		ctx.render('pendingJobs', {msg: err.message})
	}
})


router.get('/custJoblist', async ctx => {
	try {
		const data = {}
		const job = await new Reports(dbName)
		data.custReport = await job.getReported()
		await ctx.render('custJoblist', data)
	}catch(err) {
		console.log(err.message)
		await ctx.render('custJoblist', {msg: err.message})
	}
})

module.exports = router
