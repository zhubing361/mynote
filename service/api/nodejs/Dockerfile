FROM node:16.10.0-alpine3.14

WORKDIR /web/mynote-api-node
COPY . /web/mynote-api-node
RUN npm install

EXPOSE 5003
CMD ["node", "app.js"]

# docker build -t mynote-api-node .