echo "-----------------------------------------------------------------------"
echo "configure envrionment setting"
export MONGO_CART_HOST=172.17.0.3 
echo "-----------------------------------------------------------------------"
echo "migrate and activate server!"
node ./cart/app.js &
echo "-----------------------------------------------------------------------"
echo "complete!!"
