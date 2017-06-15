$(document).ready(function () {
    showhideTree();
    initformelement();
    $(".content-wrapper").scroll(function () {
        f_FixHeader("tbl_sukien_data", "tbl_sukien_data_fix");
    });

    $("#dtTuNgay").val(localStorage.getItem("dateF"));
    if ($("#dtTuNgay").val() == "") $("#dtTuNgay").val(gettimenow());
    $("#dtDenNgay").val(localStorage.getItem("dateT"));
    if ($("#dtDenNgay").val() == "") $("#dtDenNgay").val(gettimenow());

    if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "0") {
        get_SUKIEN_KH();
        $(".sct").show();
    } else {
        $("#mesMain").html("<i class='icon fa fa-ban'></i>Chức năng không áp dụng cho Sổ ghi hoặc Đơn vị");
        $("#toolbar").empty();
        $("#tbl_sukien_data").empty();
        $(".sct").hide();
        $("#boxFilter").hide();
    }
    $("#excel_sukien").click(function () {
        excel();
    });

    $("#btnLocdulieu").click(function () {
        get_SUKIEN_KH();
    });
});
function get_SUKIEN_KH() {
    try {
        var tungay = $("#dtTuNgay").val();
        var denngay = $("#dtDenNgay").val();
        var madiemdo = $("#txtMaDiemDo").val();
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_THONGSOVANHANH.Event_KHACHHANG", callback: "result_sukien_kh" };
        var para = {
            v_MeterId: meterid,
            v_Socongto: sct,
            v_Loai: $("#cbLoaisukien").val(),
            v_From: tungay,
            v_To: denngay,
            v_MaDiemDo: madiemdo
        };

        //console.log(para);
        ExecuteServiceSyns(config, para);
        callLoad();
        //  

    } catch (e) {
        console.log(e);
    }
}

function result_sukien_kh(config, para, lst) {
    try {
        var opt = "";
        var data = lst.data;
        $("#tbl_sukien_data tbody").empty();
        if (data.length == 0) {
            $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
            selectlang();
            stopLoad();
            return;
        }
        var tr = "";
        var index = 0;
        $.each(data, function (i, val) {
            opt = '<option value="' + val.socongto + '">' + val.socongto + '</option>';
            if (i == 0 || (val.madiemdo != data[i - 1].madiemdo)) {
                index++;
                tr += '<tr>' +
                        '<td class="a_c">' + index + '</td>' +
                        '<td colspan="6">' + val.madiemdo + ' - '+val.tendiemdo+' (Số công tơ: '+val.socongto+')</td>' +
                    '</tr>';
            }
            tr += '<tr>'+
                        '<td class="a_c"></td>' +
                        '<td>' + val.event + '</td>' +
                        '<td>' + val.phase + '</td>' +
                        '<td class="a_r">' + val.timestart + '</td>' +
                        '<td class="a_r">' + val.timeend + '</td>' +
                        '<td class="a_r">' + val.count + '</td>' +
                        '<td class="a_r">' + val.sophut + '</td>' +
                    '</tr>';
        });
        
        $("#tbl_sukien_data tbody").append(tr);
        $(".sobanghi").html("<span tkey='co'></span>" + data.length + "<span tkey='banghi'></span>");
        selectlang();
        stopLoad();
    } catch (e) {
        console.log(e);
    }
}

function excel() {

    var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
    var type = JSON.parse(localStorage.getItem("tree_node"))[0].type;
    var tungay = $("#dtTuNgay").val();
    var denngay = $("#dtDenNgay").val();
    if (tungay == "") tungay = gettimenow();
    if (denngay == "") denngay = gettimenow();
    var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
    var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;

    var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
    var namef_l = 'SUKIEN_' + tendiemdo.replace('<span class=\"total\">', '_').replace('</span>', '') + "_" + tungay.replace("/", "-") + "_" + denngay.replace("/", "-");
    var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_THONGSOVANHANH.Event_KHACHHANG", namefile: namef_l };
    var para = {
        v_MeterId: meterid,
        v_Socongto: sct,
        v_Loai: $("#cbLoaisukien").val(),
        v_From: tungay,
        v_To: denngay
    };
    var colum = {
        kq: [
            { field: "stt", name: "STT", type: "TextAndBoldCenter" },
        { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
        { field: "event", name: "Sự kiện", type: "TextAndBoldCenter" },
        { field: "phase", name: "Pha", type: "Text" },
        { field: "timestart", name: "Thời gian bắt đầu", type: "Text" },
        { field: "timeend", name: "Thời gian kết thúc", type: "Text" },
        { field: "sophut", name: "Số phút", type: "Text" },
        { field: "count", name: "Số lần", type: "Text" }
        ]
    };
    ExecuteExportExcelOracle(config, para, colum);

}
