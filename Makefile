APP_NAME=ws-cafe
APP_VERSION=0.0.1.SNAPSHOT
DOCKER_USER=pablon27
HOST_PORT=3000

docker-build:
	docker build -t ${DOCKER_USER}/${APP_NAME}:${APP_VERSION} .

docker-run:
	docker run -it --rm -p ${HOST_PORT}:3000 ${DOCKER_USER}/${APP_NAME}:${APP_VERSION}

run:
	node server/server.js

run-nodemon:
	nodemon server/server.js