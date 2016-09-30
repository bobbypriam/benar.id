setup:
	./setup.sh

start:
	docker-compose run --rm --service-ports web

daemon:
	docker-compose up -d web

watch-client:
	docker-compose run --rm web npm run watch-client

build-client:
	docker-compose run --rm web npm run build-client

build-containers:
	docker-compose build

test:
	docker-compose run --rm web ./bin/test.sh

unit-test:
	docker-compose run --rm web npm run test:server:unit

lint:
	docker-compose run --rm web npm run lint -s

cover:
	docker-compose run --rm web ./bin/cover.sh

stop:
	docker-compose stop

clean:
	docker-compose down
