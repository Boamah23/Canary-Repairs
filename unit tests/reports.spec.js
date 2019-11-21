'use strict'

const Record = require('../modules/reports.js')

describe('addReport()', () => {

	test('check if appliance type contains number', async done => {
		expect.assertions(1)
		const record = await new Record()
		await expect(record.addReport('was1hing machine', '1 year',
			'BUSH', 'faulty part', 'john doe', '48 Spon end'))
			.rejects.toEqual( Error('appliance type cannot contain numbers') )
		done()
	})


	test('check if manufacturer contains number', async done => {
		expect.assertions(1)
		const record = await new Record()
		await expect(record.addReport('washing machine', '1 year',
			'BUSH1', 'faulty part', 'john doe', '48 Spon end'))
			.rejects.toEqual( Error('manufacturer cannot contain numbers') )
		done()
	})

	test('check if manufacturer contains whitespace', async done => {
		expect.assertions(1)
		const record = await new Record()
		await expect(record.addReport('washing machine', '1 year',
			'BU SH', 'faulty part', 'john doe', '48 Spon end'))
			.rejects.toEqual( Error('manufacturer cannot contain whitespaces') )
		done()
	})

	test('check type has been selected', async done => {
		expect.assertions(1)
		const record = await new Record()
		await expect( record.addReport('', '1 year', 'BUSH',
			'faulty part', 'john doe', '48 Spon end'))
			.rejects.toEqual( Error('no type selected') )
		done()
	})

	test('check age has been selected', async done => {
		expect.assertions(1)
		const record = await new Record()
		await expect( record.addReport('washing machine', '',
			'BUSH', 'faulty part', 'john doe', '48 Spon end'))
			.rejects.toEqual( Error('no age selected') )
		done()
	})

	test('check manufacturer has been selected', async done => {
		expect.assertions(1)
		const record = await new Record()
		await expect( record.addReport('washing machine', '1 year', '',
			'faulty part', 'john doe', '48 Spon end'))
			.rejects.toEqual( Error('no manufacturer selected') )
		done()
	})

	test('check fault description has been selected', async done => {
		expect.assertions(1)
		const record = await new Record()
		await expect( record.addReport('washing machine', '1 year', 'BUSH', '', 'john doe', '48 Spon end'))
			.rejects.toEqual( Error('Please enter description of fault') )
		done()
	})

	test('check name has been inputted', async done => {
		expect.assertions(1)
		const record = await new Record()
		await expect( record.addReport('washing machine', '1 year',
			'BUSH', 'faulty part', '', '48 Spon end'))
			.rejects.toEqual( Error('there is no customer name') )
		done()
	})

	test('check address has been inputted', async done => {
		expect.assertions(1)
		const record = await new Record()
		await expect( record.addReport('washing machine', '1 year',
			'BUSH', 'faulty part', 'john doe', ''))
			.rejects.toEqual( Error('there is no customer address') )
		done()
	})

	test('check appliance type is not a boolean', async done => {
		expect.assertions(1)
		const record = await new Record()
		await expect( record.addReport(true, '1 year', 'BUSH',
			'faulty part', 'john doe', '48 Spon end'))
			.rejects.toEqual( Error('appliance type cannot be a bool') )
		done()
	})


	test('check appliance age must be a string', async done => {
		expect.assertions(1)
		const record = await new Record()
		await expect( record.addReport('washing machine', 123,
			'BUSH', 'faulty part', 'john doe', '48 Spon end'))
			.rejects.toEqual( Error('appliance age must be a string') )
		done()
	})


	test('check manufacturer is a bool', async done => {
		expect.assertions(1)
		const record = await new Record()
		await expect( record.addReport('washing machine', '1 year',
			true, 'faulty part', 'john doe', '48 Spon end'))
			.rejects.toEqual( Error('manufacturer cannot be a bool') )
		done()
	})

	test('check manufacturer is a string', async done => {
		expect.assertions(1)
		const record = await new Record()
		await expect( record.addReport('washing machine', '1 year',
			123, 'faulty part', 'john doe', '48 Spon end'))
			.rejects.toEqual( Error('manufacturer must be a string') )
		done()
	})

	test('check fault description is a bool', async done => {
		expect.assertions(1)
		const record = await new Record()
		await expect( record.addReport('washing machine', '1 year',
			'BUSH', true, 'john doe', '48 Spon end'))
			.rejects.toEqual( Error('fault description cannot be a bool') )
		done()
	})

	test('check fault description is a string', async done => {
		expect.assertions(1)
		const record = await new Record()
		await expect( record.addReport('washing machine', '1 year',
			'BUSH', 123, 'john doe', '48 Spon end'))
			.rejects.toEqual( Error('fault description must be a string') )
		done()
	})

	test('check customer name is a string', async done => {
		expect.assertions(1)
		const record = await new Record()
		await expect( record.addReport('washing machine', '1 year',
			'BUSH', 'faulty part', 123, '48 Spon end'))
			.rejects.toEqual( Error('customer name must be a string') )
		done()
	})


	test('check customer name is a bool', async done => {
		expect.assertions(1)
		const record = await new Record()
		await expect( record.addReport('washing machine', '1 year',
			'BUSH', 'faulty part', true, '48 Spon end'))
			.rejects.toEqual( Error('customer name cannot be a bool') )
		done()
	})

	test('check address name is a bool', async done => {
		expect.assertions(1)
		const record = await new Record()
		await expect( record.addReport('washing machine', '1 year',
			'BUSH', 'faulty part', 'john doe', true))
			.rejects.toEqual( Error('customer address cannot be a bool') )
		done()
	})

	test('check customer address is a string', async done => {
		expect.assertions(1)
		const record = await new Record()
		await expect( record.addReport('washing machine', '1 year',
			'BUSH', 'faulty part', 'john doe', 123))
			.rejects.toEqual( Error('customer address must be a string') )
		done()
	})


	test('submit report', async done => {
		expect.assertions(1)
		const record = await new Record()
		const addReport = await record.addReport('washing machine', '1 year',
			'BUSH', 'faulty part', 'john doe', '48 Spon end')
		expect(addReport).toBe(true)
		done()
	})

	test('getReport()', async done => {
		expect.assertions(2)
		const record = await new Record()
		const report = await record.addReport('washing machine', '1 year',
			'BUSH', 'faulty part', 'john doe', '48 Spon end')
		const get = await record.getReport()
		expect(report).toBe(true)
		expect(get).toEqual([{reportID: 1, applianceType: 'washing machine',
			applianceAge: '1 year', manufacturer: 'BUSH',
			faultDescription: 'faulty part', customerName: 'john doe',
			customerAddress: '48 Spon end', status: 'Incomplete'}])
		done()

	})

	test('getReported()', async done => {
		expect.assertions(2)
		const record = await new Record()
		const report = await record.addReport('washing machine', '1 year',
			'BUSH', 'faulty part', 'john doe', '48 Spon end')
		const get = await record.getReported()
		expect(report).toBe(true)
		expect(get).toEqual([{reportID: 1, applianceType: 'washing machine',
			applianceAge: '1 year', manufacturer: 'BUSH', faultDescription:
        'faulty part', customerName: 'john doe', customerAddress: '48 Spon end', status: 'Incomplete'}])
		done()

	})

	/* test('getJob()', async done => {
        expect.assertions(3)
        const record = await new Record()
        const book = await new Book()
        const report = await record.addReport('washing machine', '1 year',
        'BUSH', 'faulty part', 'john doe', '48 Spon end')
        const booking = await book.submitBooking('stephen', '£30', '2019-11-13T12:00')
        const get = await record.getJob()
        expect(report).toBe(true)
        expect(booking).toBe(true)
        expect(get).toEqual([{reportID: 1, customerName: 'john doe',
        customerAddress: '48 Spon end', applianceType: 'washing machine',
        applianceAge: '1 year', manufacturer: 'BUSH', status: 'Incomplete'}])
        done()
    }) */

	test('getReported()', async done => {
		expect.assertions(2)
		const record = await new Record()
		const report = await record.addReport('washing machine', '1 year',
			'BUSH', 'faulty part', 'john doe', '48 Spon end')
		await record.signOff(1)
		const get = await record.getReported()
		expect(report).toBe(true)
		expect(get).toEqual([{reportID: 1, applianceType: 'washing machine',
			applianceAge: '1 year', manufacturer: 'BUSH', faultDescription:
        'faulty part', customerName: 'john doe', customerAddress: '48 Spon end', status: 'Completed'}])
		done()

	})

	test('book()', async done => {
		expect.assertions(2)
		const record = await new Record()
		const report = await record.addReport('washing machine', '1 year',
			'BUSH', 'faulty part', 'john doe', '48 Spon end')
		const get = await record.book(1)
		expect(report).toBe(true)
		expect(get).toEqual([{reportID: 1, applianceType: 'washing machine',
			applianceAge: '1 year', manufacturer: 'BUSH', faultDescription:
        'faulty part', customerName: 'john doe', customerAddress: '48 Spon end', status: 'Incomplete'}])
		done()

	})

	test('signOff()', async done => {
		expect.assertions(2)
		const record = await new Record()
		const report = await record.addReport('washing machine', '1 year',
			'BUSH', 'faulty part', 'john doe', '48 Spon end')
		await record.signOff(1)
		const get = await record.getReported()
		expect(report).toBe(true)
		expect(get).toEqual([{reportID: 1, applianceType: 'washing machine',
			applianceAge: '1 year', manufacturer: 'BUSH', faultDescription:
        'faulty part', customerName: 'john doe', customerAddress: '48 Spon end', status: 'Completed'}])
		done()

	})

})
