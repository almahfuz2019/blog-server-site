const jwt = require("jsonwebtoken");
const users = require("../Models/Users/Users");
// create blogs
function allUsers(app) {
  app.get('/userscount', async (req, res) => {
    try {
      const count = await users.countDocuments();
      res.send({count});
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  app.post("/users", async (req, res) => {
    try {
      const { email } = req.body;
      const {role} = req.body;
      // Check if user already exists in the database
      let user = await users.findOne({email});
     //  console.log(email,role);
     if (user) {
          // If user exists, update their details
          //    await user.save();
     } else {
          // If user does not exist, create a new users
          user = new users({ email, role });
          await user.save();
     }
     console.log(user);
      const token = jwt.sign(
        { email: user.email, role: user.role },
        "2ed56fb58b8672c3eb25d6d76fb638ef2e9d0037dcd18471d992b33302c5aee63070b1f7205e55b78102c28da8342cfdda2a5edcfe6385050933c9f3a8be3e85",
        { expiresIn: "1h" }
      );
      // Return the updated or created user
      res.status(200).json({ user, token });
      console.log(user);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });
  app.get("/getusers", async (req, res) => {
    try {
      const readusers = await users.find();
      if (readusers) {
        res.status(200).send(readusers);
      } else {
        res.status(404).send({
          message: "Users is not found",
        });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
  // data update
  app.put("/updaterole/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updatedProduct = await users.updateOne(
        { _id: id },
        {
          $set: {
            role: req.body.role,
          },
        }
      );
      if (updatedProduct) {
        console.log(updatedProduct);
        res.status(200).send(updatedProduct);
      } else {
        res.status(404).send({
          message: "Category is not updated",
        });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
}
module.exports = allUsers;
