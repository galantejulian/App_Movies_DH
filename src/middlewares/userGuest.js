let userGuest = function (req,res,next){
let userLogged=req.session.userLogged;

if(!userLogged){
    return res.redirect('/user/notLogged')
}
next()

}

module.exports=userGuest;