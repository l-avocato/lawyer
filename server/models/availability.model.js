

module.exports=(connection,DataTypes)=>{
    const availability= connection.define("availability",{
        date: DataTypes.DATE,
        time: DataTypes.TIME,
        available: DataTypes.BOOLEAN,
    } )
    return availability
    }