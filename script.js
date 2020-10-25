d3.csv('data/data.csv')
.then(function(data) {
  // const columns = ['Instrument/ISIN', 'Quantity', 'Price', 'Trading day']
  
  data.forEach(function(d) {

    d["Instrument/ISIN"]= d["Instrument/ISIN"].slice(0, -13);
    d["Price"]= d["Price"].slice(0, -4);
    d["Total amount"]= d["Total amount"].slice(0, -4);

    if (d["Direction"] == "Sell") {
      d["Quantity"] = +d["Quantity"] * -1;
      d["Total amount"] = +d["Total amount"] *  -1;
    } 
      else {
        d["Quantity"] = +d["Quantity"];
        d["Total amount"] = +d["Total amount"];
      }
    d["Price"] = +d["Price"];
  });


var amountTotal = d3.nest()
.key(function(d) { return d["Instrument/ISIN"]; }).sortKeys(d3.ascending)
.rollup(function(v) { return d3.sum(v, function(d) { return d["Total amount"]; }); })
.entries(data);

console.log(amountTotal)

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

  // Create the data table.
  var data2plot = new google.visualization.DataTable(amountTotal);
  console.log(data2plot)

  // Set chart options
  var options = {'title':'How Much Pizza I Ate Last Night',
                  'width':400,
                  'height':300};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data2plot, options);
}


});