# Hello Passport.js

## Run

1. `npm install`
1. `npx nodemon node ./bin/www`

## Dev History

1. `npx express-generator --view=pug passportjs`
1. `npm install passport passport-local express-session`
1. Edit `app.js`
  - Set up passport-related packages
  - Configure LocalStrategy in `passport.use()`