
$(document).ready(function () {
    $('bcds_chart').css('display','none');
});

function f_bcds_drawChart() {
    var data = localStorage.getItem("lstBaoCaoDoiSoat_data");
    var category = localStorage.getItem("lstBaoCaoDoiSoat_category");
    f_bcds_Chart(data, category);
}

function f_bcds_Chart(serieData, category)
{
    var colorText = "#676767";
   
      var chart=  new Highcharts.Chart(
       {
           chart: {
               renderTo: 'bcds_chart',
               type: 'column',
               plotBackgroundColor: false,
               plotBorderWidth: true,
               plotShadow: false,
               zoomType: 'x',
               panning: true,
               panKey: 'shift',
           },
           title: {
               text: ''
               , style: {
                   color: colorText
               }
           },
           xAxis: {
               categories: eval(category)
           },
           yAxis: {
               min: 0,
               title: {
                   text: ' '
               }
           },
           tooltip: {
               formatter: function () {
                   return '<b>' + this.point.time + '</b><br /><span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' + this.point.y + '</b>';
               },
               backgroundColor: '#F0F8FF',
               borderColor: 'black',
               borderRadius: 10,
               borderWidth: 1
           },
           plotOptions: {
               column: {
                   pointPadding: 0,
                   borderWidth: 0
               },
               series: {
                   animation: {
                       duration: 1000
                   },
                   borderWidth: 0,
                   dataLabels: {
                       enabled: false,
                       format: '<b>{point.y}</b>',
                       style: {
                           color: colorText
                       },
                       rotation: 270,
                       translate: (0, 0),
                       x: 3,
                       y: -45
                   }
               }
           },
           legend: {
               itemStyle: {
                   color: colorText
               },
               itemHoverStyle: {
                   color: colorText
               }
           },
           series: eval(serieData),
           exporting: {
               enabled: false
           }
       });

}
