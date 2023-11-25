module.exports = (connection, DataTypes) => {
  const fave = connection.define("fave", {});
  return fave;
};
