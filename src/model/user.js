
module.exports.insertUser = function insertUser(){
    return 'INSERT  iNTO user (username) values (?);';
}
 
module.exports.getUser = function getUser(){
    return 'Select username from user where username=?;';
}



module.exports.updateUser = function updateUser(){
    return 'UPDATE user SET   username=?    WHERE   username=? ;';
    
}


module.exports.deleteUser = function deleteUser(){
    return 'DELETE user.* FROM user where username=?;';
}