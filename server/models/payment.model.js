
module.exports=(connection,DataTypes)=>{
    const payment= connection.define("payment",{
    amount: DataTypes.INTEGER,
    rest : DataTypes.INTEGER,
    paid: DataTypes.INTEGER,
  
    } )
    return payment
    }