﻿$(document).ready(function () {
    showhideTree();
    try {
        var ch_sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var type_m = JSON.parse(localStorage.getItem("tree_node"))[0].type;
        if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "0") {
            get_CSCNgay_KH();
            $("#btn_thuchien").removeAttr("disabled");
            $(".tungay_d label").html("Từ ngày");
        } else if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto == "0") {
            get_CSCNgay_list_KH(0);
            $("#btn_thuchien").removeAttr("disabled");
            $(".denngay_d").hide();
            $(".sct").hide();
        }
        $("#excel_cscngay").click(function () {
            if (ch_sct != "" && ch_sct != "0") {
                excel(1);
            } else {
                excel(2);
            }
        })
    } catch (e) {
        console.log(e);
    }
});


function get_CSCNgay_KH() {
    try {
        var type = JSON.parse(localStorage.getItem("tree_node"))[0].type;
        var sql;
        var call;

        $(".denngay_d").show();
        $(".sct").show();
        sql = "AMISS_VANHANH.CSCNGAY_KHACHHANG_PAGE";
        call = "result_cscngay_kh";

        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var config = { connstr: "ConnectOracle233", namesql: sql, callback: call };
        var para = {
            v_MeterId: meterid,
            v_Socongto: sct,
            v_dFrom: tungay,
            v_dTo: denngay,
            v_HienThi: '0',
            v_pagenum: 0,
            v_numrecs: 20
        };

        //console.log(para);
        ExecuteServiceSyns(config, para);
        callLoad();
        //  

    } catch (e) {
        console.log(e);
    }
}

function result_cscngay_kh(config, para, lst) {
    try {
        var data = lst.data;
        $("#cscngay_kh_data tbody").empty();
        console.log(data);
        //console.log(data);
        if (data.length == 0) {
            $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
            selectlang();
            stopLoad();
            return;
        }
        var tr = "";
        var opt = "";
        $.each(data, function (i, val) {
            opt = '<option value="' + val.socongto + '">' + val.socongto + '</option>';
            tr += '<tr>' +
                    '<td class="td_stt1pha">' + (i + 1) + '</td>' +
                    '<td class="th_sct">' + val.socongto + '</td>' +
                    '<td class="a_c">' + val.billingdateend + '</td>' +
                    '<td class="a_r">' + val.pgiaotong + '</td>' +
                    '<td class="a_r">' + val.slgiao + '</td>' +
                '</tr>';
        });
        $("#cscngay_kh_data").show();
        $("#cscthang_kh_data").hide();
        
        $("#cscngay_kh_data tbody").append(tr);
        $("#cb_sct_tsvh").empty();
        $("#cb_sct_tsvh").append(opt);
        $(".sobanghi").html("<span tkey='co'></span>" + data.length + "<span tkey='banghi'></span>");
        selectlang();
        stopLoad();
    } catch (e) {
        console.log(e);
    }
}

function get_CSCNgay_list_KH(page) {
    try {
        var tungay = localStorage.getItem("dateF");
        if (tungay == "") tungay = gettimenow();
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var type = JSON.parse(localStorage.getItem("tree_node"))[0].type;
        var sql;
        var call;
        var para;

        sql = "AMISS_VANHANH.CSCNGAY_LISTKH_PAGE";
        call = "result_cscngay_list_kh";
        para = {
            v_Type: 1,//-- 1: Dienluc(Code); 2:Tram(CodeDM)  3:Nhom(GroupId) 4: List ID;
            v_Value: code,
            v_From: "",
            v_To: "",
            v_SoGhi: "", //-- SoGhi -- lay tai bang Meter_Info
            v_ChungLoai: "",//--Loaicongto - lay trong TreoThao
            v_LoaiCongTo: 0,//--TypePha -- lay trong TreoThao
            v_TrangThai: 0,
            v_ChuKiChot: 0,
            v_UserId: 1,
            v_Permission: 1,
            v_Date: tungay,
            v_Ngaychot: "",
            v_HienThi: "1",
            v_pagenum: page,
            v_numrecs: 20,
        };


        var config = { connstr: "ConnectOracle233", namesql: sql, callback: call };
        //console.log(para);
        ExecuteServiceSyns(config, para);
        callLoad();
        //  

    } catch (e) {
        console.log(e);
    }
}

function result_cscngay_list_kh(config, para, lst) {
    try {
        var data = lst.data;
        //console.log(data);
        $("#cscngay_kh_data tbody").empty();
        var countKhachhang = 0;
        var tempMeterId;
        if (data.length == 0) {
            $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
            selectlang();
            stopLoad();
            return;
        }
        var tr = "";
        $.each(data, function (i, val) {
            if (tempMeterId != val.socongto) {
                tempMeterId = val.socongto;
                countKhachhang++;
                tr += '<tr class="tsvh_tendiemdo">' +
                        '<td colspan="10">' + val.madiemdo + ' - ' + val.tendiemdo + ' - Loại công tơ: ' + val.chungloai + '</td>' +
                      '</tr>' +
                    '<tr>' +
                        '<td class="td_stt1pha">' + val.rnum + '</td>' +
                        '<td class="th_sct">' + val.socongto + '</td>' +
                        '<td class="a_c">' + val.billingdateend + '</td>' +
                        '<td class="a_r">' + val.pgiaotong + '</td>' +
                        '<td class="a_r">' + val.slgiao + '</td>' +
                    '</tr>';
            } else {
                tr += '<tr>' +
                        '<td class="td_stt1pha">' + val.rnum + '</td>' +
                        '<td class="th_sct">' + val.socongto + '</td>' +
                        '<td class="a_c">' + val.billingdateend + '</td>' +
                        '<td class="a_r">' + val.pgiaotong + '</td>' +
                        '<td class="a_r">' + val.slgiao + '</td>' +
                    '</tr>';
            }
        });
        $("#cscngay_kh_data").show();
        $("#cscthang_kh_data").hide();
        
        $("#cscngay_kh_data tbody").append(tr);
        $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "/" + data[0].rowscount + "<span tkey='banghi'></span>(" + countKhachhang + " Khách hàng)");
        selectlang();
        stopLoad();
        LoadPhanTrang_("pageLst_csc_list_kh", "pageCurent_csc_list_kh", data, function () {
            get_CSCNgay_list_KH($("#pagenumber").val() - 1);
        });
    } catch (e) {
        console.log(e);
    }
}

