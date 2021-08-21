const express = require('express');
const router = express.Router();
const Rating = require('../models/rating');


// get all ratings
router.get('/ratings', async(req, res)=> {
    const ratings = await Rating.find({}).exec();
    res.send({payload: ratings,
        message: 'get ratings success'});
})


// get specific user rating info
router.get('/ratings/:userId', async(req, res)=> {
    const {userId} = req.params;
    const rating = await Rating.findOne({userId}).exec();
    if(!rating){
        res.status(400).send({message: 'user rating info 없음'});
        return;
    }
    res.send({payload: rating,
        message: 'get ratings success'});
})


// create rating
router.post('/ratings', async(req, res)=> {
    const {userId} = req.body;
    if(!userId){
        res.status(400).send({message: 'userId 없음'});
        return;
    }
    const check = await Rating.find({userId}).exec(); 
    if(check.length){
        res.status(400).send({message: '이미 존재하는 사용자입니다.'});
        return;
    }
    const rating = new Rating({userId});
    await rating.save();
    res.send({message: 'rating 생성 성공'});
})



// rating up 
router.get('/ratings/:userId/up', async(req, res)=> {
    const {userId} = req.params;
    if(!userId){
        res.status(400).send({message: 'userId 없음'});
        return;
    }
    const rating = await Rating.findOne({userId});
    if(!rating){
        res.status(400).send({message: 'user rating info 없음'});
        return;
    }
    rating.temperature += 0.5;
    await rating.save();
    res.send({message: 'user rating up 성공'});
})

// rating up 
router.get('/ratings/:userId/down', async(req, res)=> {
    const {userId} = req.params;
    if(!userId){
        res.status(400).send({message: 'userId 없음'});
        return;
    }
    const rating = await Rating.findOne({userId});
    if(!rating){
        res.status(400).send({message: 'user rating info 없음'});
        return;
    }
    rating.temperature -= 0.5;
    await rating.save();
    res.send({message: 'user rating down 성공'});
})


//rating delete 
router.delete('/ratings/:userId', async(req, res)=> {
    const {userId} = req.params;
    const rating = await Rating.findOne({userId}).exec();
    if(!rating){
        res.status(400).send({message:'rating info 없음'})
        return;
    }
    await rating.delete();
    res.send({message: 'rating delete 성공'});

})


module.exports = router;