# Node.jsを使ってViteプロジェクトをビルド
FROM node:22 AS builder
WORKDIR /app
COPY . .

RUN npm install && npm run build

# Nginxで静的ファイルをホスティング
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
