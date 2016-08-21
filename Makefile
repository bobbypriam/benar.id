setup:
	./setup.sh

start:
	docker-compose up web

daemon:
	docker-compose up -d web

build-containers:
	docker-compose build

test:
	docker-compose run --rm web ./bin/test.sh

stop:
	docker-compose stop

clean:
	docker-compose down
