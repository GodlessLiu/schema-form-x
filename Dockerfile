
FROM node:24.2.0 AS base
COPY . /app
WORKDIR /app

FROM base AS build
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

FROM nginx:alpine
LABEL MAINTAINER="2788370451@qq.com"
COPY --from=base  /app/deploy/nginx/app.conf /etc/nginx/conf.d/app.conf
COPY --from=build  /app/dist /usr/share/nginx/html
RUN ls -al /usr/share/nginx/html