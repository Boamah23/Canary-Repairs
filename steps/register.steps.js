
'use strict'

const { Given, When, Then } = require('cucumber')
const assert = require('assert')

//const user = require('../modules/user')
const Page = require('./Page')

let page // this is the page object we use to reference a web page

Given('The browser is open on the {string} page', async(value) => {
	page = await new Page(800, 600)
	await page.keyboard.type(value)
})

When('I enter {string} in the {string} field', async(value, field) => {
	await page.click(`#${field}`) //field represents the id attribute in html
	await page.keyboard.type(value)
})

When('I click on the submit button', async() => {
	await page.click('#submit')
})

Then('take a screenshot called {string}', async filename => {
	await page.screenshot({ path: `screenshots/${filename}.png` })
})

Then('the heading should be {string}', async heading => {
	const text = await page.evaluate( () => {
		const dom = document.querySelector('h1')
		return dom.innerText
	})
	assert.equal(heading, text)
})
