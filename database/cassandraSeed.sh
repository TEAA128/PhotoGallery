#!/bin/bash

###################################################
# Bash script to create database and seed
###################################################
date
# Variable Definitions
# Path to directory bash script is living
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Database Variable Definitions
# PASSWORD=""
USER="cassandra"

# Output Filename for Faker File -users
OUTPUT1="cassPhotosByRoom.csv"
FILEPATH1="$DIR/$OUTPUT1"

#OutputFilename for Faker File -rooms
OUTPUT2="cassListByUser.csv"
FILEPATH2="$DIR/$OUTPUT2"

# if parameter 1 and parameter 2 is not passed argument default is 20 records generated
START=${1:-1}
FINISH=${2:-21}

### Import Our Database ###
# Dont specify a database since CREATE DATABASE is in schema.sql
#cqlsh -u 'my_username' -p 'my_password' -f /mydir/myfile.cql
#source 'user_schema.cql'

SCHEMA="$DIR/schema.cql"
cqlsh -f $SCHEMA

date
### Run Our Generator Script ###
node ./cassSeed.js --output1=$FILEPATH1 --output2=$FILEPATH2 --start=$START --finish=$FINISH

date
### Import Our postgres.csv file to seed Database ###
cqlsh -e "COPY bnb.photos_by_room(room_id,photo_order,title,address,image_url,image_description) FROM '$FILEPATH1' WITH DELIMITER = ',' AND HEADER = TRUE;"

# date

cqlsh -e "COPY bnb.list_by_user(user_id,list_order,list_name,room_id) FROM '$FILEPATH2' WITH DELIMITER = ',' AND HEADER = TRUE;"

# date
