Feature: Ecommerce validations

@Validation
  Scenario Outline: Placing the order
   Given a login to Ecommerce2 application with "<username>" and "<password>"
   Then Verify error message is displayed


Examples:

| username         | password   |
|anshika@gmail.com |Iamking@000 |
|hello@123.com     |Iamhello@12 |