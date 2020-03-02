# Try to link Vue to Express

Reference: https://qiita.com/y4u0t2a1r0/items/a6aea444efc8e8e65293


## How I created this project

1. Generate Frontend
    - `vue create frontend`
    - Add Vue-Router, Vuex, ESLint, Stylus
1. Generate Backend
    - `npx express-generator --view=pug backend`
    - `npm install -S cors body-parser`
    - `npx nodemon ./bin/www`: Try to run server
