#! /usr/bin/python3
import os
from time import sleep
FRONTEND = os.getenv("FRONTEND", "localhost:3000")

def gernerateLoad(target):
    print("--------------------------------------------------------")
    print("GET {}".format(target))
    cmd = 'curl --max-time 5 {}'.format(target)
    res = os.popen(cmd).read()
    print(res)
    sleep(0.1)

def userPlayBook(frontend):
    print("--------------------------------------------------------")
    print("user create and delete playbook")
    print("create user")
    username = os.popen("cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | sed 1q").read().strip()
    data = '{ \
    "username": "%s", \
    "password": "1234", \
    "email": "abcd@abcd.com", \
    "phone_number": "01011111111" \
    }' %(username)
    cmd = "curl --max-time 5 -d \'{}\'\
    -H 'Content-Type: application/json' \
    -X POST {}/apis/v1/user/ | jq '.payload.user_id'".format(data, FRONTEND)
    user_id = os.popen(cmd).read()


    if not username:
        print("Error: username doesn't exist")
        return
    
    gernerateLoad(FRONTEND + "/apis/v1/ratings/{}".format(user_id))
    
    
    print("\ndelete user")
    
    delete_cmd = "curl --max-time 5 \
    -H 'Content-Type: application/json' \
    -X DELETE {}/apis/v1/user/{}".format(frontend, user_id)
    os.system(delete_cmd)
    sleep(0.5)


print("load generator starts")
while 1:
    print("load generate!")
    gernerateLoad(FRONTEND + "/apis/v1/user/2")
    gernerateLoad(FRONTEND + "/apis/v1/product/1")
    gernerateLoad(FRONTEND + "/apis/v1/carts/users/1")
    gernerateLoad(FRONTEND + "/apis/v1/order/0")
    gernerateLoad(FRONTEND + "/apis/v1/order/sale/0")
    userPlayBook(FRONTEND)
    print("\n")

print("load generator stop")
