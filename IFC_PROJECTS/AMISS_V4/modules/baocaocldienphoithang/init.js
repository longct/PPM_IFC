var datathang;
$(document).ready(function () {
    try {
        showhideTree();
        selectlang();
        initformelement();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        ////console.log(sct);
        if (sct != "0") {
            $("#chatluong_dth").html("Vui lòng chọn Sổ ghi hoặc Đơn vị");
            $("#chatluongs_dth").hide();
            return;
        }
        $("#chatluongs_dth").show();

        $('#maifi_dth').attr("checked", "checked");
        //$('#maifi_dth').attr("checked", "checked");
        $("#date_tuthang_dth").val(thanglui());
        $("#date_denthang_dth").val(gettimenow_cscthang());
        baocaophoithang();

        $("#excel_tdh_clthang").click(function () {
            execl_clthang();
        });
        $("#btn_thuchien_dth").click(function () {
            baocaophoithang();
        });
        $("input[name='thanga']").change(function () {
            if ($("input[name='thanga']:checked").val() == 'a') {
        
                $("#high_chart_safi").show();
                $("#highe_chart_sadi").hide();
                var data = datathang;
                MAIFISAIFI_clthang(data);
            }
            else {   
                $("#high_chart_safi").hide();
                $("#highe_chart_sadi").show();
                var data = datathang;
                SAIDI_clthang(data);
            }

        });


    } catch (e) {
        //console.log(e.message);
    }
});

function thanglui() {
    try {
        var dateDefault = new Date();
        dateDefault.setMonth(dateDefault.getMonth() - 4);
        var dat = (dateDefault.getMonth() + 1) + "/" + dateDefault.getFullYear();
        return dat;
    } catch (e) {
        ////console.log(e);
        return "";
    }

}
function baocaophoithang() {
    try {
        var p = getAllIdMod();
        var code = JSON.parse(localStorage.getItem("tree_node"));
        var codetree = code[0].id;
        var codetree = '0101';
        if (codetree.length <= 4) {
            var typetree = '1';
        } else {
            var typetree = '2';
        }
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CHATLUONGDIEN.ThongKeChatLuongTheoThang", callback: "result_baocaophoithang" };
        var para = {
            v_TypeTree: typetree,
            v_Value: codetree,
            v_dFrom: 01 + "/" + p.date_tuthang_dth,
            v_dTo: 01 + "/" + p.date_denthang_dth,

        };
        callLoad();
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_baocaophoithang(config, para, lst) {
    try {
        //console.log(lst);
        var data = lst.data;
        datathang = data;
        $("#txtthang1").html(data[0].thang0);
        $("#txtthang2").html(data[0].thang1);
        $("#txtthang3").html(data[0].thang2);
        $("#txtthang4").html(data[0].thang3);
        $("#txtthang5").html(data[0].thang4);

        $("#tablethang_dth").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + (key + 1) + "</td><td>"
                + val.name + "</td><td>"
                + val.tongdiemdolapdoxa + "</td><td>"
                + val.tongdiemdothucte + "</td><td class='ma'>"
                + val.sokhnhohon5p_thang0 + "</td><td class='sa'>"
                + val.sokhlonhon5p_thang0 + "</td><td class='tong'>"
                + val.sophutlonhon5p_thang0 + "</td><td class='ma'>"
                + val.sokhnhohon5p_thang1 + "</td><td class='sa'>"
                + val.sokhlonhon5p_thang1 + "</td><td class='tong'>"
                + val.sophutlonhon5p_thang1 + "</td><td class='ma'>"
                + val.sokhnhohon5p_thang2 + "</td><td class='sa'>"
                + val.sokhlonhon5p_thang2 + "</td><td class='tong'>"
                + val.sophutlonhon5p_thang2 + "</td><td class='ma'>"
                + val.sokhnhohon5p_thang3 + "</td><td class='sa'>"
                + val.sokhlonhon5p_thang3 + "</td><td class='tong'>"
                + val.sophutlonhon5p_thang3 + "</td><td class='ma'>"
                + val.sokhnhohon5p_thang4 + "</td><td class='sa'>"
                + val.sokhlonhon5p_thang4 + "</td><td class='tong'>"
                + val.sophutlonhon5p_thang4 + "</td></tr>";
            $("#tablethang_dth").append(row);
        });

        if ($("#maifi_dth").is(":checked")) {
          
            $("#high_chart_safi").show();
            $("#highe_chart_sadi").hide();
            MAIFISAIFI_clthang(data);
        }
        if ($("#saidi_dth").is(":checked")) {
            $("#high_chart_safi").hide();
            $("#highe_chart_sadi").show();
            SAIDI_clthang(data);
        }


        stopLoad();
    } catch (e) {
        console.log(e);
    }
}


