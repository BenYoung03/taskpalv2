# TaskPal

TaskPal is a cloud-based, to-do list web application. It is Built with Firebase for real-time updates and data storage, it allows users to create an account, log in, and view and manage their tasks.

This application was developed for COMP-4312 - Cloud Computing at Lakehead University and was used as my final term project.

## Features
- **User Authentication**: Secure user account creation and login functionality with Firebase Authentication. It allows users to see only their tasks so no one can see them.
- **Task Management**: Add, update, and delete tasks. 
- **Real-time Updates**: Firebase integration allows users to view and update their tasks across devices.

## Using the application
TaskPal can be visited by clicking [here](https://taskpal-75c5d.web.app). Feel free to create an account and add some tasks! 

## Installation
If you would like to clone the repository, here is how to do so:

```
git clone https://github.com/BenYoung03/taskpalv2.git
cd taskpalv2
```
Once cloned, you will need to install the dependencies, and set up a new Firebase application using the Firebase console:
```
npm install
npm install firebase
```
Make sure to replace the code that initializes my instance of Firebase with your own which will be provided. After this is complete you must enable user authentication, create the needed Firestore databases, and configure the application for hosting accordingly. 

## Technologies
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Firebase Authentication, Firebase Firestore

## Authors
- Benjamin Young - [BenYoung03](https://github.com/BenYoung03)
- Vuno Phiri - [vunophiri](https://github.com/vunophiri)
