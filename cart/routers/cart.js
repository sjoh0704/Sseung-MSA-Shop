const express = require('express');
const router = express.Router();
const Cart = require('../schemas/cart');

const existValid = async (name, tmp, res) =>{
    if(tmp == null || tmp == undefined ){
        await res.status(400).send({errorMessage: `${name} doesn't exist`});
        
        return;
    }
}

// get all carts 
router.get('/carts', async(req, res)=> {
    const carts = await Cart.find({}).exec();
    res.send({payload: carts,
        message: 'get carts success'});
})

// create cart 
router.post('/carts', async(req, res)=> {
    const {product_id, seller_id, buyer_id} = req.body;
    console.log(req.body);
    existValid('product_id', product_id, res);
    existValid('seller_id', seller_id, res);
    existValid('buyer_id', buyer_id, res);
    const cart = new Cart({productId:product_id, 
                        sellerId: seller_id,
                        buyerId: buyer_id});
    await cart.save();

    res.send({message: 'create cart success'});
})

// get carts by user(buyer) 
router.get('/carts/users/:buyerId', async(req, res)=> {
    const {buyerId} = req.params;
    const cartsByUser = await Cart.find({buyerId}).exec();
    console.log(cartsByUser);
    if(cartsByUser.length === 0){
        res.status(400).send({
            message: "cart lists doesn't exist"
        })
        return;
    }
    res.send({
        payload: cartsByUser,
        message: 'get carts by user success'});
})

//cart delete 
router.delete('/carts/:cartId', async(req, res)=> {
    const {cartId} = req.params;
    let cart = null;
    try{
        cart = await Cart.findById(cartId).exec();
    }
    catch{
        res.status(400).send({
            message: "cart delete fails"
        });
    }

    // console.log(cart);  
    await cart.delete();
    res.send({message: 'delete cart success'});
})


module.exports = router;