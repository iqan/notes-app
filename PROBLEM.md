# Notes Application (similar to Google Keep)

Design & implement, Notes Application as a personal productivity tool for quickly taking (& saving) notes, organize notes efficiently, accessible from any device, add reminders with robust search and indexing capability, bellow are its salient features.

The application is expected to handle concurrent requests of 200 to 300 per second, with response time of each request in less than 1 to 2 millisecond

### Core features (mandatory to implement)

- Subscribed users can List Notes, Save notes, Group  the notes, can mark specific notes as favorite
- Perform operations on one or more selected notes and add them to a group, mark as favourite, share with other users, delete them
- Search notes based on title

### User Account features (mandatory to implement)

- Users registers to subscribe to app
- Subscribed user will login & logout from any browsers and device

### Productivity features

Subscribed user can set a reminder on a note, which alert the user twice, 15 minutes before and at the exact specified time, use may chose to snooze or dismiss the reminder, if snoozed, after 5 minutes again reminder will alert

### Social features

- Users can share notes with other users with specified access type
- Push notify users on when someone shares a note with them


## What must be implemented

### Participant has to develop

- NodeJS based server side application (server part only of the application)
- Do data modeling for document oriented database
- Automated test cases to test the server side application
- Dockerize the server application deployment, including its dependent database etc.

### Server side application

- Must be able to interface & integrate with any web based clients
- Implement the application using TDD approach


## Instructions for implementation and submission

- Source code must be maintained in a private repository, in the participant's Gitlab account
- Successful submission must have a well document README.md, which explain how to build, run & test the application, you can also add a DESIGN.MD to explain your data model & design
- Source code must be integrated with ESLint with standard ESLint recommended JS rules, and should not have any lint errors open

### About coding process

- Maintain “master” and “development” branch
- Keep committing the code frequently, incremental evolving of code should be visible from these frequent commits
- Completed (coded, tested) features must be merged with master branch and reviewed with mentor


## User Stories

1. As a new user, I should be able to register by providing my details (such as name, email ID) along with credentials to gain access of subscribed user of the application
2. As a registered user, should be able to login, logout, so that can authenticate with the system to access the features of a subscribed user
3. As a subscribed user, save notes, list, add them to group, mark as favourite, share with other users (using their email ID), delete
4. As a subscribed user, should be able to set reminders on a note and get push notification alerts accordingly 
5. As a developer of the system, should be able to deploy the system as a set of docker containers
6. As a developer of the system, should be able to scale the web server to more than one instance and if already more than one instance, reduce to single instance