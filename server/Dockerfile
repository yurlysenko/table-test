FROM node:alpine

RUN apk add g++ make py3-pip
RUN npm i -g npm
RUN npm i -g fs json-server @nestjs/cli

WORKDIR /server

RUN chown -R node:node /server

COPY --chown=node:node package.json ./

RUN npm install --omit=optional

COPY --chown=node:node . ./

USER node

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]