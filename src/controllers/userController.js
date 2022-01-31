const { validationResult } = require('express-validator');
const bcryptjs = require('bcrypt')  
const UserModel = require('../models/User');
const cookie = require('cookie-parser');

const userController = {
    registro: function (req, res) {
        res.render("register");
      },


      create:  function (req, res) {
        let errors = validationResult(req);
        if(!errors.isEmpty()){
        res.render('register', {errors: errors.mapped(), old: req.body})
        }else{
            let userData = {
            nombre:req.body.nombre,
            email:req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            }
            let email = req.body.email;
        if(UserModel.findByEmail('email', email) != undefined){
        res.render('register', {errors: {nombre: {msg: "este mail ya se encuentra registrado"}}})
        }else{
          UserModel.create(userData)
        }
        return res.render('login')
        }
        },
        login: function (req, res){
            res.render('login')
        },
        loginProcess: function(req, res){
            let errors = validationResult(req);
            if(!errors.isEmpty()){
              res.render('login', {errors: errors.mapped(), old: req.body})
              }else{
          let email = req.body.email;
          let userToLogin =UserModel.findByEmail('email', email)
          console.log(userToLogin)
                if (userToLogin === undefined){
          res.render('login', {errors: {email: {msg: "este mail no se encuentra registrado"}}})
                } else if (!bcryptjs.compareSync(req.body.password, userToLogin.password)){
                  res.render('login', {errors: {password: {msg: "las credenciales no coinciden"}}})
                }
                else {
                  delete userToLogin.password;
                  req.session.userLogged = userToLogin;
                  return res.redirect('/user/profile')
                }
                }
          },
  profile: function(req, res){
   let userLogged = req.session.userLogged
  res.render('profile', {userLogged})
  },
  logged: function(req,res){
    let userLogged= req.session.userLogged;
    res.render('logged', {userLogged})
  },
  notLogged: function(req, res){
    res.render('notLogged')
  }
}

module.exports = userController;