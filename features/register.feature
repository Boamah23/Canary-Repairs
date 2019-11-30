Feature: Register user
	A user should be a able to register an account

	Scenario: add a single user
		Given The browser is open on the register page
		When I enter "John Doe" in the "fullName" field
		When I enter "johndoe@gmail.com" in the "email" field
		When I enter "johnd" in the "user" field
		When I enter "password" in the "pass" field
		When I click on the submit button
		Then the heading should be "CANARY REPAIRS"