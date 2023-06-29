const form = document.querySelector('#appointments-form');
const appointments_table = document.querySelector('#appointments-table');
form.addEventListener('submit', addAppointment);

async function addAppointment(e) {
  e.preventDefault();
  const appointmentId = document.querySelector('#appointmentId').value;
  const firstName = document.querySelector('#firstName').value;
  const lastName = document.querySelector('#lastName').value;
  const email = document.querySelector('#email').value;
  const phone = document.querySelector('#phone').value;
  const appointmentDate = document.querySelector('#appointmentDate').value;
  const appointmentTime = document.querySelector('#appointmentTime').value;

  // Create New
  if (appointmentId === '') {
    try {
      const response = await axios.post(
        'http://localhost:4000/add-appointment',
        {
          firstName,
          lastName,
          email,
          phone,
          appointmentDate,
          appointmentTime,
        }
      );
      console.log('New Appointment Created');
      form.reset();
      showAllAppointments();
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await axios.post('http://localhost:4000/edit', {
        appointmentId,
        firstName,
        lastName,
        email,
        phone,
        appointmentDate,
        appointmentTime,
      });
      console.log('Appointment Updated');
      form.reset();
      showAllAppointments();
    } catch (error) {
      console.log(error);
    }
  }
}

// list appointments

const table = document.createElement('table');
table.className = 'table';
const table_thead = document.createElement('thead');
const table_thead_tr = document.createElement('tr');
const table_thead_tr_th_name = document.createElement('th');
table_thead_tr_th_name.textContent = 'Name';
const table_thead_tr_th_email = document.createElement('th');
table_thead_tr_th_email.textContent = 'Email';
const table_thead_tr_th_phone = document.createElement('th');
table_thead_tr_th_phone.textContent = 'Phone';
const table_thead_tr_th_time = document.createElement('th');
table_thead_tr_th_time.textContent = 'Time';

table_thead_tr.append(
  table_thead_tr_th_name,
  table_thead_tr_th_email,
  table_thead_tr_th_phone,
  table_thead_tr_th_time
);
table_thead.appendChild(table_thead_tr);
table.appendChild(table_thead);

// TABLE BODY

const table_tbody = document.createElement('tbody');

async function showAllAppointments() {
  const response = await axios.get('http://localhost:4000/appointments');

  if (response.data.length > 0) {
    table_tbody.textContent = '';
    response.data.forEach((appointment) => {
      const table_tbody_tr = document.createElement('tr');
      const table_tbody_tr_td_name = document.createElement('td');
      const table_tbody_tr_td_email = document.createElement('td');
      const table_tbody_tr_td_phone = document.createElement('td');
      const table_tbody_tr_td_time = document.createElement('td');

      const table_tbody_tr_td_edit = document.createElement('td');
      const table_tbody_tr_td_delete = document.createElement('td');

      const edit_button = document.createElement('button');
      edit_button.className = 'btn btn-outline-warning m-2';
      edit_button.textContent = 'Edit';
      const delete_button = document.createElement('button');
      delete_button.className = 'btn btn-danger m-2';
      delete_button.textContent = 'Delete';

      table_tbody_tr_td_edit.appendChild(edit_button);
      table_tbody_tr_td_delete.appendChild(delete_button);

      table_tbody_tr_td_name.textContent = `${appointment.firstName} ${appointment.lastName}`;
      table_tbody_tr_td_email.textContent = `${appointment.email}`;
      table_tbody_tr_td_phone.textContent = `${appointment.phone}`;
      table_tbody_tr_td_time.textContent = `${appointment.appointmentDate} at ${appointment.appointmentTime}`;

      table_tbody_tr.append(
        table_tbody_tr_td_name,
        table_tbody_tr_td_email,
        table_tbody_tr_td_phone,
        table_tbody_tr_td_time,
        table_tbody_tr_td_edit,
        table_tbody_tr_td_delete
      );
      table_tbody.appendChild(table_tbody_tr);

      edit_button.onclick = () => {
        document.querySelector('#appointmentId').value = appointment.id;
        document.querySelector('#firstName').value = appointment.firstName;
        document.querySelector('#lastName').value = appointment.lastName;
        document.querySelector('#email').value = appointment.email;
        document.querySelector('#phone').value = appointment.phone;
        document.querySelector('#appointmentDate').value =
          appointment.appointmentDate;
        document.querySelector('#appointmentTime').value =
          appointment.appointmentTime;

        const submit_button = document.querySelector(
          '#appointments-form-button'
        );

        submit_button.className = 'btn btn-warning mt-3 mb-3';
        submit_button.textContent = 'Save';
      };

      delete_button.onclick = () => {
        deleteAppointment(appointment.id);
        async function deleteAppointment(id) {
          try {
            const response = await axios.post(
              `http://localhost:4000/delete/${id}`
            );
            console.log('Appointment Deleted');
            appointments_table.textContent = '';
            showAllAppointments();
          } catch (error) {
            console.log(error);
          }
        }
      };
    });

    table.appendChild(table_tbody);
    appointments_table.textContent = '';
    appointments_table.appendChild(table);
  } else {
    const paragraph = document.createElement('p');
    paragraph.textContent = 'No appointments available';
    appointments_table.appendChild(paragraph);
  }
}

showAllAppointments();
