FROM node:current-alpine

WORKDIR /app

COPY package.json /app

RUN cd /app && npm i && npm i -g jsonlint

COPY sort.js /app

# hadolint ignore=DL3025
ENTRYPOINT node /app/sort.js | jsonlint -s
