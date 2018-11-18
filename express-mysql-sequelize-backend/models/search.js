'use strict';
module.exports = (sequelize, DataTypes) => {
  const Search = sequelize.define('Search', {
    text: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Search.associate = function(models) {
    // associations can be defined here
  };
  return Search;
};