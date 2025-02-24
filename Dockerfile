# 1. ベースイメージとしてNode.jsを使用
FROM node:18 AS build

# 2. 作業ディレクトリを設定
WORKDIR /app

# 3. package.json と package-lock.json をコピーして依存関係をインストール
COPY package*.json ./
RUN npm install

# 4. アプリケーションのソースコードをコピー
COPY . .

# 5. Reactアプリケーションをビルド
RUN npm run build

# 6. 本番環境用のWebサーバーとしてnginxを使用
FROM nginx:alpine

# 7. ビルドしたアプリをnginxにコピー
COPY --from=build /app/build /usr/share/nginx/html

# 8. nginxがリッスンするポートを指定
EXPOSE 80

# 9. nginxを起動する
CMD ["nginx", "-g", "daemon off;"]
