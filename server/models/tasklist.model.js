
module.exports=(connection,DataTypes)=>{
    const taskList= connection.define("taskList",{
    
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        isCompleted: DataTypes.BOOLEAN,
        deadline: DataTypes.DATE,
    } )
    return taskList
    }