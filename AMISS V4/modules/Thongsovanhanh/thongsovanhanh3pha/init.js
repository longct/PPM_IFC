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

        var ch_sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;

        if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "0") {
            get_TSVH_KH(0);
            $("#btn_thuchien").removeAttr("disabled");
            $(".denngay").show();
            $(".denngay_d").show();
            $(".sct").show();
            $(".tungay").html("Từ ngày");
        } else if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto == "0") {
            get_TSVH_LIST_KH(0);
            $("#btn_thuchien").removeAttr("disabled");
            $(".tungay").html("Ngày");
            $(".denngay").hide();
            $(".denngay_d").hide();
            $(".sct").hide();
        }

        $("#excel_tsvh_1pha").click(function () {
            
            if (ch_sct != "" && ch_sct != "0") {
                excel_tsvh(1);
            } else {
                excel_tsvh(2);
            }
        });

        $("#btnLocdulieu").click(function () {
            if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "0") {
                get_TSVH_KH(0);
            } else if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto == "0") {
                get_TSVH_LIST_KH(0);
            }
        });

        //loadShowHideAdvance();
    } catch (e) {
        console.log(e);
    }
    
});

function get_TSVH_KH(page) {
    try {
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_THONGSOVANHANH.TSVH_KHACHHANG", callback: "result_tsvh_kh" };
        var para = {
            v_MeterId: meterid,
            v_Socongto: sct,
            v_dFrom: tungay,
            v_dTo: denngay,
            v_pagenum: page,
            v_numrecs: 19,
        };
        callLoad();
        ExecuteServiceSyns(config, para);

        //  

    } catch (e) {
        console.log(e);
    }
}
function result_tsvh_kh(config, para, lst) {
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
        var tsbanghi;
        var sct = "";
        var opt = ""
        $.each(data, function (i, val) {
            tsbanghi = val.rowscount;
            console.log(val.tranghientai);
            //sct = val.socongto;
            //if (sct != val.socongto) {
            opt = '<option value="' + val.socongto + '">' + val.socongto + '</option>';
            //}
            tr += '<tr>' +
                    '<td class="td_stt" rowspan="3">' + val.rnum + '</td>' +
                    '<td class=""></td>' +
                    '<td class="td_phaa a_c">TU=' + replace0_0(val.tu) + '</td>' +
                    '<td class="td_phaa a_c">A</td>' +
                    '<td class="td_phaa a_r">' + replace0_0(val.ua) + '</td>' +
                    '<td class="td_phaa a_r">' + replace0_0(val.ia) + '</td>' +
                    '<td class="td_phaa a_r">' + replace0_0(val.anglea) + '</td>' +
                    '<td class="td_phaa a_r">' + replace0_0(val.cosa) + '</td>' +
                    '<td class="td_phaa a_r">' + replace0_0(val.pa) + '</td>' +
                    '<td class="td_phaa a_r">' + replace0_0(val.qa) + '</td>' +
                    '<td class="td_phaa a_r">' + replace0_0(val.frega) + '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="td_phab">HT: ' + replace0_0(val.time) + '</td>' +
                    '<td class="td_phab a_c">TI=' + replace0_0(val.ti) + '</td>' +
                    '<td class="td_phab a_c">B</td>' +
                    '<td class="td_phab a_r">' + replace0_0(val.ub) + '</td>' +
                    '<td class="td_phab a_r">' + replace0_0(val.ib) + '</td>' +
                    '<td class="td_phab a_r">' + replace0_0(val.angleb) + '</td>' +
                    '<td class="td_phab a_r">' + replace0_0(val.cosb) + '</td>' +
                    '<td class="td_phab a_r">' + replace0_0(val.pb) + '</td>' +
                    '<td class="td_phab a_r">' + replace0_0(val.qb) + '</td>' +
                    '<td class="td_phab a_r">' + replace0_0(val.fregb) + '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="td_phac">CT: ' + replace0_0(val.timemeter) + '</td>' +
                    '<td class="td_phac a_c">HSN=' + replace0_0(val.hsnhan) + '</td>' +
                    '<td class="td_phac a_c">C</td>' +
                    '<td class="td_phac a_r">' + replace0_0(val.uc) + '</td>' +
                    '<td class="td_phac a_r">' + replace0_0(val.ic) + '</td>' +
                    '<td class="td_phac a_r">' + replace0_0(val.anglec) + '</td>' +
                    '<td class="td_phac a_r">' + replace0_0(val.cosc) + '</td>' +
                    '<td class="td_phac a_r">' + replace0_0(val.pc) + '</td>' +
                    '<td class="td_phac a_r">' + replace0_0(val.qc) + '</td>' +
                    '<td class="td_phac a_r">' + replace0_0(val.fregc) + '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="td_tong">Tổng</td>' +
                    '<td class="td_tong"></td>' +
                    '<td class="td_tong"></td>' +
                    '<td class="td_tong"></td>' +
                    '<td class="td_tong a_r">-</td>' +
                    '<td class="td_tong a_r">-</td>' +
                    '<td class="td_tong a_r">-</td>' +
                    '<td class="td_tong a_r">' + replace0_0(val.totalcos) + '</td>' +
                    '<td class="td_tong a_r">' + replace0_0(val.totalp) + '</td>' +
                    '<td class="td_tong a_r">' + replace0_0(val.totalq) + '</td>' +
                    '<td class="td_tong a_r">' + val.thutupha + '</td>' +
                '</tr>';
        });

        $("#cb_sct_tsvh").empty();
        $("#cb_sct_tsvh").append(opt);
        $("#tsvh3pha_data tbody").empty();
        $("#tsvh3pha_data tbody").append(tr);
        $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "/" + tsbanghi + "<span tkey='banghi'></span>");
        selectlang();
        stopLoad();
        LoadPhanTrang_("pageLst_tsvh3pha_kh", "pageCurent_tsvh3pha_kh", data, function () {
            var p = getAllIdMod();
            get_TSVH_KH($("#pagenumber").val() - 1);
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

function get_TSVH_LIST_KH(page) {
    try {
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var config = {
            connstr: "ConnectOracle_Amiss4",
            namesql: "PKG_THONGSOVANHANH.TSVH_LISTKHANGHANG",
            callback: "result_tsvh_list_kh"
        };
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
function result_tsvh_list_kh(config, para, lst) {
    try {
        var data = lst.data;
        console.log(data);
        if (data.length == 0) {
            $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
            selectlang();
            stopLoad();
            return;
        }
        var tr = "";
        var tsbanghi = data[0].rowscount;
        $.each(data, function (i, val) {
            tr += '<tr class="tsvh_tendiemdo">';
            tr += '<td colspan="11">' + val.madiemdo + ' - ' + val.tendiemdo + ' - Loại công tơ: ' + val.loaicongto;
            tr += '</td>';
            tr += ' - Hệ số nhân: ' + val.hsnhan + ' - TU: ' + val.heso_tu + ' - TI: ' + val.heso_ti + '</td>';
            if (val.istype == "1")
            {
                tr += '</tr>';
                tr += '<tr>';
                tr += '<td class="td_stt" rowspan="3">' + val.rnum + '</td>';
                tr += '<td class=""></td>';
                tr += '<td class="td_phaa a_c">TU=' + replace0_0(val.tu) + '</td>';
                tr += '<td class="td_phaa a_c" rowspan="3"></td>';
                tr += '<td class="td_phaa a_r" rowspan="3">' + replace0_0(val.ua) + '</td>';
                tr += '<td class="td_phaa a_r" rowspan="3">' + replace0_0(val.ia) + '</td>';
                tr += '<td class="td_phaa a_r" rowspan="3">' + replace0_0(val.uangleaa) + '</td>';
                tr += '<td class="td_phaa a_r" rowspan="3">' + replace0_0(val.cosa) + '</td>';
                tr += '<td class="td_phaa a_r" rowspan="3">' + replace0_0(val.pa) + '</td>';
                tr += '<td class="td_phaa a_r" rowspan="3">' + replace0_0(val.qa) + '</td>';
                tr += '<td class="td_phaa a_r" rowspan="3">' + replace0_0(val.frega) + '</td>';
                tr += '</tr>';
                tr += '<tr>';
                tr += '<td class="td_phab">HT: ' + val.time + '</td>';
                tr += '<td class="td_phab a_c">TI=' + replace0_0(val.ti) + '</td>';
                tr += '</tr>';
                tr += '<tr>';
                tr += '<td class="td_phac">CT: ' + val.timemeter + '</td>';
                tr += '<td class="td_phac a_c">HSN=' + replace0_0(val.hsnhan) + '</td>';
                tr += '</tr>';
                tr += '<tr>';
            }
            else
            {
                tr += '</tr>';
                tr += '<tr>';
                tr += '<td class="td_stt" rowspan="3">' + val.rnum + '</td>';
                tr += '<td class=""></td>';
                tr += '<td class="td_phaa a_c">TU=' + replace0_0(val.tu) + '</td>';
                tr += '<td class="td_phaa a_c">A</td>';
                tr += '<td class="td_phaa a_r">' + val.ua + '</td>';
                tr += '<td class="td_phaa a_r">' + val.ia + '</td>';
                tr += '<td class="td_phaa a_r">' + val.anglea + '</td>';
                tr += '<td class="td_phaa a_r">' + val.cosa + '</td>';
                tr += '<td class="td_phaa a_r">' + val.pa + '</td>';
                tr += '<td class="td_phaa a_r">' + val.qa + '</td>';
                tr += '<td class="td_phaa a_r">' + val.frega + '</td>';
                tr += '</tr>';
                tr += '<tr>';
                tr += '<td class="td_phab">HT: ' + val.time + '</td>';
                tr += '<td class="td_phab a_c">TI=' + replace0_0(val.ti) + '</td>';
                tr += '<td class="td_phab a_c">B</td>';
                tr += '<td class="td_phab a_r">' + val.ub + '</td>';
                tr += '<td class="td_phab a_r">' + val.ib + '</td>';
                tr += '<td class="td_phab a_r">' + val.angleb + '</td>';
                tr += '<td class="td_phab a_r">' + val.cosb + '</td>';
                tr += '<td class="td_phab a_r">' + val.pb + '</td>';
                tr += '<td class="td_phab a_r">' + val.qb + '</td>';
                tr += '<td class="td_phab a_r">' + val.fregb + '</td>';
                tr += '</tr>';
                tr += '<tr>';
                tr += '<td class="td_phac">CT: ' + val.timemeter + '</td>';
                tr += '<td class="td_phac a_c">HSN=' + replace0_0(val.hsnhan) + '</td>';
                tr += '<td class="td_phac a_c">C</td>';
                tr += '<td class="td_phac a_r">' + val.uc + '</td>';
                tr += '<td class="td_phac a_r">' + val.ic + '</td>';
                tr += '<td class="td_phac a_r">' + val.anglec + '</td>';
                tr += '<td class="td_phac a_r">' + val.cosc + '</td>';
                tr += '<td class="td_phac a_r">' + val.pc + '</td>';
                tr += '<td class="td_phac a_r">' + val.qc + '</td>';
                tr += '<td class="td_phac a_r">' + val.fregc + '</td>';
                tr += '</tr>';
                tr += '<tr>';
                //tr += '<td class="td_tong">Tổng</td>';
                //tr += '<td class="td_tong"></td>';
                //tr += '<td class="td_tong"></td>';
                //tr += '<td class="td_tong a_r"></td>';
                //tr += '<td class="td_tong a_r"></td>';
                //tr += '<td class="td_tong a_r"></td>';
                //tr += '<td class="td_tong a_r">' + val.totalcos + '</td>';
                //tr += '<td class="td_tong a_r">' + val.totalp + '</td>';
                //tr += '<td class="td_tong a_r">' + val.totalq + '</td>';
                //tr += '<td class="td_tong a_r">' + val.thutupha + '</td>';
                //tr += '</tr>';
            }
        });
        LoadPhanTrang_("pageLst_tsvh1pha_list_kh", "pageCurent_tsvh1pha_list_kh", data, function () {
            var p = getAllIdMod();
            get_TSVH_LIST_KH($("#pagenumber").val() - 1);
        });
        $("#tsvh3pha_data tbody").empty();
        $("#tsvh3pha_data tbody").append(tr);
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

function excel_tsvh(type) {
    
    if (type == 1) {
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
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
            v_numrecs: 1020,
        };
        var colum = {
            kq: [
            { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
            { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
            { field: "loaicongto", name: "Loại công tơ", type: "Text" },
            { field: "timemeter", name: "Thời gian công tơ", type: "Text" },
            { field: "time", name: "Thời gian hệ thống", type: "Text" },
            { field: "thutupha", name: "Thứ tự pha", type: "Text" },
            //{ field: "heso_tu", name: "TU công tơ", type: "Text" },
            //{ field: "heso_ti", name: "TI công tơ", type: "Text" },
            { field: "tu", name: "TU công tơ", type: "Text" },
            { field: "ti", name: "TI công tơ", type: "Text" },
            { field: "hsnhan", name: "HSN trong công tơ", type: "Text" },
            { field: "tu", name: "TU ngoài", type: "Text" },
            { field: "ti", name: "TI ngoài", type: "Text" },
            { field: "ua", name: "UA (V)", type: "Text" },
            { field: "ub", name: "UB (V)", type: "Text" },
            { field: "uc", name: "UC (V)", type: "Text" },
            { field: "ia", name: "IA (V)", type: "Text" },
            { field: "ib", name: "IB (V)", type: "Text" },
            { field: "ic", name: "IC (V)", type: "Text" },
            { field: "cosa", name: "Cosφ A", type: "Text" },
            { field: "cosb", name: "Cosφ B", type: "Text" },
            { field: "cosc", name: "Cosφ C", type: "Text" },
            { field: "totalcos", name: "Σ Cos", type: "Text" },
            { field: "pa", name: "PA (KW)", type: "Text" },
            { field: "pb", name: "PB (KW)", type: "Text" },
            { field: "pc", name: "PC (KW)", type: "Text" },
            { field: "totalp", name: "Σ P", type: "Text" },
            { field: "qa", name: "QA (KVAR)", type: "Text" },
            { field: "qb", name: "QB (KVAR)", type: "Text" },
            { field: "qc", name: "QC (KVAR)", type: "Text" },
            { field: "totalq", name: "Σ Q", type: "Text" },
            { field: "anglea", name: "Angle A", type: "Text" },
            { field: "angleb", name: "Angle B", type: "Text" },
            { field: "anglec", name: "Angle C", type: "Text" },
            { field: "frega", name: "FA (Hz)", type: "Text" },
            { field: "fregb", name: "FB (Hz)", type: "Text" },
            { field: "fregc", name: "FC (Hz)", type: "Text" }
            ]
        };
        //console.log(para);
        ExecuteExportExcelOracle(config, para, colum);
    }
    else {
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
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
            v_numrecs: 20,
        };
        var colum = {
            kq: [
                { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
            { field: "madiemdo", name: "Mã điểm đo", type: "TextAndBoldCenter" },
            { field: "tendiemdo", name: "Tên khách hàng", type: "TextAndBoldCenter" },
            { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
            { field: "loaicongto", name: "Loại công tơ", type: "Text" },
            { field: "timemeter", name: "Thời gian công tơ", type: "Text" },
            { field: "time", name: "Thời gian hệ thống", type: "Text" },
            { field: "thutupha", name: "Thứ tự pha", type: "Text" },
            { field: "heso_tu", name: "TU công tơ", type: "Text" },
            { field: "heso_ti", name: "TI công tơ", type: "Text" },
            { field: "hsnhan", name: "HSN trong công tơ", type: "Text" },
            { field: "tu", name: "TU ngoài", type: "Text" },
            { field: "ti", name: "TI ngoài", type: "Text" },
            { field: "ua", name: "UA (V)", type: "Text" },
            { field: "ub", name: "UB (V)", type: "Text" },
            { field: "uc", name: "UC (V)", type: "Text" },
            { field: "ia", name: "IA (V)", type: "Text" },
            { field: "ib", name: "IB (V)", type: "Text" },
            { field: "ic", name: "IC (V)", type: "Text" },
            { field: "cosa", name: "Cosφ A", type: "Text" },
            { field: "cosb", name: "Cosφ B", type: "Text" },
            { field: "cosc", name: "Cosφ C", type: "Text" },
            { field: "totalcos", name: "Σ Cos", type: "Text" },
            { field: "pa", name: "PA (KW)", type: "Text" },
            { field: "pb", name: "PB (KW)", type: "Text" },
            { field: "pc", name: "PC (KW)", type: "Text" },
            { field: "totalp", name: "Σ P", type: "Text" },
            { field: "qa", name: "QA (KVAR)", type: "Text" },
            { field: "qb", name: "QB (KVAR)", type: "Text" },
            { field: "qc", name: "QC (KVAR)", type: "Text" },
            { field: "totalq", name: "Σ Q", type: "Text" },
            { field: "anglea", name: "Angle A", type: "Text" },
            { field: "angleb", name: "Angle B", type: "Text" },
            { field: "anglec", name: "Angle C", type: "Text" },
            { field: "frega", name: "FA (Hz)", type: "Text" },
            { field: "fregb", name: "FB (Hz)", type: "Text" },
            { field: "fregc", name: "FC (Hz)", type: "Text" }
            ]
        };
        ExecuteExportExcelOracle(config, para, colum);
    }
}

function loadShowHideAdvance() {
    $('#SearchAdvanced_Tsvh').toggleClass('active');
    $('div#ContentSearchAdvanced_Tsvh').toggleClass('hidden');
    if ($('#SearchAdvanced_Tsvh')[0].className == "filter active") {
        $('#SearchAdvanced_TsvhLabel').css('color', '#f58220');
    }
    else
        $('#SearchAdvanced_TsvhLabel').css('color', '#acacac');
    e.preventDefault();
}

//Thông số vận hành 1 pha
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