setup:
	./setup.sh

start:
	docker-compose up

test:
	docker-compose run --rm web ./bin/test.sh

clean:
	docker-compose down
