echo "-----------------------------------------------------------------------"
echo "configure envrionment setting"
export MONGO_CART_HOST=172.17.0.3
export MONGO_RATING_HOST=172.17.0.3 
echo "-----------------------------------------------------------------------"
echo "migrate and activate server!"
node ./cart/app.js
node ./rating/app.js
echo "-----------------------------------------------------------------------"
echo "complete!!"
