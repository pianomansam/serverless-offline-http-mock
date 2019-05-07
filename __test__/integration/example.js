const axios = require('axios');

const get = async () => {
  const response = await axios.get('http://www.example.com/example');

  return {
    statusCode: response.status,
    body: JSON.stringify(response.data),
  };
};

module.exports = {
  get,
};
