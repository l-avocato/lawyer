
module.exports=(connection,DataTypes)=>{
    const media= connection.define("media",{
    type: DataTypes.STRING,
    url: DataTypes.STRING,
    } )
    return media
    }