const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const {validationResult, check} = require('express-validator')

const Users = require('../models/Users')

router.get('/', (req,res)=>{
    res.render('register.ejs')
})

router.post(
    '/',
    [
    check('firstname')
      .isAlpha()
      .withMessage('Numbers are not allowed in this field')
      .bail(),

    check('lastname')
      .isAlpha()
      .withMessage('Numbers are not allowed in this field')
      .bail(),

    check('email')
    .isEmail()
    .withMessage('email is invalid')
    .custom( async (email)=>{
        const user = await Users.findOne({ email : email})
        console.log(user)
        if(user){
            throw new Error('this email is already in use')
        }
    })
    .bail(),

    check('emp_id')
    .notEmpty()
    .withMessage('this field can not be empty')
    .bail()
    .custom( async (emp_id)=>{
        const user = await Users.findOne({ emp_id : emp_id})
        // console.log(user)
        if(user){
            throw new Error('this employee id is already in use kindly check for uniqueness')
        }
    })
    .bail(),

    check('og_name')
      .isAlpha()
      .withMessage('Numbers are not allowed in this field')
      .bail(),
      
  ],
  async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 5);

    const user = new Users({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      emp_id: req.body.emp_id,
      og_name: req.body.og_name,
    });
    try {
      await user.save();
      res.redirect('/login');
    } catch (err) {
      res.status(400).send(err);
    }
  }
)
module.exports = router;