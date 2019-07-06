// Get all models in models directory
const db = require("../models");

module.exports = function (app) {

    // Gets all bowls of cereal in database and displays them to the user
    app.get("/", function (req, res) {
        db.Cereal.findAll({}).then(function (dbCereal) {

            // console.log("This is the raw sequelize db response: ", dbCereal)
            let handlebarsObject = {
                cereals: []
            };

            for (let i = 0; i < dbCereal.length; i++) {
                handlebarsObject.cereals.push(dbCereal[i].dataValues);
            };

            // console.log("This is the handlebars object: ", handlebarsObject);
            res.render("index", handlebarsObject);
        });
    });

    // Adds a new bowl of cereal
    app.post("/api/new", function (req, res) {
        console.log("New bowl of cereal added: ", req.body.name);
        db.Cereal.create({
            name: req.body.name,
            eaten: req.body.eaten,
        }).then(function (dbCereal) {
            res.render("index", dbCereal);
        });
    });

    // Updates the given bowl of cereal as eaten
    app.put("/api/:id", function (req, res) {
        db.Cereal.update(
            // Flipping the boolean here is apparently impossible. Must be done client side
            {
                eaten: req.body.eaten
            }, {
                where: {
                    id: req.params.id
                }
            }
        ).then(function (dbCereal) {
            res.render("index", dbCereal);
        });
    });

    // Deletes a bowl of cereal
    app.delete("/api/:id", function (req, res) {
        db.Cereal.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            if (result.affectedRows == 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            } else {
                res.status(200).end();
            };
        });
    });

};