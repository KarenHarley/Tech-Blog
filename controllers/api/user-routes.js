const router = require("express").Router();
const { User } = require("../../models");

// CREATE new user
router.post("/signUp", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
    //i want the use to go to the homepage
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/*
router.get('/', (req, res) => {
    res.render('homepage', { loggedIn: req.session.loggedIn });
});
*/
// Login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        password: req.body.password,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect password. Please try again!" });
      return;
    }

    let validPassword = false;
    if(dbUserData.password === req.body.password) {
        validPassword = true;    
    }

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      console.log("worked!", req.session.cookie);

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
