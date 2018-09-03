FROM node:10.8.0-alpine

LABEL Maintainer="Iqan Shaikh"

ENV PORT 3000

ENV MONGO_URL mongodb://localhost:27017/keep-2

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm i

EXPOSE ${PORT}

ENTRYPOINT [ "npm", "start" ]