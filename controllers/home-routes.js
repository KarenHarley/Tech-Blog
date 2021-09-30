const router = require('express').Router();
const { User, Post } = require('../models');

//show all of the posts in  "home" (homepage)
router.get('/', async (req, res) => {
    try {
      const dbPostData = await Post.findAll({
        include: [//this is a join
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      const posts = dbPostData.map((post) =>
        post.get({ plain: true })
      );
  
      res.render('homepage', {
        posts,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  //test for project

 