const axios = require('axios');
const { AUTH } = require('../../config');

module.exports = {
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
        console.log('here is the ticketArr: ', ticketArr);

        // DELETE WHEN ABOVE IS TESTED FOR MORE THAN ONE TICKET
        // for (let i = 0; i < tickets.length; i += 1) {
        //   const { recipient, type, subject, description, priority, status } = tickets[i];
        //   // console.log('ticket', i, results[i]);
        //   const ticket = {
        //     recipient,
        //     type,
        //     subject,
        //     description,
        //     priority,
        //     status,
        //   };
        //   // console.log('Ticket', i, ticket);
        //   ticketArr = [...ticketArr, ticket];
        // }
        res.status(200).send(ticketArr);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
