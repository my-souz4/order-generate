FROM node:14.17.6

WORKDIR /app

COPY ./ .

RUN npm install

EXPOSE 3569