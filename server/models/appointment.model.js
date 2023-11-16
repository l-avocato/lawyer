

module.exports=(connection,DataTypes)=>{
    const appointment= connection.define("appointment",{
   date: DataTypes.DATE,
   time: DataTypes.TIME,
   reason: DataTypes.STRING,
   accepted: DataTypes.ENUM("pending","accepted","declined"),
   state: DataTypes.ENUM("upcoming","cancelled","completed"),
    } )
    return appointment
    }