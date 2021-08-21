const express = require('express');
const router = express.Router();
const Rating = require('../models/rating');

// get all ratings
router.get('/ratings', async(req, res)=> {
    const ratings = await Rating.find({}).exec();
    res.send({payload: ratings,
        message: 'get ratings success'});
})

// create rating
router.post('/ratings', async(req, res)=> {
    const {userId} = req.body;
    if(!userId){
        res.status(400).send('userId 없음');
        return;
    }
    const check = await Rating.find({userId}).exec(); 
    if(check.length){
        res.status.send('이미 존재하는 사용자입니다.');
        return;
    }

    const rating = new Rating({userId});
    await rating.save();

    res.send({message: 'rating 생성 성공'});
})

// get carts by user(buyer) 
router.get('/carts/users/:buyerId', async(req, res)=> {
    const {buyerId} = req.params;
    const cartsByUser = await Cart.find({buyerId}).exec();
    console.log(cartsByUser);

    res.send({
        payload: cartsByUser,
        message: 'get carts by user success'});
})

// cart check 
router.post('/carts/check', async(req, res)=> {
    console.log
    const {product_id, buyer_id, seller_id} = req.body;
    const cartCheck = await Cart.find({$and: [{productId: product_id},{buyerId: buyer_id}, {sellerId: seller_id}]}).exec(); 
    console.log(cartCheck);
    if(cartCheck.length === 0){
        res.send({
            message: "cart item doesn't exist",
            payload:{
                checked: false
            }
        })
        return;
    }
    res.send({
        payload: {
        ...cartCheck,
        checked: true
        },
        message: 'cart item exist'});
})


//cart delete 
router.delete('/carts/:cartId', async(req, res)=> {
    const {cartId} = req.params;
    let cart = null;
    try{
        cart = await Cart.findById(cartId).exec();

    // console.log(cart);  
        await cart.delete();
        res.send({message: 'delete cart success'});
    }
    catch{
        res.status(400).send({
            message: "cart delete fails"
        });
    }

})


//cart by product
router.delete('/product/:productId/carts', async(req, res)=> {
    const {productId} = req.params;
    let cart = null;
    try{
        cart = await Cart.deleteMany({productId}).exec();
        res.send({message: 'delete cart success'});
    }
    catch{
        res.status(400).send({
            message: "cart delete fails"
        });
    }

})


module.exports = router;