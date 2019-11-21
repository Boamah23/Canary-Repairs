'use strict'

const Accounts = require('../modules/user.js')

describe('register()', () => {

	test('register a valid account', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		const register = await account.register('doej', 'password', 'john doe', 'test@test.com')
		expect(register).toBe(true)
		done()
	})

	test('register a duplicate username', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password', 'john doe', 'test@test.com')
		await expect( account.register('doej', 'password', 'john doe', 'test@test.com') )
			.rejects.toEqual( Error('username "doej" already in use') )
		done()
	})

	test('error if blank username', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('', 'password', 'john doe', 'test@test.com') )
			.rejects.toEqual( Error('missing username') )
		done()
	})

	test('error if blank password', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('doej', '', 'john doe', 'test@test.com') )
			.rejects.toEqual( Error('missing password') )
		done()
	})


	test('error if blank full name', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('doej', 'password', '', 'test@test.com') )
			.rejects.toEqual( Error('missing full name'))
		done()
	})

	test('error if blank email', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('doej', 'password', 'john doe', '') )
			.rejects.toEqual( Error('missing email'))
		done()
	})

	test('check if username contains whitespaces', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register('do ej', 'password', 'john doe', 'test@test.com'))
			.rejects.toEqual( Error('username cannot contain whitespaces') )
		done()
	})

	test('check if password contains whitespaces', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register('doej', 'pass word', 'john doe', 'test@test.com'))
			.rejects.toEqual( Error('password cannot contain whitespaces') )
		done()
	})

	test('check if name contains numbers', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register('doej', 'password', 'jo1hn doe', 'test@test.com'))
			.rejects.toEqual( Error('name cannot contain numbers') )
		done()
	})

	test('check if email is string', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register('doej', 'password', 'john doe', 123))
			.rejects.toEqual( Error('email must be a string') )
		done()
	})

	test('check if email is bool', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register('doej', 'password', 'john doe', true))
			.rejects.toEqual( Error('email cannot be bool') )
		done()
	})

	test('check if email contains whitespaces', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register('doej', 'password', 'john doe', 'test@tes t.com'))
			.rejects.toEqual( Error('email cannot contain whitespaces') )
		done()
	})

	test('check if user is a boolean', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register(true, 'password', 'john doe', 'test@test.com'))
			.rejects.toEqual( Error('username cannot be bool') )
		done()
	})

	test('check if user is a string', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register(123, 'password', 'john doe', 'test@test.com'))
			.rejects.toEqual( Error('user must be a string') )
		done()
	})

	test('check if password is a boolean', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register('doej', true, 'john doe', 'test@test.com'))
			.rejects.toEqual( Error('password cannot be bool') )
		done()
	})

	test('check if password is a string', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register('doej', 123, 'john doe', 'test@test.com'))
			.rejects.toEqual( Error('password must be a string') )
		done()
	})

	test('check if name is a boolean', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register('doej', 'password', true, 'test@test.com'))
			.rejects.toEqual( Error('name cannot be bool') )
		done()
	})

	test('check if name is a string', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register('doej', 'password', 123, 'test@test.com'))
			.rejects.toEqual( Error('name must be a string') )
		done()
	})

	test('check if username is more than 8 characters', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register('dovjvhvhvhhvhej', 'password', 'john doe', 'test@test.com'))
			.rejects.toEqual(Error('username must be less than 8 characters'))
		done()
	})

	test('check if username is more than 2 characters', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register('do', 'password', 'john doe', 'test@test.com'))
			.rejects.toEqual(Error('username must be more 2 characters'))
		done()
	})


	test('check if password is more than 10 characters', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register('dovk', 'passwordpassword', 'john doe', 'test@test.com'))
			.rejects.toEqual(Error('password cannot be more than 10 characters long'))
		done()
	})

	test('check if password is more than 4 characters', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register('doks', 'pass', 'john doe', 'test@test.com'))
			.rejects.toEqual(Error('password must be longer than 4 characters'))
		done()
	})
})

describe('login()', () => {
	test('log in with valid credentials', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password', 'john doe', 'test@test.com')
		const valid = await account.login('doej', 'password')
		expect(valid).toBe(true)
		done()
	})

	test('invalid username', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password', 'john doe', 'test@test.com')
		await expect( account.login('roej', 'password') )
			.rejects.toEqual( Error('username "roej" not found') )
		done()
	})

	test('invalid password', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password', 'john doe', 'test@test.com')
		await expect( account.login('doej', 'badman') )
			.rejects.toEqual( Error('invalid password for account "doej"'))
		done()
	})

	test('blank username', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password', 'john doe', 'test@test.com')
		await expect( account.login('', 'password') )
			.rejects.toEqual( Error('missing username') )
		done()
	})


	test('error if blank password', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('doej', 'password', 'john doe', 'test@test.com') )
		await expect( account.login('doej', '') )
			.rejects.toEqual( Error('missing password') )
		done()
	})

	test('check if password contains whitespaces', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register('doej', 'password', 'john doe', 'test@test.com'))
		await expect( account.login('doej', 'pass word'))
        	.rejects.toEqual( Error('password cannot contain whitespaces') )
		done()
	})

	test('check if username contains whitespaces', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register('doej', 'password', 'john doe', 'test@test.com'))
		await expect( account.login('d oej', 'password') )
			.rejects.toEqual( Error('username cannot contain whitespaces') )
		done()
	})

	test('check username is a string', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register('doej', 'password', 'john doe', 'test@test.com'))
		await expect( account.login(123 , 'password') )
			.rejects.toEqual( Error('user must be a string') )
		done()
	})

	test('check username is a bool', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register('doej', 'password', 'john doe', 'test@test.com'))
		await expect( account.login(true , 'password') )
			.rejects.toEqual( Error('username cannot be bool') )
		done()
	})

	test('check password is a bool', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register('doej', 'password', 'john doe', 'test@test.com'))
		await expect( account.login('doej' , true) )
			.rejects.toEqual( Error('password cannot be bool') )
		done()
	})

	test('check password is a string', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect(account.register('doej', 'password', 'john doe', 'test@test.com'))
		await expect( account.login('doej' , 123) )
			.rejects.toEqual( Error('password must be a string') )
		done()
	})

})
