
module.exports=(connection,DataTypes)=>{
    const note= connection.define("note",{
          comment : {
            type: DataTypes.STRING},
            seen : {
              type: DataTypes.BOOLEAN,
              defaultValue: true
              
            },
            title : {type: DataTypes.STRING},
            type : {type: DataTypes.ENUM ("notes", "personnel", "urgent" )}


    } )
    return note
    }