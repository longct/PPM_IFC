$(document).ready(function () {
    try {
        showhideTree();
        initformelement();
        selectlang();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        ////console.log(sct);
        if (sct != "0") {
            $("#chatluong_chtt").html("Vui lòng chọn Sổ ghi hoặc Đơn vị");
            $("#chaluongan_chtt").hide();
            return;
        }
        $("#chaluongan_chtt").show();
        $('#thoigian_tt').attr("checked", "checked");
        if ($("#thoigian_tt").is(":checked")) {
            $("#tt_thoigian").show();
            $("#tt_bieu").hide();
        }
        if ($("#bieu_tt").is(":checked")) {
            $("#tt_thoigian").hide();
            $("#tt_bieu").show();
        }

        $("input[name='bed']").change(function () {
            if ($("input[name='bed']:checked").val() == 'TIME') {
                $("#tt_thoigian").show();
                $("#tt_bieu").hide();
                loadtrangthaimatdien();
            }
            else {
                $("#tt_thoigian").hide();
                $("#tt_bieu").show();
                loadtrangthaimatdien();
            }
        });
        $("#date_tungay_tt").val(gettimenow());
        $("#date_denngay_tt").val(gettimenow());

        loadtrangthaimatdien();
        $("#btn_thuchien_dp").click(function () {
            loadtrangthaimatdien();
        });

        $("#excel_baocao_tt").click(function () {
            trangthai_execl();

        });

    } catch (e) {
        //console.log(e.message);
    }
});
function loadtrangthaimatdien() {
    try {

        var typeData = $("input[name='bed']:checked").attr('value');

        var p = getAllIdMod();
        var code = JSON.parse(localStorage.getItem("tree_node"));
        var codetree = code[0].id;
      //  var codetree = '0101'
        if (codetree.length <= 4) {
            var typetree = '1';
        } else {
            var typetree = '2';
        }
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CHATLUONGDIEN.ThongKeTinhTrangMatDien", callback: "result_loadtrangthaimatdien" };
        var para = {
            v_TypeData: typeData,
            v_TypeTree: typetree,
            v_Value: codetree,
            v_dFrom: p.date_tungay_tt,
            v_dTo: p.date_denngay_tt,
        };
        callLoad();
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_loadtrangthaimatdien(config, para, lst) {
    try {
        var data = lst.data;
        
        if ($("input[name='bed']:checked").val() == 'TIME') {
            $("#table_thoigian_tt").empty();
            $.each(data, function (key, val) {
                var row = "";
                row += "<tr><td>"
                    + (key + 1) + "</td><td>"
                    + val.name + "</td><td>"
                    + val.tongdiemdolapdoxa + "</td><td>"
                    + val.tongdiemdothucte + "</td><td>"
                    + val.solanof_5p + "</td><td>"
                    + val.sophutof_5p + "</td><td>"
                    + val.solanof5p_15p + "</td><td>"
                    + val.sophutof5p_15p + "</td><td>"
                    + val.solanof15p_60p + "</td><td>"
                    + val.sophutof15p_60p + "</td><td>"
                    + val.solanof60p_120p + "</td><td>"
                    + val.sophutof60p_120p + "</td><td>"
                    + val.solanof120p_180p + "</td><td>"
                    + val.sophutof120p_180p + "</td><td>"
                    + val.solanof_180p + "</td><td>"
                    + val.sophutof_180p + "</td><td>"
                    + val.tonglan + "</td><td>"
                    + val.tongphut + "</td></tr>";

                $("#table_thoigian_tt").append(row);
            });

            // ve bang 

            bieudohighchart_tt(data);

        }
        else {
            $("#table_bieu_tt").empty();
            $.each(data, function (key, val) {
                var row1 = "";
                row1 += "<tr><td>"
                     + (key + 1) + "</td><td>"
                     + val.name + "</td><td>"
                     + val.tongdiemdolapdoxa + "</td><td>"
                     + val.tongdiemdothucte + "</td><td>"
                     + val.solanbieu1 + "</td><td>"
                     + val.sophutbieu1 + "</td><td>"
                     + val.percentbieu1 + "</td><td>"
                     + val.solanbieu2 + "</td><td>"
                     + val.sophutbieu2 + "</td><td>"
                     + val.percentbieu2 + "</td><td>"
                     + val.solanbieu3 + "</td><td>"
                     + val.sophutbieu3 + "</td><td>"
                     + val.percentbieu3 + "</td><td>"
                     + val.tongphut + "</td></tr>";

                $("#table_bieu_tt").append(row1);
            });
        }



        stopLoad();
    } catch (e) {
        console.log(e);
    }
}
function bieudohighchart_tt(data) {
    try {
        var p = getAllIdMod();
        var tenhien = "Biểu đồ so sánh tổng thời gian mất điện  từ ngày "+ p.date_tungay_tt +" đến ngày "+p.date_denngay_tt;
        var Higchar_tt = [];
        $.each(data, function (key, val) {
            var ten = val.name;
            var tong = val.tongphut;
            Higchar_tt.push({ name: ten, y: parseFloat(tong) });
          
        });
     
        Highcharts.chart('highet_tt_chart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: tenhien
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
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: Higchar_tt
            }]
        });
   

    } catch (e) {
        console.log(e);
    }
}

