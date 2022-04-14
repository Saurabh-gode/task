const express =require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt =require('bcrypt')
const Users = require('../models/Users')
const LocalStrategy = require('passport-local').Strategy;

const authenticateUser = async(email, password, done )=>{
    const user = await Users.findOne({ email : email})
    // console.log(user.password)
    if(!user){
        return done(null, false, { message: 'no user with that email'})
    }

    try{
        if(await bcrypt.compare(password, user.password)){
            // console.log(await bcrypt.compare(password, user.password))
            return done(null, user) 
        }else{
          return done(null, false, {message:' wrong password'})
        }
    }catch(e){
        return done(e)
    }
}

passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
passport.serializeUser((user,done)=> done(null, user.id))
passport.deserializeUser((user,done)=> { 
   return done(null, id => Users.find({id: id}) )
})


router.get('/', (req,res)=>{
    res.render('login.ejs',)
})

router.post('/', passport.authenticate('local', {
    successRedirect:'/userlist',
    failureRedirect:'/login',
    failureFlash: true
}))

module.exports = router;