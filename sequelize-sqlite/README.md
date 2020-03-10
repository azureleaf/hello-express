# Hello Sequelize

Sequelise に触ってみるためのプロジェクト

Reference: https://qiita.com/tatsurou313/items/2ba0387806b07f442b8c

## Run

### Frontend

1. `cd frontend`
1. `npm install`
1. `npm run serve`

### Backend

1. `cd backend`
1. `npm install`
1. `node ./bin/www` / `npx nodemon node ./bin/www`

## Notes

- TypeORM CLI は Express 自体のインストールや DB 連携の設定までやってくれる
- しかし Sequelize CLI がやってくれるのはディレクトリ構造と config などの雛形だけ
  - Express は別途自分で用意する必要がある

```
.
├── config
│   └── config.json
├── migrations
├── models
│   └── index.js
└── package.json
```

## Installation History

### Create root dir for frontend & backend

1. `npx express-generator --view=pug backend`
1. `vue create frontend`

### Backend

1. `cd backend`
1. `npm init`
1. `npm i -S sequelize`
1. `npm i -D sequelize-cli`
1. `npm i -S sqlite3`
1. `npx sequelize init`
1. `npm install`
1. `node ./bin/www`
    - Try to run
1. Configure DB path in `config/`
1. `npx sequelize model:create --name user --underscored --attributes name:string,gender:string,office:string`
   - Create model & its migration
1. `npx sequelize db:migrate --env development`
1. `npx sequelize seed:create --name seed-users`
1. `npx sequelize db:seed:all`

### Frontend

1. `cd frontend`
1. `npm install axios`
