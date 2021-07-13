FROM node:12-buster-slim
WORKDIR /app

COPY . .

RUN npm install 

ENTRYPOINT ["node", "server/server.js"]