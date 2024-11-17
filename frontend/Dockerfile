# Node.jsを使ってViteプロジェクトをビルド
FROM node:22 AS builder
WORKDIR /app
COPY . .
# Corepackを有効化してYarnをインストール
RUN corepack enable && corepack prepare yarn@4.5.0 --activate

RUN yarn install && yarn build

# Nginxで静的ファイルをホスティング
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
