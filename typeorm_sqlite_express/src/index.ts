import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { User } from "./entity/User";
import { Office } from "./entity/Office";

// createConnection()はPromiseを返す
// サーバの接続情報などを、引数に渡す（今回は不要なので空）
createConnection()
  .then(async connection => {
    // Express appを作成
    const app = express();

    // 使うミドルウェアの宣言
    app.use(bodyParser.json());

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
            // こっちに普通入るはず
            // 該当するデータが見つからないときは、undefinedを返すようにしている
            result.then(result =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
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
    await connection.manager.save(
      connection.manager.create(User, {
        firstName: "Timber",
        lastName: "Saw",
        age: 27
      })
    );
    await connection.manager.save(
      connection.manager.create(User, {
        firstName: "Phantom",
        lastName: "Assassin",
        age: 24
      })
    );

    // insert new offices for test
    // await connection.manager.save(
    //   connection.manager.create(Office, {
    //     name: "Nagamachi"
    //   })
    // );

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
  })
  .catch(error => console.log(error));
