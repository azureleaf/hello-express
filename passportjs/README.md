# Try to use Passport.js

## Files (express-generator)

```
passportjs/
├── app.js
├── bin
│   └── www
├── package.json
├── package-lock.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│   └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug
```

7 directories, 10 files

## Common `express` Syntax

- Create app

```js
var express = require("express");
var app = express();
```

- Set project variables
- Some reserved variables affect the behavior of the project

```js
app.set("Title", "My Site");
app.get("Title"); // "My Site"
```

- Define how to use middleware

```js
// Middleware "usersRouter" will be used for the path '/users'
var usersRouter = require("./routes/users");
app.use(("/users", usersRouter));

// Here the path (1st arg) is omitted, so express.json() middleware will be active for all the paths
var express = require("express");
app.use(express.json());

// Define the middleware (error handling) on the spot
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
```

### Common `http` syntax

- Server listening

```js
var server = http.createServer(app);

// "process.env" access to the server env var
var port = normalizePort(process.env.PORT || "3000");
server.listen(port);
```

- Attach event listener

```js
// Seemingly, .on(EVENT_NAME, EVENT_HANDLER) is the basic syntax
// 
server.on("error", onError);

res.on();
```

### `bin/www`

- `npm start` comes here
- Declare middlewares to use

### `app.js`

- Call `router/index.js` router for the root path `/`
- Call `router/users.js` router for the user path `/users`
