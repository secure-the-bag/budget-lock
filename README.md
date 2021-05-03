[![ci-secure-the-bag-budget-lock](https://github.com/secure-the-bag/budget-lock/actions/workflows/ci.yml/badge.svg)](https://github.com/secure-the-bag/budget-lock/actions/workflows/ci.yml)

# Table of Contents
* [Development History](#development-history)
  * [01/24/2021 - 02/21/2021](#milestone-1)
  * [02/21/2021 - 03/21/2021](#milestone-2)
  * [03/21/2021 - 04/11/2021](#milestone-3)
  * [04/11/2021 - 05/02/2021](#milestone-4)
* [Technical Notes](#technical-notes)
* [Developer Notes](#developer-notes)
* [Important Links](#important-links)

# Development History
## Milestone 1
### 01/24/2021 - 02/21/2021 | Mockup Development
* Created HTML mockups for the following pages: Sign Up and Sign In, Landing, Overview, Monthly Spending, TransactionsList
* Developed a database schema for Transaction collection

### Pending Enhancements
* Implement Two-Factor Authorization onto the sign in page
* Implement pages for the following: User Profile, Upcoming Bills
* Research the following: password encryption, MongoDB user authentication

### Team Contributions
Nadine Alcantara
* Done
  * Implement Landing page and Navigation Bar mockups  
  * Initialize database schema for Transaction collection
* Next
  * Further development on the front-end application
  * Linking database to the mockup pages

Jennifer Hsu
* Done
  * Design mockups for different pages
  * Implement Monthly Spending and Overview page mockups
* Next
  * Research into password encryption
  * Research MongoDB user authentication 
  * Development of profile page for users

Andre Joseph Ruiz
* Done
  * Building the sign up and sign in pages, determining what kind of personal information that would be used in the app model, and researching potential security measure to have on these pages (2FA, Encryption, etc).
* Next
  * Implementing Two-Factor Authorization onto the sign in page and testing out different options. Twilio so far would be the best choice, but Google's Recaptcha is another potential option.

Daphne Marie Tapia
* Done
  * Implement Transaction page mockup
* Next
  * Further development of Transaction page (allow multiple deletions and editing)
  * Match schema used in AddTransactions.jsx with the one in Transaction collection
  * Implement Upcoming Bills page mockup  

***

## Milestone 2
### 02/21/2021 - 03/21/2021 | Database Implementation
* Linked the database to the different pages
* Implemented Trillo API functionality

### Pending Enhancements
* Implement 2FA with Trillo on Sign Up page
* Further enhance the pages and add the Admin page

### Team Contributions
Nadine Alcantara
* Done
  * Created Profiles API
  * Linked Profiles API to Sign Up page to add profiles to the collections 
* Next
  * Further assist in implementing database schemas into pages
  * Implement the Admin page 

Jennifer Hsu
* Done
  * Implemented Profile and connected it to database
  * Implemented Monthly Spending page and connected it to database (allow user to also edit transaction)
  * Updated Overview to connect with Monthly Spending
  * Conducted research on bcrypt; turns out Meteor already implements bcrypt internally.
* Next
  * Implement Cash Flow Over Time page and database
  * Update Overview
  * Implement Budget editor and API

Andre Joseph Ruiz
* Done
  * Finished skeleton mockups for 2FA code and setting up Postman testing database.
* Next
  * Implementation of 2FA into Signin and Profile Pages.

Daphne Marie Tapia
* Done
  * Further development of TransactionsList.jsx (formerly Transactions.jsx, filters 'Sheduled Transactions' and 'Cleared Transactions')
  * Further development of AddTransaction.jsx (user can now add a transaction to collection; matched form schema with collection's schema)
* Next
  * Implement Upcoming Bills page 
  * Further development of TransactionItem.jsx (allow user to edit/delete selected transaction/row from database/collection)

***

## Milestone 3
### 03/21/2021 - 04/11/2021 | Functionality Implementation
* Linked the database to the different pages

### Pending Enhancements
* Further enhance the pages and add the Admin page

### Team Contrubutions
Nadine Alcantara
* Done
  * Fixed broken admin roles to admin accounts
  * Implemented Admin page that lists all registered users in the database
* Next
  * Implement delete function in Admin page to delete users

Jennifer Hsu
* Done
  * Implemented Budget editor and database
  * Updated overview; monthly spending and budget editor now linked to database
* Next
  * Implement Cash Flow Over Time page and database

Andre Joseph Ruiz
* Done
  * Implemented 2FA Page into test page.
* Next
  * Implementing 2FA plugin into Signin and Profile Pages.

Daphne Marie Tapia
* Done
  * Fixed updating balances of transactions after insert/edit
  * Allows users to edit/delete transactions
* Next
  * Implement Upcoming Bills

***

## Milestone 4
### 04/11/2021 - 05/02/2021 | Release
* Further refinement of UI and functionality 

### Team Contrubutions
Nadine Alcantara
* Implemented the Delete Account function for user profiles
* Implemented the Delete Account function for admins to delete other users

Jennifer Hsu
* Implemented Cash Flow Trend Over Time functionality in the Overview page.

Andre Joseph Ruiz
* Cleaned up front end UI

Daphne Marie Tapia
* Updated UI for Transaction and Upcoming Bills pages and finalized functionalities used in these pages.

***

# Technical Notes
## Platform and Browser Requirements
Budget Lock can be run on any device that can run web browsers and has Command Prompt/Terminal. It is highly recommended to use Google Chrome to run the application, however, any web browser other than the Brave browser may be used.

## Running the Application
1. Install [Node.js](https://nodejs.dev/) (LTS) and [Meteor](https://www.meteor.com/developers/install) on your machine. 
2. Go to the [project repository](https://github.com/secure-the-bag/budget-lock) and clone the repository by opening with Github Desktop or downloading as ZIP file. If you did the latter, unzip the file on your machine.
3. Using Command Prompt/Terminal, navigate to the app directory of the cloned repository.
4. Install third party libraries by running ``meteor npm install``
5. Launch the app by running ``meteor npm run start``
6. Using any browser, go to the localhost port specified on the Command Prompt/Terminal (ex: localhost:3000) 

## Uninstalling the Program
1. Deleting the folder will effectively delete the program.
2. If you wish you uninstall Meteor and other dependencies that were used and downloaded globally, you can run npm uninstall meteor.

# Developer Notes
### Challenges
* Working with collections.
### Surprises
* Realizing the difficulty of two factor authorization through a third party server and relaying it back to the application.
### Achievements
* Finding out how to compute 'balances' properly.
### Disappointments
* Not being able to fully implement two factor authorization into the sign in page due to server complications.
* Not adding extra security measures around profile page and sign up page.

# Important Links
* [Project Repository](https://github.com/secure-the-bag/budget-lock)
* [Project Documentation](https://github.com/secure-the-bag/budget-lock#readme)
* [Release Version](https://github.com/secure-the-bag/budget-lock/releases/tag/v1.0)
* [Wiki Page](https://github.com/secure-the-bag/budget-lock/wiki)

***

Template used for application development: [meteor-application-template-react](http://ics-software-engineering.github.io/meteor-application-template-react/)

***

Last updated: 05/01/2021
