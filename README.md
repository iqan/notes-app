## Notes App
This is a simple node.js application with MongoDB access, can be used to implementation for CRUD operations with MongoDB

### Application Details:
- User can register and login
- User can create, view, update and delete notes
- User can see details of a note
- User can share note with another user
- User can add notes to group and see notes in group
- User can add notes to favourites
- User can set reminder on a note

#### Using docker-compose
- Build and start
```docker-compose up --build ```
- Stop
```docker-compose down ```

#### Individual service documentations
- [User Profile Service](./userProfileService/README.md)
- [Notes Service](./notesService/README.md)
- [Notifications Service](./notificationService/README.md)

#### Architecture
![Architecture diagram](./na_architecture.jpg "notes-app-architecture")