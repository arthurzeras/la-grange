FROM node:16.16.0-slim

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .
COPY --chown=node:node . .

RUN mkdir $HOME/.kube/
COPY config $HOME/.kube/config

CMD ["npm", "start"]