# Hello Sequelize

## Run

1. `npm install`


## Notes

- TypeORM CLIはExpressやDB連携の設定までやってくれるが、Sequelize CLIがやってくれるのはディレクトリ構造とconfigなどの雛形だけ
    - Expressは別途自分で用意する必要がある
-

## Installation History

1. `npx express-generator --view=pug backend`
1. `vue create frontend`

### Backend
1. `cd backend`
1. `npm init`
1. `npm i -S sequelize`
1. `npm i -D sequelize-cli`
1. `npx sequelize init`
1. `npm install`
1. `npm install sqlite3`
1. `node ./bin/www`: Try to run
1.　Edit `config/`
1. `npx sequelize model:create --name user --underscored --attributes name:string,gender:string,office:string`
    - Create model & its migration
1. `npx sequelize db:migrate --env development`
