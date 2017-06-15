$(document).ready(function () {
    try {
        loadContent();
        var ds = JSON.parse(localStorage.getItem("tyle"));
        console.log(ds);
        var data_chart = [];
        $.each(ds, function (key,val) {
            var item = {
                name: val.name,
                y: parseFloat(val.tyleloi)
            }
            data_chart.push(item);
            });
        var data = [{
            name: 'Tỷ lệ',
            colorByPoint: true,
            data: data_chart
            }];
        $(function () {
            // Build the chart
            Highcharts.chart('container', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    backgroundColor: null
                },
                title: {
                    text: 'Tỷ lệ lỗi điểm đo',
                    style: { "color": "#ffffff", "fontSize": "14px" }
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                legend: {
                    layout: 'horizontal',
                    border: 0,
                    borderRadius: 0,
                    borderWidth: 0,
                    itemStyle: { "color": "#ffffff", "cursor": "pointer", "fontSize": "12px", "fontWeight": "normal" }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                credits: {
                    enabled: false
                },
                series: data
            });
        });
    } catch (e) {
        console.log(e);
    }
});
function nhomloi(index) {
    if (index == 0) return "Lỗi do IFC";
    if (index == 1) return "Lỗi do Điện lực";
    if (index == 2) return "Lỗi do Nhà mạng";
    if (index == 3) return "Lỗi Khách quan";
}