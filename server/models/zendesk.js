const axios = require('axios');
const { AUTH } = require('../../config');

module.exports = {
  getAllTickets: (req, res) => {
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

        for (let i = 0; i < tickets.length; i += 1) {
          const { requester_id, type, subject, description, priority, status } = tickets[i];
          // console.log('ticket', i, results[i]);
          const ticket = {
            id: requester_id,
            type,
            subject,
            description,
            priority,
            status,
          };
          // console.log('Ticket', i, ticket);
          ticketArr = [...ticketArr, ticket];
        }
        res.status(200).send(ticketArr);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
