const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

const appointmentController = require('./controllers/appointment');
// const errorController = require('./controllers/error');

const sequelize = require('./utils/database');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/appointments', appointmentController.getAppointments);

app.post('/add-appointment', appointmentController.postAppointment);

app.post('/delete/:appointmentId', appointmentController.postDeleteAppointment);

app.post('/edit', appointmentController.postEditAppointment);

// app.use(errorController.get404);

const PORT = 4000;

sequelize
  .sync()
  .then((result) => {
    app.listen(PORT, () =>
      console.log(`Server is running on port no: ${PORT}`)
    );
  })
  .catch((err) => console.log(err));
