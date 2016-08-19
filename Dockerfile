FROM node:6

MAINTAINER Bobby Priambodo <bobby.priambodo@gmail.com>

RUN npm i -g nodemon

# cache node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm i
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

WORKDIR /app
ADD . /app

EXPOSE 7000

CMD ["./bin/start.sh"]
