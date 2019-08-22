Feature: validate api for single user
Scenario: to access reqres.in and perform basic api test to fetch for single user only
Given I access api request end point to get single user only
Then Verify the response like id email firstname lastname