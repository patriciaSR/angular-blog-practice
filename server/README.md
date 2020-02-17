# Blog Server

## Functionalities

The information entities that the blog should manage are:

- **Post**: Each entry contains the following fields: Author's name, Author's nickname, Title, Text, List of comments.
- **Comment**: Each comment contains the following fields: Nickname of the author of the comment, Content, Date of the comment.
- **OffensiveWord**: Each word will have an associated "level" field indicating the severity of the word from 1 to 5.

## Endpoints

Entries and comments:

- GET: Recover of all entries (no comments) `/posts`
- GET: Recover an entry (with comments) `/posts/:id`
- POST: Create of a new entry (no comments) `/posts`
- DELETE: Delete an existing entry (with all your comments) `/posts/:id`
- PUT: Modify of an existing entry `/posts/:id`

- POST: Add a new comment to an entry `/posts/:id/comments`
- PUT: Modify an existing comment `/posts/:id/comments/:id`
- DELETE: Delete an existing comment in an entry `/posts/:id/comments/:id`

Offensive words:

- POST: Save a new offensive word `/offensive-words`
- GET: List all offensive words `/offensive-words`
- DELETE: Delete an offensive word `/offensive-words/:word`
- PUT: Modify an existing offensive word `/offensive-words/:word`

Signup new users:

- POST: save a new user on DB `/signup`

### Offensive words collection database

If the comment you are trying to incorporate contains any of the offensive words registered in the database, the comment cannot be created. The REST request **will be rejected with an error code and a JSON will be returned with information about the offensive word (or words) and its level**.

Offensive words will be stored in the database. If the application detects that there are no offensive words in the database, the application must insert a **default offensive-words set**.

## User control

The application has to allow several roles of users:

- _Authenticated_:
  - **Admin**: Admin users can perform any operation of the REST API.
  - **Publisher**: Publisher users can:
    - Create blog entries.
    - Delete and modify only the entries created by them.
    - Delete comments from your posts.
    - Add comments to other posts.
- _No-Authenticated_: They can consult information but cannot add comments or posts.

Any user can register in the application and will be assigned the role of “publisher”.
To do this, a user creation endpoint will be created. --> `/signup`

The app implement a Node.js script called defaultUsers.js that will connect to MongoDB and create admin and publisher users when it runs the first time.

## User Authentication

The user authentication mechanism is **Basic Auth + JWT Tokens**.
You can import `Blog-Admin.postman_environment.json` and `Blog-Publisher.postman_environment.json` environments into Postman application and test the authentication functionality with publisher or admin role on different apis endpoints and methods.

## Server's Structure:

```
├── /server (server folder)
│    ├── /bin (exec files)
│    │   ├── app.js (principal server file)
│    │   └── fake-server.js (users test API server for testing)
│    │  
│    ├── /controllers (router REST API)
│    │   ├── authRouter.js (authentication login API methods)
│    │   ├── commentsRouter.js (comments collection API methods)
│    │   ├── offensiveRouter.js (offensive-words collection API methods)
│    │   ├── postsRouter.js (posts collection API methods)
│    │   └── signupRouter.js (users collection API methods)
│    │
│    ├── /middlewares (middlewares folder)
│    │   └── isRoleAllowed.js (user role controller method)
│    │
│    ├── /postman (postman config folder)
│    │   ├── Blog-Admin.postman_environment.json (AdminUser Environment config file to import in Postman)
│    │   ├── Blog-Publisher.postman_environment.json (PublisherUser Environment config file to import in Postman)
│    │   └── postman.json (REST API information to import in Postman application)
│    │
│    ├── /repository (database connection and interaction)
│    │   ├── Comments.js (comments collection interaction methods)
│    │   ├── index.js (main database connection)
│    │   ├── OffensiveWords.js (offensive-words collection interaction methods)
│    │   ├── Posts.js (posts collection interaction methods)
│    │   └── Users.js (users collection interaction methods)
│    │
│    ├── /tests (testing js files with jest)
│    │   ├── /api
│    │   │   └── api.test.js (REST API testing with Supertest)
│    │   │  
│    │   ├── /fixtures (mock variables for testing)
│    │   │   ├── fixApiVariables(mock variables for REST API testing)
│    │   │   ├── fixOnlyUsersVariables.js (mock variables for OnlyUsers methods testing)
│    │   │   └── /DB (default collections database for testing)
│    │   │  
│    │   ├── onlyUsers.test.js
│    │   └── validator.test.js
│    │
│    ├── /utils (js files)
│    │   ├── /data
│    │   │   ├── defaultWords.js (default offensiveWords array)
│    │   │   └── defaultUsers.js (default users array to try the application)
│    │   ├── onlyUsers.js (management user info methods)
│    │   ├── passport.js (passport config)
│    │   └── validator.js (check offensiveWords in a comment text)
│    │
│    ├── .eslintrc.json (eslint configuration)
│    ├── app.js (app module, express server connection)
│    ├── appServer.js (app module, express server configuration)
│    ├── package.json (dependencies and project information)
│    ├── server.cert(openssl no-safe self-signed SSL certificate)
│    └── server.key(openssl no-safe self-signed SSL key)

```

