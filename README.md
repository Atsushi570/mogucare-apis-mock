# バックエンドAPIのモックサーバ

## 概要
- 本番環境のバックエンドAPIが無くてもフロントエンド開発ができるよう作成したモックサーバです
- ローカルにAPIをモックしたサーバを立てることができます
- NuxtアプリがAPIを叩く場合、axiosを利用しており、axiosがAPIを叩くURL先をモックサーバに向けておくことで、モックサーバで開発が可能になります
- 極力、本番環境を再現するようにしていますが、完全ではないのでご理解の上、使用してください
- 本番環境の仕様は[こちら](https://docs.google.com/spreadsheets/d/13aXsdJyrVBww7QjiDB8PCJz8xeOzxsJcHoaz9Mukwy0/edit#gid=1849188503)を参照してください

## 環境
- Node 11.13.0 と 14.15.5 で動作が確認できています

## サーバ起動方法
- 使用前にパッケージのインストールを行ってください
```
npm i
```
- パッケージをインストールしたら以下のようにサーバを起動してください
```
node .\server.js
```
- ポートは55555を使用しています
- ポートが既存アプリと被ってしまう場合はslackなどで声出ししてください
- その場合はポートを変更するなど対応を検討します
  - モックサーバだけでなくaxiosの変更も必要です

## 使用例
- ユーザ一覧を取得するGETメソッドのAPIを叩く場合は以下のURLを使用します
```
http://localhost:55555/api/users/
```
- 該当年月の登園状況一覧を取得するクエリパラメータ付きのGETメソッドのAPIを叩く場合は以下のURLを使用します
  - 以下の例では2020-10-05の登園状況一覧を問い合わせています
```
http://localhost:55555/api/attendances?date=2020-10-05
```
- アカウント登録をするPOSTメソッドのAPIを叩く場合は以下のURLを使用します
```
http://localhost:55555/api/users/

// POSTするデータは以下のようなJsonデータ
// ヘッダー
  "Content-type": "application/json",
// Body
  {
    "login_id": "login_id",
    "password": "password",
    "first_name": "atsushi",
    "middle_name": "test",
    "last_name": "sato",
    "birthday": "1985-10-25",
    "address": "Chiba",
    "email": "test@example.com",
    "gender": "male",
    "height": "180",
    "weight": "70",
    "blood_type": "O",
    "is_parent": 1,
    "is_admin": 0,
    "language_cd": 1,
    "emergency_contact": "emergency_contact_test",
    "phone": "xxx-xxxxx-xxxx"
  }
```

- 起動したことを確認するだけであればChromeなどでGETメソッドのAPIを叩いてみてください
- POSTメソッドのAPIの動作確認をする場合は[post man](https://qiita.com/zaburo/items/16ac4189d0d1c35e26d1)などを使うと簡単です

## Nuxtアプリからの使用
- NuxtアプリからAPIを叩く場合はaxiosとvuexが良い感じに処理してくれるので、上記のURLを意識する必要はありません
- ただし、デバッグなどをする場合、上記のように動作していることを思い出すと役立つことがあるかもしれません

## データのライフサイクル
- サーバが扱うことが可能なデータはdb.jsonに記載されているデータのみです
- サーバ起動時にdefaultDBディレクトリ内のデータがdb.jsonにコピーされます
- 従って、サーバ起動直後はdefaultDBに保存されているデータのみ取得可能です
- アカウント登録のAPIを叩くなどで、新規にデータを登録するとdb.jsonにデータが書き込まれ、それ以降は追加したデータも取得可能になります
- しかし、一度サーバを停止すると、サーバを再起動した時にdb.jsonがdefaultDBの内容に書き換えられるので、APIを通して新規登録をしたデータは消えてしまします

## 画像ファイルの配信
- 画像ファイルも配信することが可能です
- 配信可能な画像ファイルはpublic/imagesに保存されている画像のみです
- 以下のようにしてアクセス可能です
```
http://localhost:55555/images/sample.png
```

## 画像ファイルのアップロード
- 画像ファイルをアップロードすることで、アップロードした画像を配信可能にすることができます
- 例えば、userのアイコン画像をアップロードする場合は以下のアドレスに画像をPOSTします
```
http://localhost:55555/api/users/image?user-id=アップロードする対象ユーザのuserId
```
- アップロードする際、画像のKey名はimageとしてください
- アップロードされた画像はpublic/images/uploadedImagesに保存されます
- アップロードされた画像はgit管理対象外ですが手動で消去しない限りローカルに残り続けます

## REST CLIENTを利用した動作確認
- [VSCODEの拡張機能であるREST CLIENT](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)を使って各APIのレスポンスを確認することができます
- 拡張機能をインストール後にrequests以下の.httpファイルを開いて任意のリクエストをモックサーバに送ってください

## 注意事項
- 都合上、各テーブルのPrimary Keyはidというカラム名です
  - サーチクエリを使用しないレスポンスデータでは、usersのテーブルなどPrimary Keyがuser_idとなるテーブルでは、idとuser_idの両方にid値が格納されて返されます
  - アプリ側ではuser_idなどテーブル仕様に記載されているカラムのデータのみ利用するようにしてください
  - （または、誰か直してください。。）
  - サーチクエリを使用した場合は、API仕様に従って、idを消去してレスポンスデータを返却します

