/* eslint-disable max-params */
'use strict'
const sqlite = require('sqlite-async')
const numbers = new RegExp(/\d/g)
module.exports = class Reports {
	constructor(dbName =':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			const sql = `CREATE TABLE IF NOT EXISTS reports 
            (reportID INTEGER PRIMARY KEY AUTOINCREMENT, 
            applianceType TEXT NOT NULL, applianceAge INTEGER NOT NULL, 
            manufacturer TEXT NOT NULL, faultDescription TEXT NOT NULL, 
            customerName TEXT NOT NULL, customerAddress TEXT NOT NULL, \'status\' TEXT DEFAULT \'Incomplete\');`
			await this.db.run(sql)
			return this
		})()
	}

	addReportValidation(applianceType, manufacturer) {
		const numbers = new RegExp(/\d/g)
		const whitespace = new RegExp(/\s/g)
		if(numbers.test(applianceType) === true) throw new Error('appliance type cannot contain numbers')
		if(whitespace.test(manufacturer) === true) throw new Error('manufacturer cannot contain whitespaces')
		if(whitespace.test(manufacturer) === true) throw new Error('manufacturer cannot contain whitespaces')
		if(numbers.test(manufacturer) === true) throw new Error('manufacturer cannot contain numbers')
	}

	addReportValidation1(applianceType, applianceAge, manufacturer, faultDescription) {
		if(applianceAge.length === 0) throw new Error('no age selected')
		if(manufacturer.length === 0) throw new Error('no manufacturer selected')
		if(applianceType.length === 0) throw new Error('no type selected')
		if(faultDescription.length === 0) throw new Error('Please enter description of fault')
	}

	addReportValidation2(applianceType, applianceAge, manufacturer) {
		if(typeof applianceType === 'boolean') throw new Error('appliance type cannot be a bool')
		if(typeof applianceAge !== 'string') throw new Error('appliance age must be a string')
		if(typeof manufacturer === 'boolean') throw new Error('manufacturer cannot be a bool')
		if(typeof manufacturer !== 'string') throw new Error('manufacturer must be a string')
	}

	addReportValidation3(customerName, customerAddress) {
		if(typeof customerName === 'boolean') throw new Error('customer name cannot be a bool')
		if(typeof customerName !== 'string') throw new Error('customer name must be a string')
		if(typeof customerAddress === 'boolean') throw new Error('customer address cannot be a bool')
		if(typeof customerAddress !== 'string') throw new Error('customer address must be a string')
	}

	addReportValidation4(faultDescription) {
		if(typeof faultDescription === 'boolean') throw new Error('fault description cannot be a bool')
		if(typeof faultDescription !== 'string') throw new Error('fault description must be a string')
	}

	async addReport(applianceType, applianceAge, manufacturer, faultDescription, customerName, customerAddress) {
		try {
			if(customerAddress.length === 0) throw new Error('there is no customer address')
			if(customerName.length === 0) throw new Error('there is no customer name')
			this.addReportValidation1(applianceType, applianceAge, manufacturer, faultDescription)
			this.addReportValidation2(applianceType, applianceAge, manufacturer)
			this.addReportValidation3(customerName, customerAddress)
			this.addReportValidation4(faultDescription, customerName, customerAddress)
			if(numbers.test(customerName) === true) throw new Error('customer name cannot contain numbers')
			this.addReportValidation(applianceType, manufacturer)
			const sql = `INSERT INTO reports(applianceType, applianceAge, 
            manufacturer, faultDescription, customerName, customerAddress) 
            VALUES("${applianceType}","${applianceAge}","${manufacturer}",
            "${faultDescription}","${customerName}","${customerAddress}")`
			await this.db.run(sql)
			return true
		}catch(err) {
			throw err
		}
	}
	async getReport() {
		const sql = 'SELECT * FROM reports WHERE status = \'Incomplete\''
		const data = await this.db.all(sql)
		return data
	}
	async getReported() {
		const sql = 'SELECT * FROM reports'
		const data = await this.db.all(sql)
		return data
	}
	async book(reportID) {
		const sql = `SELECT * FROM reports WHERE reportID = "${reportID}"`
		const data = await this.db.all(sql)
		console.log(data)
		return data
	}
	async getJob() {
		const sql = `SELECT reports.reportID, reports.customerName, 
        reports.customerAddress, reports.applianceType, reports.applianceAge, 
        reports.manufacturer, reports.status FROM reports LEFT JOIN bookings ON reports.reportID = bookings.reportID`
		const data = await this.db.all(sql)
		console.log(data)
		return data
	}
	async signOff(reportID) {
		const sql = `UPDATE reports SET status = 'Completed' WHERE reportID = "${reportID}"`
		const data = await this.db.run(sql)
		return data
	}
}
