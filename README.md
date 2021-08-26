# Casino Staff Manager
![alt text](https://img.shields.io/github/repo-size/dninov/angular-app?color=red)
![alt text](https://img.shields.io/github/commit-activity/m/dninov/angular-app?color=blueviolet)
[![alt text](https://img.shields.io/badge/website-ang--app--85803.web.app-yellow)](https://ang-app-85803.firebaseapp.com/)

A role based admin/user application with schedule builder and chat functionality.
## Features

- **Employee**
  - Builds up profile details
  - Check active working schedule
  - Send and recieve messages from admin

- **Admin**
  - Filter employee list of profiles
  - Builds up employee details - Work place, Certified Skills, Starting Date
  - Builds up employee working schedules
  - Sends and recieves messages from employees

## Tools
- [Angular Fire](https://www.npmjs.com/package/@angular/fire)
- [Angular Material](https://www.npmjs.com/package/@angular/material)
- [Flex-Layout](https://www.npmjs.com/package/@angular/flex-layout)
- [Angular Full Calendar](https://www.npmjs.com/package/@fullcalendar/angular)
- [ThreeJS](https://threejs.org/docs/#manual/en/buildTools/Testing-with-NPM)

## Project Architecture
- Auth Module
  - Signup Component - Holds the sign up form and validations
  - Login Component - Holds the login form and validations
  - Auth Service TS - Manage Firebase auth and NgRx store user. Login and Setup user data.
  - Store - NgRx actions/effects/reducer. Stores user data from Firestore into the app store. Checks if Login or Logout to clear app store data.
- User Module
  - Dashboard Component - Holds the router-outlet. Taking care of navigation and unread messages notifications.
  - Profile Component - Holds the user details form. Upload and validation of user profile picture.
  - Schedule Component - Loads the user working schedule from Firestore, assigned by the admin-user. Can't be edited.
  - User-chat Compenent  - Loads the user conversation with admin. User can send and recieve messages from admin.
  - User Service TS - Updates user details to Firestore. Loads user Schedule from Firestore.
- Admin Module
  - Admin Dashboard Component - Holds the router-outlet. Taking care of navigation and unread messages notifications.
  - User List Component - Holds all users and filter form.
  - User Details Component - Holds user information and edit form to add additional user information.
  - User Card Component - Card component for User-List.
  - Chat Component - Loads user-admin conversation. Holds Chat Room component
  - Schdule Builder Component - Holds Angular Full Calendar, assign every user working schedule and uploads it to Firestore.
  - Store - NgRx actions/effects/reducer - Loads users from Firestore into app store.
- Shared Module
  - Loader - ThreeJS loader
  - Chat Room / Chat Feed / Chat Input Form / Message Model
  - Chat Service - send and recieve messages form Firestore via Firestore queries.
- Guards 
  - Admin Guard - uses Auth Service to check if admin token exist
  - Guard - uses Auth Service to check if any token exist
  - No-User-Guard - uses Auth Service to check if any token exist
- Utils
  - Animations  - holds all Angular Animation



This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.2.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
