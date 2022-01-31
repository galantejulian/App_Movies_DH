const fs = require('fs');
const path = require('path');
var uniqid = require('uniqid')
const userFilePath = path.join(__dirname, '../data/users.json');
const usersJSON = fs.readFileSync(userFilePath, 'utf-8');


const User = {

getData: function(){
    if (usersJSON == "") {
        usersBD = []
        usersJSON = JSON.stringify(usersBD, null, ' ');
        fs.writeFileSync(userFilePath, usersJSON);
        return usersBD
    }
    else {
        return JSON.parse(usersJSON)

    }
},

create: function(userData){
    let generateId= uniqid('user-')
	let allUsers = this.getData();
	let newUser = {
            id: generateId,
			...userData
		}
		allUsers.push(newUser);
		fs.writeFileSync(userFilePath, JSON.stringify(allUsers, null,  ' '));
		return newUser;

},
// findByPk: function(id){
// let allUsers = this.getData();

// let userFound= allUsers.find(user=>user.id==id)
// return userFound;
// },

findByEmail: function(field, text){
let allUsers = this.getData();

let userFoundbyField = allUsers.find(user=>user[field]===text)
return userFoundbyField
},

delete: function(id){
let allUsers = this.getData();
let finalUsers = allUsers.filter(user=>user.id!=id)
return fs.writeFileSync(userFilePath, JSON.stringify(finalUsers, null,  ' '));
}

} 

module.exports = User;