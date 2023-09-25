const express = require('express')
const router= express.Router()
const UserController = require('../Controllers/UserController')
const authMiddleware = require('../Middleware/authMiddleware')

router.post('/usersingup',UserController.UserSignup)
router.post('/userlogin',UserController.UserLogin)
router.get('/getalluser',authMiddleware,UserController.GetAllUser)
router.put('/updateuser/:userId',authMiddleware,UserController.UserUpdate)
router.patch("/updatestatus/:_id",authMiddleware, UserController.UpdateStatus)
router.delete('/deleteuser/:userId',authMiddleware,UserController.deleteuser)

module.exports = router;