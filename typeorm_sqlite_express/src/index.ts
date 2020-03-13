import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import * as path from "path";
import { resolveSoa } from "dns";

// 自分で定義したseeding関数
// exportした場合は、importする
// exports.blahblahの場合は、requireする...のか？？？
const seeder = require("./seeds");

// createConnection()はPromiseを返す
// サーバの接続情報などを、引数に渡す（今回は不要なので空）
createConnection()
  .then(async connection => {
    // Express appを作成
    const app = express();

    // 使うミドルウェアの宣言
    app.use(bodyParser.json());

    // CSSなどの場所
    app.use(express.static(__dirname + "/public"));

    // View関係の変数の設定
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "pug");
    console.log("Views directory is set to:", app.get("views")); // ちゃんと設定できたか確認

    // register express routes from defined application routes
    // Routesはオブジェクトの配列になっている
    Routes.forEach(route => {
      // app.get("/users", (req, res, next)=>{...})というのをRoutes配列を元に自動で生成していく
      // Objectではa.nameでもa[name]でもどちらの表記でも同義だというのを利用
      // このasはtype assertion
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          // userControllerのアクションは全てPromiseを返すので、resultオブジェクトもpromiseを返す
          // const result = new UserController(コンストラクタは空).all(req, res, next)のようになる
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          // このinstanceofはTSの機能で、「resultがPromise Objectなら」 ということ
          if (result instanceof Promise) {
            // TypeORMのrepositoryに対してfind()系を実行したとき、該当するデータが見つからない場合はundefinedが返るっぽい
            result.then(result => {
              if (result !== null && result !== undefined) res.send(result);
              else undefined;
              // : res.send("Record Not found"); // これにすると、Promiseがどうとかいうエラーがでる
            });
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // Run seeder
    seeder.run2();

    console.log("Express server has started on port 3000");
  })
  .catch(error => console.log(error));
