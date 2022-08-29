const router = require("express").Router();
const {auth_jwt, auth_jwt_admin, auth_admin} = require("../middleware/auth");
const User = require("../model/User");

// router.get("/:id", auth_jwt_admin, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     res.status(201).json(user);
//   } catch (err) {
//     console.log("error on get");
//     res.status(500).json(err);
//   }
// })


module.exports = router;