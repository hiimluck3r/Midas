#!/bin/bash
echo "check if golden file exists...";

FILE=/bitnami/mongodb/secrets/golden

if [ -f "$FILE" ] || [ $MONGODB_SHARDING_MODE != "mongos" ]; then
    echo "golden file exists, skipping installation...";
else
    curl -LO https://github.com/hiimluck3r/Midas/raw/backend/dump.tar.gz;
    tar -xzvf dump.tar.gz -C /;
    echo "Initializing default database...";
    mongorestore /dumps;
    echo "Entrypoint done";
    touch $FILE;
    echo "golden file flag was created";
fi