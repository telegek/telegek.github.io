document.addEventListener('DOMContentLoaded', function () {
    var highchartsOptions = Highcharts.setOptions(Highcharts.theme = {
        colors: ['#058DC7', '#eaab1d']
     });
     
     Highcharts.setOptions({
       chart: {
         defaultSeriesType: 'column',
         backgroundColor: '#fff',
         shadow: true
       }
     });
     
     $('#container').highcharts({
         data: {
             googleSpreadsheetKey: '1meqlpvjVlptv9gKHGg0sE2LvQoY4QLRVo2Ugs29diWM',
             googleSpreadsheetWorksheet: 1
         },
         title: {
           text: 'System Transaction Trends'
     
         },
         yAxis: {
           min: 1.5,
           title: {
             text: 'Transaction Trends (in millions)'
           }
         }
     });
     
     $('#container2').highcharts({
         data: {
             googleSpreadsheetKey: '1meqlpvjVlptv9gKHGg0sE2LvQoY4QLRVo2Ugs29diWM',
             googleSpreadsheetWorksheet: 2
         },
         title: {
           text: 'System Revenue Trends'
         },
         yAxis: {
           min: 1.5,
           title: {
             text: 'Toll Revenues (in millions USD)'
           }
         }
     });
});