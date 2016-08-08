# Quiz-Vue

Vue.jsをベースにしたクイズアプリケーションです。JSONから出題順や選択肢をシャッフルしてクイズに挑戦することができます。

## Quiz JSON Creator

クイズ用のJSONファイルを作成するための画面です。Chromeのみクリップボードからの画像ペーストにも対応しています。ただしbase64形式にエンコードしているため、ファイルサイズが大きい場合パフォーマンスに影響するので注意してください。

## 必要な技術

- JavaScript
- HTML
- CSS
- Markdown
- Git

## 推奨ソフトウェア

- [Git for Windows](https://git-for-windows.github.io/)(Gitbash)
- [Visual Studio Code](https://www.visualstudio.com/ja-jp/products/code-vs.aspx)

## 作業方法

Githubでのソースコード管理で、ワークフローはFork型[(参考サイト)](http://kik.xii.jp/archives/179)を採用しています。大まかな順序は以下手順のとおりです。

### 初期設定

- [Githubアカウントを作成する](http://qiita.com/kooohei/items/361da3c9dbb6e0c7946b)（手順1. GitHubアカウントの作成まで）
- [GitをPCにインストールする](http://www.atmarkit.co.jp/ait/articles/1603/31/news026_3.html)（ページ3まで）
- [Visual Studio Codeをインストールする](http://www.atmarkit.co.jp/ait/articles/1507/10/news028.html)

### フォーク型ワークフロー

- [Quiz-Vue](https://github.com/TakahiRoyte/quiz-vue)の右上の「Fork」ボタンを押し自分のGithubリポジトリにフォーク(分岐コピー)する
- フォークした自分のGithubリポジトリから、ローカルにクローン(複製)しローカルリポジトリーを作成する
- URIは自分のGithubリポジトリの画面右側緑のボタンを押すと表示されるURIを利用する

```bash
$ git clone https://github.com/XXXXXXXX/quiz-vue.git   // URIは自分のリポジトリのものにすること
```
- ローカルリポジトリで作業用ブランチを作成する

```bash
$ git checkout -b branch_name   // branch_nameは作業内容を元に名前をつけること 例：fix_css_error
```

- ブランチでコーディング作業をする
- 作業した内容をローカルリポジトリにコミットする

```bash
$ git add . 
$ git commit -m "#1 コミットコメント。対応するissueがあれば先頭に#99の形式でいれる"
```

- ローカルでの作業内容を自分のGithubリポジトリにプッシュする

```bash
$ git push origin branch_name
```

- 自分のGithubリポジトリにブランチが作成されていることを確認（ブランチは画面左側のbranchボタンを押すとプルダウンで表示される）
- フォーク元の[Githubリポジトリ(https://github.com/TakahiRoyte/quiz-vue)でプルリクエスト(変更取込依頼)を行う
