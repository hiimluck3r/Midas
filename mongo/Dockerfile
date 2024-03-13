FROM bitnami/mongodb:7.0.6-debian-12-r0

WORKDIR /app/mongo

COPY . .
COPY ./initdb.sh /docker-entrypoint-initdb.d/initdb.sh

EXPOSE 27017
CMD ["mongod"]