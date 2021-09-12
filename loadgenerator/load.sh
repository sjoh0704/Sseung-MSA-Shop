#!/bin/bash
frontend=frontend-service.default.svc
# frontend=localhost:3000
generate(){
    url=http://$1$2
    echo ---------------------------------------------------------
    echo "GET: $url"
    echo ---------------------------------------------------------
    i=0
    while [ $i -lt 4 ]
    do
    response=$(curl --max-time 5  -w " - status code: %{http_code}, sizes: %{size_request}/%{size_download}" $url)
    i=`expr $i + 1`
    done

}


userPlayBook(){
    echo ==========================================================
   
    echo user create and delete playbook!
    url=$1

    echo create $url/apis/v1/user/
    username=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | sed 1q)
    user_id=$(curl --max-time 5 -d '{"username":"'$username'", "password":"abcd", "email": "abcd@abcd.com", "phone_number": "01011111111"}' \
    -H "Content-Type: application/json" \
    -X POST $url/apis/v1/user/ | jq '.payload.user_id')

    if [ $user_id = "null" ] || [ -z $user_id ]
    then
        echo "Error" 
        exit 1
    fi 
    echo GET $url/apis/v1/ratings/$user_id/up
    response=$(curl --max-time 5 -H "Content-Type: application/json" \
    -X GET $url/apis/v1/ratings/$user_id/up)

    echo DELETE $url/apis/v1/user/$user_id
    response=$(curl --max-time 5 -H "Content-Type: application/json" \
    -X DELETE $url/apis/v1/user/$user_id)
    
    


    echo ==========================================================
    

}
echo "start loadgenerate!"

while [ 1 ]
do
generate $frontend /apis/v1/user/2
generate $frontend /apis/v1/product/
generate $frontend /apis/v1/carts/users/2
generate $frontend /apis/v1/order/2
generate $frontend /apis/v1/order/sale/2
userPlayBook $frontend
sleep 1
done
echo "stop loadgenerate!"
