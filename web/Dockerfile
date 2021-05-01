FROM node:14

COPY . /app

WORKDIR /app

RUN npm ci

EXPOSE 4200

ENTRYPOINT npm start
