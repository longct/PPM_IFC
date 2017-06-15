$(document).ready(function () {
    showhideTree();
    try {
        loadContent();
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
            $(".thoidiem").hide();
            $(".thoidiem_d").hide();
            $(".sct").show();
            $(".tungay").html("Từ ngày");
        } else if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto == "0") {
            get_TSVH_LIST_KH(0);
            $("#btn_thuchien").removeAttr("disabled");
            $(".tungay").html("Ngày");
            $(".denngay").hide();
            $(".denngay_d").hide();
            $(".thoidiem").show();
            $(".thoidiem_d").show();
            $(".sct").hide();
        }

        $("#excel_tsvh_1pha").click(function () {
            if (ch_sct != "" && ch_sct != "0") {
                excel_tsvh(1);
            } else {
                excel_tsvh(2);
            }
        });
        $("#help_tsvh_3pha").click(function () {
            $('#tsvh_3pha').modal('show');
            f_trogiup_tsvh();
        });

        $("#btnLocdulieu").click(function () {
            if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "0") {
                get_TSVH_KH(0);
            } else if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto == "0") {
                get_TSVH_LIST_KH(0);
            }
        });
        $('a#SearchAdvanced_Tsvh').on('click', function (e) {
            $(this).toggleClass('active');
            $('div#ContentSearchAdvanced_Tsvh').toggleClass('hidden');
            if ($('#SearchAdvanced_Tsvh')[0].className == "filter active") {
                $('#SearchAdvanced_TsvhLabel').css('color', '#f58220');
            } else
                $('#SearchAdvanced_TsvhLabel').css('color', '#acacac');
            e.preventDefault();
        });
        $(".content-wrapper").scroll(function () {
            f_FixHeader("tsvh3pha_data", "tsvh3pha_data_fixheader");
        });

        $('#btnClearTsvh').click(function () {
            clearTxt();
        });

        //loadShowHideAdvance();
    } catch (e) {
        console.log(e);
    }

});
function showFixedHeader(id) {

}
function get_TSVH_KH(page) {
    try {
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var filter = collectCondition();
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_THONGSOVANHANH.TSVH_KHACHHANG", callback: "result_tsvh_kh" };
        var para = {
            v_MeterId: meterid,
            v_Socongto: sct,
            v_dFrom: tungay,
            v_dTo: denngay,
            v_pagenum: page,
            v_numrecs: 19,
            v_Phase: filter.v_Phase,
            v_UFrom: filter.v_UFrom,
            v_UTo: filter.v_UTo,
            v_IFrom: filter.v_IFrom,
            v_ITo: filter.v_ITo,
            v_AngleFrom: filter.v_AngleFrom,
            v_AngleTo: filter.v_AngleTo,
            v_FregFrom: filter.v_FregFrom,
            v_FregTo: filter.v_FregTo,
            v_CosFrom: filter.v_CosFrom,
            v_CosTo: filter.v_CosTo,
            v_PFrom: filter.v_PFrom,
            v_PTo: filter.v_PTo,
            v_QFrom: filter.v_QFrom,
            v_QTo: filter.v_QTo,
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
                    '<td class="td_tong"></td>' +
                    '<td class="td_tong"></td>' +
                    '<td class="td_tong"></td>' +
                    '<td class="td_tong a_c">Tổng</td>' +
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
        var time = $("#thoi_diem").val();
        var hour = "";
        var minute = "";
        var filter = collectCondition();
        if (time != "" && time != null) {
            hour = time.split(':')[0];
            if (time.indexOf('PM') != -1) {
                if (hour < 12) {
                    hour = parseInt(hour) + 12;
                }
                else {
                    hour = '00';
                    tungay = timeaddday1(tungay, 1);
                }
            }
            minute = time.split(':')[1];
            minute = minute.substring(0, 2);
        }
        var config = {
            connstr: "ConnectOracle_Amiss4",
            namesql: "PKG_THONGSOVANHANH.TSVH_LISTKHANGHANG",
            callback: "result_tsvh_list_kh"
        };
        var para = {
            v_Value: code,
            //v_From: formartDateTime($("#dtTuNgay").val() + $("#thoi_diem").val()),
            v_From: tungay,
            v_Hour: hour,
            v_Minute: minute,
            v_pagenum: page,
            v_numrecs: 19,
            v_Phase: filter.v_Phase,
            v_UFrom: filter.v_UFrom,
            v_UTo: filter.v_UTo,
            v_IFrom: filter.v_IFrom,
            v_ITo: filter.v_ITo,
            v_AngleFrom: filter.v_AngleFrom,
            v_AngleTo: filter.v_AngleTo,
            v_FregFrom: filter.v_FregFrom,
            v_FregTo: filter.v_FregTo,
            v_CosFrom: filter.v_CosFrom,
            v_CosTo: filter.v_CosTo,
            v_PFrom: filter.v_PFrom,
            v_PTo: filter.v_PTo,
            v_QFrom: filter.v_QFrom,
            v_QTo: filter.v_QTo,
        };

        //var para = {
        //    v_Value: code,
        //    v_From: $("#dtTuNgay").val(),
        //    v_Hour: hour,
        //    v_Minute: minute,
        //    v_pagenum: page,
        //    v_numrecs: 19,
        //    v_Phase: filter.v_Phase,
        //    v_UFrom: $.isNumeric(filter.v_UFrom) ? filter.v_UFrom : '',
        //    v_UTo: $.isNumeric(filter.v_UTo) ? filter.v_UTo : '',
        //    v_IFrom: $.isNumeric(filter.v_IFrom) ? filter.v_IFrom : '',
        //    v_ITo: $.isNumeric(filter.v_ITo) ? filter.v_ITo : '',
        //    v_AngleFrom: $.isNumeric(filter.v_AngleFrom) ? filter.v_AngleFrom : '',
        //    v_FregFrom: $.isNumeric(filter.v_FregFrom) ? filter.v_FregFrom : '',
        //    v_FregTo: $.isNumeric(filter.v_FregTo) ? filter.v_FregTo : '',
        //    v_CosFrom: $.isNumeric(filter.v_CosFrom) ? filter.v_CosFrom : '',
        //    v_CosTo: $.isNumeric(filter.v_CosTo) ? filter.v_CosTo : '',
        //    v_PFrom: $.isNumeric(filter.v_PFrom) ? filter.v_PFrom : '',
        //    v_PTo: $.isNumeric(filter.v_PTo) ? filter.v_PTo : '',
        //    v_QFrom: $.isNumeric(filter.v_QFrom) ? filter.v_QFrom : '',
        //    v_QTo: $.isNumeric(filter.v_QTo) ? filter.v_QTo : '',
        //};

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
            $("#tsvh3pha_data tbody").empty();
            LoadPhanTrang_("pageLst_tsvh3pha_kh", "pageCurent_tsvh3pha_kh", data, function () {
                //var p = getAllIdMod();
                //get_TSVH_LIST_KH($("#pagenumber").val() - 1);
            });
            selectlang();
            stopLoad();
            return;
        }
        var tr = "";
        var tsbanghi = data[0].rowscount;
        $.each(data, function (i, val) {
            tr += '<tr class="tsvh_tendiemdo">';
            //tr += '<td colspan="11">' + val.madiemdo + ' - ' + val.tendiemdo + ' - Loại công tơ: ' + val.loaicongto;
            tr += '<td colspan="11">' + val.madiemdo + ' - ' + val.tendiemdo;
            tr += '</td>';
            tr += ' - Hệ số nhân: ' + val.hsnhan + ' - TU: ' + val.heso_tu + ' - TI: ' + val.heso_ti + '</td>';
            if (val.istype == "1") {
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
            else {
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
                tr += '<td class="td_tong"></td>';
                tr += '<td class="td_tong"></td>';
                tr += '<td class="td_tong"></td>';
                tr += '<td class="td_tong a_c">Tổng</td>';
                tr += '<td class="td_tong a_r"></td>';
                tr += '<td class="td_tong a_r"></td>';
                tr += '<td class="td_tong a_r"></td>';
                tr += '<td class="td_tong a_r">' + val.totalcos + '</td>';
                tr += '<td class="td_tong a_r">' + val.totalp + '</td>';
                tr += '<td class="td_tong a_r">' + val.totalq + '</td>';
                tr += '<td class="td_tong a_r">' + val.thutupha + '</td>';
                tr += '</tr>';
            }
        });
        LoadPhanTrang_("pageLst_tsvh3pha_kh", "pageCurent_tsvh3pha_kh", data, function () {
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
        var namef = "TSVH_" + JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo + "_" + tungay.replace("/", "-") + "_" + denngay.replace("/", "-");
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

function collectCondition() {
    var conditions = new Object();
    // Lưu ý tên biến phải trùng với tên trong thủ tục DB
    conditions.v_UFrom = $("#txtUFrom").val();
    conditions.v_UTo = $("#txtUTo").val();
    conditions.v_IFrom = $("#txtIFrom").val();
    conditions.v_ITo = $("#txtITo").val();
    conditions.v_AngleFrom = $("#txtAngleFrom").val();
    conditions.v_AngleTo = $("#txtAngleTo").val();
    conditions.v_FregFrom = $("#txtHzFrom").val();
    conditions.v_FregTo = $("#txtHzTo").val();
    conditions.v_CosFrom = $("#txtCosFrom").val();
    conditions.v_CosTo = $("#txtCosTo").val();
    conditions.v_PFrom = $("#txtPFrom").val();
    conditions.v_PTo = $("#txtPTo").val();
    conditions.v_QFrom = $("#txtQFrom").val();
    conditions.v_QTo = $("#txtQTo").val();
    var selected = $("input[type='radio'][name='rdbChoicePhase']:checked");
    if (selected.length > 0) {
        conditions.v_Phase = selected.val();
    }
    return conditions;
}

function clearTxt() {
    $('#txtUFrom').val("");
    $('#txtUTo').val("");
    $('#txtIFrom').val("");
    $('#txtITo').val("");
    $('#txtAngleFrom').val("");
    $('#txtAngleTo').val("");
    $('#txtHzFrom').val("");
    $('#txtHzTo').val("");
    $('#txtCosFrom').val("");
    $('#txtCosTo').val("");
    $('#txtPFrom').val("");
    $('#txtPTo').val("");
    $('#txtQFrom').val("");
    $('#txtQTo').val("");
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46 && charCode != 44 && charCode != 45) {
        return false;
    }
    return true;
}