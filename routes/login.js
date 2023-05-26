const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const jwtAuth = require('../Middleware/jwt');

router.use(express.json())
require('dotenv').config()

var clients = [{ "username": "root", "password": "toor" }];

const posts = [{ "username": "root", "title": "toor" }];

//login api arent being used in the front end

router.post('/login', async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const details = clients.filter(client => client.username == username)
    const isLoggedIn = details[0].password == password ? true : false;
    if (isLoggedIn) 
    { const acessToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET);
         res.json({acessToken})}

});

router.get('/posts', jwtAuth.authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user))
})




module.exports = router;