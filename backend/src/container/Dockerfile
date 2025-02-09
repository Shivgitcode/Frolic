FROM node:18-alpine as build
RUN apk update
RUN apk upgrade
RUN apk add --no-cache ffmpeg


WORKDIR /app


COPY package*.json ./
RUN npm install
RUN npm install tsx
COPY index.ts .

FROM node:18-alpine as runner
RUN apk update
RUN apk upgrade
RUN apk add --no-cache ffmpeg

WORKDIR /app

COPY --from=build /app ./

CMD [ "npm","run","dev" ]









