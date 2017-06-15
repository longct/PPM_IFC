$(document).ready(function () {
    showhideTree();

    try {
        $('#date_tungay').change(function () {
            localStorage.setItem("dateF", $("#date_tungay").val());
        });
        $('#date_denngay').change(function () {
            localStorage.setItem("dateT", $("#date_denngay").val());
        });

        var ch_sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        $("#excel_tsvh").click(function () {
            if (ch_sct != "" && ch_sct != "0") {
                excel(1);
            } else {
                excel(2);
            }
        })
        if (ch_sct != "" && ch_sct != "0") {
            get_TSVH_KH(0);
            $("#btn_thuchien").removeAttr("disabled");
            $(".denngay_d").show();
            $(".sct").show();
            $(".tungay_d label").html("Từ ngày");

        } else if (ch_sct != "" && ch_sct == "0") {
            get_TSVH_LIST_KH(0);
            $("#btn_thuchien").removeAttr("disabled");
            $(".tungay_d label").html("Ngày");
            $(".denngay_d").hide();
            $(".sct").hide();
        }
    } catch (e) { console.log(e); }

});
function excel(type) {
    if (type == 1) {
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var namef = "TSVH_" + JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo + "_" + tungay.replace("/", "-") + "_" + denngay.replace("/", "-");
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_VANHANH.TSVH_KHACHHANG", namefile: namef };
        var para = {
            v_MeterId: meterid,
            v_Socongto: sct,
            v_dFrom: tungay,
            v_dTo: denngay,
            v_pagenum: 0,
            v_numrecs: 10000,
            v_Phase: "",
            v_UFrom: "",
            v_UTo: "",
            v_IFrom: "",
            v_ITo: "",
            v_AngleFrom: "",
            v_AngleTo: "",
            v_FregFrom: "",
            v_FregTo: "",
            v_CosFrom: "",
            v_CosTo: "",
            v_PFrom: "",
            v_PTo: "",
            v_QFrom: "",
            v_QTo: "",
        };
        var colum = {
            kq: [
            { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
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
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_VANHANH.TSVH_LISTKHANGHANG", namefile: namef_l };
        var para = {
            v_Type: 1,//1: Dienluc(Code); 2:Tram(CodeDM)  3:Nhom(GroupId) 4: List ID;
            v_Value: code,
            v_From: "",
            v_To: "",
            v_SoGhi: "", //-- SoGhi -- lay tai bang Meter_Info
            v_ChungLoai: "",//--Loaicongto - lay trong TreoThao
            v_LoaiCongTo: "",//--TypePha -- lay trong TreoThao
            v_TrangThai: "",
            v_ChuKiChot: "",
            v_UserId: 1,
            v_Permission: 1,
            v_Date: tungay,
            v_Hour: "",
            v_Minute: "",
            v_pagenum: 0,
            v_numrecs: 10000,
            v_Phase: "",
            v_UFrom: "",
            v_UTo: "",
            v_IFrom: "",
            v_ITo: "",
            v_AngleFrom: "",
            v_AngleTo: "",
            v_FregFrom: "",
            v_FregTo: "",
            v_CosFrom: "",
            v_CosTo: "",
            v_PFrom: "",
            v_PTo: "",
            v_QFrom: "",
            v_QTo: "",
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

function set_fixheader_bdpt() {
    $(".scroll_header").css("width", $("#tbl_tsvh_data").width() + 3);
    $("#fix_header thead tr th.th_stt").css("width", $("#tbl_tsvh_data thead tr th.th_stt").width() + 16);
    $("#fix_header thead tr th.th_tdd").css("width", $("#tbl_tsvh_data thead tr th.th_tdd").width() + 30);
    $("#fix_header thead tr th.th_pha").css("width", $("#tbl_tsvh_data thead tr th.th_pha").width() + 16);
    $("#fix_header thead tr th.th_u").css("width", $("#tbl_tsvh_data thead tr th.th_u").width() + 16);
    $("#fix_header thead tr th.th_v").css("width", $("#tbl_tsvh_data thead tr th.th_v").width() + 16);
    $("#fix_header thead tr th.th_goc").css("width", $("#tbl_tsvh_data thead tr th.th_goc").width() + 16);
    $("#fix_header thead tr th.th_cos").css("width", $("#tbl_tsvh_data thead tr th.th_cos").width() + 16);
    $("#fix_header thead tr th.th_p").css("width", $("#tbl_tsvh_data thead tr th.th_p").width() + 16);
    $("#fix_header thead tr th.th_q").css("width", $("#tbl_tsvh_data thead tr th.th_q").width() + 16);
    $("#fix_header thead tr th.th_f").css("width", $("#tbl_tsvh_data thead tr th.th_f").width() + 16);
    $(".scroll_header").slideDown();
}
function remove_fixheader_bdpt() {
    $(".scroll_header").slideUp();
}

function get_TSVH_KH(page) {
    try {
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_VANHANH.TSVH_KHACHHANG", callback: "result_tsvh_kh" };
        var para = {
            v_MeterId: meterid,
            v_Socongto: sct,
            v_dFrom: tungay,
            v_dTo: denngay,
            v_pagenum: page,
            v_numrecs: 20,
            v_Phase: "",
            v_UFrom: "",
            v_UTo: "",
            v_IFrom: "",
            v_ITo: "",
            v_AngleFrom: "",
            v_AngleTo: "",
            v_FregFrom: "",
            v_FregTo: "",
            v_CosFrom: "",
            v_CosTo: "",
            v_PFrom: "",
            v_PTo: "",
            v_QFrom: "",
            v_QTo: "",
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
            $("#tbl_tsvh_data tbody").empty();
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
        $("#tbl_tsvh_data tbody").empty();
        $("#tbl_tsvh_data tbody").append(tr);
        $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "/" + tsbanghi + "<span tkey='banghi'></span>");
        selectlang();
        stopLoad();
        LoadPhanTrang_("pageLst_tsvh_kh", "pageCurent_tsvh_kh", data, function () {
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
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_VANHANH.TSVH_LISTKHANGHANG", callback: "result_tsvh_list_kh" };
        var para = {
            v_Type: 1,//1: Dienluc(Code); 2:Tram(CodeDM)  3:Nhom(GroupId) 4: List ID;
            v_Value: code,
            v_From: "",
            v_To: "",
            v_SoGhi: "", //-- SoGhi -- lay tai bang Meter_Info
            v_ChungLoai: "",//--Loaicongto - lay trong TreoThao
            v_LoaiCongTo: "",//--TypePha -- lay trong TreoThao
            v_TrangThai: "",
            v_ChuKiChot: "",
            v_UserId: 1,
            v_Permission: 1,
            v_Date: tungay,
            v_Hour: "",
            v_Minute: "",
            v_pagenum: page,
            v_numrecs: 20,
            v_Phase: "",
            v_UFrom: "",
            v_UTo: "",
            v_IFrom: "",
            v_ITo: "",
            v_AngleFrom: "",
            v_AngleTo: "",
            v_FregFrom: "",
            v_FregTo: "",
            v_CosFrom: "",
            v_CosTo: "",
            v_PFrom: "",
            v_PTo: "",
            v_QFrom: "",
            v_QTo: "",
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
        //console.log(data);
        if (data.length == 0) {
            $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
            $("#tbl_tsvh_data tbody").empty();
            selectlang();
            stopLoad();
            return;
        }
        var tr = "";
        var tsbanghi = data[0].rowscount;
        $.each(data, function (i, val) {
            tr += '<tr class="tsvh_tendiemdo">';
            tr += '<td colspan="10">' + val.madiemdo + ' - ' + val.tendiemdo + ' - Loại công tơ: ' + val.loaicongto;
            if (val.istype == "1")
                tr += '</td>';
            else
                tr += ' - Hệ số nhân: ' + val.hsnhan + ' - TU: ' + val.heso_tu + ' - TI: ' + val.heso_ti + '</td>';
            tr += '</tr>';
            tr += '<tr>';
            tr += '<td class="td_stt" rowspan="3">' + val.rnum + '</td>';
            tr += '<td class=""></td>';
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
            tr += '<td class="td_tong">Tổng</td>';
            tr += '<td class="td_tong"></td>';
            tr += '<td class="td_tong"></td>';
            tr += '<td class="td_tong a_r"></td>';
            tr += '<td class="td_tong a_r"></td>';
            tr += '<td class="td_tong a_r"></td>';
            tr += '<td class="td_tong a_r">' + val.totalcos + '</td>';
            tr += '<td class="td_tong a_r">' + val.totalp + '</td>';
            tr += '<td class="td_tong a_r">' + val.totalq + '</td>';
            tr += '<td class="td_tong a_r">' + val.thutupha + '</td>';
            tr += '</tr>';
        });
        LoadPhanTrang_("pageLst_tsvh_list_kh", "pageCurent_tsvh_list_kh", data, function () {
            var p = getAllIdMod();
            get_TSVH_LIST_KH($("#pagenumber").val() - 1);
        });
        $("#tbl_tsvh_data tbody").empty();
        $("#tbl_tsvh_data tbody").append(tr);
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

