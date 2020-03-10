'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env]; // configファイルのdevelopment, test, productionの各内容がここに入る
const db = {}; // このオブジェクトを最後にexportする


// configファイルのhost, storageなどの部分にuse_env_variableという項目があるかどうかで場合分け
// どうやらuse_env_variableに入るのはpostgres://username:password@localhost:5432/database_nameのような文字列らしい
// つまり、else文にあるconfig.database, config.username, config.passwordの情報に相当
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// fsはNode.jsのファイル読み書きモジュール
fs
  .readdirSync(__dirname) // このindex.jsの場所が__dirname
  .filter(file => {
    // Model定義ファイルの抽出
    // blahblah.jsの形になっていないファイルを除外する
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    // モデルの一つ一つをfileとして取り出す
    const model = sequelize['import'](path.join(__dirname, file));
    // dbは{"User": Userモデル定義, "Office": Officeモデル定義}のような構造になる
    db[model.name] = model;
  });

// 各モデル内部にあるassociateメソッドを起動し、
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;　// 
db.Sequelize = Sequelize; // Sequelizeモジュール自体をdbのメンバに追加？？？なにそれ

module.exports = db;
