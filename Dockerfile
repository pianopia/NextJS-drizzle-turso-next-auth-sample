# ベースイメージを指定
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ビルド
ENV NODE_ENV=production
RUN npm run build

ENV DATABASE_URL=libsql://
ENV DATABASE_TOKEN=
ENV NEXTAUTH_SECRET=
ENV NEXTAUTH_URL=
ENV NEXT_PUBLIC_APP_URL=

CMD ["npm", "start"]
