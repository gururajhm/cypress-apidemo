/* eslint-disable new-cap */
/// <reference types="cypress" />
import { Given, Then, When} from 'cypress-cucumber-preprocessor/steps';

let sum = { first: 0, second: 0, result: 0 };

when("I enter {int} and {int}", (a, b) => {
  sum = { first: a, second: b, result: a + b };
});

then("I see following result table", dataTable => {
  dataTable.hashes().forEach(row => {
    console.log(row.first)
    expect(sum.first).to.equal(parseInt(row.first, 10));
    expect(sum.second).to.equal(parseInt(row.second, 10));
    expect(sum.result).to.equal(parseInt(row.result, 10));
  });
});