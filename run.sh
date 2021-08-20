echo "-----------------------------------------------------------------------"
echo "configure envrionment setting"
export CART_SERVICE_URL=http://172.30.1.34:8080
export MYSQL_PRODUCT_HOST=172.17.0.2
export MYSQL_ORDER_HOST=172.17.0.2
export MYSQL_USER_HOST=172.17.0.2
echo "-----------------------------------------------------------------------"
echo "migrate and activate server!"

python3 ./apigateway/manage.py runserver 0.0.0.0:8000 &

python3 ./product/manage.py migrate
python3 ./product/manage.py runserver 0.0.0.0:8100 &

python3 ./account/manage.py migrate
python3 ./account/manage.py runserver 0.0.0.0:8200 &

python3 ./order/manage.py migrate
python3 ./order/manage.py runserver 0.0.0.0:8300 &
echo "-----------------------------------------------------------------------"
echo "complete!!"
