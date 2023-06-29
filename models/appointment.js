const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Appointment = sequelize.define('appointment', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  appointmentDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  appointmentTime: {
    type: Sequelize.TIME,
    allowNull: false,
  },
});

module.exports = Appointment;
