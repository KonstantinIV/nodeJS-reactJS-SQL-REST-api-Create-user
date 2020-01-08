
module.exports.insertUser = function insertUser(){
    return 'INSERT  iNTO user (username) values (?);';
}
 
module.exports.getUser = function getUser(){
    return 'Select username from user where username=?;';
}
module.exports.getUsers = function getUsers(){
    return 'Select ID,username from user ;';
}


module.exports.updateUser = function updateUser(){
    return 'UPDATE user SET   username=?    WHERE   ID=? ;';
    
}


module.exports.deleteUser = function deleteUser(){
    return 'DELETE user.* FROM user where ID=?;';
}