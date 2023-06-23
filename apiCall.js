//const axios = require('axios');

//The options for the API call
const options = {
  method: 'GET',
  url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data',
  params: {
    symbol: '',
    region: 'US'
  },
  headers: {
    'X-RapidAPI-Key': '82fa1edb12mshaae39c3da16d804p1b7afdjsn2562b0435ae6',
    'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
  }
};

//Gets the stock type from the url
const urlParams = new URLSearchParams(window.location.search);
const selectedStock = urlParams.get('stockType');

//Calls the API
async function call() {
    try {
        //Sets the stock type
        options.params.symbol = selectedStock;
        const response = await axios.request(options);
        const Data = response.data.prices;

        //Displaying only the last weeks data
        const urlParams = new URLSearchParams(window.location.search);
        const timeRange = urlParams.get('timeRange');
        const stockData = Data.slice(0, timeRange);
        


        // Extract headers (assuming all objects have the same properties)
        const headers = Object.keys(stockData[0]);

        // Convert data to CSV rows
        const csvRows = [];
        csvRows.push(headers.join(',')); // Add header row

        stockData.forEach((data) => {
        const values = headers.map((header) => data[header]);
        csvRows.push(values.join(','));
        });

        // Combine rows into a single CSV string
        const csvString = csvRows.join('\n');

        // Output the CSV string
        console.log(csvString);

        display(csvString);
    } catch (error) {
        console.error(error);
    }
    
};

function display(csv) {
    // Converts the CSV string to a 2D array
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');
    const rows = lines.slice(1);

    // Converts the 2D array to an array of objects
    const data = rows.map((row) => {
        const values = row.split(',');
        const rowData = {};
        headers.forEach((header, index) => {
            if (header === 'date') {
                const unixTime = parseInt(values[index]);
                const date = new Date(unixTime * 1000);
                const formattedDate = date.toISOString().split('T')[0];
                rowData[header] = formattedDate;
            } else {
                rowData[header] = values[index];
            }
        });
        return rowData;
    });

    const reveresedData = data.reverse();
    // Formats the data for chart library
    const labels = reveresedData.map(row => row.date);
    const closeData = reveresedData.map(row => parseFloat(row.close));
    const datasets = [
    {
        label: "Stock Close Price",
        data: closeData,
        borderColor: "green",
        fill: false
    }
    ];

    // Creates the chart
    const ctx = document.getElementById("chart").getContext("2d");

    new Chart(ctx, {
    type: "line",
    data: {
        labels: labels,
        datasets: datasets
    },
    options: {
        responsive: true,
        maintainAspectRatio: true
    }
    //plugins: [linearRegression] // Apply the custom plugin
    });
};


call();

