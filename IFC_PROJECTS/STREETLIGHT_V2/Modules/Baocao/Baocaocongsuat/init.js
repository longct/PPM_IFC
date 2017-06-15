var countpage = 10;
$(document).ready(function () {
    try {

        loadInitDate();
        loadContent();
        loadchecklog_master();
        loadtu_donvi();
     
        $("#higchart_bccongsuat").hide();
        $("#btn_checkluu_bcsuat").click(function () {
      
            var check = checkpccong();
            if (check != "") {
                messInfo("messinfo_bcsuat", check, "error");
                return;
            }
            loaddanhsach_pcongsuat();
        });
        
    } catch (e) {
        console.log(e);
    }

});
function checkpccong() {
    try {
        var p = getAllIdMod();
        if (p.cb_sukienct_ccongsuat == "-1") return "Vui lòng chọn đơn vị";
        return "";
    } catch (e) {
        console.log(e);
    }
}

function loadtu_donvi() {
    try {
        var config = { namesql: "PKG_BONGHONG.LSTDONVI", callback: "f_result_loadtu_donvi", connstr: "ConnectOracleStreetLight" };
        var para = [];
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadtu_donvi(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        dataToCob("cb_sukienct_ccongsuat", data, "id", "ten", "-1", "Chọn đơn vị");
    } catch (e) {
        console.log(e);
    }
}


function loaddanhsach_pcongsuat() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_TSVHBONG.THONGKECONGSUAT", callback: "f_result_loaddanhsach_bccong", connstr: "ConnectOracleStreetLight" };
        var para = {
          v_Code: p.cb_sukienct_ccongsuat
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddanhsach_bccong(config, para, lst) {
    try {
        var data = lst.data;
        if (data == null || data == '[]' || data == undefined || data.length == 0) {
            messInfo("messinfo_bcsuat", "Không có dữ liệu hiển thị", "error");
            $("#table_bccongsuat").empty();
            $("#higchart_bccongsuat").hide();
            return;
        }
        $("#higchart_bccongsuat").show();
        messInfo("messinfo_bcsuat", "", "ok");
        hienthi_bccong(data);
    } catch (e) {
        console.log(e);
    }
}
function hienthi_bccong(data) {
    try {
        var data1 = data[0].kq0;
        var data2 = data[1].kq1;
        $("#table_bccongsuat").empty();
        $.makeTable = function (data1) {
            var table = $('<table class="table table-striped table-bordered table-hover table-condensed cmiss_table">');
            var rowth = "<thead><tr>";
            for (var titile in data1[0]) rowth += "<th>" + titile.toUpperCase() + "</th>";
            rowth += "</tr></thead>";
            $(rowth).appendTo(table);
            $.each(data1, function (index, value) {
                var row = "<tr>";
                $.each(value, function (key, val) {
                    row += "<td>" + setnull1(val) + "</td>";
                });
                row += "</tr>";
                $(table).append(row);
            });
            return ($(table));
        };
        var table = $.makeTable(data1);
        $(table).appendTo("#table_bccongsuat");

        higchart_congsuat(data2);
    } catch (e) {
        console.log(e);
    }
}

function getday(a) {
    try {
        var myDate = new Date();
        var t = new Date(myDate.getTime() - (60*60*24 * a *1000));
        var d = t.getDate().toString().length == 1 ? "0" + t.getDate() : t.getDate();
        var m = (t.getMonth() + 1).toString().length == 1 ? "0" + (t.getMonth() + 1) : (t.getMonth() + 1);
        var y = t.getFullYear().toString().length == 1 ? "0" + t.getFullYear() : t.getFullYear();
        var tt = d + "/" + m + "/" + y;
        return tt;

    } catch (e) {
        //console.log(e);
        return "";
    }
}
function higchart_congsuat(data2) {
    try{
        var ngay0 = gettimenow();
        var datacategories = [getday(4), getday(3), getday(2), getday(1), gettimenow()];
        var dataseries = [];
        $.each(data2, function (key,val) {
            dataseries.push({ name: val.tenkhachhang, data: [parseFloat(val.ngay4), parseFloat(val.ngay3), parseFloat(val.ngay2), parseFloat(val.ngay1), parseFloat(val.ngay0)] });
        });

        $(function () {
            Highcharts.chart('higchart_bccongsuat', {
                title: {
                    text: 'BÁO CÁO CÔNG SUẤT',
                    x: -20 //center
                },
               
                xAxis: {
                    categories:datacategories
                },
                yAxis: {
                    title: {
                        text: 'KWh'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: 'KWh'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: dataseries
            });
        });

    } catch (e) {
        console.log(e);
    }
}

