module.exports = (connection, DataTypes) => {
  const fave = connection.define("fave", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  });
  return fave;
};
