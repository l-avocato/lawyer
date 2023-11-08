

module.exports=(connection,DataTypes)=>{
    const receipt= connection.define("receipt",{
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    } )
    return receipt
    }