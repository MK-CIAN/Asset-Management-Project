const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data',
  params: {
    symbol: 'AMRN',
    region: 'US'
  },
  headers: {
    'X-RapidAPI-Key': '82fa1edb12mshaae39c3da16d804p1b7afdjsn2562b0435ae6',
    'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
  }
};

async function call() {
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
    
};

call();

