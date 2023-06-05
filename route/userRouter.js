const userController=require('../controller/userController')
const express=require('express')
const router=express.Router()


router.route('/register').post(userController.register)
router.route('/login').post(userController.login)

module.exports=router