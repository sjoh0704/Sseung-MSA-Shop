echo "-----------------------------------------------------------------------"
echo "configure envrionment setting"
MONGODB=$(docker inspect mongodb-container| jq ".[0].NetworkSettings.IPAddress")
export MONGO_CART_HOST=${MONGODB:1:-1}
export MONGO_RATING_HOST=${MONGODB:1:-1}
echo "-----------------------------------------------------------------------"
echo "migrate and activate server!"
node ./rating/app.js
echo "-----------------------------------------------------------------------"
echo "complete!!"
