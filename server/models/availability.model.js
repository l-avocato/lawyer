

module.exports=(connection,DataTypes)=>{
    const availability= connection.define("availability",{
        date: DataTypes.DATE,
        time: DataTypes.TIME,
        available: DataTypes.BOOLEAN,
        lawyerId:DataTypes.INTEGER,
     } , {
            indexes: [
              {
                fields: ["date", "time", "lawyerId"],
                name: "lawyer-availability",
              },
            ],
          } )
    return availability
    }