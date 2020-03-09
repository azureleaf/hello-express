# Try to use Passport.js

## Reference

https://medium.com/@basics.aki/step-wise-tutorial-for-node-js-authentication-using-passport-js-and-jwt-using-apis-cfbf274ae522

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

## `passport.authenticate()`

- `.authenticate(STRATEGY, OPTIONS, CALLBACK)`
  - Seemingly, OPTIONS or CALLBACK can be omitted

### strategy

- local
- basic
- openid
- provider
  - OAuth Provider
- facebook
- twitter
- google
- digest
- token
- bearer

### options (object literal)

- "Message flashing"
  - The flashing system basically makes it possible to record a message at the end of a request and access it next request and only next request
  - So, flash message will disappear on the later request / page reloading
  - This is usually combined with a layout template that does this
  - Note that browsers and sometimes web servers enforce a limit on cookie sizes
  - This means that flashing messages that are too large for session cookies causes message flashing to fail silently.
  - e.g. "Successfully logged in", "Failed: Invalid Password or/and Username"

```js
{
  session: false
  successRedirect: '/',
  failureRedirect: '/login',

  // Flash
  failureFlash: true,
  failureFlash: 'Invalid username or password.',
  successFlash: 'Welcome!'

  // Scope
  scope: 'email'
  scope: ['email', 'sms']
}
```

### callback

```js
function(err, user, info) {
  // When auth failed
  if (err) { return next(err); }

  // When the authentication is successful, passport will pass the user object to the callback, maybe
  // If the user obj isn't set, ask the user to login
  if (!user) { return res.redirect('/login'); }

  // When the auth is successful
  req.logIn(user, function(err) {
    // "user" is set but error... what?
    if (err) { return next(err); }

    // So, every user has the personal page like:
    // sample.com/users/john
    return res.redirect('/users/' + user.username);
  });
}
```
