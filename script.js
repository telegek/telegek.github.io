var tabulate = function (data,columns) {
  var table = d3.select('#myTable') // this is the solution
// var table = d3.select('body').append('table') this was before the solution
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
  const columns = ['Instrument/ISIN','Quantity', 'Price', 'Trading day']
  
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
        d["Total cost"] = +d["Total cost"];
      }
    d["Price"] = +d["Price"];
  });
  map = d3.rollup(data, v => d3.sum(v, d => d["Total cost"]), d => d["Instrument/ISIN"]);
  console.log(map);
  console.log(data[0])
  tabulate(data, columns)
  make_single_stocks()
});