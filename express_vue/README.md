# Try to link Vue to Express

Reference: https://qiita.com/y4u0t2a1r0/items/a6aea444efc8e8e65293

## How to use

- aa

## Edit History: frontend

1. `vue create frontend`

- Add Vue-Router, Vuex, ESLint, Stylus

1. `npm install`
1. `npm run serve`: Try to run
1. `npm install -S axios`

## Edit History: backend

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
1. `mkdir api`
1. `touch api/axios.js`

   ```js
   // api/axios.js
   import axios from "axios";

   export default () => {
     return axios.create({
       baseURL: `http://localhost:3000/`
     });
   };
   ```

1. Run
