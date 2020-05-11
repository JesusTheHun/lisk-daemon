FROM node:12.15.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN apk --no-cache upgrade && apk add python make gcc g++

COPY . ./

RUN npm install

ENV NODE_ENV production
RUN npm run build

FROM node:12.15.0-alpine
WORKDIR /app

COPY --from=build /app/build ./build/

EXPOSE 8765

ENTRYPOINT ["node", "/app/build/index.js"]
