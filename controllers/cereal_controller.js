const Cereal = require("../models/cereal.js");

module.exports = function(app) {
    
    // Gets all bowls of cereal in database
    app.get("/api/all", function(req, res) {
        Cereal.findAll({}).then(function(results) {
            res.json(results);
        });
    });
    
    // Adds a new bowl of cereal
    app.post("/api/new", function(req, res) {
        console.log("New bowl of cereal: "), req.body;
        Cereal.create({
            name: req.body.name,
            eaten: req.body.eaten,
        }).then(function(results) {
            res.end();
        });
    });

    // Updates the given bowl of cereal as eaten
    app.put("/api/:name", function(req, res) {
        Cereal.update(
            {eaten: true},
            {where: {name: req.params.name}}
        ).then(function(result) {
            res.json(result);
        })
    });

    // Deletes a bowl of cereal
    app.delete("/api/:name", function(req, res) {
        Cereal.destroy(
            {where: {name: req.params.name}}
        ).then( function(result) {
            res.json(result);
        })
    })

};