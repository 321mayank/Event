
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      
        userID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        salt: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        passHash: {
            type: DataTypes.STRING,
            allowNull: false
        }
     
    
    })

    return User
}