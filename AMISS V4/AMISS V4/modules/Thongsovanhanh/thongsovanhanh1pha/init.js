$(document).ready(function () {
    showhideTree();
    try {
        initformelement();
        $('#dtTuNgay').change(function () {
            localStorage.setItem("dateF", $("#dtTuNgay").val());
        });
        $('#dtDenNgay').change(function () {
            localStorage.setItem("dateT", $("#dtDenNgay").val());
        });

        $("#dtTuNgay").val(localStorage.getItem("dateF"));
        if ($("#dtTuNgay").val() == "") $("#dtTuNgay").val(gettimenow());
        $("#dtDenNgay").val(localStorage.getItem("dateT"));
        if ($("#dtDenNgay").val() == "") $("#dtDenNgay").val(gettimenow());


        $(".content-wrapper").scroll(function () {
            f_FixHeader("tsvh1pha_data", "tsvh1pha_data_fix");
        });

        if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "0") {
            get_TSVH1pha_KH(0);
            $("#btn_thuchien").removeAttr("disabled");
            $(".denngay").show();
            $(".denngay_d").show();
            $(".sct").show();
            $(".tungay").html("Từ ngày");
        } else if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto == "0") {
            get_TSVH1pha_LIST_KH(0);
            $("#btn_thuchien").removeAttr("disabled");
            $(".tungay").html("Ngày");
            $(".denngay").hide();
            $(".denngay_d").hide();
            $(".sct").hide();
        }

        $("#excel_tsvh_1pha").click(function () {
            var ch_sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            if (ch_sct != "" && ch_sct != "0") {
                excel_tsvh_1pha(1);
            } else {
                excel_tsvh_1pha(2);
            }
        });

        $("#btnLocdulieu").click(function () {
            if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "0") {
                get_TSVH1pha_KH(0);
            } else if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto == "0") {
                get_TSVH1pha_LIST_KH(0);
            }
        });

        $(".content-wrapper").scroll(function () {
            if ($(this).scrollTop() > 100) {
                f_FixHeader("tsvh1pha_data", "tsvh1pha_data_fix");
            } else if ($(this).scrollTop() <= 100) {
                $("#tsvh1pha_data_fix").hide();
            }
        });
    } catch (e) {
        console.log(e);
    }
    
});


function get_TSVH1pha_KH(page) {
    try {
        var tungay = $("#dtTuNgay").val();
        var denngay = $("#dtDenNgay").val();
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_THONGSOVANHANH.TSVH_KHACHHANG", callback: "result_tsvh1pha_kh" };
        var para = {
            v_MeterId: meterid,
            v_Socongto: sct,
            v_dFrom: tungay,
            v_dTo: denngay,
            v_pagenum: page,
            v_numrecs: 20
        };
        callLoad();
        ExecuteServiceSyns(config, para);

        //  

    } catch (e) {
        console.log(e);
    }
}
function result_tsvh1pha_kh(config, para, lst) {
    try {
        var data = lst.data;
        ////console.log(data);
        if (data.length == 0) {
            $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
            selectlang();
            stopLoad();
            return;
        }
        var tr = "";
        var opt = ""
        var tsbanghi;
        //console.log(data);
        $.each(data, function (i, val) {
            tsbanghi = val.rowscount;
            opt = '<option value="' + val.socongto + '">' + val.socongto + '</option>';
            tr += '<tr>' +
                    '<td class="td_stt1pha">' + val.rnum + '</td>' +
                    '<td class="td_1pha a_c">' + val.socongto + '</td>' +
                    '<td class="td_1pha a_c">' + val.loaicongto + '</td>' +
                    '<td class="td_1pha a_c">' + val.timemeter + '</td>' +
                    '<td class="td_1pha a_r">' + replace0_0(val.ua) + '</td>' +
                    '<td class="td_1pha a_r">' + replace0_0(val.ia) + '</td>' +
                    '<td class="td_1pha a_r">' + val.cosa + '</td>' +
                '</tr>';

        });

        $("#cb_sct_tsvh").empty();
        $("#cb_sct_tsvh").append(opt);
        $("#tsvh1pha_data tbody").empty();
        $("#tsvh1pha_data tbody").append(tr);
        $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "/" + tsbanghi + "<span tkey='banghi'></span>");
        selectlang();
        stopLoad();
        LoadPhanTrang_("pageLst_tsvh1pha_kh", "pageCurent_tsvh1pha_kh", data, function () {
            var p = getAllIdMod();
            get_TSVH1pha_KH($("#pagenumber").val() - 1);
        });
        $(".content").scroll(function () {
            if ($(this).scrollTop() > 200) {
                set_fixheader_bdpt();
            } else if ($(this).scrollTop() <= 200) {
                remove_fixheader_bdpt();
            }
        });
    } catch (e) {
        console.log(e);
    }
}

