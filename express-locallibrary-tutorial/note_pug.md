# pug の要約

## 未分類

- `h1= Mymessage`, `title= myTitle`

  - "myMessage", "myTitle" are variables
  - These variables will be embedded by controllers
  - Note that you need to add space after "=" symbol

- #[strong Genres:] 

- 文の途中でに変数を埋め込むとき

  - #{myMessage} : #は escaped
  - #{myMessage.toUpperCase()} : メソッドを埋め込んでも OK
  - !{myMessage} : !は unescaped

## Attribute

- a(class='button' href='google.com') Google
- button(type='button' class='btn btn-' + btnType + ' btn-' + btnSize)
- a(style={color: 'red', background: 'green'})

## Conditionals

```
if user.authorized
    h2 会員限定ページ
else
    h2 会員登録してください

```

unless っていうのもある

- case

```
case status_code
    when 0
        p 正常終了
    when 1
        p 異常終了
    default
        p 状態不明
```

## Control

```

```

## Escape

=を使うと、記号（以下では<など）が安全な表現に置換される

```
p
    = 'This code is <escaped>!'
```

## 継承

    - `block content`
    -
    - `extends layout`:
    - Write this in the child .pug file
    - This means "This file will be embedded into the parent pug file of "layout.pug"
