# Try to link Vue to Express

Reference: https://qiita.com/y4u0t2a1r0/items/a6aea444efc8e8e65293

## How to use

- `cd frontend`
- `npm install`: For the first run only
- `npm run serve`
- `cd backend`
- `npm install`: For the first run only
- `npx nodemon node ./bin/www`

## Edit History: frontend

1. `vue create frontend`

- Add Vue-Router, Vuex, ESLint, Stylus

1. `npm install`
1. `npm run serve`: Try to run
1. `npm install -S axios`
1. `mkdir src/api`
1. `touch src/api/index.js` & `touch src/api/methods.js`

   ```js
   // api/index.js
   import axios from "axios";

   // Create the Axios instance
   export default () => {
     return axios.create({
       // Experss app のポート番号をここで指定
       baseURL: `http://localhost:3000/`
     });
   };
   ```

   ```js
   // api/methods.js
   import Api from "./index";

   export default {
     testPosting() {
       const item = { text: "Success!" };
       return Api().post("/test", item);
     }
     // 他の処理も追加可能
   };
   ```

1. Run

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
