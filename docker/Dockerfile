FROM node:lts-bullseye AS builder

WORKDIR /app

COPY ["./package.json", "./package-lock.json*", "./"]

RUN npm install

COPY . .

RUN npm run build


FROM caddy:2-alpine

WORKDIR /var/www/frontend

COPY --from=builder /app/dist ./

COPY ./docker/Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
