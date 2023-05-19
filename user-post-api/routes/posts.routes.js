const express = require("express");
const router = express.Router();

const fs = require("fs");
const bodyParser = require("body-parser");

// **** USE **** //
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const postsPath = "./dev-data/posts.json";

//GET ALL
router.get("/", (req, res) => {
  try {
    const posts = JSON.parse(fs.readFileSync(postsPath));
    if (posts) {
      res.json(posts);
    } else {
      res.json({
        message: "No post data",
      });
    }
  } catch (error) {
    res.json({
      message: error,
    });
  }
});
// GET ONE
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const posts = JSON.parse(fs.readFileSync(postsPath));
    const findUser = posts.find((e) => e.id === +id);
    if (findUser) {
      res.json(findUser);
    } else {
      res.json({
        message: "Post not exist",
      });
    }
  } catch (error) {
    res.json({
      message: error,
    });
  }
});
// POST (CREAT)
const checkValid = (req, res, next) => {
  try {
    const { title, body, userId } = req.body;
    if (title && body && userId) {
      next();
    } else {
      res.json({
        message: "Please fill all the blank",
      });
    }
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
router.post("/", checkValid, (req, res) => {
  try {
    const { title, body, userId } = req.body;
    const posts = JSON.parse(fs.readFileSync(postsPath));
    const newPost = {
      id: posts[posts.length - 1].id + 1,
      userId: parseInt(userId),
      title,
      body,
    };
    posts.push(newPost);
    // console.log(posts);
    fs.writeFileSync(postsPath, JSON.stringify(posts));
    res.json({
      message: "Add succeed",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});
// PUT (email)
router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, userId } = req.body;
    const posts = JSON.parse(fs.readFileSync(postsPath));
    const findIndex = posts.findIndex((e) => e.id === +id);
    if (findIndex > -1) {
      posts[findIndex] = {
        ...posts[findIndex],
        title,
        body,
        userId: parseInt(userId),
      };
      //   console.log(posts[findIndex]);
      fs.writeFileSync(postsPath, JSON.stringify(posts));
      res.json({
        message: "Edit succeed",
      });
    } else {
      res.json({
        message: "Post not exist",
      });
    }
  } catch (error) {
    res.json({
      message: error,
    });
  }
});
// DELETE
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const posts = JSON.parse(fs.readFileSync(postsPath));
    const findIndex = posts.findIndex((e) => e.id === +id);
    if (findIndex > -1) {
      posts.splice(findIndex, 1);
      //   console.log(posts);
      fs.writeFileSync(postsPath, JSON.stringify(posts));
      res.json({
        message: "Delete succeed",
      });
    } else {
      res.json({
        message: "Post not exist",
      });
    }
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

module.exports = router;
