

module.exports=(connection,DataTypes)=>{
    const category= connection.define("category",{
  name: DataTypes.ENUM(["Tax" ,"Estate Planning", "Employment and Labor", "Criminal", "Business","Family","Intellectual Property","Immigration", "Other"]),
} )
    return category
    }