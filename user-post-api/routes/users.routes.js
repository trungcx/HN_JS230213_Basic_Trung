const express = require("express");
const router = express.Router();

const fs = require("fs");
const bodyParser = require("body-parser");
// **** USE **** //
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const usersPath = "./dev-data/users.json";

//GET ALL
router.get("/", (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync(usersPath));
    if (users) {
      res.json(users);
    } else {
      res.json({
        message: "No user data",
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
    const users = JSON.parse(fs.readFileSync(usersPath));
    const findUser = users.find((e) => e.id === +id);
    if (findUser) {
      res.json(findUser);
    } else {
      res.json({
        message: "User not exist",
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
    const { email } = req.body;
    if (email) {
      next();
    } else {
      res.json({
        message: "Please fill email",
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
    const { email } = req.body;
    const users = JSON.parse(fs.readFileSync(usersPath));
    const newUser = {
      id: users[users.length - 1].id + 1,
      name: "",
      username: "",
      email,
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
      phone: "",
      website: "",
      company: {
        name: "",
        catchPhrase: "",
        bs: "",
      },
    };
    users.push(newUser);
    // console.log(users);
    fs.writeFileSync(usersPath, JSON.stringify(users));
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
    const { email } = req.body;
    const users = JSON.parse(fs.readFileSync(usersPath));
    const findIndex = users.findIndex((e) => e.id === +id);
    if (findIndex > -1) {
      users[findIndex].email = email;
      //   console.log(users[findIndex]);
      fs.writeFileSync(usersPath, JSON.stringify(users));
      res.json({
        message: "Edit succeed",
      });
    } else {
      res.json({
        message: "User not exist",
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
    const users = JSON.parse(fs.readFileSync(usersPath));
    const findIndex = users.findIndex((e) => e.id === +id);
    if (findIndex > -1) {
      users.splice(findIndex, 1);
      //   console.log(users);
      fs.writeFileSync(usersPath, JSON.stringify(users));
      res.json({
        message: "Delete succeed",
      });
    } else {
      res.json({
        message: "User not exist",
      });
    }
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

module.exports = router;
