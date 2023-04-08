
module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define("organization", {
      
        orgID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        userID: {
            type: DataTypes.STRING,
            allowNull: false
        }
     
    
    })

    return Organization
}