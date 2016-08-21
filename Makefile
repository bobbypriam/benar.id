setup:
	./setup.sh

start:
	docker-compose run --rm --service-ports web

daemon:
	docker-compose up -d web

watch-client:
	docker-compose run --rm web npm run watch-client

build-containers:
	docker-compose build

test:
	docker-compose run --rm web ./bin/test.sh

stop:
	docker-compose stop

clean:
	docker-compose down
