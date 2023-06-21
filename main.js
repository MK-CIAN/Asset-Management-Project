<<<<<<< HEAD
var csv;
var chartInstance;

// Get the drop area element
var dropArea = document.getElementById('drop-area');
// Add event listener for drop event
dropArea.addEventListener('drop', handleDrop, false);

// Handle drop event
function handleDrop(event) {
  event.preventDefault();
  
  // Get the dropped files
  var files = event.dataTransfer.files;
  
  // Process the files

  console.log(files);
  csv = files[0];

  update();
}

function update(){
  if(!csv) {
    alert("You need to input CSV file");
    return;
  }

  Papa.parse(csv, {
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
            fill: false          }
        ];
    
        // Creates the chart
        const canvas = document.getElementById("chart")
        canvas.style.width = "600px";
        canvas.style.height = "200px";
        canvas.width = 600;
        canvas.height = 200;

        const ctx = canvas.getContext("2d");
        
        if(chartInstance) chartInstance.destroy();

        chartInstance = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: datasets,
          },
          options: {
            responsive: false,
            maintainAspectRatio: true,
          }
          // plugins: [linearRegression] // Apply the custom plugin
        });
      }
    });
  }
=======
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
          responsive: false,
          maintainAspectRatio: false
        },
        plugins: [linearRegression] // Apply the custom plugin
      });
    }
  });
  
>>>>>>> MKBranch
