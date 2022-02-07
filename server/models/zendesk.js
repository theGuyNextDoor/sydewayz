const axios = require('axios');
const { AUTH, TOKEN } = require('../../config');

module.exports = {
  createUser: (req, res) => {
    const { body } = req;
    const options = {
      method: 'post',
      baseURL: 'https://clientapi.zendesk.com',
      url: '/api/v2/users.json',
      headers: {
        'Content-Type': 'application/json',
        Authorization: AUTH,
      },
      data: body,
    };
    axios.request(options)
      .then(({ data }) => {
        const { id } = data.user;
        console.log('MODELS ZENDESK', id); // DELETE ME
        res.status(201).send([id]);
      })
      .catch((err) => res.status(401).send(err));
  },
  createTicket: (req, res) => {
    const { body } = req;
    const { email, info } = body;

    console.log('MODELS ZENDESK - got here:\n', body.info); // DELETE ME
    const options = {
      method: 'post',
      baseURL: 'https://clientapi.zendesk.com',
      url: '/api/v2/requests',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${email}/token:${TOKEN}`,
      },
      data: info,
    };
    axios.request(options)
      .then(({ data }) => {
        console.log('MODELS ZENDESK response', data); // DELETE ME
        // res.status(201).send();
      })
      .catch((err) => res.status(401).send(err));
  },
  getAllTickets: (req, res) => {
    const { email } = req.params;
    const options = {
      method: 'get',
      baseURL: 'https://clientapi.zendesk.com',
      url: '/api/v2/tickets.json',
      headers: {
        'Content-Type': 'application/json',
        Authorization: AUTH,
      },
    };
    axios.request(options)
      .then(({ data }) => {
        const { tickets } = data;
        let ticketArr = [];

        // NEEDED TO FILTER UNIQUE USER TICKETS
        const userSpecificTickets = tickets.filter((ticket) => ticket.recipient === email && ticket.status === 'open');

        // userSpecificTickets.forEach((ticket) => { //ADD ME
        tickets.forEach((ticket) => { //DELETE ME
          const { recipient, type, subject, description, priority, status, created_at } = ticket;

          const ticketData = {
            recipient,
            createdAt: created_at,
            type,
            subject,
            description,
            priority,
            status,
          };
          ticketArr = [...ticketArr, ticketData];
        });
        res.status(200).send(ticketArr);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
