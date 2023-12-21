const express = require('express')
const router = express.Router()
const {registerUser,loginUser,getUser} = require("../controllers/authControllers")
const fetchUser = require('../middleware/fetchUser')


router.route("/createuser").post(registerUser)
router.route("/login").post(loginUser)
router.route("/getuser").post(fetchUser,getUser)

module.exports = router