module.exports=(connection,DataTypes)=>{
    const phase= connection.define("phase",{
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
          },
          label: {
            type: DataTypes.STRING,
          },
          positionX: {
            type: DataTypes.INTEGER,
          },
          positionY: {
            type: DataTypes.INTEGER,
          },
          background: {
            type: DataTypes.STRING,
            defaultValue : "gold"
          },
          color: {
            type: DataTypes.STRING,
            defaultValue : "#333"
          },
          border: {
            type: DataTypes.STRING,
            defaultValue : "1px solid #222138",
          },
          width: {
            type: DataTypes.INTEGER,
            defaultValue: "180"
          },
          borderRadius: {
            defaultValue:"100px",
            type: DataTypes.STRING,
          },
        
    } )
    return phase
    }