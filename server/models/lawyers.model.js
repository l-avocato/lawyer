

module.exports=(connection,DataTypes)=>{
    const lawyers= connection.define("lawyers",{
    
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password:DataTypes.STRING,
    corfirmedPassword:DataTypes.STRING,
    adress: DataTypes.STRING,
    phoneNumber: DataTypes.BIGINT,
    ImageUrl: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    CIN: DataTypes.INTEGER,
    langitude: DataTypes.INTEGER,
    latitude: DataTypes.INTEGER,
    IsBlocked: DataTypes.BOOLEAN,
    isAvailable: DataTypes.BOOLEAN,
    certifications: DataTypes.STRING,
    field: DataTypes.STRING,
    IsVerified: DataTypes.BOOLEAN,
    price: DataTypes.INTEGER,
    } )
    return lawyers
    }