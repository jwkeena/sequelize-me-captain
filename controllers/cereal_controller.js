const Cereal = require("../models/cereal.js");

module.exports = function(app) {
    app.get("/api/all", function(req, res) {
        Cereal.findAll({}).then(function(results) {
            res.json(results);
        });
    });
    
    app.post("/api/new", function(req, res) {
        console.log("New bowl of cereal: "), req.body;
        Cereal.create({
            name: req.body.name,
            eaten: req.body.eaten,
        }).then(function(results) {
            res.end();
        });
    });
};