const e = require('express');
const express = require('express');
const router = express.Router();
const postsService = require('../service/postsService');

router.get('/posts', async function (req, res){
    const posts = await postsService.getPosts();
    res.json(posts);
});

router.post('/posts', async function (req, res){
    const post = req.body;
    try {
        const newPost = await postsService.savePost(post)
        res.status(201).json(newPost);
    } catch (error) {
        if (error.message === 'Post already exists'){
            res.status(409).send(error.message);
        }else{
            res.status(500).send(error.message);
        }
    }
});

router.put('/posts/:id', async function (req, res){
    const post = req.body;
    try {
        await postsService.updatePost(req.params.id, post)
        res.status(204).end();
    } catch (error) {
        res.status(404).send(error.message);
    }
    
});

router.delete('/posts/:id', async function (req, res){
    await postsService.deletePost(req.params.id)
    res.status(204).end();
});


module.exports = router;