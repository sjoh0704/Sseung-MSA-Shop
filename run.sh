python3 ./apigateway/manage.py runserver 0.0.0.0:8000 &

python3 ./product/manage.py migrate
python3 ./product/manage.py runserver 0.0.0.0:8100 &

python3 ./account/manage.py migrate
python3 ./account/manage.py runserver 0.0.0.0:8200 &

python3 ./order/manage.py migrate
python3 ./order/manage.py runserver 0.0.0.0:8300 &


