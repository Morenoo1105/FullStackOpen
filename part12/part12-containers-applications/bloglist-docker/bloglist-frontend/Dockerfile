FROM node:20 AS building-stage

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN rm -rf node_modules/

RUN rm package-lock.json

RUN npm install

RUN npm run build

FROM nginx

COPY --from=building-stage /usr/src/app/build /usr/share/nginx/html
