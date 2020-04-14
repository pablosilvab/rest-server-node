APP_NAME=cafe-backend
APP_VERSION=0.0.1.SNAPSHOT
HOST_PORT=3000

run-nodemon:
	nodemon server/server.js

run:
	node server/server.js

install:
	npm install