let userLogged = function (req, res, next){

    userLog= req.session.userLogged;

    if(userLog){
       return res.redirect('/user/logged')
    }
next()
}

module.exports=userLogged;