FROM node:10.8.0-alpine AS build-stage

LABEL Maintainer="Iqan Shaikh"

ENV PORT 4200

RUN mkdir /app

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

ARG configuration=production

RUN npm run build -- --output-path=./dist/out --configuration $configuration

FROM nginx:1.15

COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
