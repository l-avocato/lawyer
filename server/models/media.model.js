
module.exports=(connection,DataTypes)=>{
    const media= connection.define("media",{
    type: DataTypes.STRING,
    url: DataTypes.STRING,
    name : DataTypes.STRING,
    seen : {
        type: DataTypes.BOOLEAN,
        defaultValue: true
        
      }
    } )
    return media
    }