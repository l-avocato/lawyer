

module.exports=(connection,DataTypes)=>{
    const lawyers= connection.define("lawyers",{
    
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password:DataTypes.STRING,
    corfirmedPassword:DataTypes.STRING,
    adress: DataTypes.STRING,
    phoneNumber: DataTypes.BIGINT,
    adress: DataTypes.STRING,
    ImageUrl: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    CIN: DataTypes.INTEGER,
    langitude: DataTypes.DOUBLE,
    latitude: DataTypes.DOUBLE,
    IsBlocked: DataTypes.BOOLEAN,
    isAvailable: DataTypes.BOOLEAN,
    certifications: DataTypes.STRING,
    field: DataTypes.STRING,
    IsVerified: DataTypes.BOOLEAN,
    price: DataTypes.INTEGER,
    } )
    return lawyers
    }