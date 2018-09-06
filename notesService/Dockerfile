FROM node:10.8.0-alpine

LABEL Maintainer="Iqan Shaikh"

ENV PORT 3002

ENV MONGO_URL mongodb://localhost:27017/notes-app

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE ${PORT}

ENTRYPOINT [ "npm", "start" ]