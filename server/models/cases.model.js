

module.exports=(connection,DataTypes)=>{
    const cases= connection.define("cases",{
    title: DataTypes.STRING,
    details: DataTypes.STRING,
    step: DataTypes.STRING,
    number: DataTypes.INTEGER,
    state: DataTypes.ENUM("pending","in progress","closed"),
    
    } )
    return cases
    }