function trangthai_execl() {
    try{
        var p = getAllIdMod();
        var typeData = $("input[name='bed']:checked").attr('value');
        var code = JSON.parse(localStorage.getItem("tree_node"));
        var codetree = code[0].id;
        if (codetree.length <= 4) {
            var typetree = '1';
        } else {
            var typetree = '2';
        }

        var tungay = p.date_tungay_tt;
        var date = tungay.replace("/", "_").replace("/", "_");
        var namef_l = 'BAOCAOCHALUONGDIEN_' + date;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CHATLUONGDIEN.ThongKeTinhTrangMatDien", namefile: namef_l };
        var para = {
            v_TypeData: typeData,
            v_TypeTree: typetree,
            v_Value: codetree,
            v_dFrom: p.date_tungay_tt,
            v_dTo: p.date_denngay_tt,
        };

        if ($("input[name='bed']:checked").val() == 'TIME') {
          
            var colum = {
                kq: [
                { field: "name", name: "Đơn vị", type: "TextAndBoldCenter" },
                { field: "tongdiemdolapdoxa", name: "Tổng điểm đo lắp đo xa", type: "TextAndBoldCenter" },
                { field: "solanof_5p", name: "Mất điện dưới 5 phút - Số lần", type: "TextAndBoldCenter" },
                { field: "sophutof_5p", name: "Mất điện dưới 5 phút - Số phút", type: "TextAndBoldCenter" },
                { field: "solanof5p_15p", name: "Từ trên 5 phút đến dưới 15 phút - Số lần", type: "TextAndBoldCenter" },
                { field: "sophutof5p_15p", name: "Từ trên 5 phút đến dưới 15 phút - Số phút", type: "Text" },
                { field: "solanof15p_60p", name: "Từ trên 15 phút đến dưới 60 phút - Số lần", type: "Text" },
                { field: "sophutof15p_60p", name: "Từ trên 15 phút đến dưới 60 phút - Số phút", type: "Text" },
                { field: "solanof60p_120p", name: "Từ trên 60 phút đến dưới 120 phút - Số lần", type: "Text" },
                { field: "sophutof60p_120p", name: "Từ trên 60 phút đến dưới 120 phút - Số phút", type: "Text" },
                { field: "solanof120p_180p", name: "Từ trên 120 phút đến dưới 180 phút - Số lần", type: "Text" },
                { field: "sophutof120p_180p", name: "Từ trên 120 phút đến dưới 180 phút - Số phút", type: "Text" },
                { field: "solanof_180p", name: "Từ trên 180 phút trở lên - Số lần", type: "Text" },
                { field: "sophutof_180p", name: "Từ trên 180 phút trở lên - Số phút", type: "Text" },
                { field: "tonglan", name: "Tổng số lần mất điện", type: "Text" },
                { field: "tongphut", name: "Tổng số phút mất điện", type: "Text" }
                ]
            };
            ExecuteExportExcelOracle(config, para, colum);
        }
        else {

            var colum = {
                kq: [
                { field: "name", name: "Đơn vị", type: "TextAndBoldCenter" },
                { field: "tongdiemdolapdoxa", name: "Tổng điểm đo lắp đo xa", type: "TextAndBoldCenter" },
                { field: "solanbieu1", name: "Biểu 1 - Số lần", type: "Text" },
                { field: "sophutbieu1", name: "Biểu 1 - Số phút", type: "Text" },
                { field: "percentbieu1", name: "Biểu 1 - Tỷ lệ", type: "Text" },
                { field: "solanbieu2", name: "Biểu 2 - Số lần", type: "Text" },
                { field: "sophutbieu2", name: "Biểu 2 - Số phút", type: "Text" },
                { field: "percentbieu2", name: "Biểu 2 - Tỷ lệ", type: "Text" },
                { field: "solanbieu3", name: "Biểu 3 - Số lần", type: "Text" },
                { field: "sophutbieu3", name: "Biểu 3 - Số phút", type: "Text" },
                { field: "percentbieu3", name: "Biểu 3 - Tỷ lệ", type: "Text" },
                { field: "tonglan", name: "Tổng số phút mất điện", type: "Text" },
                { field: "tongphut", name: "Tổng số lần mất điện", type: "Text" }
                ]
            };
            ExecuteExportExcelOracle(config, para, colum);
        }

    } catch (e) {
        console.log(e);
    }
}
