#!/bin/bash
echo "check if golden file exists...";

FILE=/data/db/golden

if [ -f "$FILE" ]; then
    echo "golden file exists, skipping installation...";
else
    echo "Initializing default database...";
    mongorestore /app/mongo/dump/;
    echo "Entrypoint done";
    touch $FILE;
    echo "golden file flag was created";
fi