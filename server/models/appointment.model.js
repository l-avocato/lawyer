

module.exports=(connection,DataTypes)=>{
    const appointment= connection.define("appointment",{
   date: DataTypes.DATE,
   time: DataTypes.TIME,
   reason: DataTypes.STRING,
   accepted: {
    type: DataTypes.ENUM("pending", "accepted", "declined"),
    defaultValue: "pending"
  },
  state: {
    type: DataTypes.ENUM("upcoming", "cancelled", "completed"),
    defaultValue: "upcoming"
  },
    } )
    return appointment
    }