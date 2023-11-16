
module.exports=(connection,DataTypes)=>{
    const note= connection.define("note",{
          comment : {
            type: DataTypes.STRING},
            seen : {
              type: DataTypes.BOOLEAN,
              defaultValue: true
              
            }
    } )
    return note
    }