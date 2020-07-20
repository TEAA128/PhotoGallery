#!/bin/bash

###################################################
# Bash script to create database and seed
###################################################
date
# Variable Definitions
# Path to directory bash script is living
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Database Variable Definitions
DATABASE="sdcphotogallery"
USER="erichen886"

# Output Filename for Faker File -users
OUTPUT1="postgresUsers.csv"
FILEPATH1="$DIR/$OUTPUT1"

#OutputFilename for Faker File -rooms
OUTPUT2="postgresRooms.csv"
FILEPATH2="$DIR/$OUTPUT2"

#OutputFilename for Faker File -list
OUTPUT3="postgresLists.csv"
FILEPATH3="$DIR/$OUTPUT3"

#OutputFilename for Faker File -Photos
OUTPUT4="postgresPhotos.csv"
FILEPATH4="$DIR/$OUTPUT4"

# if parameter 1 and parameter 2 is not passed argument default is 20 records generated
START=${1:-1}
FINISH=${2:-21}

### Import Our Database ###
# Dont specify a database since CREATE DATABASE is in schema.sql
SCHEMA="$DIR/schema.sql"
psql -U $USER < $SCHEMA

date
### Run Our Generator Script ###
node ./postSeed.js --output1=$FILEPATH1 --output2=$FILEPATH2 --output3=$FILEPATH3 --output4=$FILEPATH4 --start=$START --finish=$FINISH

date
### Import Our postgres.csv file to seed Database ###
psql -U $USER -d $DATABASE -c "COPY users(email,first_name,last_name) FROM '$FILEPATH1' DELIMITER ',' CSV HEADER;"

date
# psql -U $USER -d $DATABASE -c "COPY $DATABASE FROM '$FILEPATH' DELIMITER ',' CSV HEADER;"

psql -U $USER -d $DATABASE -c "COPY rooms(title,address) FROM '$FILEPATH2' DELIMITER ',' CSV HEADER;"

date

psql -U $USER -d $DATABASE -c "COPY list(user_id,name,room_id) FROM '$FILEPATH3' DELIMITER ',' CSV HEADER;"

date

psql -U $USER -d $DATABASE -c "COPY room_photos(image_url,image_desc,room_id) FROM '$FILEPATH4' DELIMITER ',' CSV HEADER;"

date
