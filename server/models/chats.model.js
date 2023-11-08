
module.exports=(connection,DataTypes)=>{
    const chats= connection.define("chats",{
    message: DataTypes.STRING,
    sender: DataTypes.STRING,
    receiver: DataTypes.STRING,
    } )
    return chats
    }