function get_TSVH1pha_LIST_KH(page) {
    try {
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var tungay = $("#dtTuNgay").val();
        var denngay = $("#dtDenNgay").val();
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_THONGSOVANHANH.TSVH_LISTKHANGHANG", callback: "result_tsvh1pha_list_kh" };
        var para = {
            v_Value: code,
            v_From: $("#dtTuNgay").val(),
            v_pagenum: page,
            v_numrecs: 19,
            
        };

        ////console.log(para);
        ExecuteServiceSyns(config, para);
        callLoad();
        //  

    } catch (e) {
        console.log(e);
    }
}
function result_tsvh1pha_list_kh(config, para, lst) {
    try {
        var data = lst.data;
        //console.log(data);
        if (data.length == 0) {
            $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
            selectlang();
            stopLoad();
            return;
        }
        var tr = "";
        var tsbanghi;
        $.each(data, function (i, val) {
            tsbanghi = val.rowscount;
            tr += '<tr class="tsvh_tendiemdo">' +
                    '<td colspan="10">' + val.madiemdo + ' - ' + val.tendiemdo + ' - Loại công tơ: ' + val.loaicongto + '</td>' +
                  '</tr>' +
                '<tr>' +
                    '<td class="th_stt1pha">' + val.rnum + '</td>' +
                    '<td class="th_sct">' + val.socongto + '</td>' +
                    '<td class="th_lct a_c">' + val.loaicongto + '</td>' +
                    '<td class="th_tgct a_c">' + val.timemeter + '</td>' +
                    '<td class="th_dienap a_c">' + val.ua + '</td>' +
                    '<td class="th_dongdien a_c">' + val.ia + '</td>' +
                    '<td class="th_hscs a_c">' + val.cosa + '</td>' +
                '</tr>';
        });
        LoadPhanTrang_("pageLst_tsvh1pha_list_kh", "pageCurent_tsvh1pha_list_kh", data, function () {
            var p = getAllIdMod();
            get_TSVH1pha_LIST_KH($("#pagenumber").val() - 1);
        });
        $("#tsvh1pha_data tbody").empty();
        $("#tsvh1pha_data tbody").append(tr);
        $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "/" + tsbanghi + "<span tkey='banghi'></span>");
        selectlang();
        stopLoad();
        $(".content").scroll(function () {
            if ($(this).scrollTop() > 200) {
                set_fixheader_bdpt();
            } else if ($(this).scrollTop() <= 200) {
                remove_fixheader_bdpt();
            }
        });
    } catch (e) {
        console.log(e);
    }
}

function excel_tsvh_1pha(type) {
    if (type == 1) {
        var tungay = $("#dtTuNgay").val();
        var denngay = $("#dtDenNgay").val();
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var namef = "TSVH_" + JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo + "_" + tungay.replace("/", "-")+"_"+denngay.replace("/","-");
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_THONGSOVANHANH.TSVH_KHACHHANG", namefile: namef };
        var para = {
            v_MeterId: meterid,
            v_Socongto: sct,
            v_dFrom: tungay,
            v_dTo: denngay,
            v_pagenum: 0,
            v_numrecs: 20000
        };
        var colum = {
            kq: [
            { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
            { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
            { field: "loaicongto", name: "Loại công tơ", type: "Text" },
            { field: "timemeter", name: "Thời gian công tơ", type: "Text" },
            { field: "ua", name: "Điện Áp (V)", type: "Text" },
            { field: "ia", name: "Dòng điện (V)", type: "Text" },
            { field: "totalcos", name: "Hệ số công suất ", type: "Text" },
            { field: "pgiaotong", name: "Chỉ số điện năng", type: "Text" },
            { field: "tu", name: "TU công tơ", type: "Text" },
            { field: "ti", name: "TI công tơ", type: "Text" },
            { field: "hsnhan", name: "HSN trong công tơ", type: "Text" },
            { field: "tu_ngoai", name: "TU ngoài", type: "Text" },
            { field: "ti_ngoai", name: "TI ngoài", type: "Text" }
            ]
        };
        //console.log(para);
        ExecuteExportExcelOracle(config, para, colum);
    }
    else {
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var tungay = $("#dtTuNgay").val();
        var denngay = $("#dtDenNgay").val();
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
        var namef_l = 'TSVH_' + tendiemdo.replace('<span class=\"total\">', '_').replace('</span>', '') + "_" + tungay.replace("/", "-");
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_THONGSOVANHANH.TSVH_LISTKHANGHANG", namefile: namef_l };
        var para = {
            v_Value: code,
            v_From: $("#dtTuNgay").val(),
            v_pagenum: 0,
            v_numrecs: 20000,
        };
        var colum = {
            kq: [
            { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
            { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
            { field: "loaicongto", name: "Loại công tơ", type: "Text" },
            { field: "timemeter", name: "Thời gian công tơ", type: "Text" },
            { field: "ua", name: "Điện Áp (V)", type: "Text" },
            { field: "ia", name: "Dòng điện (V)", type: "Text" },
            { field: "totalcos", name: "Hệ số công suất ", type: "Text" },
            { field: "pgiaotong", name: "Chỉ số điện năng", type: "Text" },
            { field: "tu", name: "TU công tơ", type: "Text" },
            { field: "ti", name: "TI công tơ", type: "Text" },
            { field: "hsnhan", name: "HSN trong công tơ", type: "Text" },
            { field: "tu_ngoai", name: "TU ngoài", type: "Text" },
            { field: "ti_ngoai", name: "TI ngoài", type: "Text" }
            ]
        };
        ExecuteExportExcelOracle(config, para, colum);
    }
}