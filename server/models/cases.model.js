

module.exports=(connection,DataTypes)=>{
    const cases= connection.define("cases",{
    title: DataTypes.STRING,
    details: DataTypes.STRING,
    step: DataTypes.STRING,
    number: DataTypes.INTEGER,
    state:{type: DataTypes.ENUM("pending","in progress","closed"),
    defaultValue: "in progress"
            },
    client: DataTypes.ENUM("plaintiff","defendant")
    
    } )
    return cases
    }