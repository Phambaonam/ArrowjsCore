"use strict";

/**
 * @exports config/database
 */
module.exports = {
  db: {
    host: process.env.DB_HOST ||'localhost',
    port: process.env.DB_PORT || '5432',
    database: process.env.DB_NAME || 'arrow',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    dialect: 'postgres',
    logging: false
  },

  /** Developer defines logic to associate models.<br>
   For example
   <pre><code>models.post.belongsTo(models.user, {foreignKey: "created_by"})
   models.role.hasMany(models.user, {foreignKey: 'role_id'});</code></pre> */
  associate: function (models) {

  }
};