APP_NAME=cafe-backend
APP_VERSION=0.0.1.SNAPSHOT
HOST_PORT=8080
USER_HUB=pablon27
PROJECT_FOLDER=.
GIT_DIR=$(shell pwd)

run-nodemon:
	nodemon server/server.js

run:
	node server/server.js

install:
	npm install