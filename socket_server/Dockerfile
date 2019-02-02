FROM node:11.8

WORKDIR /app/sockets

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]


