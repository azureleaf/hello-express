import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { User } from "./entity/User";
import { Office } from "./entity/Office";
import * as path from "path";
import { resolveSoa } from "dns";

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

    // insert new users for test
    const user1 = new User();
    user1.firstName = "義和";
    user1.lastName = "鈴木";
    user1.achievement = 80;
    await connection.manager.save(user1);

    const user2 = new User();
    user2.firstName = "佐和子";
    user2.lastName = "田中";
    user2.achievement = 20;
    await connection.manager.save(user2);

    const user3 = new User();
    user3.firstName = "大介";
    user3.lastName = "佐藤";
    user3.achievement = 0;
    await connection.manager.save(user3);

    const user4 = new User();
    user4.firstName = "凛";
    user4.lastName = "橋本";
    user4.achievement = 100;
    await connection.manager.save(user4);

    // await connection.manager.save(
    //   connection.manager.create(User, {
    //     firstName: "義和",
    //     lastName: "鈴木",
    //     achievement: 80,
    //   })
    // );

    // insert new offices for test

    const office1 = new Office();
    office1.name = "Sendai";
    office1.users = [user1, user2];
    await connection.manager.save(office1);


    const office2 = new Office();
    office2.name = "Nagamachi";
    office2.users = [user3, user4];
    await connection.manager.save(office2);

    // await connection.manager.save(
    //   connection.manager.create(Office, {
    //     name: "Nagamachi"
    //   })
    // );
    // await connection.manager.save(
    //   connection.manager.create(Office, {
    //     name: "Sendai"
    //   })
    // );

    console.log("Express server has started on port 3000");
  })
  .catch(error => console.log(error));
