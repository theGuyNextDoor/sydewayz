const express = require('express');
const zohoController = require('./controllers/zoho');
const calendlyController = require('./controllers/calendly');


const app = express();
const port = 3000;

app.use(express.json());

app.use('/zoho', zohoController);
app.use('/calendly', calendlyController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
