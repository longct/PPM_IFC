$(document).ready(function () {
    try {
        showhideTree();
        initformelement();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        ////console.log(sct);
        if (sct == "0") {
            $("#chatluong_clkhmd").html("Vui lòng chọn điểm đo");
            $("#chaluongan_clkhmd").hide();
            return;
        }
        $("#chaluongan_clkhmd").show();
        $("#date_tungay_clkhmd").val(gettimenow());
        $("#date_denngay_clkhmd").val(gettimenow());
        baocaochatluongdien_clkhmd();

        $("#btn_thuchien_clkhmd").click(function () {
            baocaochatluongdien_clkhmd();
        });
        $("#excel_baocao_clkhmd").click(function () {
            execl_clkhmd();
        });

    } catch (e) {
        console.log(e);
    }

});

function baocaochatluongdien_clkhmd() {
    try {
        var p = getAllIdMod();
        var code = JSON.parse(localStorage.getItem("tree_node"));

        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CHATLUONGDIEN.ThongKeMatDienKhachHang", callback: "result_baocaochatluongdien_clkhmd" };
        var para = {
            v_MeterId:code[0].id,
           // v_MeterId: 202254,
            v_dFrom: p.date_tungay_clkhmd,
            v_dTo: p.date_denngay_clkhmd,
        };
        callLoad();
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_baocaochatluongdien_clkhmd(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0) {
            $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
            $("#table_clkhmd").empty();
            stopLoad();
            return;
        }
        $("#table_clkhmd").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
            + val.timestart + "</td><td>"
            + val.timeend + "</td><td>"
            + val.sophutbieu1 + "</td><td>"
            + val.percentbieu1 + "</td><td>"
            + val.sophutbieu2 + "</td><td>"
            + val.percentbieu2 + "</td><td>"
            + val.sophutbieu3 + "</td><td>"
            + val.percentbieu3 + "</td><td>"
            + val.minutesrange + "</td></tr>";
            
            $("#table_clkhmd").append(row);
        });

        stopLoad();
    } catch (e) {
        console.log(e);
    }
}

function execl_clkhmd() {
    try {
        var p = getAllIdMod();
        var code = JSON.parse(localStorage.getItem("tree_node"));

        var tungay = p.date_tungay_clkhmd
        var date = tungay.replace("/", "_").replace("/", "_");
        //  var namef_l = 'LOCBAOCAOCAO';
        var namef_l = 'BAOCAOKHACHHANG_' + date;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CHATLUONGDIEN.ThongKeMatDienKhachHang", namefile: namef_l };
        var para = {
            v_MeterId:code[0].id,
          //  v_MeterId: 202254,
            v_dFrom: p.date_tungay_clkhmd,
            v_dTo: p.date_denngay_clkhmd,
        };
        var colum = {
            kq: [
            { field: "stt", name: "STT", type: "TextAndBoldCenter" },
            { field: "timestart", name: "Thời điểm mất điện", type: "TextAndBoldCenter" },
            { field: "timeend", name: "Thời điểm có điện", type: "TextAndBoldCenter" },
            { field: "sophutbieu1", name: "Tổng phút mất vào biểu 1", type: "TextAndBoldCenter" },
            { field: "percentbieu1", name: "Tỷ lệ biểu 1", type: "TextAndBoldCenter" },
            { field: "sophutbieu2", name: "Tổng phút mất vào biểu 2", type: "TextAndBoldCenter" },
            { field: "percentbieu2", name: "Tỷ lệ biểu 2", type: "Text" },
             { field: "sophutbieu3", name: "Tổng phút mất vào biểu 3", type: "TextAndBoldCenter" },
            { field: "percentbieu3", name: "Tỷ lệ biểu 3", type: "Text" },
            { field: "minutesrange", name: "Tổng thời gian mất điện (Phút)", type: "Text" }
            ]
        };
        ExecuteExportExcelOracle(config, para, colum);

    } catch (e) {
        console.log(e);
    }
}