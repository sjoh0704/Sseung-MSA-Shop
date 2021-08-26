#!/bin/bash
frontend=frontend-service.default.svc
# frontend=localhost:3000
generate(){
    url=http://$1$2
    echo ---------------------------------------------------------
    echo "GET: $url"
    echo ---------------------------------------------------------
    i=0
    while [ $i -lt 3 ]
    do
    response=$(curl -w " - status code: %{http_code}, sizes: %{size_request}/%{size_download}" $url)
    i=`expr $i + 1`
    done
    sleep 0.5
}


userPlayBook(){
    echo ==========================================================
   
    echo user create and delete playbook!
    url=$1

    echo create $url/apis/v1/user/
    user_id=$(curl -d '{"username":"jafdsfash", "password":"value2", "email": "value1@value2.com", "phone_number": "01012341234"}' \
    -H "Content-Type: application/json" \
    -X POST $url/apis/v1/user/ | jq '.payload.payload.user_id')
    
    echo delete $url/apis/v1/user/$user_id
    response=$(curl -H "Content-Type: application/json" \
    -X DELETE $url/apis/v1/user/$user_id)
    
    


    echo ==========================================================
    
    sleep 0.5
}
echo "install jq"


echo "start loadgenerate!"

while [ 1 ]
do
generate $frontend /apis/v1/user/2
generate $frontend /apis/v1/product/
generate $frontend /apis/v1/carts/users/2
generate $frontend /apis/v1/order/2
generate $frontend /apis/v1/order/sale/2
userPlayBook $frontend
done
echo "stop loadgenerate!"
