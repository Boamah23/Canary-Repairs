'use strict'
const bcrypt = require('bcrypt-promise')
const sqlite = require('sqlite-async')
const saltRounds = 10
module.exports = class User {
	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			const sql = `CREATE TABLE IF NOT EXISTS users 
			(ID INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT NOT NULL, 
			pass TEXT NOT NULL, fullName TEXT NOT NULL, email TEXT NOT NULL);`
			await this.db.run(sql)
			return this
		})()
	}
	registerValidation(user, pass, fullName, email) {
		if(user.length === 0) throw new Error('missing username')
		if(pass.length === 0) throw new Error('missing password')
		if(fullName.length === 0) throw new Error('missing full name')
		if(email.length === 0) throw new Error('missing email')
	}
	registerValidation1(user, email) {
		if(typeof user === 'boolean') throw new Error('username cannot be bool')
		if(typeof user !== 'string') throw new Error('user must be a string')
		if(typeof email === 'boolean') throw new Error('email cannot be bool')
		if(typeof email !== 'string') throw new Error('email must be a string')
	}
	registerValidation2(pass, fullName) {
		if(typeof pass === 'boolean') throw new Error('password cannot be bool')
		if(typeof pass !== 'string') throw new Error('password must be a string')
		if(typeof fullName === 'boolean') throw new Error('name cannot be bool')
		if(typeof fullName !== 'string') throw new Error('name must be a string')
	}
	registerValidation3(user, pass, fullName, email) {
		const numbers = new RegExp(/\d/g); const whitespace = new RegExp(/\s/g)
		if(whitespace.test(user) === true) throw new Error('username cannot contain whitespaces')
		if(whitespace.test(pass) === true) throw new Error('password cannot contain whitespaces')
		if(numbers.test(fullName) === true) throw new Error('name cannot contain numbers')
		if(whitespace.test(email) === true) throw new Error('email cannot contain whitespaces')
	}
	registerValidation4(user, pass) {
		const eight = 8; const three = 3; const ten = 10
		if(user.length > eight) throw new Error('username must be less than 8 characters')
		if(user.length > 0 && user.length < three) throw new Error('username must be more 2 characters')
		if(pass.length > ten) throw new Error('password cannot be more than 10 characters long')
	}
	registerValidation5(pass) {
		const five = 5
		if(pass.length >0&&pass.length<five)throw new Error('password must be longer than 4 characters')
	}
	async register(user, pass, fullName, email) {
		try {
			this.registerValidation1(user, email)
			this.registerValidation2(pass, fullName)
			this.registerValidation3(user, pass, fullName, email)
			this.registerValidation5(pass); this.registerValidation4(user, pass)
			this.registerValidation(user, pass, fullName, email)
			let sql = `SELECT COUNT(ID) as records FROM users WHERE user="${user}";`
			const data = await this.db.get(sql)
			if(data.records !== 0) throw new Error(`username "${user}" already in use`)
			pass = await bcrypt.hash(pass, saltRounds)
			sql = `INSERT INTO users(user,pass,fullName,email) VALUES("${user}","${pass}","${fullName}","${email}")`
			await this.db.run(sql)
			return true
		} catch(err) {
			throw err
		}
	}

	loginValidation(user, pass) {
		if(user.length === 0) throw new Error('missing username')
		if(pass.length === 0) throw new Error('missing password')
	}
	loginValidation1(user, pass) {
		if(typeof user === 'boolean') throw new Error('username cannot be bool')
		if(typeof user !== 'string') throw new Error('user must be a string')
		if(typeof pass === 'boolean') throw new Error('password cannot be bool')
		if(typeof pass !== 'string') throw new Error('password must be a string')
	}
	loginValidation2(user, pass) {
		const whitespace = new RegExp(/\s/g)
		if(whitespace.test(user) === true) throw new Error('username cannot contain whitespaces')
		if(whitespace.test(pass) === true) throw new Error('password cannot contain whitespaces')
	}
	async login(user, pass) {
		try {
			let sql = `SELECT count(ID) AS count FROM users WHERE user="${user}";`
			this.loginValidation(user, pass)
			this.loginValidation1(user, pass)
			this.loginValidation2(user, pass)
			const records = await this.db.get(sql)
			if(!records.count) throw new Error(`username "${user}" not found`)
			sql = `SELECT pass FROM users WHERE user = "${user}";`
			const record = await this.db.get(sql)
			const valid = await bcrypt.compare(pass, record.pass)
			if(valid === false) throw new Error(`invalid password for account "${user}"`)
			return true
		} catch(err) {
			throw err
		}
	}
}
