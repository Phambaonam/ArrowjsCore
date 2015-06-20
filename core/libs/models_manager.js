"use strict";

let fs        = require("fs");
let path      = require("path");
let Sequelize = require("sequelize");

let env       = process.env.NODE_ENV || "development";
let config    = require(__base + 'config/config.js');
let sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db);
let db        = {};

/** Import models core*/
config.getGlobbedFiles(__base + 'core/modules/*/models/*.js').forEach(function (routePath) {
    let model = sequelize["import"](path.resolve(routePath));
    db[model.name] = model;
});
/** Import models user created*/
config.getGlobbedFiles(__base + 'modules/*/models/*.js').forEach(function (routePath) {
    let model = sequelize["import"](path.resolve(routePath));
    db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
