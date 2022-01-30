'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.dom.belongsTo(models.user)
    }
  };
  dom.init({
    page: DataTypes.STRING,
    post: DataTypes.STRING,
    video : DataTypes.STRING,
    font : DataTypes.STRING,
    body : DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'dom',
  });
  return dom;
};