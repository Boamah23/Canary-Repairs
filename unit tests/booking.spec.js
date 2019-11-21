'use strict'


const Book = require('../modules/booking.js')

describe('getQuote()', () => {

	test('get all quotes', async done => {
		try{
			expect.assertions(2)
			const book = await new Book()
			const submit = await book.submitBooking('stephen', '£30', '2019-11-13T12:00')
			const get = await book.getQuote()
			expect(submit).toBe(true)
			expect(get).toEqual([{reportID: 1, status: 'pending',
				technicianName: 'stephen', quote: '£30', datetime: '2019-11-13T12:00'}])
		}catch(err) {
			done.fail(err)
		}finally {
			done()
		}

	})

	test('get all quotes', async done => {
		expect.assertions(2)
		const book = await new Book()
		const submit = await book.submitBooking('stephen', '£30', '2019-11-13T12:00')
		await book.acceptQuote(1)
		const get = await book.getQuote()
		expect(submit).toBe(true)
		expect(get).toEqual([{reportID: 1, status: 'accepted',
			technicianName: 'stephen', quote: '£30', datetime: '2019-11-13T12:00'}])
		done()
	})

	test('get all quotes', async done => {
		expect.assertions(2)
		const book = await new Book()
		const submit = await book.submitBooking('stephen', '£30', '2019-11-13T12:00')
		await book.denyQuote(1)
		const get = await book.getQuote()
		expect(submit).toBe(true)
		expect(get).toEqual([{reportID: 1,
			status: 'denied', technicianName: 'stephen', quote: '£30', datetime: '2019-11-13T12:00'}])
		done()
	})


	test('check technician name is inputted', async done => {
		expect.assertions(1)
		const book = await new Book()
		await expect( book.submitBooking('', '£30', '2019-11-13T12:00'))
			.rejects.toEqual( Error('no technician name inputted') )
		done()
	})

	test('check if name contains number', async done => {
		expect.assertions(1)
		const book = await new Book()
		await expect(book.submitBooking('steph1en', '£30', '2019-11-13T12:00'))
			.rejects.toEqual( Error('name cannot contain numbers') )
		done()
	})


	test('check if name is a boolean', async done => {
		expect.assertions(1)
		const book = await new Book()
		await expect(book.submitBooking(true, '£30', '2019-11-13T12:00'))
			.rejects.toEqual( Error('technician name cannot be a bool') )
		done()
	})


	test('check if name is a string', async done => {
		expect.assertions(1)
		const book = await new Book()
		await expect(book.submitBooking(123, '£30', '2019-11-13T12:00'))
			.rejects.toEqual( Error('name must be a string') )
		done()
	})

	test('check if currency', async done => {
		expect.assertions(1)
		const book = await new Book()
		await expect(book.submitBooking('stephen', '30', '2019-11-13T12:00'))
			.rejects.toEqual( Error('quote must have £ currency') )
		done()
	})

	test('check if quote is a boolean', async done => {
		expect.assertions(1)
		const book = await new Book()
		await expect(book.submitBooking('stephen', true, '2019-11-13T12:00'))
			.rejects.toEqual( Error('quote cannot be boolean') )
		done()
	})

	test('check if quote is a string', async done => {
		expect.assertions(1)
		const book = await new Book()
		await expect(book.submitBooking('stephen', 123, '2019-11-13T12:00'))
			.rejects.toEqual( Error('quote must be string') )
		done()
	})


	test('check if quote contains whitespaces', async done => {
		expect.assertions(1)
		const book = await new Book()
		await expect(book.submitBooking('stephen', '£30 ', '2019-11-13T12:00'))
			.rejects.toEqual( Error('quote cannot contain whitespaces') )
		done()
	})

	test('check if datetime is a boolean', async done => {
		expect.assertions(1)
		const book = await new Book()
		await expect(book.submitBooking('stephen', '£30', true))
			.rejects.toEqual( Error('datetime cannot be a boolean') )
		done()
	})

	test('check if datetime is a string', async done => {
		expect.assertions(1)
		const book = await new Book()
		await expect(book.submitBooking('stephen', '£30', 123))
			.rejects.toEqual( Error('datetime must be string') )
		done()
	})

	test('check quote is inputted', async done => {
		expect.assertions(1)
		const book = await new Book()
		await expect( book.submitBooking('stephen', '', '2019-11-13T12:00'))
			.rejects.toEqual( Error('no quote inputted') )
		done()
	})

	test('check datetime inputted', async done => {
		expect.assertions(1)
		const book = await new Book()
		await expect( book.submitBooking('stephen', '£30', ''))
			.rejects.toEqual( Error('no datetime assigned inputted'))
		done()
	})

	test('check datetime has whitespaces', async done => {
		expect.assertions(1)
		const book = await new Book()
		await expect( book.submitBooking('stephen', '£30', '2019-11-13T 12:00'))
			.rejects.toEqual( Error('datetime cannot contain whitespaces'))
		done()
	})


})
