const router = require("express").Router();
const { User, Post ,Comments} = require("../models");

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
    res.render("homepage", { posts , loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// GET one post
router.get("/post/:id", async (req, res) => {
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

    const posts = dbPostData.get({ plain: true });
    res.render("post", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Sign Up route
router.get("/signUp", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signUp");
});

//create a new comment in database
router.post("/new/comment", async (req, res) => {
  let belongs_to_post = req.body.belongs_to_post;
  let content = req.body.content;
  let writer = req.session.user_id;

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
})
module.exports = router;
