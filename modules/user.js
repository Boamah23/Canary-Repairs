
'use strict'

const bcrypt = require('bcrypt-promise')
const fs = require('fs-extra')
const mime = require('mime-types')
const sqlite = require('sqlite-async')
const saltRounds = 10

module.exports = class User {

	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			// we need this table to store the user accounts
			const sql = 'CREATE TABLE IF NOT EXISTS users (ID INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT NOT NULL, pass TEXT NOT NULL, fullName TEXT NOT NULL, email TEXT NOT NULL);'
			await this.db.run(sql)
			return this
		})()
	}

	async register(user, pass, fullName, email) {
		try {
			if(user.length === 0) throw new Error('missing username')
			if(pass.length === 0) throw new Error('missing password')
			if(fullName.length === 0) throw new Error('missing full name')
			if(email.length === 0) throw new Error('missing email')
			let sql = `SELECT COUNT(ID) as records FROM users WHERE user="${user}";`
			const data = await this.db.get(sql)
			if(data.records !== 0) throw new Error(`username "${user}" already in use`)
			pass = await bcrypt.hash(pass, saltRounds)
			sql = `INSERT INTO users(user, pass, fullName, email) VALUES("${user}", "${pass}", "${fullName}", "${email}")`
			await this.db.run(sql)
			return true
		} catch(err) {
			throw err
		}
	}

	async uploadPicture(path, mimeType) {
		const extension = mime.extension(mimeType)
		console.log(`path: ${path}`)
		console.log(`extension: ${extension}`)
		//await fs.copy(path, `public/avatars/${username}.${fileExtension}`)
	}

	async login(user, pass) {
		try {
			let sql = `SELECT count(ID) AS count FROM users WHERE user="${user}";`
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