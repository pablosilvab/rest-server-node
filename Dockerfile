FROM node:12
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
CMD node server/server.js
EXPOSE 3000