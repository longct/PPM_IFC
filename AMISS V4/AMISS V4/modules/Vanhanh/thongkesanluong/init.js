$(document).ready(function () {
   
    try {
        showhideTree();
        initformelement();
        var month = gettimenow();
        if ($("#date_thang").val() == "") {
            $("#date_thang").val(month.substring(3, 10));
        }
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
      
        //loadContent();
        get_BCSL();
        selectlang();
        $("#btn_thuchien_bcSL").click(function () {
            get_BCSL();
        })
        $("#excel_thongkesanluong").click(function () {
            excel();
        })
    } catch (e) {
        console.log(e.message);
    }
});

function get_BCSL() {
    try {
        var v_KyChot = $("#cb_ky option:selected").val(); 
        var v_FMonth = "01/"+$("#date_thang").val();
        var v_getTypeData = $("#cb_loctheo option:selected").val();
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_SANLUONG.SANLUONG_CHISOCHOT", callback: "result_BCSL" };
        var para = {
            v_Value: code,
            v_FMonth: v_FMonth,
            v_KyChot: v_KyChot,
            v_View: '-1',
            v_MeterId: null,
        };
        callLoad();
        ExecuteServiceSyns(config, para);
        console.log(para);
        //  

    } catch (e) {
        console.log(e);
    }
}
function result_BCSL(config, para, lst) {
    try {
        var data = lst.data;
        console.log(data);
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
            if (tempMeterId != val.meterid) {
                tempMeterId = val.meterid;
                countKhachhang++;
                tr += '<tr>' +
                            '<td colspan="7" class="tsvh_tendiemdo">' + val.tendiemdo + ' - '+ val.madiemdo+'</td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td class="td_stt1pha">' + val.ky + '</td>' +
                            '<td class="a_c">' + val.ngaychotdulieu + '</td>' +
                            '<td class="a_c">' + val.pgiao1 + '</td>' +
                            '<td class="a_c">' + val.pgiao2 + '</td>' +
                            '<td class="a_c">' + val.pgiao3 + '</td>' +
                            '<td class="a_c">' + val.pgiaotong + '</td>' +
                            '<td class="a_c">' + val.qgiaotong + '</td>' +
                        '</tr>';
            } else {
                tr += '<tr>' +
                            '<td class="td_stt1pha">' + val.ky + '</td>' +
                            '<td class="a_c">' + val.ngaychotdulieu + '</td>' +
                            '<td class="a_c">' + val.pgiao1 + '</td>' +
                            '<td class="a_c">' + val.pgiao2 + '</td>' +
                            '<td class="a_c">' + val.pgiao3 + '</td>' +
                            '<td class="a_c">' + val.pgiaotong + '</td>' +
                            '<td class="a_c">' + val.qgiaotong + '</td>' +
                        '</tr>';
            }
        });
        $("#bcsl_data tbody").empty();
        $("#bcsl_data tbody").append(tr);
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

    var v_KyChot = $("#cb_ky option:selected").val();
    var v_FMonth = "01/" + $("#date_thang").val();
    var v_getTypeData = $("#cb_loctheo option:selected").val();
    var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;

    var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
    var namef_l = 'ThongKeSanLuong_' + tendiemdo.replace('<span class=\"total\">', '_').replace('</span>', '') + "_" + $("#date_thang").val().replace("/", "-");
    var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_SANLUONG.SANLUONG_CHISOCHOT", namefile: namef_l };
    var para = {
        v_Value: code,
        v_FMonth: v_FMonth,
        v_KyChot: v_KyChot,
        v_View: '-1',
        v_MeterId: null,
    };
    var colum = {
        kq: [
        { field: "madiemdo", name: "Mã điểm đo", type: "TextAndBoldCenter" },
        { field: "tendiemdo", name: "Tên khách hàng", type: "TextAndBoldCenter" },
        { field: "ngaychotdulieu", name: "Thời điểm chốt", type: "TextAndBoldCenter" },
        { field: "pgiao1", name: "Biểu 1", type: "Text" },
        { field: "pgiao2", name: "Biểu 2", type: "Text" },
        { field: "pgiao3", name: "Biểu 3", type: "Text" },
        { field: "pgiaotong", name: "Biểu tổng", type: "Text" },
        { field: "qgiaotong", name: "Vô công", type: "Text" }
        ]
    };
    ExecuteExportExcelOracle(config, para, colum);

}