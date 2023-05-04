const jwt = require('jsonwebtoken');

const users = require('../Models/Users/Users');
// create blogs 
function allUsers(app) {
     app.post('/users', async (req, res) => {
          try {
            const {email} = req.body;
            // Check if user already exists in the database
            let user = await users.findOne({ email});
            if (user) {
              // If user exists, update their details
              await user.save();
              
            } else {
              // If user does not exist, create a new user
              user = new users({ email});
              await user.save();
            }
            const token = jwt.sign({ email:email}, '2ed56fb58b8672c3eb25d6d76fb638ef2e9d0037dcd18471d992b33302c5aee63070b1f7205e55b78102c28da8342cfdda2a5edcfe6385050933c9f3a8be3e85',{ expiresIn: '1h' });
            // Return the updated or created user
            res.status(200).json({user,token});
          } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
          }
        });
}
  module.exports = allUsers;