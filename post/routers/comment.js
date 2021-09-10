const express = require('express');
const { Post, Comment } = require('../models');
const router = express.Router();

router.get('/post/:postId/comment', async (req, res) => {
    res.send("ok");
});

router.post('/post/:postId/comment', async (req, res) => {
    const {postId} = req.params;
    const {user_id, content} = req.body;
    try{
        let post = await Post.findOne({
            where: {
                id: postId
            }
        });
        if(!post){
            res.status(400).send({
                message: "post not exist "
            });
            return;
        }
        const comment = await Comment.create({user_id, content});
    
        post.addComment(comment);        
        res.send({
            message: "create comment success"
        })

    }catch(error){
        console.log(error);
        res.send({
            message: "create comment fail"
        });
    }
});

router.get('/post/:postId/comment/:commentId', async (req, res) => {});

router.post('/post/:postId/comment/:commentId', async (req, res) => {});

router.delete('/post/:postId/comment/:commentId', async (req, res) => {});

router.delete('/post/:postId/comment', async (req, res) => {});

module.exports = router;
