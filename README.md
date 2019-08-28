
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
    visualize your test suites. For installation refer this link https://www.npmjs.com/package/mochawesome-report-generator
    
    Output files are generated output.html file under mochawesome-report folder, 
    and sample reports looks like this
    
![Mocha Report](/images/mochareport.png)
 
 
# How to run scripts

	in pagkage.json configured runtime scripts like
    "e2e": "cypress run",
    "cy:run": "cypress run",
    "e2eheadless": "cypress run",
    "e2e:chrome": "cypress run --browser chrome",
    "e2e:record": "cypress run --record",
    "e2e:record:parallel": "cypress run --record --parallel",
    "merge_reports": "mochawesome-merge --reportDir mochawesome-report > mochawesome-report/output.json",
    "generate_mochawesome_report": "marge mochawesome-report/output.json",
    "e2e_mochawesome": "cypress run; npm run merge_reports; npm run generate_mochawesome_report",
    
    From command prompt run for headless as -> npm run e2eheadless
    

 # How to run scripts in Circle CI
 
 
 Read more about circle ci here - https://circleci.com/docs/2.0/about-circleci/
 
 ### What is Continuous Integration?

Continuous integration is a practice that encourages developers to integrate their 	code into a master branch of a shared repository early and often. Instead of building out features in isolation and integrating them at the end of a development cycle, code is integrated with the shared repository by each developer multiple times throughout the day.

Continuous Integration is a key step to digital transformation.

	What? 
	Every developer commits daily to a shared mainline.
	Every commit triggers an automated build and test.
	If build and test fails, it’s repaired quickly - within minutes.

	Why? 
	Improve team productivity, efficiency, happiness.
    Find problems and solve them, quickly. 
    Release higher quality, more stable products.



### Configure job in Circle CI

	version: 2

	jobs:
 	 build:
  	  docker:

      - image: cypress/base:8
        environment:
          ## this enables colors in the output
          TERM: xterm
    working_directory: ~/app
    parallelism: 1
    steps:
      - checkout
      - restore_cache:
          keys:
            - v2-deps-{{ .Branch }}-{{ checksum "package-lock.json" }}
            - v2-deps-{{ .Branch }}-
            - v2-deps-
      - run: npm ci
      - save_cache:
          key: v2-deps-{{ .Branch }}-{{ checksum "package-lock.json" }}
          paths:
            - ~/.npm
            - ~/.cache
      - run:
          name: Running E2E tests with JUnit reporter
          command: npm run e2eheadless
      - store_test_results:
          path: junit-results
      #- run:
      #     name: Running E2E tests with multiple reporters
      #    command: npm run e2eheadless
      - store_test_results:
          path: multiple-results
      - store_artifacts:
          path: cypress/videos
      - store_artifacts:
          path: cypress/screenshots
   
  
  From command run as -> npm run test:ci
  
  ### Sample output of Circle CI

![Circle Ci Report](/images/CircleCI.png)


