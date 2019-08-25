Feature: validate api for single user
Scenario: to access reqres.in and perform basic api test to fetch for single user only and then validate the response with json fixture
Given I access api request end point to get single user only
Then Verify the response like id email firstname lastname from fixture