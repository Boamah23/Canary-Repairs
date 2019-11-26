'use strict'

const Record = require('../modules/reports.js')

describe('addReport()', () => {

	test('check if appliance type contains number', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: 'was1hing machine',
			applianceAge: '1 year',
			manufacturer: 'BUSH',
			faultDescription: 'faulty part',
			customerName: 'john doe',
			customerAddress: '48 Spon end'
		}
		await expect(record.addReport(rep))
			.rejects.toEqual( Error('appliance type cannot contain numbers') )
		done()
	})


	test('check if manufacturer contains number', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: 'washing machine',
			applianceAge: '1 year',
			manufacturer: 'BUSH1',
			faultDescription: 'faulty part',
			customerName: 'john doe',
			customerAddress: '48 Spon end'
		}
		await expect(record.addReport(rep))
			.rejects.toEqual( Error('manufacturer cannot contain numbers') )
		done()
	})

	test('check if customer name contains number', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: 'washing machine',
			applianceAge: '1 year',
			manufacturer: 'BUSH1',
			faultDescription: 'faulty part',
			customerName: 'john d0e',
			customerAddress: '48 Spon end'
		}
		await expect(record.addReport(rep))
			.rejects.toEqual( Error('customer name cannot contain numbers') )
		done()
	})

	test('check if manufacturer contains whitespace', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: 'washing machine',
			applianceAge: '1 year',
			manufacturer: 'BU SH',
			faultDescription: 'faulty part',
			customerName: 'john doe',
			customerAddress: '48 Spon end'
		}
		await expect(record.addReport(rep))
			.rejects.toEqual( Error('manufacturer cannot contain whitespaces') )
		done()
	})

	test('check type has been selected', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: '',
			applianceAge: '1 year',
			manufacturer: 'BUSH',
			faultDescription: 'faulty part',
			customerName: 'john doe',
			customerAddress: '48 Spon end'
		}
		await expect( record.addReport(rep))
			.rejects.toEqual( Error('no type selected') )
		done()
	})

	test('check age has been selected', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: 'washing machine',
			applianceAge: '',
			manufacturer: 'BUSH',
			faultDescription: 'faulty part',
			customerName: 'john doe',
			customerAddress: '48 Spon end'
		}
		await expect( record.addReport(rep))
			.rejects.toEqual( Error('no age selected') )
		done()
	})

	test('check manufacturer has been selected', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: 'was1hing machine',
			applianceAge: '1 year',
			manufacturer: '',
			faultDescription: 'faulty part',
			customerName: 'john doe',
			customerAddress: '48 Spon end'
		}
		await expect( record.addReport(rep))
			.rejects.toEqual( Error('no manufacturer selected') )
		done()
	})

	test('check fault description has been selected', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: 'washing machine',
			applianceAge: '1 year',
			manufacturer: 'BUSH',
			faultDescription: '',
			customerName: 'john doe',
			customerAddress: '48 Spon end'
		}
		await expect( record.addReport(rep))
			.rejects.toEqual( Error('Please enter description of fault') )
		done()
	})

	test('check name has been inputted', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: 'washing machine',
			applianceAge: '1 year',
			manufacturer: 'BUSH',
			faultDescription: 'faulty part',
			customerName: '',
			customerAddress: '48 Spon end'
		}
		await expect( record.addReport(rep))
			.rejects.toEqual( Error('there is no customer name') )
		done()
	})

	test('check address has been inputted', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: 'washing machine',
			applianceAge: '1 year',
			manufacturer: 'BUSH',
			faultDescription: 'faulty part',
			customerName: 'john doe',
			customerAddress: ''
		}
		await expect( record.addReport(rep))
			.rejects.toEqual( Error('there is no customer address') )
		done()
	})

	test('check appliance type is not a boolean', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: true,
			applianceAge: '1 year',
			manufacturer: 'BUSH',
			faultDescription: 'faulty part',
			customerName: 'john doe',
			customerAddress: '48 Spon end'
		}
		await expect( record.addReport(rep))
			.rejects.toEqual( Error('appliance type cannot be a bool') )
		done()
	})


	test('check appliance age must be a string', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: 'washing machine',
			applianceAge: 123,
			manufacturer: 'BUSH',
			faultDescription: 'faulty part',
			customerName: 'john doe',
			customerAddress: '48 Spon end'
		}
		await expect( record.addReport(rep))
			.rejects.toEqual( Error('appliance age must be a string') )
		done()
	})


	test('check manufacturer is a bool', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: 'washing machine',
			applianceAge: '1 year',
			manufacturer: true,
			faultDescription: 'faulty part',
			customerName: 'john doe',
			customerAddress: '48 Spon end'
		}
		await expect( record.addReport(rep))
			.rejects.toEqual( Error('manufacturer cannot be a bool') )
		done()
	})

	test('check manufacturer is a string', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: 'washing machine',
			applianceAge: '1 year',
			manufacturer: 123,
			faultDescription: 'faulty part',
			customerName: 'john doe',
			customerAddress: '48 Spon end'
		}
		await expect( record.addReport(rep))
			.rejects.toEqual( Error('manufacturer must be a string') )
		done()
	})

	test('check fault description is a bool', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: 'washing machine',
			applianceAge: '1 year',
			manufacturer: 'BUSH',
			faultDescription: true,
			customerName: 'john doe',
			customerAddress: '48 Spon end'
		}
		await expect( record.addReport(rep))
			.rejects.toEqual( Error('fault description cannot be a bool') )
		done()
	})

	test('check fault description is a string', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: 'washing machine',
			applianceAge: '1 year',
			manufacturer: 'BUSH',
			faultDescription: 123,
			customerName: 'john doe',
			customerAddress: '48 Spon end'
		}
		await expect( record.addReport(rep))
			.rejects.toEqual( Error('fault description must be a string') )
		done()
	})

	test('check customer name is a string', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: 'washing machine',
			applianceAge: '1 year',
			manufacturer: 'BUSH',
			faultDescription: 'faulty part',
			customerName: 123,
			customerAddress: '48 Spon end'
		}
		await expect( record.addReport(rep))
			.rejects.toEqual( Error('customer name must be a string') )
		done()
	})


	test('check customer name is a bool', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: 'washing machine',
			applianceAge: '1 year',
			manufacturer: 'BUSH',
			faultDescription: 'faulty part',
			customerName: true,
			customerAddress: '48 Spon end'
		}
		await expect( record.addReport(rep))
			.rejects.toEqual( Error('customer name cannot be a bool') )
		done()
	})

	test('check address name is a bool', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: 'washing machine',
			applianceAge: '1 year',
			manufacturer: 'BUSH',
			faultDescription: 'faulty part',
			customerName: 'john doe',
			customerAddress: true
		}
		await expect( record.addReport(rep))
			.rejects.toEqual( Error('customer address cannot be a bool') )
		done()
	})

	test('check customer address is a string', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: 'was1hing machine',
			applianceAge: '1 year',
			manufacturer: 'BUSH',
			faultDescription: 'faulty part',
			customerName: 'john doe',
			customerAddress: 123
		}
		await expect( record.addReport(rep))
			.rejects.toEqual( Error('customer address must be a string') )
		done()
	})


	test('submit report', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: 'washing machine',
			applianceAge: '1 year',
			manufacturer: 'BUSH',
			faultDescription: 'faulty part',
			customerName: 'john doe',
			customerAddress: '48 Spon end'
		}
		const addReport = await record.addReport(rep)
		expect(addReport).toBe(true)
		done()
	})

	test('getReport()', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: 'washing machine',
			applianceAge: '1 year',
			manufacturer: 'BUSH',
			faultDescription: 'faulty part',
			customerName: 'john doe',
			customerAddress: '48 Spon end'
		}
		await record.addReport(rep)
		await record.popDb(1, 'tim', '£30', '2019-10-12T10:00', 'denied')
		const bookings = await record.getReport()
		console.log(bookings)
		expect(bookings[0].reportID).toBe(1)
		done()

		done()


	})

	test('getReported()', async done => {
		expect.assertions(2)
		const record = await new Record()
		const rep = {
			applianceType: 'washing machine',
			applianceAge: '1 year',
			manufacturer: 'BUSH',
			faultDescription: 'faulty part',
			customerName: 'john doe',
			customerAddress: '48 Spon end'
		}
		const report = await record.addReport(rep)
		const get = await record.getReported()
		expect(report).toBe(true)
		expect(get).toEqual([{reportID: 1, applianceType: 'washing machine',
			applianceAge: '1 year', manufacturer: 'BUSH', faultDescription:
        'faulty part', customerName: 'john doe', customerAddress: '48 Spon end', status: 'Incomplete'}])
		done()

	})

	test('getJob()', async done => {
		expect.assertions(1)
		const record = await new Record()
		const rep = {
			applianceType: 'washing machine',
			applianceAge: '1 year',
			manufacturer: 'BUSH',
			faultDescription: 'faulty part',
			customerName: 'john doe',
			customerAddress: '48 Spon end'
		}
		await record.addReport(rep)
		await record.popDb(1, 'tim', '£30', '2019-10-12T10:00', 'accepted')
		const bookings = await record.getJob()
		console.log(bookings)
		expect(bookings[0].reportID).toBe(1)
		done()
	})

	test('getReported()', async done => {
		expect.assertions(2)
		const record = await new Record()
		const rep = {
			applianceType: 'washing machine',
			applianceAge: '1 year',
			manufacturer: 'BUSH',
			faultDescription: 'faulty part',
			customerName: 'john doe',
			customerAddress: '48 Spon end'
		}
		const report = await record.addReport(rep)
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
		const rep = {
			applianceType: 'washing machine',
			applianceAge: '1 year',
			manufacturer: 'BUSH',
			faultDescription: 'faulty part',
			customerName: 'john doe',
			customerAddress: '48 Spon end'
		}
		const report = await record.addReport(rep)
		const get = await record.book(1)
		expect(report).toBe(true)
		expect(get).toEqual([{reportID: 1, applianceType: 'washing machine',
			applianceAge: '1 year', manufacturer: 'BUSH', faultDescription:
        'faulty part', customerName: 'john doe', customerAddress: '48 Spon end', status: 'Incomplete'}])
		done()

	})

	test('popDb()', async done => {
		const record = await new Record()
		await expect( record.popDb(1, '', '£30', '2019-10-12T10:00', 'accepted'))
			.rejects.toEqual( Error('no name entered') )
		done()
	})

	test('signOff()', async done => {
		expect.assertions(2)
		const record = await new Record()
		const rep = {
			applianceType: 'washing machine',
			applianceAge: '1 year',
			manufacturer: 'BUSH',
			faultDescription: 'faulty part',
			customerName: 'john doe',
			customerAddress: '48 Spon end'
		}
		const report = await record.addReport(rep)
		await record.signOff(1)
		const get = await record.getReported()
		expect(report).toBe(true)
		expect(get).toEqual([{reportID: 1, applianceType: 'washing machine',
			applianceAge: '1 year', manufacturer: 'BUSH', faultDescription:
        'faulty part', customerName: 'john doe', customerAddress: '48 Spon end', status: 'Completed'}])
		done()
	})

})
