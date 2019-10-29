# Files Structure

## app.js
    - Real entry point of the project

    1. `require` で必要なパッケージ（npmでインストールした外部のやつ）を宣言する
    1. `require` で必要なパッケージ（プロジェクト内で自分で作ったやつ）を宣言する
    1. expressをインスタンス化する
    1. `app.set` でviewを設定する。ここではpugを使うと言っている
    1. `app.use` でどのミドルウェアを使うのかを宣言する
        - App-level middlewares (3rd party): cookieParser(), express.json(), etc.
        - Router-level middlewares: 自分で定義したrouting object。routes/ ディレクトリにあるやつ。
        - Built-in middlewares: express.static()
        - Error handling middlewares
    1. `module exports = app` でエクスポートする
## bin/www
    - Application entry point
## package.json
    - List of packages required for this project. Names of the packages, and minimum versions of them.
    - このpackage.jsonにしたがってパッケージをインストールするには run `npm install`
    - "dependencies": 本番環境で使うパッケージのリスト。`npm install --save blahblah`　の結果はここに追加される。
    - "devDependencies": 開発環境で使うパッケージのリスト。 `npm install --save-dev blahblah`　の結果はここに追加される。
    - 注意：`--save` や `--save-dev` のオプションなしで`npm install blahblah` したパッケージはpackage.jsonには追加されない

## package-lock.json
    - package.jsonの詳しいやつ？これはnpm installの結果自動で作成されるものなので、我々がいじることはないと思われる

## routes/index.js
    - router.get()で各ルートに対するハンドラを定義している。その
    - `module.export = router`
## routes/users.js
    - `module.export = router`する。index.jsとuser.jsで同じ名前のrouterオブジェクトをエクスポートしているが、特に問題はないらしい。app.jsを見ると、app.use()の時の引数名はそれぞれusersRouter, indexRouterとなっている。module.exportの時の名前は関係ないのかもしれない。


## views/index.pug
    pug の基本的なルールを確認すると、
    - h1= messageみたいにして、変数を利用しているっぽい
    - 文の半ばに変数を埋め込むときは、　#{error}　のように書くっぽい
    - `block`タグの内容は、他のpugファイルで差し替えられる可能性がある部分っぽい

## views/layout.pug
    - HTMLのおおもとの部分のみを記述している。bodyはほぼ空
## views/error.pug
    - 404とかのエラーページの表示
    - layout.pugを拡張している。継承などにより、共通部分を何度も書くことを防いでいるっぽい。今回でいうと、HTMLのヘッダ部分は共通なので、何度も書かないために拡張機能を利用している。

## public/
    - フロントエンドのための画像やスタイルシート、JavaScriptファイルを置く？
