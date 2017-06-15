var countpage = 10;
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
            $("#tendiemdo_span").html("Vui lòng chọn đơn vị để xem dữ liệu");
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
        $("#btn_thuchien_tkld").click(function () {
            get_TKLD(1);
        })
        get_TKLD(1);
        $("#excel_thongkelapdat").click(function () {
            excel();
        })
    } catch (e) {
        console.log(e.message);
    }
});

function get_TKLD(page) {
    try {               
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var status = $("#cb_trangthai option:selected").val();
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var config = { connstr: "ConnectOracle233", namesql: "ADMISS_THONGKELAPDAT.THONGKELAPDAT", callback: "result_TKLD" };
        var para = {
            v_Code :code , 
            v_TuNgay :tungay , 
            v_DenNgay :denngay , 
            v_Status: status,
            v_pagenum: page,
            v_numrecs:countpage
        };
    callLoad();
    ExecuteServiceSyns(config, para);
   

} catch (e) {
    console.log(e);
}
}
function result_TKLD(config, para, lst) {
    try {
        //console.log(lst);
        var data = lst.data;
        var tr = "";
        var tempMeterId;
        var countKhachhang = 0;
        $("#tkld_data tbody").empty();
        if (data.length == 0) {
            $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
            $("#tkld_data tbody").empty();
            selectlang();
            stopLoad();
            return;
        }
        $.each(data, function (i, val) {
            tr += '<tr>' +
                        '<td class="td_stt1pha">' + val.stt + '</td>' +
                        '<td class="a_c">' + val.imei + '</td>' +
                        '<td class="a_c">' + val.madiemdo + '</td>' +
                        '<td class="a_c">' + val.socongto + '</td>';
            if (val.trangthaimodem == "Mất kết nối")
                tr += '<td class="a_c mkn">' + val.trangthaimodem + '</td>';
            else
                tr += '<td class="a_c kn">' + val.trangthaimodem + '</td>';
            tr +=     '<td class="a_c">' + val.ngaylap + '</td>' +
                      '<td class="">' + val.tendiemdo + '</td>' +
                    '</tr>';
        });
        $("#tkld_data tbody").append(tr);
        $(".sobanghi").html("Tổng số " + data.length + "<span tkey='banghi'></span>");

        LoadPhanTrang_("pageLst_tkld", "pageCurent_tkld", data, function () {
            var p = getAllIdMod();
            get_TKLD($("#pagenumber").val() - 1);
        });

        selectlang();
        stopLoad();
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
function excel() {

    var tungay = localStorage.getItem("dateF");
    var denngay = localStorage.getItem("dateT");
    if (tungay == "") tungay = gettimenow();
    if (denngay == "") denngay = gettimenow();
    var status = $("#cb_trangthai option:selected").val();
    var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;

    var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
    var namef_l = 'ThongKeLapDat_' + tendiemdo.replace('<span class=\"total\">', '_').replace('</span>', '') + "_" + tungay.replace("/", "-");
    var config = { connstr: "ConnectOracle233", namesql: "ADMISS_THONGKELAPDAT.THONGKELAPDAT", namefile: namef_l };
    var para = {
        v_Code: code,
        v_TuNgay: tungay,
        v_DenNgay: denngay,
        v_Status: status,
        v_pagenum: 1,
        v_numrecs: '10000000'
    };
    var colum = {
        kq: [
        { field: "stt", name: "STT", type: "TextAndBoldCenter" },
        { field: "imei", name: "IMEI", type: "TextAndBoldCenter" },
        { field: "madiemdo", name: "Mã điểm đo", type: "TextAndBoldCenter" },
        { field: "tendiemdo", name: "Tên khách hàng", type: "TextAndBoldCenter" },
        { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
        { field: "trangthaimodem", name: "Trạng thái modem", type: "Text" },
        { field: "ngaylap", name: "Ngày khai báo/lắp modem", type: "Text" },
        { field: "vitridiemdo", name: "Vị trí điểm đo", type: "Text" }
        ]
    };
    ExecuteExportExcelOracle(config, para, colum);

}