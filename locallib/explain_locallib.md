# Express Sample Project

- This project was created with `express generator`
- Tutorial: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs
- Sample file: https://github.com/mdn/express-locallibrary-tutorial

## Create Project

1. Generate template
   1. `npm install express-generator -g`
   1. `express express-locallib --view=pug`
   1. `cd express-locallib`
   1. `npm install`
   1. `npm install --save-dev nodemon`
   1. `DEBUG=express-locallibrary-tutorial:* npm start`
      - Try to run

## Files Overview

- `/app.js` (created by generator)
- `/node_modules`
- `/package.json` (created by generator)
- `/package-lock.json`
- `/populate.js` (created by me): Seed the sample data into the DB
- `/bin/` (created by generator)
  - `www`: Start point. Run the server
- `/public/` (created by generator)
  - `images/`
  - `javascripts/`
  - `stylesheets/`
- `/views/` (created by generator)
  - `error.pug`
  - `index.pug`
  - `layout.pug`
- `/routes/` (created by generator)
  - `index.js`
  - `users.js`
- `/models/` (created by me) Note that each file has only one schema & model
  - `author.js`
  - `book.js`
  - `bookinstance.js`
  - `genre.js`
- `/controllers/` (created by me)
  - `authorController.js`
  - `bookController.js`
  - `bookinstanceController.js`
  - `Controller.js`


## Follow the data flow over files

- In short, Express.js gets the request, then returns the response

![MVC_of_express](./express_mvc.png)


1. `npm run` executes `node bin/www/`
   - This behavior is defined in `package.json`
1. `bin/www`
   1. Import `app` from `app.js`
   1. Set port number of `app`
      - Node.js has the original env var
      - `process.env.PORT` refers to the env var of the Node
   1. Instantiate the `server` from `http` module, then listen to the request
      - `var server = http.createServer(app);`
1. `/app.js` calls:
   - `/routes/`
   - `/public/`
   - mongoDB database (connection establishment)
1. `/routes/` calls `/controllers/`
1. `/controllers/` calls:
   - `/models/`
   - `/views/`
1. `/models/` calls MongoDB (actual data interaction)

## Dependent Modules

- `async`
  - Control asynchrous processes
  - With this package, you don't have to write Promsie / async await of the vanilla JS explicitly
  - `async.series([func1, func2, func3], callback)`
    - Seemingly, run these functions in the specified order, then run callback
  - `async.parallel([func1, func2, func3], callback)`
    - Seemingly, run these functions in parallel, then run call back
    - By this, you can control the order of the functions group & callback, while saving the time the group takes
- `cookie-parser`
- `express-validator`
  - validate the input: type, length, etc.
  - sanitize the fields: prevent malicious code injection, such as SQL injection
- `compression`
- `debug`
- `express`
- `helmet`
  - Set HTTP headers to secure whole app (for Cross-site scripting prevention, cache management, etc.)
- `http-errors`
- `moment`
  - Manipulate data & time format (advanced version of vanilla JS's Date)
- `mongoose`
  - MongoDB ORM
- `morgan`
  - HTTP request logger
- `pug`
  - html template
- `nodemon`
  - hot reloading

## app.js

1. `require` で必要なパッケージ（npm でインストールした外部のやつ）を宣言する
1. `require` で必要なパッケージ（プロジェクト内で自分で作ったやつ）を宣言する
1. express をインスタンス化
1. Mongoose を設定する
   - mongoose を require する
   - `mongoose.connect(データベースのURI, オプション`)で MongoDB に接続する
1. `app.set` で view を設定する。ここでは pug を使うと言っている
1. `app.use` to declare which middlewares to use
   - App-level middlewares (3rd party): cookieParser(), express.json(), etc.
   - Basic syntax is `app.use('PATH', MIDDLEWARE);`
      - `app.use('/users', usersRouter);`: `indexRouter` middlewares will be executed on the access to `/users`
      - `app.use('app.use(cookieParser());`: `cookieParser()` middlewares will be executed on ALL the paths (because path specification is omitted)
   - Router-level middlewares: 自分で定義した routing object。routes/ ディレクトリにあるやつ。
   - Built-in middlewares: express.static()
   - Error handling middlewares
1. Export app with `module exports = app`

## bin/www

- Entry point. app.js につなぐ
- server のインスタンス化
- server の listen の設定（ポート番号、リッスンに失敗した時のエラー処理とか）

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

### views/blahblah_detale.pug

### views/blahblah_detail.pug

### views/blahblah_form.pug

### views/blahblah_list.pug

## public ディレクトリ

- 外部に渡しても構わない画像やスタイルシート、JavaScript ファイルを置く場所？

## models ディレクトリ

1. Define Schema
1.

![Schema of Local Library](./locallib_schema.png)

### models/book.js

- Schema:
  - title, summary, isbn
  - author, genre はそれぞれ外部のモデルと関連付ける

### models/bookinstance.js

- imprint, status, due_back
- book は Book モデルと関連付ける

### models/author.js

-

### models/genre.js

## controllers/

- Controller gets data from the model,
- Controller gets UI templates from the view,
- Then controller link those data & UI, and return it as the HTTP response
- All the controller export functions : `exports.author_list = (req, res, next) => {}`
- These functions come in the form like this:

```js
(req, res, next) => {
  // many steps to manipulate data here

  // if any error occured, call error middleware
  return next(err);

  // if successful, render the result
  res.render('author_list', {
    title: 'Author List',
    author_list: list_authors
  });
)}
```

- Each function render the corresponding view file
  - e.g. `author_list()` render `author_list.pug`

### controllers/authorController.js

- `author_list()`
  - Retrieve all the authors from `Author` model
  - This function doesn't use `req` params
- `author_detail()`
  - Get author ID from request
  - Retrive details of the author from `Author` model
  - Retrive the books written by the author ID from `Book` model
- `author_create_get()` & `author_update_get()`
  - Show the input forms to add new author
  - No interaction with DB
- `author_create_post` & `author_update_post()`
  - This is the array which has the values & anonymous funciton
  - This validate the POST for new author registration
  - values part:
    - Validation
    - Sanitize the fields
  - function part:
    - Catch the error obj if the validation failed
    - Now the request is OK to go, let's add the author
    - Instantiate new Author class
    - If error on validation, show the input page again, then `return`
    - Save the newly added Author to the DB
- `author_delete_get()` & `author_delete_post()`
  - Run 2 functions with `async.parallel()`
    - `author()`: get the author ID from the request, then find it from Author model
    - `authors_books()`: get the author ID from the request, then find the books which are written by the author of the ID
  - Then
    - If error, `next(err)`
    - If the specified author doesn't exist, you can't delete it. So redirect to authors list
    - If successful, render the view for confirmation to delete

### controllers/bookController.js

- Almost same as `authorController.js`
- `index()`
  - Controller to show the stats: number of books / authors / genres etc.
  - Run 5 functions with `async.parallel()`, then render the result
  - Every function counts the entries in each model; e.g. `Book.count()`
    - `book_count()`
    - `book_instance_count()`
    - `book_instance_available_count()`
    - `author_count()`
    - `genre_count()`
- `book_list()`
- `book_detail()`
- `book_create_get()` & `book_update_get()`
- `book_create_post()` & `book_update_get()`
- `book_delete_get()` & `book_delete_post()`

### controllers/bookinstanceController.js

- Almost same as `authorController.js`

### controllers/genreController.js

- Almost same as `authorController.js`
