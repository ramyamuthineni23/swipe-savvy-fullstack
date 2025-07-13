const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Business = require('./Business');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  website: {
    type: DataTypes.STRING,
  },
  businessId: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  agreedToTerms: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  plan: {
    type: DataTypes.STRING,
    defaultValue: 'FREE',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

User.belongsTo(Business, { foreignKey: 'businessId' });
Business.hasOne(User, { foreignKey: 'businessId' });

module.exports = User;
