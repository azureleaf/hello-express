# 概要

このプロジェクトは`express generator`で生成した。https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs のチュートリアルを実行したもの。

## 全体のデータフロー

![MVC_of_express](./express_mvc.png)

1. Your `npm run` refers to `bin/www/`
1. `bin/www` calls `/app.js`
1. `/app.js` calls:
   - `/routes/`
   - `/public/`
   - mongoDB database (connection establishment)
1. `/routes/` calls `/controllers/`
1. `/controllers/` calls:
   - `/models/`
   - `/views/`
1. `/models/` calls MongoDB (actual data interaction)

# ファイル構造

## app.js

1. `require` で必要なパッケージ（npm でインストールした外部のやつ）を宣言する
1. `require` で必要なパッケージ（プロジェクト内で自分で作ったやつ）を宣言する
1. express をインスタンス化する
1. Mongoose を設定する
   - mongoose を require する
   - `mongoose.connect(データベースのURI, オプション`)で MongoDB に接続する
1. `app.set` で view を設定する。ここでは pug を使うと言っている
1. `app.use` でどのミドルウェアを使うのかを宣言する
   - App-level middlewares (3rd party): cookieParser(), express.json(), etc.
   - Router-level middlewares: 自分で定義した routing object。routes/ ディレクトリにあるやつ。
   - Built-in middlewares: express.static()
   - Error handling middlewares
1. `module exports = app` でエクスポートする

## bin/www

- Entry point. app.js につなぐ
- server のインスタンス化
- server の listen の設定（ポート番号、リッスンに失敗した時のエラー処理とか）

## package.json

- List of packages required for this project. Names of the packages, and minimum versions of them.
- この package.json にしたがってパッケージをインストールするには run `npm install`
- "dependencies": 本番環境で使うパッケージのリスト。`npm install --save blahblah`　の結果はここに追加される。
- "devDependencies": 開発環境で使うパッケージのリスト。 `npm install --save-dev blahblah`　の結果はここに追加される。
- 注意：`--save` や `--save-dev` のオプションなしで`npm install blahblah` したパッケージは package.json には追加されない

## /populatedb.js

## /package-lock.json

- package.json の詳しいやつ？これは npm install の結果自動で作成されるものなので、我々がいじることはないと思われる

## /routes/index.js

- router.get()で各ルートに対するハンドラを定義している。その
- res.render()する。index.pug を指定するとともに、index.pug に変数（ここではページタイトル）も渡す。
- `module.export = router`

## /routes/users.js

- `localhost:3000/users`するとここのルーティングが作動する。なぜなら、index.js で`app.use('/users', usersRouter);`となっているから。users.js では`route.get('/')`となっているが、この'/'の意味は localhost 直下ではなく、既に割り当てられた`/users/`の直下を意味する。
- res.send()する。pug ではなく書式抜きで単なるメッセージを送出すればよいので、res.render()ではなく res.send()。
- `module.export = router`する。index.js と user.js で同じ名前の router オブジェクトをエクスポートしているが、特に問題はないらしい。app.js を見ると、app.use()の時の引数名はそれぞれ usersRouter, indexRouter となっている。module.export の時の名前は関係ないのかもしれない。

## /views


### views/layout.pug

- 全てのページに共通する部分。サイドのメニューや

### /views/index.pug

- トップページ。実際は、ドメインのルートにアクセスすると/catalog にリダイレクトされ、そこで表示されるのがこの view

### views/error.pug

- 404 とかのエラーページの表示
- layout.pug を拡張している。継承などにより、共通部分を何度も書くことを防いでいるっぽい。今回でいうと、HTML のヘッダ部分は共通なので、何度も書かないために拡張機能を利用している。

### views/それ以外

## public ディレクトリ

- 外部に渡しても構わない画像やスタイルシート、JavaScript ファイルを置く場所？

## models ディレクトリ

### models/book.js

- title, summary, isbn
- author, genre はそれぞれ外部のモデルと関連付ける

### models/bookinstance.js

- imprint, status, due_back
- book は Book モデルと関連付ける

### models/authors.js

-

### models/genre.js

## controllers/
