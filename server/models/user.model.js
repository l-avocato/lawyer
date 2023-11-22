
module.exports=(connection,DataTypes)=>{
    const user= connection.define("user",{
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password:DataTypes.STRING,
    phoneNumber: DataTypes.BIGINT,
    adress: DataTypes.STRING,
    ImageUrl: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    CIN: DataTypes.INTEGER,
    langitude: DataTypes.DOUBLE,
    latitude: DataTypes.DOUBLE,
    IsBlocked: DataTypes.BOOLEAN,
    } )
    return user
    }