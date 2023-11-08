
module.exports=(connection,DataTypes)=>{
    const phase= connection.define("phase",{
        name: DataTypes.STRING,
        step: DataTypes.STRING,
        
    } )
    return phase
    }