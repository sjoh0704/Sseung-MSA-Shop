const express = require('express');
const { Post, Comment } = require('../models');
const router = express.Router();

router.get('/post/:postId/comment', async (req, res) => {
    res.send({
        message: 'ok',
    });
});

router.post('/post/:postId/comment', async (req, res) => {
    res.send({
        message: 'ok',
    });
});

router.get('/post/:postId/comment/:commentId', async (req, res) => {});

router.post('/post/:postId/comment/:commentId', async (req, res) => {});

router.delete('/post/:postId/comment/:commentId', async (req, res) => {});

router.delete('/post/:postId/comment', async (req, res) => {});

module.exports = router;
