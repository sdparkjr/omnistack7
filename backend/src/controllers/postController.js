const Post = require('../models/post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs'); /* filesystem*/
//const { post } = require('../routes');

module.exports = {

    async index(req, res) {

        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);

    },
    async store(req, res) {

        const { author, place, descriton, hashtags } = req.body;
        const { filename: image } = req.file;

        const [name] = image.split('.');

        const filename = `${name}.jpg`;

        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', filename)
            )

        fs.unlinkSync(req.file.path); //deletar a imagem maior

        const post = await Post.create({
            author, place, descriton, hashtags, filename
        });


        req.io.emit('post', post);

        return res.json({ post });

    }
};