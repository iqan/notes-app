## Keep Backend Application Level 1
This is a simple node.js application with MongoDB access, can be used to implementation for CRUD operations with MongoDB

### Application Details:
- User can register and login
- User can create, view, update and delete notes
- User can see details of a note

### To Run the application:
1. Start MongoDb if not running

2. Set MongoDb url in environment variables <br/>
On Linux platform ```export MONGO_URL='mongodb://localhost/keep2'``` <br/>
On Windows platform ```SET MONGO_URL='mongodb://localhost/keep2' ```

3. Start server <br/>
Install dependencies ``` npm install or yarn ``` <br/>
Run application ``` npm start ```

### Run using Docker:
#### Build
```docker build -t iqan/keep:1.0.0 . ```
#### Run
```docker run -it -p 3000:3000 --name api iqan/keep:1.0.0 ```

#### Using docker-compose
- Build and start
```docker-compose up --build ```
- Stop
```docker-compose down ```

### API Specification:
- Swagger UI:
Browse - http://localhost:3000/api/v1/notes/api-specs/

- Get all notes for a user: 
GET http://localhost:3000/api/v1/notes
Headers: ```Authorization Bearer <jwt-token>```

- Add a note for a user: 
POST http://localhost:3000/api/v1/notes
Body: ```{ "title": <title>, "text": <text>, "state": <state> }```
Headers: ```Authorization Bearer <jwt-token>```

- Update a note for a user: 
PUT http://localhost:3000/api/v1/notes/<noteId>
Body: ```{ "title": <title>, "text": <text>, "state": <state>, "isFavourite": <isFavourite>, "groupName": <groupName> }```
Headers: ```Authorization Bearer <jwt-token>```

- Get all notes for a user as stream: 
GET http://localhost:3000/api/v1/notes/stream
Headers: ```Authorization Bearer <jwt-token>```

- Insert bulk notes for a user: 
POST http://localhost:3000/api/v1/notes/stream
Headers: ```Authorization Bearer <jwt-token>```
Body: ```[{ "title": <title>, "text": <text>, "state": <state> }]```

- Delete note for a user: 
DELETE http://localhost:3000/api/v1/notes/:noteId
Headers: ```Authorization Bearer <jwt-token>```

- Delete note for a user: 
DELETE http://localhost:3000/api/v1/notes/
Headers: ```Authorization Bearer <jwt-token>```
Body: ```[ noteId1, noteId2, ... ]```

- Add bulk notes to Favourites for a user: 
POST http://localhost:3000/api/v1/notes/favourites
Headers: ```Authorization Bearer <jwt-token>```
Body: ```[ noteId1, noteId2, ... ]```

- Add bulk notes to a group for a user: 
POST http://localhost:3000/api/v1/notes/group/:groupName
Headers: ```Authorization Bearer <jwt-token>```
Body: ```[ noteId1, noteId2, ... ]```

### How to for Development

1. Install dependencies

```
npm install
```

or

```
yarn
```

2. Run application from terminal

```
npm start
```

3. Run test cases from terminal

```
npm run test
```

4. Run lint checks from terminal

```
npm run lint
```
