# ベースイメージ
FROM node:20

# 作業ディレクトリを設定
WORKDIR /app

# backend ディレクトリ内のファイルをコピー
COPY ./backend/package*.json ./
COPY ./backend/tsconfig.json ./
COPY ./backend/src ./src
COPY ./backend/drizzle.config.ts ./

# 依存関係をインストール
RUN npm install