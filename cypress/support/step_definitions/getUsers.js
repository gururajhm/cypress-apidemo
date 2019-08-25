/* eslint-disable new-cap */
/// <reference types="cypress" />
import { Given, Then, When} from 'cypress-cucumber-preprocessor/steps';
//import * as fs from 'fs'
const fs = require('fs')
var request = require('request')
let suser =''

var page;
var singleuser;


Given(/^I access api request end point to get users$/, () => {
 const url=`${Cypress.env('URL')}api/users?page=1)`
 cy.request(url).as('page')
	
});


Given(/^Verify below response for the user$/, (table) => {

	cy.get('@page').should((response) => {
		expect(response.status).to.eq(200);
		assert.equal(response.body.page,'1')
		assert.equal(response.body.per_page,'6')
		assert.equal(response.body.total,'12')
		assert.equal(response.body.total_pages,'2')
		for (const id in table.rows) {
			if (id < 1) {
			  continue; // skip a header of a table
			}
		const cells = table.rows[id].cells;
		assert.equal(response.body.data[0].email,cells[1].value)
		assert.equal(response.body.data[0].first_name,cells[1].value)
		assert.equal(response.body.data[0].last_name, cells[1].value)
		assert.equal(response.body.data[0].avatar, cells[1].value)
		}
		})
});
// for single user only 

Given(/^I access api request end point to get single user only$/, () => {

	cy.request(`${Cypress.env('URL')}api/users/2`).as('singleuser')	
 
});


Given(/^Verify the response like id email firstname lastname from fixture$/, () => {
	// read data fromjson and then validate the response data	 
		cy
			.fixture('/users/userdata')
			.then((userdata) => {
				cy.get('@singleuser').should((response) => {
 				expect(response.status).to.eq(200)	
   				assert.equal(response.body.data.first_name,userdata.first_name)
				assert.equal(response.body.data.last_name,userdata.last_name)
				assert.equal(response.body.data.email,userdata.email)

		});
 
	})
});
