#!/bin/bash

echo "Initializing default database...";
mongorestore /app/mongo/dump/;
echo "Entrypoint done";