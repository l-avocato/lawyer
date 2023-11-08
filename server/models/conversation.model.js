
module.exports=(connection,DataTypes)=>{
    const conversation= connection.define("conversation",{
    name: DataTypes.STRING,
    participants: DataTypes.STRING,
  
    } )
    return conversation
    }