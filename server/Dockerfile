FROM node:16.16.0-slim

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .
COPY --chown=node:node . .

CMD ["npm", "start"]