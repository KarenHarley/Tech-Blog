const router = require("express").Router();
const { User, Post, Comments } = require("../models");

//show all of the posts in  "home" (homepage)
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        //this is a join
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("homepage", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// GET one post
router.get("/post/:id", async (req, res) => {
  let post;
  let comments;
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        //this is a join
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    post = dbPostData.get({ plain: true });
    console.log(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  try {
    const allComments = await Comments.findAll({
      include: [
        //this is a join
        {
          model: User,
          attributes: ["username"],
        },
      ],
      where: { belongs_to_post: req.params.id },
    });
    comments = allComments.map((comment) => comment.get({ plain: true }));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  res.render("post", { comments, post, loggedIn: req.session.loggedIn });
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// Sign Up route
router.get("/signUp", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signUp");
});

//create a new comment in database
router.post("/new/comment", async (req, res) => {
  let belongs_to_post = req.body.belongs_to_post;
  let content = req.body.content;
  let writer = req.session.user.id; //req.session.user.id

  try {
    const createUser = await Comments.create({
      belongs_to_post: belongs_to_post,
      content: content,
      writer: writer,
    });
    res.json(createUser);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//Render all of the dashboard

router.get("/dashboard", async (req, res) => {
  let posts = [];
  if (req.session.loggedIn) {
    const dbPostData = await Post.findAll({
      include: [
        //this is a join
        {
          model: User,
          attributes: ["username"],
        },
      ],
      where: { author: req.session.user.id },
    });

    posts = dbPostData.map((post) => post.get({ plain: true }));
  }
  console.log(posts);
  res
    .render("dashboard", { posts, loggedIn: req.session.loggedIn })

});

//render page to create a new post

router.get("/create", (req, res) => {
  res.render("createAPost",{loggedIn: req.session.loggedIn });
});

//Create a new Post
router.post("/create", async (req, res) => {
  let title = req.body.title;
  let content = req.body.content;
  let author = req.session.user.id

  try {
    const createPost = await Post.create({
      title: title,
      content: content,
      author: author,
    });
    res.json(createPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }

  
});
module.exports = router;
