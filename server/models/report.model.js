

module.exports=(connection,DataTypes)=>{
    const report= connection.define("report",{
    type: DataTypes.INTEGER,
    body: DataTypes.STRING,
    } )
    return report
    }