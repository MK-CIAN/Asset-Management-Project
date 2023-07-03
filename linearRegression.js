// Custom plugin to fit a linear regression line to the chart
Chart.plugins.register({
    afterDraw: function(chart) {
      var ctx = chart.chart.ctx;
      var xRange = chart.chartArea.right - chart.chartArea.left;
      var data = chart.config.data.datasets[0].data;
      var regression = linearRegression(data);
  
      var x1 = chart.chartArea.left;
      var y1 = regression.intercept;
      var x2 = chart.chartArea.right;
      var y2 = regression.slope * xRange + regression.intercept;
  
      // Set line styling
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'red';
  
      // Plot the regression line
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    }
  });
  
  // Function to calculate linear regression
  function linearRegression(data) {
    var sumX = 0;
    var sumY = 0;
    var sumXY = 0;
    var sumXX = 0;
    var count = data.length;
  
    for (var i = 0; i < count; i++) {
      var x = i;
      var y = data[i];
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumXX += x * x;
    }
  
    var slope = (count * sumXY - sumX * sumY) / (count * sumXX - sumX * sumX);
    var intercept = (sumY / count) - (slope * sumX) / count;
  
    return {
      slope: slope,
      intercept: intercept
    };
  }
  