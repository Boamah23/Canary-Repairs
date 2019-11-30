'use strict'

const sqlite = require('sqlite-async')
const nodemailer = require('nodemailer')
const two = 2
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
	async checkLimit(technicianName) {
		const sql = `SELECT COUNT(*) as limitation FROM reports LEFT JOIN 
            bookings ON reports.reportID = bookings.reportID WHERE
            bookings.technicianName = "${technicianName}" AND 
            reports.status = \'Incomplete\' AND  bookings.status = \'accepted\'`
		let jobs = await this.db.all(sql)
		jobs = jobs[0].limitation
		/* istanbul ignore next */
		if(jobs > two) throw new Error('theres been an error')
		console.log(jobs>two)
		return jobs
	}
	async submitBooking( technicianName, quote, datetime ) {
		try {
			this.submitBookingValidation(technicianName, quote, datetime)
			this.submitBookingValidation2(technicianName, quote, datetime)
			this.submitBookingValidation3(technicianName, quote, datetime)
			this.submitBookingValidation1(technicianName, quote, datetime)
			await this.checkLimit(technicianName)
			const sql = `INSERT INTO bookings(technicianName, quote, datetime)
            VALUES("${technicianName}", "${quote}", "${datetime}")`
			await this.db.run(sql)
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
		let sql = `UPDATE bookings SET status = 'accepted' WHERE reportID = "${reportID}"`
		const data = await this.db.run(sql)
		sql = `SELECT * FROM bookings WHERE reportID = "${reportID}"`
		let book = await this.db.all(sql)
		book = book[0]
		await this.sendEmail(book.technicianName,book.quote,book.datetime)
		return data
	}
	async denyQuote(reportID) {
		const sql = `UPDATE bookings SET status = 'denied' WHERE reportID = "${reportID}"`
		const data = await this.db.run(sql)
		return data
	}
	async sendEmail(technicianName, quote, datetime) {
		const transporter = nodemailer.createTransport({
			service: 'gmail', auth: {
				user: 'canaryrepairs@gmail.com',
				pass: 'Nathan1!'
			}
		})
		const mailOptions = {
			from: 'canaryrepairs@gmail.com', to: 'nathanboamah@hotmail.com',
			subject: 'Job details',
			text: `techniciaian name: ${ technicianName } quote: ${ quote } date and time: ${ datetime}`
		}
		transporter.sendMail(mailOptions)
	}
	async popDb(report) {
		try{
			let sql = `CREATE TABLE IF NOT EXISTS reports (reportID INTEGER PRIMARY KEY, 
            applianceType TEXT NOT NULL, applianceAge TEXT NOT NULL, 
            manufacturer TEXT NOT NULL, faultDescription TEXT NOT NULL, 
            customerName TEXT NOT NULL, customerAddress TEXT NOT NULL, status TEXT NOT NULL);`
			await this.db.run(sql)
			if(report.status.length===0) throw new Error('no status entered')
			sql = `INSERT INTO reports(reportID, applianceType, 
                applianceAge, manufacturer, faultDescription, customerName, customerAddress, status)
        VALUES("${report.reportID}", "${report.applianceType}", 
        "${report.applianceAge}", "${report.manufacturer}", 
        "${report.faultDescription}", "${report.customerName}", 
        "${report.customerAddress}", "${report.status}" )`
			await this.db.run(sql)
			return true
		}catch(err) {
			throw err
		}
	}
	mocksubmit(reportID, technicianName, quote, datetime, status) {
		let sql = `CREATE TABLE IF NOT EXISTS bookings 
        ("reportID" INTEGER PRIMARY KEY, technicianName TEXT NOT NULL, 
        quote TEXT NOT NULL, datetime TEXT NOT NULL, 
        "status" TEXT NOT NULL, FOREIGN KEY("reportID") REFERENCES "reports"("reportID"));`
		this.db.run(sql)
		this.checkLimit(technicianName)
		sql = `INSERT INTO bookings(reportID,  technicianName, quote, datetime, status)
        VALUES("${reportID}", "${technicianName}", "${quote}", "${datetime}", "${status}")`
		this.db.run(sql)
		return true
	}
}
