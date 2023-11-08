

module.exports=(connection,DataTypes)=>{
    const admin= connection.define("admin",{
    
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password:DataTypes.STRING,
    } )
    return admin
    }