# kansu C++ Library

競技プログラミングのためのC++ライブラリとコンテスト採点システム

## 🌐 GitHub Pages

このリポジトリは GitHub Pages でホストされています：
- ライブサイト: https://kansu1120.github.io/library/
- 採点システム: https://kansu1120.github.io/library/scorer.html

## 📚 コンテンツ

### C++ ライブラリ

競技プログラミングで使える様々なアルゴリズムとデータ構造の実装：

- データ構造（セグメント木、Union-Find、平衡二分探索木など）
- グラフアルゴリズム（最短路、最小全域木、フローなど）
- 数学的アルゴリズム（素数、累積和、数論など）
- その他の典型アルゴリズム

### 🎯 採点システム

WebAssemblyを使用したブラウザベースのコンテスト採点システム：

- **オフライン動作**: すべての処理がブラウザで完結
- **高速**: C++で書かれた採点プログラムをWebAssemblyで実行
- **セキュア**: データはサーバーに送信されません
- **カスタマイズ可能**: コンテストごとに採点ロジックを変更可能

#### 使い方

1. [採点システム](https://kansu1120.github.io/library/scorer.html)にアクセス
2. コンテストを選択
3. テストケースファイルをアップロード
4. 採点結果を確認

詳細は [採点システムのドキュメント](scorer-doc.md) を参照してください。

## 🔧 開発

### ローカルでの実行

```bash
# Jekyllのインストール（初回のみ）
gem install bundler jekyll

# ローカルサーバーの起動
jekyll serve

# ブラウザで http://localhost:4000 にアクセス
```

### 採点プログラムのコンパイル

新しいコンテストの採点プログラムを追加する場合：

```bash
# Emscriptenのセットアップ（初回のみ）
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh

# 採点プログラムのコンパイル
cd contests
./build_wasm.sh your_contest_name
```

## 📄 ライセンス

このプロジェクトは学習目的で作成されました。

## 👤 作成者

Created by kansu
