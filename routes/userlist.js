const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = require('../models/Employee');


const db = mongoose.connection;
db.once('open', async () => {
  if (Employee.countDocuments().exec() > 0){
    return
  }
  // function to populate empty database
  // else{
    // try {
    //   addEmployees();
    // } catch (err) {
    //   console.log(err);
    // }
  // }
});

const addEmployees= async ()=> {
  for (let i = 1; i <= 50; i++) {
    const emp = new Employee({
      firstname: `emp${i}`,
      lastname: `emp${i}_lastName`,
      email: `emp${i}@email.com`,
      emp_id: `id${i}`,
      og_name: `organisationABC${i}`,
    });
    try {
      await emp.save();
    } catch (err) {
      console.log(err);
    }
  }
}

// checks if some user is logged in or not 
const checkAuthenticated = (req, res, next) =>{
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}


const paginate = async (req, res, next) => {
  try {
    let page =req.query.page
    let size = req.query.limit;
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }

    const limit = parseInt(size);
    const skip = (page - 1) * size;

    const users = await Employee.find().limit(limit).skip(skip);

    res.send({
      page,
      size,
      data: users,
    });
  } catch (error) {
    res.sendStatus(500).send(error.message);
  }
}

const SearchRecord = async( req, res ,next)=>{
  const name = req.query.name;
  try{
    const emp = await Employee.find((emp)=> emp.firstname=== name )

    if(!emp){
      res.send('no data found')
    }else{ 
      res.send(emp)
    }
    
  }catch(err){
    console.log(err)
  }
}

router.get('/', checkAuthenticated, paginate);
module.exports = router;
