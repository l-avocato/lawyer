
module.exports=(connection,DataTypes)=>{

    const file= connection.define("file",{
    
          name: {
            type: DataTypes.STRING,
          },
          link: {
            type: DataTypes.STRING,
          },


    } )
    return file
    }