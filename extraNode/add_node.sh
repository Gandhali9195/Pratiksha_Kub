#!/bin/bash

# File path
file="example.txt"

# String to match and replacement
match_string="pbft-4"
replacement="pbft-5"

match_1="pbft4pub"
replace="pbft5pub"

match_2="pbft4priv"
replace_2="pbft5priv"

match_3="sawtooth-4"
replace_3="sawtooth-5"

#match_5="slash"
#replace_5="/"


# Replace the string in the file using sed
sed -i "s/$match_string/$replacement/g" "$file"
sed -i "s/$match_1/$replace/g" "$file"
sed -i "s/$match_2/$replace_2/g" "$file"
sed -i "s/$match_3/$replace_3/g" "$file"
# String to match
match_string23="--peers tcp://$SAWTOOTH_3_SERVICE_HOST:8800"

# String to add
add_string="--peers tcp://\$SAWTOOTH_4_SERVICE_HOST:8800"

# Find the match and add the string in the next line using sed
sed -i "/$match_string23/{n;a\\
$add_string
}" "$file"

# String to match and add


