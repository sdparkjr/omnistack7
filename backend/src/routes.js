const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const postController = require('./controllers/postController');
const likeController = require('./controllers/likeController');

const routes = express.Router();
const upload = multer(uploadConfig);


routes.get('/posts', postController.index);
routes.post('/posts', upload.single('image'), postController.store);

routes.post('/posts/:id/like', likeController.store);

// routes.get('/', (req, res) => {
//     return res.send(`Hello- ${req.query.name}`);
// })

module.exports = routes;