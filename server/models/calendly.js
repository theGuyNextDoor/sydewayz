const axios = require('axios');
const { calendlyAuth, org, usr, zohoClientId } = require('../../config');

const date = new Date;
const base = 'https://api.calendly.com'

module.exports = {
  getAppointments: (req, res) => {
    const { email } = req.params

    const options = {
      method: 'GET',
      baseURL: base,
      url: '/scheduled_events',
      headers: { 'Content-Type': 'application/json', Authorization: calendlyAuth },
      params: {
        invitee_email: email,
        min_start_time: date,
        // max_start_time: add one if needed,
        organization: org,
        user: usr,
        // sort: 'start_time:asc',
        status: 'active'
      }
    }

    axios.request(options)
      .then(({ data }) => res.send(data).status(200))
      .catch((err) => console.log(err.response.data));
  },

  cancelEvent: (req, res) => {
    const { uuid, reason } = req.body;
    const options = {
      method: 'POST',
      baseURL: base,
      url: `scheduled_events/${uuid}/cancellation`,
      headers: { 'Content-Type': 'application/json', Authorization: calendlyAuth },
      body: { reason },
    }

    axios.request(options)
      .then(({ status }) => res.sendStatus(status))
      .catch((err) => res.sendStatus(400));
  },
}