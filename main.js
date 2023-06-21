Papa.parse('./TSLA.csv', {
    download: true,
    header: true,
    complete: function(results) {
      const data = results.data;
  
      // Formats the data for chart library
      const labels = data.map(row => row.Date);
      const closeData = data.map(row => parseFloat(row.Close));
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
          maintainAspectRatio: false
        }
        // plugins: [linearRegression] // Apply the custom plugin
      });
    }
  });
  