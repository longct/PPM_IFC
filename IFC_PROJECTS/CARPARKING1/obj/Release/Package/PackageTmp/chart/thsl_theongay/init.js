
function f_thsltn_drawChart(type) {
    var data = localStorage.getItem("tonghopsolieutheongay_data");
    var category = localStorage.getItem("tonghopsolieutheongay_category");
    f_thsltn_Chart(data, category,type);
}

function f_thsltn_Chart(serieData, category,type) {

    var colorText = "#676767";
    var phantram = type =="TuyetDoi" ? "<b>{point.y}</b>":"<b>{point.y} (%)</b>";
  var chart=  new Highcharts.Chart(
   {
       chart: {
           renderTo: 'thsltn_chart',
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
                   format: phantram,
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