function set_fixheader_bdpt() {
    $(".scroll_header").css("width", $("#cscngay_kh_data").width() + 3);
    $("#fix_header thead tr th.th_stt").css("width", $("#cscngay_kh_data thead tr th.th_stt1pha").width() + 16);
    $("#fix_header thead tr th.th_tdd").css("width", $("#cscngay_kh_data thead tr th.th_sct").width() + 30);
    $("#fix_header thead tr th.th_pha").css("width", $("#cscngay_kh_data thead tr th.th_lct").width() + 16);
    $("#fix_header thead tr th.th_u").css("width", $("#cscngay_kh_data thead tr th.th_tgct").width() + 16);
    $("#fix_header thead tr th.th_v").css("width", $("#cscngay_kh_data thead tr th.th_dienap").width() + 16);
    $(".scroll_header").slideDown();
}
function remove_fixheader_bdpt() {
    $(".scroll_header").slideUp();
}
function excel(type) {
    if (type == 1) {
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var namef = "CSCNgay_" + JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo + "_" + tungay.replace("/", "-") + "_" + denngay.replace("/", "-");
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_VANHANH.CSCNGAY_KHACHHANG_PAGE", namefile: namef };
        var para = {
            v_MeterId: meterid,
            v_Socongto: sct,
            v_dFrom: tungay,
            v_dTo: denngay,
            v_HienThi: '0',
            v_pagenum: 0,
            v_numrecs: 20
        };
        var colum = {
            kq: [
            { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
            { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
            { field: "chungloai", name: "Loại công tơ", type: "Text" },
            { field: "billingdateend", name: "Thời gian chốt công tơ", type: "Text" },
            { field: "hsnhan", name: "HSN trong công tơ", type: "Text" },
            { field: "tu", name: "TU ngoài", type: "Text" },
            { field: "ti", name: "TI ngoài", type: "Text" },
            { field: "pgiaotong", name: "Chỉ số điện năng kwh", type: "Text" },
            { field: "slgiao", name: "Sản lượng", type: "Text" }
            ]
        };
        //console.log(para);
        ExecuteExportExcelOracle(config, para, colum);
    }
    else {
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var type = JSON.parse(localStorage.getItem("tree_node"))[0].type;
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var thoidiem = $("#thoidiem_cb option:selected").val();
        var h; var m;
        if (thoidiem == "") { h = ""; m = ""; }
        else {
            h = thoidiem.substring(0, 2);
            m = thoidiem.substring(3, 5);
        }
        var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
        var namef_l = 'CSCNgay_' + tendiemdo.replace('<span class=\"total\">', '_').replace('</span>', '') + "_" + tungay.replace("/", "-");
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_VANHANH.CSCNGAY_LISTKH_PAGE", namefile: namef_l };
        var para = {
            v_Type: 1,//-- 1: Dienluc(Code); 2:Tram(CodeDM)  3:Nhom(GroupId) 4: List ID;
            v_Value: code,
            v_From: "",
            v_To: "",
            v_SoGhi: "", //-- SoGhi -- lay tai bang Meter_Info
            v_ChungLoai: "",//--Loaicongto - lay trong TreoThao
            v_LoaiCongTo: 0,//--TypePha -- lay trong TreoThao
            v_TrangThai: 0,
            v_ChuKiChot: 0,
            v_UserId: 1,
            v_Permission: 1,
            v_Date: tungay,
            v_Ngaychot: "",
            v_HienThi: "1",
            v_pagenum: 0,
            v_numrecs: 1020,
        };
        var colum = {
            kq: [
                { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
            { field: "madiemdo", name: "Mã điểm đo", type: "TextAndBoldCenter" },
            { field: "tendiemdo", name: "Tên khách hàng", type: "TextAndBoldCenter" },
            { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
            { field: "chungloai", name: "Loại công tơ", type: "Text" },
            { field: "billingdateend", name: "Thời gian chốt công tơ", type: "Text" },
            { field: "hsnhan", name: "HSN trong công tơ", type: "Text" },
            { field: "tu", name: "TU ngoài", type: "Text" },
            { field: "ti", name: "TI ngoài", type: "Text" },
            { field: "pgiaotong", name: "Chỉ số điện năng kwh", type: "Text" },
            { field: "slgiao", name: "Sản lượng", type: "Text" }
            ]
        };
        ExecuteExportExcelOracle(config, para, colum);
    }
}