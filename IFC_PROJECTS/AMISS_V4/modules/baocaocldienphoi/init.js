var datachaluong;
$(document).ready(function () {
    showhideTree();
    try {
        showhideTree();
        selectlang();
        initformelement();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        ////console.log(sct);
        if (sct != "0") {
            $("#chatluong_cht").html("Vui lòng chọn Sổ ghi hoặc Đơn vị");
            $("#chaluongan_chat").hide();
            return;
        }
        $("#chaluongan_chat").show();
        $("#date_tungay_dp").val(gettimenow());
        $("#date_denngay_dp").val(gettimenow());

        $('#maifi_dp').attr("checked", "checked");

        cluongdien_dp();
        $("#btn_thuchien_dp").click(function () {
            cluongdien_dp()
        });

        $("input[name='bedStatus']").change(function () {

            if ($("input[name='bedStatus']:checked").val() == 'a') {
                $("#highet_chart").show();
                $("#highesadi_chart").hide();
                var data = datachaluong;
                MAIFISAIFI_cl(data);
            }
            else {
                $("#highet_chart").hide();
                $("#highesadi_chart").show();
                var data = datachaluong;
                SAIDI_cl(data);
            }

        });
        $("#excel_baocao_cl").click(function () {
            execl_cl();
        });

    } catch (e) {
        //console.log(e.message);
    }
});

function cluongdien_dp() {
    try {
        var p = getAllIdMod();
        var code = JSON.parse(localStorage.getItem("tree_node"));
        var codetree = code[0].id;
        if (codetree.length <= 4  ) {
            var typetree = '1';
        } else {
            var typetree = '2';
        }


        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CHATLUONGDIEN.ThongKeChatLuongDien", callback: "result_cluongdien_dp" };
        var para = {
            v_TypeTree: typetree,
            v_Value: codetree,
            v_dFrom: p.date_tungay_dp,
            v_dTo: p.date_denngay_dp,

        };
    
        callLoad();
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_cluongdien_dp(config, para, lst) {
    try {

        var data = lst.data;
     
        datachaluong = data;
        $("#table_dp").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + (key + 1) + "</td><td>"
                + val.name + "</td><td class='l'>"
                + val.tongdiemdolapdoxa + "</td><td class='l'>"
                + val.tongdiemdothucte + "</td><td class='l'>"
                + val.solanof_nho5p + "</td><td class='l'>"
                + val.sokhof_nho5p + "</td><td class='ma'>"
                + val.maifi + "</td><td class='l'>"
                + val.sokhof_lon5p + "</td><td class='l'>"
                + val.solanof_lon5p + "</td><td class='l'>"
                + val.sophutof_lon5p + "</td><td class='sa'>"
                + val.saifi + "</td><td class='tong'>"
                + val.saidi + "</td></tr>";

            $("#table_dp").append(row);
        });

        if ($("#maifi_dp").is(":checked")) {
            $("#highet_chart").show();
            $("#highesadi_chart").hide();
            MAIFISAIFI_cl(data);
        }
        if ($("#saidi_dp").is(":checked")) {
            $("#highet_chart").hide();
            $("#highesadi_chart").show();
            SAIDI_cl(data);
        }

        stopLoad();

    } catch (e) {
        console.log(e);
    }
}
function MAIFISAIFI_cl(data) {
    try {
        var datcategores = [];
        var dataSAIFI = [];
        var dataMAIFI = [];
        $.each(data, function (key, val) {
            datcategores.push(val.name);
            dataSAIFI.push(parseFloat(val.saifi));
            dataMAIFI.push(parseFloat(val.maifi));
        });
        Highcharts.chart('highet_chart', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Biểu đồ SAIFI, MAIFI'
            },
            xAxis: {
                categories: datcategores
            },
            credits: {
                enabled: false
            }, colors: ['#a186be', '#6dcff6']
            ,
            series: [
                 {
                     name: 'MAIFI',
                     data: dataMAIFI
                 }, {
                     name: 'SAIFI',
                     data: dataSAIFI
                 }]

        });

    } catch (e) {
        console.log(e);
    }
}
function SAIDI_cl(data) {
    try {
        var datcategores = [];
        var dataSAIDI = [];
        $.each(data, function (key, val) {
            datcategores.push(val.name);
            dataSAIDI.push(parseFloat(val.saidi));
        });
        Highcharts.chart('highesadi_chart', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Biểu đồ SAIDI'
            },
            xAxis: {
                categories: datcategores
            },
            credits: {
                enabled: false
            }, colors: ['#fdc689']
            , series: [
                 {
                     name: 'SAIDI',
                     data: dataSAIDI
                 }
            ]
        });
    } catch (e) {
        console.log(e);
    }
}

function execl_cl() {
    try {
        var p = getAllIdMod();
        var code = JSON.parse(localStorage.getItem("tree_node"));
        var codetree = code[0].id;
        if (codetree.length <= 4) {
            var typetree = '1';
        } else {
            var typetree = '2';
        }

        var tungay = p.date_tungay_dp
        var date = tungay.replace("/", "_").replace("/", "_");
        //  var namef_l = 'LOCBAOCAOCAO';
        var namef_l = 'BAOCAOCHALUONGDIEN_' + date;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CHATLUONGDIEN.ThongKeChatLuongDien", namefile: namef_l };
        var para = {
            v_TypeTree: typetree,
            v_Value: codetree,
            v_dFrom: p.date_tungay_dp,
            v_dTo: p.date_denngay_dp
        };
        var colum = {
            kq: [
            { field: "name", name: "Đơn vị", type: "TextAndBoldCenter" },
            { field: "tongdiemdolapdoxa", name: "Tổng điểm đo lắp đo xa", type: "TextAndBoldCenter" },
            { field: "solanof_nho5p", name: "Mất điện thoáng qua dưới 5 phút - Lần mất điện", type: "TextAndBoldCenter" },
            { field: "sokhof_nho5p", name: "Mất điện thoáng qua dưới 5 phút - Số KH mất điện", type: "TextAndBoldCenter" },
            { field: "maifi", name: "MAIFI", type: "TextAndBoldCenter" },
            { field: "sokhof_lon5p", name: "Mất điện kéo dài (5 phút trở lên) - Lần mất điện", type: "Text" },
            { field: "solanof_lon5p", name: "Mất điện kéo dài (5 phút trở lên) - Số KH mất điện", type: "Text" },
            { field: "sophutof_lon5p", name: "Mất điện kéo dài (5 phút trở lên) - Thời gian mất", type: "Text" },
            { field: "saifi", name: "SAIFI", type: "Text" },
            { field: "saidi", name: "SAIDI", type: "Text" }
            ]
        };
        ExecuteExportExcelOracle(config, para, colum);

    } catch (e) {
        console.log(e);
    }
}