function MAIFISAIFI_clthang(data) {
    try {
        var datcategores = [];
        var dataSAIFI = [];
        var dataMAIFI = [];
        $.each(data, function (key, val) {
            datcategores.push(val.name);
            dataSAIFI.push(parseFloat(val.sokhlonhon5p_thang0));
            dataMAIFI.push(parseFloat(val.sokhnhohon5p_thang0));
        });
        Highcharts.chart('high_chart_safi', {
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
function SAIDI_clthang(data) {
    try {
        var datcategores = [];
        var dataSAIDI = [];
        $.each(data, function (key, val) {
            datcategores.push(val.name);
            dataSAIDI.push(parseFloat(val.sophutlonhon5p_thang0));
        });
        Highcharts.chart('highe_chart_sadi', {
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

function execl_clthang() {
    try {
        var p = getAllIdMod();
        var code = JSON.parse(localStorage.getItem("tree_node"));
        var codetree = code[0].id;
        if (codetree.length <= 4) {
            var typetree = '1';
        } else {
            var typetree = '2';
        }

        var tungay = gettimenow();
        var date = tungay.replace("/", "_").replace("/", "_");
        //  var namef_l = 'LOCBAOCAOCAO';
        var namef_l = 'BAOCAOCHATLUONGDIENTHANG_' + date;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CHATLUONGDIEN.ThongKeChatLuongTheoThang", namefile: namef_l };
        var para = {
            v_TypeTree: typetree,
            v_Value: codetree,
            v_dFrom: 01 + "/" + p.date_tuthang_dth,
            v_dTo: 01 + "/" + p.date_denthang_dth,
        };
       
        var colum = {
            kq: [
            { field: "name", name: "Đơn vị", type: "TextAndBoldCenter" },
            { field: "tongdiemdolapdoxa", name: "Tổng điểm đo lắp đo xa", type: "TextAndBoldCenter" },
            { field: "thang0", name: "Thang0", type: "Text" },
            { field: "sokhnhohon5p_thang0", name: "MAIFI0", type: "Text" },
            { field: "sokhlonhon5p_thang0", name: "SAIFI0", type: "Text" },
            { field: "sophutlonhon5p_thang0", name: "SAIDI0", type: "Text" },
            { field: "thang1", name: "Thang1", type: "Text" },
            { field: "sokhnhohon5p_thang1", name: "MAIFI1", type: "Text" },
            { field: "sokhlonhon5p_thang1", name: "SAIFI1", type: "Text" },
            { field: "sophutlonhon5p_thang1", name: "SAIDI1", type: "Text" },
            { field: "thang2", name: "Thang2", type: "Text" },
            { field: "sokhnhohon5p_thang2", name: "MAIFI2", type: "Text" },
            { field: "sokhlonhon5p_thang2", name: "SAIFI2", type: "Text" },
            { field: "sophutlonhon5p_thang2", name: "SAIDI2", type: "Text" },
            { field: "thang3", name: "Thang3", type: "Text" },
            { field: "sokhnhohon5p_thang3", name: "MAIFI3", type: "Text" },
            { field: "sokhlonhon5p_thang3", name: "SAIFI3", type: "Text" },
            { field: "sophutlonhon5p_thang3", name: "SAIDI3", type: "Text" },
             { field: "thang4", name: "Thang4", type: "Text" },
            { field: "sokhnhohon5p_thang4", name: "MAIFI4", type: "Text" },
            { field: "sokhlonhon5p_thang4", name: "SAIFI4", type: "Text" },
            { field: "sophutlonhon5p_thang4", name: "SAIDI4", type: "Text" },

            ]
        };
        ExecuteExportExcelOracle(config, para, colum);

    } catch (e) {
        console.log(e);
    }
}



