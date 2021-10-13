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
  //normally need to do this but not anymore thanks to the ...req.body
  //this is for referance
  // let belongs_to_post = req.body.belongs_to_post;
  //let content = req.body.content;
  let writer = req.session.user.id; //req.session.user.id

  try {
    const createUser = await Comments.create({
      ...req.body,
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
  res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
});

//render page to create a new post

router.get("/create", (req, res) => {
  res.render("createAPost", { loggedIn: req.session.loggedIn });
});

//Create a new Post
router.post("/create", async (req, res) => {
  //normally need to do this but not anymore thanks to the ...req.body
  //this is for referance
  //let title = req.body.title;
  // let content = req.body.content;
  // let author = req.session.user.id
  try {
    const createPost = await Post.create({
      ...req.body,
      author: req.session.user.id,
    });
    res.status(200).json(createPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/edit/:id", async (req, res) => {
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
  res.render("editMyPosts", { post, loggedIn: req.session.loggedIn });
});

// Update a post
router.put("/edit/:id", async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedPost) {
      res.status(404).json({ message: "No post found!" });
      return;
    }

    res.status(200).json(updatedPost);

  } catch (err) {
    res.status(500).json({ message: err });
  }
});
module.exports = router;
