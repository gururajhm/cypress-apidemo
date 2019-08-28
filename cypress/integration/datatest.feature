Feature: data driven test 
Scenario Outline: A calculation
When I enter <first> and <second>
Then I see following result table
| first   | second   | result   |
| <first> | <second> | <result> |

Examples:
| first | second | result |
| 1     | 2      | 3     |
| 3     | 4      | 7      |
| 5     | 6      | 11     |
