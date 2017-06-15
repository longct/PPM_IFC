$(document).ready(function () {showhideTree();
    try {
        showhideTree();
        if (localStorage.getItem("tree_node")) {
            selectlang();
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            if (socongto != "0") {
                $("#tendiemdo_span").html("Vui lòng chọn Sổ ghi hoặc đơn vị để xem dữ liệu");
                return;
            }
            else if (istype == "4")
                $("#tendiemdo_span").html("<span tkey='soghi'></span>: " + tendiemdo);
            else if (socongto == "0" && istype != "4")
                $("#tendiemdo_span").html("<span tkey='donvi'></span>: " + tendiemdo);
            else if (istype >= "6")
                $("#tendiemdo_span").html("Trạm: " + tendiemdo);
            //$("#btn_thuchien_bcSL").removeAttr("disabled");
        }
        else {
            selectlang();
            $("#tendiemdo_span").html("Vui lòng chọn điểm đo để xem dữ liệu");
            $("#tab_content").empty();
        }
        var month = gettimenow();
        initformelement();
        get_BCTL();
        selectlang();
        $("#excel_bcthanhly").click(function () {
            excel();
        })
    } catch (e) {
        //console.log(e.message);
    }
});

function get_BCTL() {
    try {
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_THONGTINDIEMDO.GETDIEMDOTHANHLYTRAM", callback: "result_BCTL" };
        var para = {
            v_Code: code
        };
        callLoad();
        ExecuteServiceSyns(config, para);
        //////console.log(para);

        //  

    } catch (e) {
        console.log(e);
    }
}
function result_BCTL(config, para, lst) {
    try {
        var data = lst.data;
        ////console.log(data);
        if (data.length == 0) {
            $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
            $("#bcsl_data tbody").empty();
            selectlang();
            stopLoad();
            return;
        }
        var tr = "";
        var tempMeterId;
        var countKhachhang = 0;
        $.each(data, function (i, val) {
            tr += '<tr>' +
                        '<td class="td_stt1pha">' + val.stt + '</td>' +
                        '<td class="a_c">' + val.madiemdo + '</td>' +
                        '<td class="a_c">' + val.socongto + '</td>' +
                        '<td class="a_c">' + val.tendiemdo + '</td>' +
                        '<td class="a_c">' + replace0_0(val.ngaythanhly) + '</td>' +
                        '<td class="a_c">' + val.dienluc + '</td>' +
                    '</tr>';
        });
        $("#bctl_data tbody").empty();
        $("#bctl_data tbody").append(tr);
        $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "<span tkey='banghi'></span>");

        selectlang();
        stopLoad();
        $(".content").scroll(function () {
            if ($(this).scrollTop() > 200) {
                set_fixheader_bcsl();
            } else if ($(this).scrollTop() <= 200) {
                remove_fixheader_bcsl();
            }
        });

    } catch (e) {
        console.log(e);
    }
}
function set_fixheader_bcsl() {
    $(".scroll_header").css("width", $("#bcsl_data").width() + 3);
    $("#fix_header thead tr th.th_stt").css("width", $("#bcsl_data thead tr th.th_stt").width() + 16);
    $("#fix_header thead tr th.th_tdd").css("width", $("#bcsl_data thead tr th.th_tdd").width() + 30);
    $("#fix_header thead tr th.th_pha").css("width", $("#bcsl_data thead tr th.th_pha").width() + 16);
    $("#fix_header thead tr th.th_u").css("width", $("#bcsl_data thead tr th.th_u").width() + 16);
    $("#fix_header thead tr th.th_v").css("width", $("#bcsl_data thead tr th.th_v").width() + 16);
    $("#fix_header thead tr th.th_goc").css("width", $("#bcsl_data thead tr th.th_goc").width() + 16);
    $("#fix_header thead tr th.th_cos").css("width", $("#bcsl_data thead tr th.th_cos").width() + 16);
    $("#fix_header thead tr th.th_p").css("width", $("#bcsl_data thead tr th.th_p").width() + 16);
    $("#fix_header thead tr th.th_q").css("width", $("#bcsl_data thead tr th.th_q").width() + 16);
    $("#fix_header thead tr th.th_f").css("width", $("#bcsl_data thead tr th.th_f").width() + 16);
    $(".scroll_header").slideDown();
}
function remove_fixheader_bcsl() {
    $(".scroll_header").slideUp();
}

function excel() {


    var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;

    var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
    var namef_l = 'BaoCaoThanhLy_' + tendiemdo.replace('<span class=\"total\">', '_').replace('</span>', '');
    var config = { connstr: "ConnectOracle233", namesql: "AMISS_THONGTINDIEMDO.GETDIEMDOTHANHLYTRAM", namefile: namef_l };
    var para = {
        v_Code: code
    };
    var colum = {
        kq: [
            { field: "stt", name: "STT", type: "TextAndBoldCenter" },
        { field: "madiemdo", name: "Mã điểm đo", type: "TextAndBoldCenter" },
        { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
        { field: "tendiemdo", name: "Tên khách hàng", type: "Text" },
        { field: "ngaythanhly", name: "Ngày thanh lý", type: "Text" },
        { field: "dienluc", name: "Vị trí", type: "Text" }
        ]
    };
    ExecuteExportExcelOracle(config, para, colum);

}