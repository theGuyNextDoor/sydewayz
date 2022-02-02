const axios = require('axios');
const { AUTH } = require('../../config');

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
