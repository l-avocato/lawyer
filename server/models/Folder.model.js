
module.exports=(connection,DataTypes)=>{

    const folder= connection.define("folder",{
    
          name: {
            type: DataTypes.STRING,
          },
       


    } )
    return folder
    }