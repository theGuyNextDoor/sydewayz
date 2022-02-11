const axios = require('axios');
const { AUTH, TOKEN } = require('../../config');

module.exports = {
  createUser: (req, res) => {
    const { body } = req;
    const options = {
      method: 'post',
      baseURL: 'https://sdkinstall.zendesk.com',
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
        res.status(201).send([id]);
      })
      .catch((err) => res.status(401).send(err));
  },
  createRequest: (req, res) => {
    const { email, subject, description } = req.body;
    const options = {
      method: 'post',
      baseURL: 'https://sdkinstall.zendesk.com',
      url: '/api/v2/requests',
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: `${email}/token`,
        password: TOKEN,
      },
      data: {
        request: {
          subject,
          comment: { body: description },
        },
      },
    };
    axios.request(options)
      .then(({ data }) => {
        const requestData = {
          id: data.request.id,
          userId: data.request.requester_id, // MAY DELETE
          recipient: data.request.recipient, // MAY DELETE

          subject: data.request.subject,
          description: data.request.description,
          status: data.request.status,
          priority: data.request.priority,
          createdAt: data.request.created_at,
          updatedAt: data.request.updated_at,
          due: data.request.due_at,

          organizationId: data.request.organization_id,
          userCanSolve: data.request.can_be_solved_by_me,
        };

        console.log(requestData);

        // res.status(201).send(requestData);
      })
      .catch((err) => res.status(401).send(err));
  },
  getRequests: (req, res) => {
    const { zendeskId, email } = req.params;
    const options = {
      method: 'get',
      baseURL: 'https://sdkinstall.zendesk.com',
      url: `/api/v2/users/${zendeskId}/requests.json`,
      headers: { 'Content-Type': 'application/json' },
      auth: { username: `${email}/token`, password: TOKEN },
    };
    axios.request(options)
      .then(({ data }) => {
        const { requests } = data;
        let requestArr = [];

        requests.forEach((request) => {
          const requestData = {
            id: request.id,
            userId: request.requester_id, // MAY DELETE
            recipient: request.recipient, // MAY DELETE

            subject: request.subject,
            description: request.description,
            status: request.status,
            priority: request.priority,
            createdAt: request.created_at,
            updatedAt: request.updated_at,
            due: request.due_at,

            organizationId: request.organization_id,
            userCanSolve: request.can_be_solved_by_me,
          };

          requestArr = [...requestArr, requestData];
        });
        res.status(200).send(requestArr);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
