// Creates a "Ceral" model that matches up with DB

module.exports = function(sequelize, DataTypes) {

  const Cereal = sequelize.define("Cereal", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    eaten: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });
  
  return Cereal;
};