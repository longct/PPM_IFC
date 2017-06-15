var countpage = 10;
$(document).ready(function () {
    try {
        $('#baocao_bongcht').on('shown.bs.modal', function () {
        });
        loadInitDate();
        loadContent();
        loadchecklog_master();
        loadtu_chaybong();
        $("#higchart_bcbong").hide();
        $("#btn_checkluu_bcbong").click(function () {
            var check = checka();
            if (check != "") {
                messInfo("messinfo_bcbong", check, "error");
                return;
            }
            $("#messinfo_bcbong").hide();
            loadchaybong_chay();
        });
       // loadhigchart();
    } catch (e) {
        console.log(e);
    }

});
function checka() {
    try {
        var p = getAllIdMod();
        if (p.cb_nhomatu_bcbong == "-1") return "Vui lòng chọn đơn vị";

        return "";

    } catch (e) {
        console.log(e);
    }
}

function loadtu_chaybong() {
    try {
        var config = { namesql: "PKG_BONGHONG.LSTDONVI", callback: "f_result_loadtu_chaybong", connstr: "ConnectOracleStreetLight" };
        var para = [];
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadtu_chaybong(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        dataToCob("cb_nhomatu_bcbong", data, "id", "ten", "-1", "Chọn đơn vị");
    } catch (e) {
        console.log(e);
    }
}
function loadchaybong_chay() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_BONGHONG.BONGCHAYA", callback: "f_result_loadchaybong_chay", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_CODE: p.cb_nhomatu_bcbong,
            v_ID: '',
            v_ngay: '',
        };
    
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadchaybong_chay(config, para, lst) {
    try {
        var data = lst.data;
        console.log(data);
        if (data == null || data == '[]' || data == undefined || data.length == 0) {
            messInfo("messinfo_bcbong", "Không có dữ liệu hiển thị", "error");
            $("#higchart_bcbong").hide();
            $("#table_bcbong").empty();
            return;
        }
        $("#higchart_bcbong").show();
        $("#table_bcbong").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.tenkhachhang + "</td><td>"
                + val.tong + "</td><td>"
                + val.tot + "</td><td>"
                + val.dim + "</td><td>"
                 + val.tat + "</td><td>"
                + val.hong + "</td><td>"
                + val.mkn + "</td></tr>";
            $("#table_bcbong").append(row);
        });
        loadhigchart_chay(data);


    } catch (e) {
        console.log(e);
    }
}
function loadhigchart_chay(data) {
    try {
        var categories = [];
        var tong = [];
        var tot = [];
        var dim = [];
        var tat = [];
        var hong = [];
        var mkn = [];
        $.each(data, function (key, val) {
            categories.push(val.tenkhachhang);
            tong.push(parseFloat(val.tong));
            tot.push(parseFloat(val.tot));
            dim.push(parseFloat(val.dim));
            tat.push(parseFloat(val.tat));
            hong.push(parseFloat(val.hong));
            mkn.push(parseFloat(val.mkn));
           
        });

        Highcharts.chart('higchart_bcbong', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'BÁO CÁO BÓNG'
            },
            credits: {
                enabled: false,
                text: "Infras.com.vn"
            },
            xAxis: {
                categories: categories,
                crosshair: true
            }, yAxis: {
                min: 0,
                title: {
                    text: 'Bóng'
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} bóng</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            }, colors: ['#2B06FF', '#FFA712', '#2BFF12', '#C5BBA7', '#000000', '#FF121A']

            ,series: [{
                name: 'Tổng bóng',
                data: tong

            }, {
                name: 'Bóng tốt',
                data: tot

            }, {
                name: 'Bóng dim',
                data: dim

            }
            ,{
                name: 'Bóng tắt',
                data: tat

            }, {
                name: 'Bóng hỏng',
                data: mkn

            }, {
                name: 'Bóng mất kết nối',
                data: mkn

            }
            ]
        });


    } catch (e) {
        console.log(e);
    }
}