## REST API

The REST API must be level2 maturity and the format of the URLs must identify resources, not actions.
A `postman.json` file must be delivered with at least one example of each endpoint of the REST API.

## Mongo DataBase

Persistence will be implemented with [**MongoDB**](https://docs.mongodb.com/manual/).
Optionally, the practice can be delivered with the persistence of offensive words in a MySQL database (with or without ORM).

## Unit Testing

- **Comment with offensive words**: if the comment has an offensive word, the corresponding error must be generated.
- **Comment without offensive words**: if the comment does not have offensive words, an OK validation must be obtained.

## REST API testing

This app use [SuperTest](https://github.com/visionmedia/supertest) REST API testing with [Jest](https://jestjs.io/en/).

## User interface

The user interface is created with **[Vue](https://vuejs.org/)** and has the following guidelines:

- [Vuetify](https://vuetifyjs.com/) implementation
- The **main view** has a list with the title of each post.
- Each title is a link that will navigate to a new page with the **post content**
- The post's page shows its **content and comments**
- According to type of user, the interface will show the **vue components that allow to user performs all the operations that are available in the REST API** (create posts, create comments, delete comments...)
- It allows the **new users signup**.

## Run Server

Run server from `/server` folder using:

`npm run start`

## Run tests

For run unit and API REST tests use:

`npm run test`

To see coverage of tests use:

`npm run test:coverage`

## Install Dependencies

You can install all dependencies in `package.json` file on one step using:

`npm install`

Or you can install install separately one by one:

Install **[Node.js](https://nodejs.org/es/)**:

`npm install -g node`

Install **[Express.js](https://expressjs.com/)** for building REST APIs:

`npm install express`

Install **[MongoDB](https://www.mongodb.com/)** for buildig Non-Relational(NoSQL) Database:

`npm install mongodb`

Install **[CORS](https://www.npmjs.com/package/cors)** node.js package for providing a Connect/Express middleware that can be used to enable CORS:

`npm install cors`

Install **[bcrypt](https://www.npmjs.com/package/bcrypt)** for passwords hash encryption:

`npm install bcrypt`

Install **[fs](https://nodejs.org/api/fs.html)** for file system operation in node:

`npm install fs`

Install **[https](https://www.npmjs.com/package/https)** for run node server in a safe port with a SSL certificate:

`npm install https`

Install **[passport](http://www.passportjs.org/)** for authentication config:

`npm install passport`

Install **[passport-http](https://www.npmjs.com/package/passport-http)** for HTTP requests authentication config:

`npm install passport-http`

Install **[passport-jwt](http://www.passportjs.org/packages/passport-jwt/)** for JSON Web Token authentication config:

`npm install passport-jwt`

Install **[jsonwebtoken](https://jwt.io/)** for JSON Web Token implementation:

`npm install jsonwebtoken`

## Install DevDepencencies

Install **[Jest](https://jestjs.io/en/)** for testing:

`npm install --save-dev jest`

and set this config on scripts key on `package.json` file to run tests:

```
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:debug": "node --inspect-brk node_modules/.bin/jest --runInBand",
  "test:coverage": "jest --collect-coverage"
}
```

Install **[jest-mongodb](https://jestjs.io/docs/en/mongodb)** for mocking db connection:

`npm install --save-dev @shelf/jest-mongodb`

and set this config on `package.json` file:

```
"jest": {
  "preset": "@shelf/jest-mongodb"
}
```

Install **[SuperTest](https://www.npmjs.com/package/supertest)** for REST API Testing:

`npm install --save-dev supertest`

Install **[esLint](https://eslint.org/docs/user-guide/getting-started)** for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs:

`npm install --save-dev eslint`
