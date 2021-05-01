# @TODO add tests with docker-compose
test:
	test -f web/Dockerfile
	test -f express-server/Dockerfile
	test -f docker-compose.yml

compose-install:
	docker-compose run express-server make install
	docker-compose run web npm ci

compose-start:
	docker-compose up --abort-on-container-exit

compose-setup: compose-down compose-build compose-install

compose-build:
	docker-compose build

compose-down:
	docker-compose down || true

compose-stop:
	docker-compose stop || true

compose-restart:
	docker-compose restart

compose-bash:
	docker-compose express-server run bash

install-web:
	cd web && make install

install-server:
	cd express-server && make install

install: install-web install-server
