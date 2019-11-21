'use strict'

const sqlite = require('sqlite-async')
//const sendMail = require('./sendmail')

module.exports = class Bookings {
	constructor(dbName =':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			const sql = `CREATE TABLE IF NOT EXISTS bookings 
            ("reportID" INTEGER PRIMARY KEY AUTOINCREMENT, technicianName TEXT NOT NULL, 
            quote TEXT NOT NULL, datetime TEXT NOT NULL, 
            "status" TEXT DEFAULT \'pending\', FOREIGN KEY("reportID") REFERENCES "reports"("reportID"));`
			await this.db.run(sql)
			return this
		})()
	}

	submitBookingValidation(technicianName, quote, datetime) {
		if(technicianName.length === 0) throw new Error('no technician name inputted')
		if(quote.length === 0) throw new Error('no quote inputted')
		if(datetime.length === 0) throw new Error('no datetime assigned inputted')
	}

	submitBookingValidation1(technicianName, quote, datetime) {
		const whitespace = new RegExp(/\s/g)
		const pound = new RegExp(/£/g)
		const numbers = new RegExp(/\d/g)
		if(numbers.test(technicianName) === true) throw new Error('name cannot contain numbers')
		if(whitespace.test(datetime) === true) throw new Error('datetime cannot contain whitespaces')
		if(pound.test(quote) === false) throw new Error('quote must have £ currency')
		if(whitespace.test(quote) === true) throw new Error('quote cannot contain whitespaces')
	}

	submitBookingValidation2(technicianName, quote, datetime) {
		if(typeof datetime === 'boolean') throw new Error('datetime cannot be a boolean')
		if(typeof quote === 'boolean') throw new Error('quote cannot be boolean')
		if(typeof technicianName === 'boolean') throw new Error('technician name cannot be a bool')
	}

	submitBookingValidation3(technicianName, quote, datetime) {
		if(typeof datetime !== 'string') throw new Error('datetime must be string')
		if(typeof quote !== 'string') throw new Error('quote must be string')
		if(typeof technicianName !== 'string') throw new Error('name must be a string')

	}


	async submitBooking( technicianName, quote, datetime ) {
		try {
			const sql = `INSERT INTO bookings(technicianName, quote, datetime) 
            VALUES("${technicianName}", "${quote}", "${datetime}")`
			this.submitBookingValidation(technicianName, quote, datetime)
			this.submitBookingValidation2(technicianName, quote, datetime)
			this.submitBookingValidation3(technicianName, quote, datetime)
			this.submitBookingValidation1(technicianName, quote, datetime)
			await this.db.run(sql)
			return true
		}catch(err) {
			throw err
		}
	}

	async getQuote() {
		const sql = 'SELECT * FROM bookings'
		const data = await this.db.all(sql)
		return data
	}

	async acceptQuote(reportID) {
		const sql = `UPDATE bookings SET status = 'accepted' WHERE reportID = "${reportID}"`
		//await sendMail.sendEmail()
		const data = await this.db.run(sql)
		return data
	}

	async denyQuote(reportID) {
		const sql = `UPDATE bookings SET status = 'denied' WHERE reportID = "${reportID}"`
		const data = await this.db.run(sql)
		return data
	}
}
