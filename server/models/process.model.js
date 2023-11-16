module.exports=(connection,DataTypes)=>{
    const process= connection.define("process",{

    
          name: {
            type: DataTypes.STRING,
            defaultValue:'Phase One'
          },
          date: {
            type: DataTypes.DATE,
            defaultValue: new Date()
          },
          price: {
            type: DataTypes.INTEGER,
            defaultValue: 0
          }
        
    } )
    return process
    }
