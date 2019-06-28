const Sequelize = require("sequelize");
const connection = require("../config/connection.js"); // In the connection file, the exported variable is called 'sequelize', but here I'm calling it connection

// Creates a "Ceral" model that matches up with DB
const Cereal = connection.define("cereals", {
  name: Sequelize.STRING,
  eaten: Sequelize.BOOLEAN,
});

// Syncs with DB
Cereal.sync();

// Makes the Cereal Model available for other files (will also create a table)
module.exports = Cereal;