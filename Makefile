APP_NAME=cafe-backend
APP_VERSION=0.0.1.SNAPSHOT
HOST_PORT=8080
USER_HUB=pablon27
PROJECT_FOLDER=.
GIT_DIR=$(shell pwd)

docker-push:
	docker build -t $(APP_NAME):$(APP_VERSION) -f Dockerfile --build-arg module_folder=$(PROJECT_FOLDER) $(GIT_DIR)
	docker tag $(APP_NAME):$(APP_VERSION) $(USER_HUB)/$(APP_NAME):$(APP_VERSION)
	docker push $(USER_HUB)/$(APP_NAME):$(APP_VERSION)

docker-build:
	docker build -t ${APP_NAME} . 

docker-run:
	docker run -it --rm -p ${HOST_PORT}:8080 ${APP_NAME} /bin/sh

run-nodemon:
	nodemon server/server.js

run:
	node server/server.js

install:
	npm install