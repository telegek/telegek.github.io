var tabulate = function (data, columns) {
  var table = d3.select('#myTable') 
  var thead = table.append('thead')
  var tbody = table.append('tbody')

  thead.append('tr')
    .selectAll('th')
      // .data(columns)
      .enter()
    .append('th')
      .text(function (d) { return d })

  var rows = tbody.selectAll('tr')
      .data(data)
      .enter()
    .append('tr')

  var cells = rows.selectAll('td')
      .data(function(row) {
          return columns.map(function (column) {
              return { column: column, value: row[column] }
        })
    })
    .enter()
  .append('td')
    .text(function (d) { return d.value })

  return table;
}

var make_single_stocks = function(data) {

}

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
    console.log(typeof data)
    console.log(data[0])
  });



  function createTable(tableData) {
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
  
    tableData.forEach(function(rowData) {
      var row = document.createElement('tr');
  
      rowData.forEach(function(cellData) {
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(cellData));
        row.appendChild(cell);
      });
  
      tableBody.appendChild(row);
    });
  
    table.appendChild(tableBody);
    document.body.appendChild(table);
  }



  total_amount = d3.rollups(data, v => d3.sum(v, d => d["Total amount"]), d => d["Instrument/ISIN"]);
  quantity = d3.rollups(data, v => d3.sum(v, d => d["Quantity"]), d => d["Instrument/ISIN"]);
  console.log(total_amount)
  // .sort((a, b) => a[1] - b[1]);
  sorted_total_amount = total_amount.slice().sort((a, b) => d3.descending(a[1], b[1]))
  // map.sort(d3.ascending)

  console.log(sorted_total_amount)

  createTable(sorted_total_amount);
  make_single_stocks()







  // const data = [{SalePrice:"18000",TotalValue:"22500",ratio:1.25},{SalePrice: "128000",TotalValue:"212500",ratio:1.05}]
  const mappedToArray = sorted_total_amount.map(d => Array.from(Object.values(d)))
  console.log(mappedToArray)




  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  // function drawChart() {

  //   // var data = google.visualization.arrayToDataTable([
  //   //   ['Task', 'Hours per Day'],
  //   //   ['Work',     11],
  //   //   ['Eat',      2],
  //   //   ['Commute',  2],
  //   //   ['Watch TV', 2],
  //   //   ['Sleep',    7]
  //   // ]);

  //   var dataG = google.visualization.arrayToDataTable(mappedToArray);


  //   var options = {
  //     title: 'My Daily Activities'
  //   };

  //   var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  //   chart.draw(dataG, options);
  // }
});