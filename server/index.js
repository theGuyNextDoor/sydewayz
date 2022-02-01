const express = require('express');
const googleControllers = require('./controllers/google');
const zendeskControllers = require('./controllers/zendesk');
const adminControllers = require('./controllers/admin');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/google', googleControllers);
app.use('/api/zendesk', zendeskControllers);
app.use('/api/admin', adminControllers);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
