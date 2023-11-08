

module.exports=(connection,DataTypes)=>{
    const notification= connection.define("notification",{
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    type: DataTypes.STRING,
    } )
    return notification
    }