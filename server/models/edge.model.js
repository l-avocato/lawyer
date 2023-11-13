
module.exports=(connection,DataTypes)=>{

    const edge= connection.define("edge",{
    
          label: {
            type: DataTypes.STRING,
          },
          type: {
            type: DataTypes.STRING,
          },
         source :DataTypes.INTEGER,
         target :  DataTypes.INTEGER

    } )
    return edge
    }