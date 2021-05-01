FROM node:14

COPY . /app

WORKDIR /app

RUN npm ci

EXPOSE 3000

ENTRYPOINT npm start
