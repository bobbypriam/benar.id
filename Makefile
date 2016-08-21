setup:
	./setup.sh

start:
	docker-compose up

daemon:
	docker-compose up -d

build-containers:
	docker-compose build

test:
	docker-compose run --rm web ./bin/test.sh

stop:
	docker-compose stop

clean:
	docker-compose down
