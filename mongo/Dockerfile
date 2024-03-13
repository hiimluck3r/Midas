FROM mongo:4.4.6

WORKDIR /app/mongo

COPY . .
COPY ./initdb.sh /docker-entrypoint-initdb.d/initdb.sh

EXPOSE 27017
CMD ["mongod"]