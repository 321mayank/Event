const password = (value, helpers)=>{
    if (value.lenght < 8 ) {  // condition for password lenght must be 8 min
        return helpers.message('password must contain 8 characters');
    }

    if (!value.match(/\d/) || !value.match(/[a-zA-z]/)){ 
        // (/\d/) means value should be between 0 to 9 
        return helpers.message('Password must contain 1 number and 1 letter ')
    }
    return value;



};

module.exports ={
    password
}