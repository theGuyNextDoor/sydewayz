const express = require('express');
const googleRouter = require('./controllers/google');
const zendeskRouter = require('./controllers/zendesk');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/google', googleRouter);
app.use('/api/zendesk', zendeskRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
