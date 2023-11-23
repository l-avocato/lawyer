

module.exports=(connection,DataTypes)=>{
    const rating= connection.define("rating",{
    stars: DataTypes.INTEGER,
    review: DataTypes.STRING,
    } )
    return rating
    }