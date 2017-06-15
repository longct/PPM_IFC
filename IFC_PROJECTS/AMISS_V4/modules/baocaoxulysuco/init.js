$(document).ready(function () {
    showhideTree();
    try {
        if (localStorage.getItem("tree_node")) {
            selectlang();
            initformelement();
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
            initformelement();
            $("#tendiemdo_span").html("Vui lòng chọn điểm đo để xem dữ liệu");
            $("#tab_content").empty();
        }

        var month = gettimenow();
        if (localStorage.getItem("dateF") == "" && localStorage.getItem("dateT") == "") {
            $("#date_tungay").val(gettimenow());
            //$(".datepicker").val(gettimenow());
            $("#date_denngay").val(gettimenow());
        } else {
            $("#date_tungay").val(localStorage.getItem("dateF"));
            $("#date_denngay").val(localStorage.getItem("dateT"));
        }
        $("#date_tungay").change(function () {
            localStorage.setItem("dateF", $("#date_tungay").val());
        });
        $("#date_denngay").change(function () {
            localStorage.setItem("dateT", $("#date_denngay").val());
        });
        $("#btn_thuchien_xlsc").click(function () {
            get_XLSC(0);
        })
        get_XLSC(0);
    } catch (e) {
        //console.log(e.message);
    }
});

function get_XLSC(page) {
    try {
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var v_Type = $("#cb_loaisuco option:selected").val();
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_LOG.GET_LOGS_SMS", callback: "result_XLSC" };
        var para = {
            v_Type: v_Type,
            v_Dfrom: tungay,
            v_Dto: denngay,
            v_pagenum: page,
            v_numrecs: 20,
        };
        callLoad();
        ExecuteServiceSyns(config, para);
        ////console.log(para);

        //  

    } catch (e) {
        console.log(e);
    }
}
function result_XLSC(config, para, lst) {
    try {
        var data = lst.data;
        ////console.log(data);
        if (data.length == 0) {
            $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
            $("#xlsc_data tbody").empty();
            selectlang();
            stopLoad();
            return;
        }
        var tr = "";
        $.each(data, function (i, val) {
            tr += '<tr>' +
                        '<td class="td_stt1pha">' + val.rnum + '</td>' +
                        '<td class="text-bold">' + val.chude + '</td>' +
                        '<td class="">' + val.noidung + '</td>' +
                        '<td class="a_c">' + val.dateinsert + '</td>';
            if (val.trangthailoi == "DangLoi")
                tr += '<td class="a_c mkn ttl">Đang lỗi</td>';
            else
                tr += '<td class="a_c kn ttl">' + val.trangthailoi + '</td>';
            if (val.trangthaigui == "OK")
                tr += '<td class="a_c kn ttl">Đã gửi</td>';
            else
                tr += '<td class="a_c mkn ttl">' + val.trangthaigui + '</td>';
            tr += '</tr>';
        });
        $("#xlsc_data tbody").empty();
        $("#xlsc_data tbody").append(tr);
        $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "/"+data[0].rowscount+"<span tkey='banghi'></span>");

        selectlang();
        stopLoad();
        LoadPhanTrang_("pageLst_xlsc", "pageCurent_xlsc", data, function () {
            var p = getAllIdMod();
            get_XLSC($("#pagenumber").val() - 1);
        });
        //$(".content").scroll(function () {
        //    if ($(this).scrollTop() > 200) {
        //        set_fixheader_bcsl();
        //    } else if ($(this).scrollTop() <= 200) {
        //        remove_fixheader_bcsl();
        //    }
        //});

    } catch (e) {
        console.log(e);
    }
}
//function set_fixheader_bcsl() {
//    $(".scroll_header").css("width", $("#bcsl_data").width() + 3);
//    $("#fix_header thead tr th.th_stt").css("width", $("#tkld_data thead tr th.th_stt").width() + 16);
//    $("#fix_header thead tr th.th_tdd").css("width", $("#tkld_data thead tr th.th_tdd").width() + 30);
//    $("#fix_header thead tr th.th_pha").css("width", $("#tkld_data thead tr th.th_pha").width() + 16);
//    $("#fix_header thead tr th.th_u").css("width", $("#tkld_data thead tr th.th_u").width() + 16);
//    $("#fix_header thead tr th.th_v").css("width", $("#tkld_data thead tr th.th_v").width() + 16);
//    $("#fix_header thead tr th.th_goc").css("width", $("#tkld_data thead tr th.th_goc").width() + 16);
//    $("#fix_header thead tr th.th_cos").css("width", $("#tkld_data thead tr th.th_cos").width() + 16);
//    $("#fix_header thead tr th.th_p").css("width", $("#tkld_data thead tr th.th_p").width() + 16);
//    $("#fix_header thead tr th.th_q").css("width", $("#tkld_data thead tr th.th_q").width() + 16);
//    $("#fix_header thead tr th.th_f").css("width", $("#tkld_data thead tr th.th_f").width() + 16);
//    $(".scroll_header").slideDown();
//}
//function remove_fixheader_bcsl() {
//    $(".scroll_header").slideUp();
//}