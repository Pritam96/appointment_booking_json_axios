const Appointment = require('../models/appointment');

exports.getAppointments = (req, res, next) => {
  Appointment.findAll()
    .then((appointments) => {
      res.json(appointments);
    })
    .catch((err) => console.log(err));
};

exports.postAppointment = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const appointmentDate = req.body.appointmentDate;
  const appointmentTime = req.body.appointmentTime;

  Appointment.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    appointmentDate: appointmentDate,
    appointmentTime: appointmentTime,
  })
    .then((result) => {
      console.log('Appointment Created');
      res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.postDeleteAppointment = (req, res, next) => {
  const appointmentId = req.params.appointmentId;
  Appointment.findByPk(appointmentId)
    .then((appointment) => {
      return appointment.destroy();
    })
    .then((result) => {
      console.log('Appointment Deleted');
      res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.postEditAppointment = (req, res, next) => {
  const id = req.body.appointmentId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const appointmentDate = req.body.appointmentDate;
  const appointmentTime = req.body.appointmentTime;

  Appointment.findByPk(id)
    .then((appointment) => {
      appointment.firstName = firstName;
      appointment.lastName = lastName;
      appointment.email = email;
      appointment.phone = phone;
      appointment.appointmentDate = appointmentDate;
      appointment.appointmentTime = appointmentTime;

      return appointment.save();
    })
    .then((result) => {
      console.log('Appointment Updated');
      res.json(result);
    })
    .catch((err) => console.log(err));
};
