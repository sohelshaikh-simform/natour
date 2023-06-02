const { default: mongoose } = require("mongoose");

const userSchema=new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "User must have name"],
        unique: true,
        trim: true,
      },
    email:{
        type:String,
        required:[true,"User must have email"],
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
})

const User=mongoose.model("User",userSchema)

module.exports=User
// const emailRegex=/^[A-z0-9._]+@[A-z0-9-]+\.[a-z]{2,3}$/
// const passwordRegex=/^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)/