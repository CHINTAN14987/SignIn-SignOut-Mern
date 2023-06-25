const express = require("express");
const app = express();

const cors = require("cors");
require("./db/config");
const Users = require("./db/Users");
app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
  let user = new Users(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  console.log(req.body, "response");
  if (req.body.password && req.body.email) {
    let user = await Users.findOne({ email: req.body.email }).select(
      "-password"
    );
    console.log(user, "user");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No user Found" });
    }
  } else {
    res.send({ result: "No User Found" });
  }
});
app.listen(5000);
