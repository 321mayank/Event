module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define("event", {
      
        orgName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eventName: {
            type: DataTypes.STRING
        }
     
    
    })
return Event

}