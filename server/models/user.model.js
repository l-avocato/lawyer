
module.exports=(connection,DataTypes)=>{
    const user= connection.define("user",{
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password:DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    adress: DataTypes.STRING,
    ImageUrl: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    CIN: DataTypes.INTEGER,
    langitude: DataTypes.INTEGER,
    latitude: DataTypes.INTEGER,
    IsBlocked: DataTypes.BOOLEAN,
    } )
    return user
    }