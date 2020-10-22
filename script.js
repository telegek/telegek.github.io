var tabulate = function (data,columns) {
  var table = d3.select('#myTable') // this is the solution
// var table = d3.select('body').append('table') this was before the solution
    var thead = table.append('thead')
    var tbody = table.append('tbody')


    thead.append('tr')
      .selectAll('th')
        .data(columns)
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

d3.csv('data/data.csv')
.then(function(data) {
  const columns = ['Instrument/ISIN','Quantity', 'Price', 'Direction', 'Trading day']
  // tabulate(data,columns)
  byticker = d3.group(data, d => d.Instrument/ISIN)
  tabulate(byticker,columns)
});