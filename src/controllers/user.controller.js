const User = require("../models/users.model");

module.exports = {
    register: async (req, res) => {
        try {
          const phoneNumber = req.body.phoneNumber;
            const existingUser = await User.findOne({ phoneNumber });
            if (!existingUser) {
                return res.status(404).json({ message: "User not found" });
            }
            const user = new User ({
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                voted: req.body.voted
            });

            const savedUser = await user.save();
            res.json({data: savedUser});
        } catch (error) {
            console.log(error);
            res.status(500).json({error});
        }
    },

    getUsers: async (req, res, next) => {
        try {
          const users = await User.find({});
          res.status(200).json({
          data: users
          });
        } catch (error) {
          next(error)
          }
      },

      updateUser: async (req, res, next) => {
        try {
        const update = req.body
        const userId = req.params.userId;
        await User.findByIdAndUpdate(userId, update);
        const user = await User.findById(userId)
        res.status(200).json({
          data: user,
          message: 'User has been updated'
        });
        } catch (error) {
        next(error)
        }
    },
     
    deleteUser: async (req, res, next) => {
        try {
        const userId = req.params.userId;
        await User.findByIdAndDelete(userId);
        res.status(200).json({
          data: null,
          message: 'User has been deleted'
        });
        } catch (error) {
        next(error)
        }
    }
}