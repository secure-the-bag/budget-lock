[![ci-secure-the-bag-budget-lock](https://github.com/secure-the-bag/budget-lock/actions/workflows/ci.yml/badge.svg)](https://github.com/secure-the-bag/budget-lock/actions/workflows/ci.yml)

# Table of Contents
* [01/24/2021 - 02/21/2021](#milestone-1)
* [02/21/2021 - 03/21/2021](#milestone-2)
* [03/21/2021 - 04/11/2021](#milestone-3)

# Development History
## Milestone 1
## 01/24/2021 - 02/21/2021 | Mockup Development
* Created HTML mockups for the following pages: Sign Up and Sign In, Landing, Overview, Monthly Spending, TransactionsList
* Developed a database schema for Transaction collection

# Pending Enhancements
* Implement Two-Factor Authorization onto the sign in page
* Implement pages for the following: User Profile, Upcoming Bills
* Research the following: password encryption, MongoDB user authentication

# The Team
### Nadine Alcantara
* Done
  * Implement Landing page and Navigation Bar mockups  
  * Initialize database schema for Transaction collection
* Next
  * Further development on the front-end application
  * Linking database to the mockup pages

### Jennifer Hsu
* Done
  * Design mockups for different pages
  * Implement Monthly Spending and Overview page mockups
* Next
  * Research into password encryption
  * Research MongoDB user authentication 
  * Development of profile page for users

### Andre Joseph Ruiz
* Done
  * Building the sign up and sign in pages, determining what kind of personal information that would be used in the app model, and researching potential security measure to have on these pages (2FA, Encryption, etc).
* Next
  * Implementing Two-Factor Authorization onto the sign in page and testing out different options. Twilio so far would be the best choice, but Google's Recaptcha is another potential option.

### Daphne Marie Tapia
* Done
  * Implement Transaction page mockup
* Next
  * Further development of Transaction page (allow multiple deletions and editing)
  * Match schema used in AddTransactions.jsx with the one in Transaction collection
  * Implement Upcoming Bills page mockup  

***

## Milestone 2
## 02/21/2021 - 03/21/2021 | Database Implementation
* Linked the database to the different pages
* Implemented Trillo API functionality

# Pending Enhancements
* Implement 2FA with Trillo on Sign Up page
* Further enhance the pages and add the Admin page

# The Team
### Nadine Alcantara
* Done
  * Created Profiles API
  * Linked Profiles API to Sign Up page to add profiles to the collections 
* Next
  * Further assist in implementing database schemas into pages
  * Implement the Admin page 

### Jennifer Hsu
* Done
  * Implemented Profile and connected it to database
  * Implemented Monthly Spending page and connected it to database (allow user to also edit transaction)
  * Updated Overview to connect with Monthly Spending
  * Conducted research on bcrypt; turns out Meteor already implements bcrypt internally.
* Next
  * Implement Cash Flow Over Time page and database
  * Update Overview
  * Implement Budget editor and API

### Andre Joseph Ruiz
* Done
  * Finished skeleton mockups for 2FA code and setting up Postman testing database.
* Next
  * Implementation of 2FA into Signin and Profile Pages.

### Daphne Marie Tapia
* Done
  * Further development of TransactionsList.jsx (formerly Transactions.jsx, filters 'Sheduled Transactions' and 'Cleared Transactions')
  * Further development of AddTransaction.jsx (user can now add a transaction to collection; matched form schema with collection's schema)
* Next
  * Implement Upcoming Bills page 
  * Further development of TransactionItem.jsx (allow user to edit/delete selected transaction/row from database/collection)

***

## Milestone 3
## 03/21/2021 - 04/11/2021 | Functionality Implementation
* Linked the database to the different pages

# Pending Enhancements
* Further enhance the pages and add the Admin page

# The Team
### Nadine Alcantara
* Done
  * TBA
* Next
  * TBA

### Jennifer Hsu
* Done
  * Implemented Budget editor and database
  * Updated overview; monthly spending and budget editor now linked to database
* Next
  * Implement Cash Flow Over Time page and database

### Andre Joseph Ruiz
* Done
  * Implemented 2FA Page into test page.
* Next
  * Implementing 2FA plugin into Signin and Profile Pages.

### Daphne Marie Tapia
* Done
  * Fixed updating balances of transactions after insert/edit
  * Allows users to edit/delete transactions
* Next
  * Implement Upcoming Bills


Template used for application development: [meteor-application-template-react](http://ics-software-engineering.github.io/meteor-application-template-react/)

***

Last updated: 04/11/2021
