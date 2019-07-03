// Get all models in models directory
const db = require("../models");

module.exports = function(app) {
    
    // Gets all bowls of cereal in database
    app.get("/api/all", function(req, res) {
        db.Cereal.findAll({}).then(function(dbCereal) {
            res.json(dbCereal);
        });
    });
    
    // Adds a new bowl of cereal
    app.post("/api/new", function(req, res) {
        console.log("New bowl of cereal: "), req.body;
        db.Cereal.create({
            name: req.body.name,
            eaten: req.body.eaten,
        }).then(function(dbCereal) {
            res.send(dbCereal);
        });
    });

    // Updates the given bowl of cereal as eaten
    app.put("/api/:name", function(req, res) {
        db.Cereal.update(
            {eaten: true},
            {where: {name: req.params.name}}
        ).then(function(dbCereal) {
            res.json(dbCereal);
        })
    });

    // Deletes a bowl of cereal
    app.delete("/api/:name", function(req, res) {
        db.Cereal.destroy(
            {where: {name: req.params.name}}
        ).then( function(dbCereal) {
            res.json(dbCereal);
        })
    })

};