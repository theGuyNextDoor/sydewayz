const { zohoClientId } = require('../../config');

module.exports = {
  authenticate: (req, res) => {
    const config = {
      client_id: zohoClientId,
      response_type: 'code',
      redirect_uri: '',
      scope: '',
      access_type: '',


    }
  }
}