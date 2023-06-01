#!/bin/bash

cd
kubectl apply -f /home/ubf4/sawtooth-create-pbft-keys.yaml

kubectl get pods |grep pbft-keys >> /home/ubf4/text.txt

cd

file_path=/home/ubf4/text.txt
# Read the first line of the file
last_line=$(tail -n 1 "$file_path")

# Extract the first word from the line
first_word=$(echo "$last_line" | awk '{print $1}')

# Print the first word
echo "First word: $first_word"

sleep 10

echo "############################################### GENERSTED KEYS ######################################################"

kubectl logs $first_word >> /home/ubf4/new.txt

cd 


while IFS= read -r line;do 	
        echo "  $line" >>  /home/ubf4/pbft-keys-configmap.yaml
     #echo "  $line" >>  test.yaml
done < "/home/ubf4/new.txt"
echo "completed"

echo "############################################ ADDED KEY IN PBFT KEY CONFIG FILE #######################################"


kubectl apply -f /home/ubf4/pbft-keys-configmap.yaml

##########################################################################################
array_name=()

count=0
while IFS= read -r line;do 	
           ((count++))         
        if [ "$line" = "        nodeName: name" ]; then
           array_name+=("$count")
        fi
     #echo "  $line" >>  test.yaml
done < "/home/ubf4/pbft-k.yaml"


# ###################################################################################33t




echo "count : ${array_name[@]}"


# Read the data string passed from Node.js
dataArrayString="$1"
ipsArrays="$2"
# Parse the data string back into an array
IFS=',' read -ra data <<< "$dataArrayString"
IFS=',' read -ra dataips <<< "$ipsArrays"


length=${#data[@]}


file="/home/ubf4/pbft-k.yaml"





# Iterate over the arrays
for ((i=0; i<length; i++))
do
    element="${array_name[$i]}"
    content="nodeName: "${data[$i]}
    cat <<'EOF' | sed -i "${array_name[$i]}c$(printf "%s" "${content//&/\\&}")" /home/ubf4/pbft-k.yaml
        nodeName: nbf10
EOF

    cat <<'EOF' | sed -i "${element}s/^/        /" /home/ubf4/pbft-k.yaml
          
EOF
done


# ###################################################################################33t

array_ip=()
count=0
while IFS= read -r line;do 	
         #echo "  $line" 
           ((count++))         
        if [ "$line" = "    externalIPs:" ]; then
           let "count += 1"
           array_ip+=("$count")
           ((count--))
        fi
done < "/home/ubf4/pbft-k.yaml"




lengthd=${#array_ip[@]}

# Iterate over the arrays
for ((i=0; i<lengthd; i++))
do
    # Access elements from both arrays using the same index
    element="${array_ip[$i]}"
    content="- "${dataips[$i]}
    cat <<'EOF' | sed -i "${element}c$(printf "%s" "${content//&/\\&}")" /home/ubf4/pbft-k.yaml
        nodeName: nbf10
EOF

    cat <<'EOF' | sed -i "${element}s/^/      /" /home/ubf4/pbft-k.yaml
          
EOF
done



echo "#################################### FILE UPDATED ############################################"


kubectl apply -f /home/ubf4/pbft-k.yaml


echo "#################################### NETWORK IS CREATING ..  ############################################"

