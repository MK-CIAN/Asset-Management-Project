//const axios = require('axios');

//The options for the API call
var options = {
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


//Calls the API
async function call() {
    // Stores the data in CSV format
    var csvString;

    try {
        //Gets the stock type from the url
        var urlParams = new URLSearchParams(window.location.search);
        const selectedStock = urlParams.get('stockType');

        console.log(selectedStock);

        //Sets the stock type
        options.params.symbol = selectedStock;
        var response;   

        // Checks to see if we have selected stock saved in localstorage
        csvString = CheckLocalStorage();
        // Sends out an API request for data IF data doesnt already exist in local storage
        if(csvString === null) { 
            // Sends out an API request to finance server to retreive selected stock 
            response = await axios.request(options);

            const Data = response.data.prices;

            //Displaying the set time frame
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
            csvString = csvRows.join('\n');

            // Saves stock data to localstorage
            SaveToLocalStorage(csvString, selectedStock);
        }
    } catch (error) {
        console.error(error);
        return;
    }
    
    // Draws a chart of selected data
    display(csvString);
};

// Reference to already created stock graph
var stockGraphRef;
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

    // Checks to see if we have stockGraphRef loaded already, if so, destroy it and replace it with another one
    if(stockGraphRef) stockGraphRef.destroy();
    stockGraphRef = new Chart(ctx, {
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

// Checks localstorage to see if the selected data is stored or not. Returns the data if its there otherwise returns null
function CheckLocalStorage(){
    var data;
    try {
        data = localStorage.getItem('GOOGL');

        if(data !== null){
            console.log("Data found in local storage");
            return JSON.parse(data);
        } else {
            console.log("No data found in local storage. Fetching from server.");
            return null;
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

function SaveToLocalStorage(csvData, stockName){
    try {
        const data = JSON.stringify(csvData);
        localStorage.setItem(stockName, data);
        console.log(stockName + " data has been added to localStorage successfully.");
    } catch (e) {
        console.error(e);
    }
}

call();
