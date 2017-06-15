
$(document).ready(function () {
   
});
function f_thslct_drawChart() {

    var data = JSON.parse(localStorage.getItem("bcthslct_data"));
   
    f_thslct_Chart(data);
    // ẩn hiện ghi chú
    $('#thslct_chart').highcharts().legend.group.hide();
    $('#thslct_chart').highcharts().legend.box.hide();
    $('.highcharts-subtitle').html("Hiện ghi chú");
    var i = 0;
    $('.highcharts-subtitle').click(function() {
        if (i%2) {
            $('#thslct_chart').highcharts().legend.group.hide();
            $('#thslct_chart').highcharts().legend.box.hide();
            $('.highcharts-subtitle').html("Hiện ghi chú");
        } else {
            $('#thslct_chart').highcharts().legend.group.show();
            $('#thslct_chart').highcharts().legend.box.show();
            $('.highcharts-subtitle').html("Ẩn ghi chú");
        }
        i++;
    });
    
}

function f_thslct_Chart(list) {
    var insertedDate = "";
    var tsvhDu48Sl = "";
    var tsvhDu48Lech7Sl = "";
    var tsvhDuKo48Sl = "";
    var lpduSl = "";
    var lpDu48Sl = "";
    var lpKhongDu48Sl = "";
    var koLpLoiThanhGhiSl = "";
    var koLpLoiKhaiBaoSl = "";
    var koLpLoiModemSl = "";
    for (var i = 0; i < list.length; i++) {
        if (i == list.length - 1) {
            tsvhDu48Sl += list[i].tsvhdu48sl;
            tsvhDu48Lech7Sl += list[i].tsvhdu48lech7sl;
            tsvhDuKo48Sl += list[i].tsvhduko48sl;
            lpduSl += list[i].lpdusl;
            lpDu48Sl += list[i].lpdu48sl;
            lpKhongDu48Sl += list[i].lpkhongdu48sl;
            koLpLoiThanhGhiSl += list[i].kolploithanhghisl;
            koLpLoiKhaiBaoSl += list[i].kolploikhaibaosl;
            koLpLoiModemSl += list[i].kolploimodemsl;
            insertedDate += "'" + list[i].inserteddate + "'";
        } else {
            tsvhDu48Sl += list[i].tsvhdu48sl + ",";
            tsvhDu48Lech7Sl += list[i].tsvhdu48lech7sl + ",";
            tsvhDuKo48Sl += list[i].tsvhduko48sl + ",";
            lpduSl += list[i].lpdusl + ",";
            lpDu48Sl += list[i].lpdu48sl + ",";
            lpKhongDu48Sl += list[i].lpkhongdu48sl + ",";
            koLpLoiThanhGhiSl += list[i].kolploithanhghisl + ",";
            koLpLoiKhaiBaoSl += list[i].kolploikhaibaosl + ",";
            koLpLoiModemSl += list[i].kolploimodemsl + ",";
            insertedDate += "'" + list[i].inserteddate + "',";
        }
    }
    var dataInsertedDate = "[" + insertedDate + "]";
    var dataTsvhDu48Lech7Sl = "[" + tsvhDu48Lech7Sl + "]";
    var dataTsvhDu48Sl = "[" + tsvhDu48Sl + "]";
    var dataTsvhDuKo48Sl = "[" + tsvhDuKo48Sl + "]";
    var dataLpduSl = "[" + lpduSl + "]";
    var dataLpDu48Sl = "[" + lpDu48Sl + "]";
    var dataLpKhongDu48Sl = "[" + lpKhongDu48Sl + "]";
    var dataKoLpLoiThanhGhiSl = "[" + koLpLoiThanhGhiSl + "]";
    var dataKoLpLoiKhaiBaoSl = "[" + koLpLoiKhaiBaoSl + "]";
    var dataKoLpLoiModemSl = "[" + koLpLoiModemSl + "]";

    var colorText = "#555";
    $('#thslct_chart').highcharts({
        isDragging: true,
        title: {
            text: 'Báo cáo đánh giá thu thập số liệu công tơ',
            x: -20 //center,
            ,
            style: {
                color: colorText
            }
        },
        subtitle: {
            text: 'Ẩn hiện ghi chú',
            x: -20,
            style: {
                color: colorText
            }
        },
        xAxis: {
            categories: eval(dataInsertedDate),
            lineColor: '#707070  ', // thanh o duoi
            tickColor: '#707070  ', // gach nho cho thanh o duoi
        },
        yAxis: {
            title: {
                text: 'Tỷ lệ đánh giá'
            },
            lineWidth: 2,
            lineColor: '#F33',
            plotLines: [
                {
                    value: 0,
                    width: 1,
                    color: '#808080'

                }
            ]

        },
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            floating: true,
            backgroundColor: '#FFFFFF',
            shadow: true,
            width: 250,
            borderWidth: 2,
            symbolRadius: 2,
            itemStyle: {
                color: colorText
            },
            itemHoverStyle: {
                color: colorText
            },
            
            allowDragX: true,
            allowDragY: true,
            y: 60,
            x: -10,
            borderRadius: 0,
            title: {
                text: 'Di Chuyển'
            },
            draggable: true,
            zIndex: 20
        },
        formatter: function () {
            return this.value.replace(/ /g, '<br />');
        },
        series: [{
            name: 'Điểm đo đủ 48 bản ghi TSVH',
            data: eval(dataTsvhDu48Sl)
        }, {
            name: 'Điểm đo đủ 48 bản ghi TSVH 1 ngày<br/>(Lệch không quá 7p)',
            data: eval(dataTsvhDu48Lech7Sl)
        }, {
            name: 'Điểm đo không đủ 48 bản ghi<br/>TSVH/ngày',
            data: eval(dataTsvhDuKo48Sl)
        }, {
            name: 'Điểm đo đọc đủ loadprofile 1 ngày',
            data: eval(dataLpduSl)
        },
         {
             name: 'Điểm đo đủ loadprofile 1 ngày và<br/>48 bản ghi loadprofile',
             data: eval(dataLpDu48Sl)
         }, {
             name: 'Điểm đo đủ loadprofile 1 ngày nhưng<br/>không đủ 48 bản ghi do mất điện',
             data: eval(dataLpKhongDu48Sl)
         }
        , {
            name: 'Điểm đo không có loadprofile 1 ngày',
            data: eval(dataKoLpLoiThanhGhiSl)
        }
        , {
            name: 'Nguyên nhân do lỗi tốc độ công tơ<br/>hoặc do cắt điện thanh lý trạm',
            data: eval(dataKoLpLoiKhaiBaoSl)
        }
        , {
            name: 'Nguyên nhân do modem',
            data: eval(dataKoLpLoiModemSl)
        }]
    });
    

   
}