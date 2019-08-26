
### Base framework with cypress - testing with api demo for https://reqres.in

This is an example app used to showcase [Cypress.io](https://www.cypress.io/) testing. The application uses every API command in Cypress for demonstration purposes. Additionally this example will run on Circle CI.

## https://reqres.in
https://reqres.in is a demo website where people can try out the API test. In this project, I have created test cases on the that would get the user list, post the users, delete the users and validate all response via Cypress tool, and used to test e2e use cases for the same. This will run test in CircleCI and also creates simple mochawesome report. 

## Use Cases
Fetch Users
Add New Users
Edit Users    
Delete Users

## Folder Structure 
### Integartion 
    this contains all the feature file like getUsers and getSingle users 

Ex.

	Feature: validate for all user
	
    Scenario: to access reqres.in and perform basic api test to fetch users
	
    Given I access api request end point to get users 
	Then Verify below response for the user
    | email                  | firstname | lastname | avatar |
    | george.bluth@reqres.in | George    | Bluth    | 	https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg |

### Fixtures
	This folder contains all the test data for our test like user_data.json that looks something like this 
    
    {

       "email": "janet.weaver@reqres.in",
        "first_name": "Janet",
        "last_name": "Weaver"
     }
     
 
 ### Plugin's
 
 	This contains index.js file that has initial hook for our test 
    const cucumber = require('cypress-cucumber-preprocessor').default;

	module.exports = (on, config) => {
	// `on` is used to hook into various events Cypress emits
	// `config` is the resolved Cypress config
	on('file:preprocessor', cucumber());
 
	return Object.assign({}, config, {
		fixturesFolder: 'cypress/fixtures',
		integrationFolder: 'cypress/integration',
		screenshotsFolder: 'cypress/screenshots',
		videosFolder: 'cypress/videos',
		supportFile: 'cypress/support/index.js'
	});
	};


### Support

	This folder contains all the step definition for out test for ex. getUser.js with BDD step definitions that read the data from BDD or from Json fixture files
    
# Mochawesome Report

	marge (mochawesome-report-generator) is the counterpart to mochawesome, a custom 		
    reporter for use with the Javascript testing framework, mocha. Marge takes the JSON 	
    output from mochawesome and generates a full fledged HTML/CSS report that helps 		
    visualize your test suites.
  For installation refer this link https://www.npmjs.com/package/mochawesome-report-generator
  
  
  