const userController=require('../controller/userController')
const authen=require('../utils/auth')
const express=require('express')
const router=express.Router()


router.route('/register').post(userController.register)
router.route('/login').post(userController.login)
router.route('/auth').get(authen.auth)

module.exports=router