# Communication between Vue & Express

Reference: https://qiita.com/y4u0t2a1r0/items/a6aea444efc8e8e65293

## How to use

- `cd frontend`
- `npm install`: For the first run only
- `npm run serve`
- `cd backend`
- `npm install`: For the first run only
- `npx nodemon node ./bin/www`

## How I created this project

### frontend (PORT: 8080)

1. `vue create frontend`
  - Add Vue-Router, Vuex, ESLint, Stylus
1. `npm install`
1. `npm run serve`: Try to run
1. `npm install -S axios`

### backend (PORT: 3000)

1. `npx express-generator --view=pug backend`
1. `npm install`
1. `npm install -S cors body-parser`
1. `npx nodemon ./bin/www`: Try to run server
1. Add `body-parser` and `cors` setting:
   ```js
   // app.js
   var cors = require("cors");
   var bodyParser = require("body-parser");
   app.use(bodyParser.json());
   app.use(cors());
   ```
