# nagori

nagori は FUSSY API を利用した聖地巡礼をより楽しくするための Web アプリケーションです。

## 全体の設計について

### 認証

認証方法に関しては、[FUSSY API のドキュメント](https://fussy.gitbook.com/)を参照してください。

`/auth/login` で FUSSY で認証されるためのリンクを取得し、そのリンクをクリックすることで認証が完了します。

`/auth/callback` で FUSSY からの認証結果(トークン) を受け取り、それをクライアントに保存しています。

### FUSSY API の利用

`/api/fussy` で FUSSY API を利用するためのプロキシを実装しています。

## 設定すべき環境変数

| 環境変数名                       | 説明                             | デフォルト値             |
| -------------------------------- | -------------------------------- | ------------------------ |
| `NEXT_PUBLIC_FUSSY_API_URL`      | FUSSY API の URL                 | `https://api.fussy.fun`  |
| `NEXT_PUBLIC_FUSSY_SERVICE_URL`  | FUSSY の URL。認証に利用。       | `https://beta.fussy.fun` |
| `NEXT_PUBLIC_NAGORI_SERVICE_URL` | サービス の URL。認証に利用。    | `https://beta.fussy.fun` |
| `FIREBASE_PROJECT_ID`            | サービスのバックエンドとして利用 | -                        |
| `FIREBASE_PRIVATE_KEY`           | サービスのバックエンドとして利用 | -                        |
| `FIREBASE_CLIENT_EMAIL`          | サービスのバックエンドとして利用 | -                        |

## その他

- GraphQL へのリクエストの実装は `lib/` にあります。 Apollo などを利用せず素朴な実装をしています。
  - 一部型定義は [graphql-code-generator](https://the-guild.dev/graphql/codegen) で生成したものを使っています。
