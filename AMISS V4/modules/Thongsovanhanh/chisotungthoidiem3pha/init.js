var UserInfo;
$(document).ready(function () {
    try {
        
        showhideTree();
        initformelement();
        UserInfo = JSON.parse(localStorage.getItem("userinfo"));
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

        // Load dữ liệu theo list KH hoặc theo ID KH
        //if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "0") {
        //    get_CSCTTD_KH(0);
        //    $("#btn_thuchien").removeAttr("disabled");
        //    $(".denngay_d").show();
        //    $("label.denngay").show();
        //    $("label.tungay").html("Từ ngày");
        //} else if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto == "0") {
        //    get_CSCTTD_LIST_KH(0);
        //    $("#btn_thuchien").removeAttr("disabled");
        //    $("label.tungay").html("Ngày");
        //    $("label.denngay").hide();
        //    $(".denngay_d").hide();
        //}

        $("#excel_csttd_1pha").click(function () {
            var ch_sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            if (ch_sct != "" && ch_sct != "0") {
                excel(1);
            } else {
                excel(2);
            }
        });

        $("#cbLoaichiso").change(function () {
            var value = $("#cbLoaichiso").val();
            displayTable(value);
            
            if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "0") {
                if (value == 0)
                    get_CSCTTD_KH(0);
                else if(value == 1)
                    get_CSCNgay_KH();
                else
                    get_CSCThang_KH();
            } else if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto == "0") {
                if (value == 0)
                    get_CSCTTD_LIST_KH(0);
                else if (value == 1)
                    get_CSCNgay_list_KH(1);
                else
                    get_CSCThang_list_KH();
            }
        });

        $("#btnLocdulieu").click(function () {
            
            var value = $("#cbLoaichiso").val();
            if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "0") {
                if (value == 0)
                    get_CSCTTD_KH(0);
                else if (value == 1)
                    get_CSCNgay_KH();
                else
                    get_CSCThang_KH();
            } else if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto == "0") {
                if (value == 0)
                    get_CSCTTD_LIST_KH(0);
                else if (value == 1)
                    get_CSCNgay_list_KH(1);
                else
                    get_CSCThang_list_KH();
            }
        });
    } catch (e) {
        console.log(e);
    }
});

function displayTable(value) {
    $('#cttd_data').hide();
    $('#cscngay_kh_data').hide();
    $('#cscthang_kh_data').hide();
    if (value == 0) {
        $('#cttd_data').show();
    } else if (value == 1) {
        $('#cscngay_kh_data').show();
    } else {
        $('#cscthang_kh_data').show();
    }
}

function get_CSCTTD_KH(page) {
    try {
        var tungay = $("#dtTuNgay").val();
        var denngay = $("#dtDenNgay").val();
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var hienthi = $("#cbLoaihienthi").val();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var config = {
            connstr: "ConnectOracle_Amiss4",
            namesql: "PKG_THONGSOVANHANH.CSTTD_KHACHHANG_PAGE",
            callback: "result_cscttd_kh"
        };
        var para = {
            v_MeterId: meterid,
            v_Socongto: sct,
            v_dFrom: tungay,
            v_dTo: denngay,
            v_HienThi: hienthi,
            v_pagenum: page,
            v_numrecs: 10
        };

        ExecuteServiceSyns(config, para);
        callLoad();
        //  

    } catch (e) {
        console.log(e);
    }
}

function result_cscttd_kh(config, para, lst) {
    try {
        var data = lst.data;
        $("#cttd_data tbody").empty();
        console.log(data);
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
            tr += '<tr class="tsvh_tendiemdo"><td colspan="10">' + val.madiemdo + ' - ' + val.tendiemdo + ' - ' + 'HSN=' + val.hsnhan + ' - ' + 'Loại công tơ:' + val.chungloai + ' </td></tr>';
            tr += '<tr>' +
                   '<td class="td_stt" rowspan="3">' + val.rnum + '</td>' +
                   '<td class=""></td>' +
                   '<td class="td_phaa a_c">1</td>' +
                   '<td class="td_phaa a_r">' + val.pgiao1 + '</td>' +
                   '<td class="td_phaa a_r">' + val.pnhan1 + '</td>' +
                   '<td class="td_phaa a_r"></td>' +
                   '<td class="td_phaa a_r"></td>' +
                   '<td class="td_phaa a_r">' + setnull(val.phutai1) + '</td>' +
                   '<td class="td_phaa a_r">' + val.mds1 + '</td>' +
                   '<td class="td_phaa a_r">' + val.mds1_time + '</td>' +
               '</tr>' +
               '<tr>' +
                   '<td class="td_phab">HT: ' + replace0_0(val.time) + '</td>' +
                   '<td class="td_phab a_c">2</td>' +
                   '<td class="td_phab a_r">' + val.pgiao2 + '</td>' +
                   '<td class="td_phab a_r">' + val.pnhan2 + '</td>' +
                   '<td class="td_phab a_r"></td>' +
                   '<td class="td_phab a_r"></td>' +
                   '<td class="td_phaa a_r">' + setnull(val.phutai2) + '</td>' +
                   '<td class="td_phab a_r">' + val.mds2 + '</td>' +
                   '<td class="td_phab a_r">' + val.mds2_time + '</td>' +
               '</tr>' +
               '<tr>' +
                   '<td class="td_phac">CT: ' + replace0_0(val.timemeter) + '</td>' +
                   '<td class="td_phac a_c">3</td>' +
                   '<td class="td_phac a_r">' + val.pgiao3 + '</td>' +
                   '<td class="td_phac a_r">' + val.pnhan3 + '</td>' +
                   '<td class="td_phac a_r"></td>' +
                   '<td class="td_phac a_r"></td>' +
                   '<td class="td_phaa a_r">' + setnull(val.phutai3) + '</td>' +
                   '<td class="td_phac a_r">' + val.mds3 + '</td>' +
                   '<td class="td_phac a_r">' + val.mds3_time + '</td>' +
               '</tr>' +
               '<tr>' +
                   '<td class="td_tong">Tổng</td>' +
                   '<td class="td_tong"></td>' +
                   '<td class="td_tong"></td>' +
                   '<td class="td_tong a_r">' + setnull(val.tpgiaotong) + '</td>' +
                   '<td class="td_tong a_r">' + replace0_0(val.tpnhantong) + '</td>' +
                   '<td class="td_tong a_r">' + val.cd1 + '</td>' +
                   '<td class="td_tong a_r">' + val.cd2 + '</td>' +
                   '<td class="td_tong a_r"></td>' +
                   '<td class="td_tong a_r"></td>' +
                   '<td class="td_tong a_r"></td>' +
               '</tr>';
        });

        
        $("#cttd_data tbody").append(tr);
        $("#cb_sct_tsvh").empty();
        $("#cb_sct_tsvh").append(opt);
        $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "/" + tsbanghi + "<span tkey='banghi'></span>");
        selectlang();
        stopLoad();
        LoadPhanTrang_("pageLst_csttd_kh", "pageCurent_csttd_kh", data, function () {
            get_CSCTTD_KH($("#pagenumber").val() - 1);
        });
    } catch (e) {
        console.log(e);
    }
}

function get_CSCTTD_LIST_KH(page) {
    try {
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var tungay = $("#dtTuNgay").val();
        if (tungay == "") tungay = gettimenow();
        var config = {
            connstr: "ConnectOracle_Amiss4",
            namesql: "PKG_THONGSOVANHANH.CSTTD_LISTKH_PAGE",
            callback: "result_cscttd_list_kh"
        };
        var para = {
            v_Code: code,
            v_UserId: UserInfo.userid,
            v_Date: tungay,
            v_pagenum: page,
            v_numrecs: 10,
        };

        //console.log(para);
        ExecuteServiceSyns(config, para);
        callLoad();
        //  

    } catch (e) {
        console.log(e);
    }
}

function result_cscttd_list_kh(config, para, lst) {
    try {
        var data = lst.data;
        $("#cttd_data tbody").empty();
        ////console.log(data);
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
                    '<td colspan="10">' + val.madiemdo + ' - ' + val.tendiemdo + ' - HSN= ' + val.hsnhan + ' - Loại công tơ: ' + val.chungloai + '</td>' +
                    '<tr>';
            if (val.istype == "1")
                tr += '<tr>' +
                    '<td class="td_stt" rowspan="3">' + val.rnum + '</td>' +
                    '<td class=""></td>' +
                    '<td class="" rowspan="3">Tổng</td>' +
                    '<td class="" rowspan="3">' + format_number(val.tpgiaotong) + '</td>' +
                    '<td class="" rowspan="3" colspan="6"></td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="td_phab">HT: ' + replace0_0(val.time) + '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="td_phac">CT: ' + replace0_0(val.timemeter) + '</td>' +
                '</tr>';
            else
            tr += '<tr>' +
                    '<td class="td_stt" rowspan="3">' + val.rnum + '</td>' +
                    '<td class=""></td>' +
                    '<td class="td_phaa a_c">1</td>' +
                    '<td class="td_phaa a_r">' + val.pgiao1 + '</td>' +
                    '<td class="td_phaa a_r">' + val.pnhan1 + '</td>' +
                    '<td class="td_phaa a_r">' + replace0_0(val.anglea) + '</td>' +
                    '<td class="td_phaa a_r">' + replace0_0(val.cosa) + '</td>' +
                    '<td class="td_phaa a_r">' + setnull(val.phutai1) + '</td>' +
                    '<td class="td_phaa a_r">' + val.mds1 + '</td>' +
                    '<td class="td_phaa a_r">' + val.mds1_time + '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="td_phab">HT: ' + replace0_0(val.time) + '</td>' +
                    '<td class="td_phab a_c">2</td>' +
                    '<td class="td_phab a_r">' + val.pgiao2 + '</td>' +
                    '<td class="td_phab a_r">' + val.pnhan2 + '</td>' +
                    '<td class="td_phab a_r">' + replace0_0(val.angleb) + '</td>' +
                    '<td class="td_phab a_r">' + replace0_0(val.cosb) + '</td>' +
                    '<td class="td_phaa a_r">' + setnull(val.phutai2) + '</td>' +
                    '<td class="td_phab a_r">' + val.mds2 + '</td>' +
                    '<td class="td_phab a_r">' + val.mds2_time + '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="td_phac">CT: ' + replace0_0(val.timemeter) + '</td>' +
                    '<td class="td_phac a_c">3</td>' +
                    '<td class="td_phac a_r">' + val.pgiao3 + '</td>' +
                    '<td class="td_phac a_r">' + val.pnhan3 + '</td>' +
                    '<td class="td_phac a_r">' + replace0_0(val.anglec) + '</td>' +
                    '<td class="td_phac a_r">' + replace0_0(val.cosc) + '</td>' +
                    '<td class="td_phaa a_r">' + setnull(val.phutai3) + '</td>' +
                    '<td class="td_phac a_r">' + val.mds3 + '</td>' +
                    '<td class="td_phac a_r">' + val.mds3_time + '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="td_tong"></td>' +
                    '<td class="td_tong"></td>' +
                    '<td class="td_tong">Tổng</td>' +
                    '<td class="td_tong a_r">' + format_number(val.tpgiaotong) + '</td>' +
                    '<td class="td_tong a_r">' + val.pnhantong + '</td>' +
                    '<td class="td_tong a_r">' + val.cd1 + '</td>' +
                    '<td class="td_tong a_r">' + val.cd2 + '</td>' +
                    '<td class="td_tong a_r"></td>' +
                    '<td class="td_tong a_r"></td>' +
                    '<td class="td_tong a_r"></td>' +
                '</tr>';
        });

        
        $("#cttd_data tbody").append(tr);
        $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "/" + tsbanghi + "<span tkey='banghi'></span>");
        selectlang();
        stopLoad();
        LoadPhanTrang_("pageLst_csttd_list_kh", "pageCurent_csttd_list_kh", data, function () {
            get_CSCTTD_LIST_KH_1pha($("#pagenumber").val() - 1);
        });
    } catch (e) {
        console.log(e);
    }
}


function excel(type) {
    if (type == 1) {
        var tungay = $("#dtTuNgay").val();
        var denngay = $("#dtDenNgay").val();
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var namef = "CSTTD_" + JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo + "_" + tungay.replace("/", "-") + "_" + denngay.replace("/", "-");
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_THONGSOVANHANH.CSTTD_KHACHHANG_PAGE", namefile: namef };
        var para = {
            v_MeterId: meterid,
            v_Socongto: sct,
            v_dFrom: tungay,
            v_dTo: denngay,
            v_pagenum: 0,
            v_numrecs: 10200
        };
        var colum = {
            kq: [
            { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
            { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
            { field: "timemeter", name: "Thời gian công tơ", type: "Text" },
            { field: "time", name: "Thời gian hệ thống", type: "Text" },
            { field: "heso_tu", name: "TU công tơ", type: "Text" },
            { field: "heso_ti", name: "TI công tơ", type: "Text" },
            { field: "hsnhan", name: "HSN trong công tơ", type: "Text" },
            { field: "tu", name: "TU ngoài", type: "Text" },
            { field: "ti", name: "TI ngoài", type: "Text" },
            { field: "chungloai", name: "Loại công tơ", type: "Text" },
            { field: "pgiao1", name: "P giao 1 (KWh)", type: "Text" },
            { field: "pgiao2", name: "P giao 2 (KWh)", type: "Text" },
            { field: "pgiao3", name: "P giao 3 (KWh)", type: "Text" },
            { field: "pgiaotong", name: "Σ P giao (KWh)", type: "Text" },
            { field: "pnhan1", name: "P nhận 1 (KWh)", type: "Text" },
            { field: "pnhan2", name: "P nhận 2 (KWh)", type: "Text" },
            { field: "pnhan3", name: "P nhận 3 (KWh)", type: "Text" },
            { field: "pnhantong", name: "ΣP nhận (KWh)", type: "Text" },
            { field: "cd1", name: "ΣQ giao (KVARh)", type: "Text" },
            { field: "cd2", name: "ΣQ nhận (KVARh)", type: "Text" },
            { field: "mds1", name: "PMax 1 (KW)", type: "Text" },
            { field: "mds1_time", name: "Time PMax 1 (KW)", type: "Text" },
            { field: "mds2", name: "PMax 2 (KW)", type: "Text" },
            { field: "mds2_time", name: "Time PMax 2 (KW)", type: "Text" },
            { field: "mds3", name: "PMax 3 (KW)", type: "Text" },
            { field: "mds3_time", name: "Time PMax 3 (KW)", type: "Text" }
            ]
        };
        //console.log(para);
        ExecuteExportExcelOracle(config, para, colum);
    }
    else {
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var tungay = $("#dtTuNgay").val();
        if (tungay == "") tungay = gettimenow();
        var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
        var namef_l = 'CSTTD_' + tendiemdo.replace('<span class=\"total\">', '_').replace('</span>', '') + "_" + tungay.replace("/", "-");
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_THONGSOVANHANH.CSTTD_LISTKH_PAGE", namefile: namef_l };
        var para = {
            v_Code: code,
            v_Value: code,
            v_UserId: UserInfo.userid,
            v_Date: tungay,
            v_pagenum: 0,
            v_numrecs: 20000,
        };
        var colum = {
            kq: [
                { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
            { field: "madiemdo", name: "Mã điểm đo", type: "TextAndBoldCenter" },
            { field: "tendiemdo", name: "Tên khách hàng", type: "TextAndBoldCenter" },
            { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
            { field: "chungloai", name: "Loại công tơ", type: "Text" },
            { field: "timemeter", name: "Thời gian công tơ", type: "Text" },
            { field: "time", name: "Thời gian hệ thống", type: "Text" },
            { field: "heso_tu", name: "TU công tơ", type: "Text" },
            { field: "heso_ti", name: "TI công tơ", type: "Text" },
            { field: "hsnhan", name: "HSN trong công tơ", type: "Text" },
            { field: "tu", name: "TU ngoài", type: "Text" },
            { field: "ti", name: "TI ngoài", type: "Text" },
            { field: "pgiao1", name: "P giao 1 (KWh)", type: "Text" },
            { field: "pgiao2", name: "P giao 2 (KWh)", type: "Text" },
            { field: "pgiao3", name: "P giao 3 (KWh)", type: "Text" },
            { field: "pgiaotong", name: "Σ P giao (KWh)", type: "Text" },
            { field: "pnhan1", name: "P nhận 1 (KWh)", type: "Text" },
            { field: "pnhan2", name: "P nhận 2 (KWh)", type: "Text" },
            { field: "pnhan3", name: "P nhận 3 (KWh)", type: "Text" },
            { field: "pnhantong", name: "ΣP nhận (KWh)", type: "Text" },
            { field: "cd1", name: "ΣQ giao (KVARh)", type: "Text" },
            { field: "cd2", name: "ΣQ nhận (KVARh)", type: "Text" },
            { field: "mds1", name: "PMax 1 (KW)", type: "Text" },
            { field: "mds1_time", name: "Time PMax 1 (KW)", type: "Text" },
            { field: "mds2", name: "PMax 2 (KW)", type: "Text" },
            { field: "mds2_time", name: "Time PMax 2 (KW)", type: "Text" },
            { field: "mds3", name: "PMax 3 (KW)", type: "Text" },
            { field: "mds3_time", name: "Time PMax 3 (KW)", type: "Text" }
            ]
        };
        ExecuteExportExcelOracle(config, para, colum);
    }
}

//Chỉ số chốt ngày
function get_CSCNgay_KH() {
    try {
        var type = JSON.parse(localStorage.getItem("tree_node"))[0].type;
        var sql;
        var call;

        $(".denngay_d").show();
        $(".sct").show();
        sql = "PKG_CHISOCHOTNGAY.CSCNGAY_KHACHHANG_PAGE";
        call = "result_cscngay_kh";

        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var config = { connstr: "ConnectOracle_Amiss4", namesql: sql, callback: call };
        var para = {
            v_MeterId: meterid,
            v_Socongto: sct,
            v_dFrom: tungay,
            v_dTo: denngay,
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

        sql = "PKG_CHISOCHOTNGAY.CSCNGAY_LISTKH_PAGE";
        call = "result_cscngay_list_kh";
        para = {
            v_Value: code,
            v_From: tungay,
            v_pagenum: page,
            v_numrecs: 20,
        };


        var config = { connstr: "ConnectOracle_Amiss4", namesql: sql, callback: call };
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

//Chỉ số chốt tháng
function get_CSCThang_KH() {
    try {
        var type = JSON.parse(localStorage.getItem("tree_node"))[0].type;
        var sql;
        var call;
        sql = "PKG_CHISOCHOTNGAY.CSCTHANG_KHACHHANG_PAGE";
        call = "result_cscthang_kh";
        var d = new Date;
        var tuthang = "01/" + $("#dtTuNgay").val().substr(3, 7);
        if ($("#dtTuNgay").val() == "") {
            $("#dtTuNgay").val(d.getMonth() + "/" + d.getFullYear());
            tuthang = "01/" + d.getMonth() + "/" + d.getFullYear();

        }
        var denthang = "01/" + $("#dtDenNgay").val().substr(3, 7);
        if ($("#dtDenNgay").val() == "") {
            $("#dtDenNgay").val(d.getMonth() + "/" + d.getFullYear());
            denthang = "01/" + d.getMonth() + "/" + d.getFullYear();

        }

        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var config = { connstr: "ConnectOracle_Amiss4", namesql: sql, callback: call };
        var para = {
            v_MeterId: meterid,
            v_Socongto: sct,
            v_dFrom: tuthang,
            v_dTo: denthang,
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

function get_CSCThang_list_KH() {
    try {
        var d = new Date;
        var thang = "01/" + $("#dtTuNgay").val().substr(3, 7);
        if ($("#dtTuNgay").val() == "") {
            $("#dtTuNgay").val(d.getMonth() + "/" + d.getFullYear());
            thang = "01/" + d.getMonth() + "/" + d.getFullYear();
        }
        var tungay = localStorage.getItem("dateF");
        if (tungay == "") tungay = gettimenow();
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var type = JSON.parse(localStorage.getItem("tree_node"))[0].type;
        var sql;
        var call;
        var para;
        sql = "PKG_CHISOCHOTNGAY.CSCTHANG_LISTKH_PAGE";
        para = {
            v_Value: code,
            v_From: thang,
            v_pagenum: 0,
            v_numrecs: 1000,
        }
        call = "result_cscthang_list_kh";

        var config = { connstr: "ConnectOracle_Amiss4", namesql: sql, callback: call };
        //console.log(para);
        ExecuteServiceSyns(config, para);
        callLoad();
        //  

    } catch (e) {
        console.log(e);
    }
}

function result_cscthang_kh(config, para, lst) {
    try {
        var data = lst.data;
        $("#cscthang_kh_data tbody").empty();
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
            tr += '<tr>';
            tr += '<td class="td_stt" rowspan="3">' + val.rnum + '</td>';
            tr += '<td class=""></td>';
            tr += '<td class="td_phaa a_c">1</td>';
            tr += '<td class="td_phaa a_r">' + val.pgiao1 + '</td>';
            tr += '<td class="td_phaa a_r">' + val.pnhan1 + '</td>';
            tr += '<td class="td_phaa a_r"></td>';
            tr += '<td class="td_phaa a_r"></td>';
            tr += '<td class="td_phaa a_r">' + val.mds1 + '</td>';
            tr += '<td class="td_phaa a_r">' + val.mds1_time + '</td>';
            tr += '</tr>';
            tr += '<tr>';
            tr += '<td class="td_phab">BĐ: ' + val.billingdatestart + '</td>';
            tr += '<td class="td_phab a_c">2</td>';
            tr += '<td class="td_phab a_r">' + val.pgiao2 + '</td>';
            tr += '<td class="td_phab a_r">' + val.pnhan2 + '</td>';
            tr += '<td class="td_phab a_r"></td>';
            tr += '<td class="td_phab a_r"></td>';
            tr += '<td class="td_phab a_r">' + val.mds2 + '</td>';
            tr += '<td class="td_phab a_r">' + val.mds2_time + '</td>';
            tr += '</tr>';
            tr += '<tr>';
            tr += '<td class="td_phac">KT: ' + val.billingdateend + '</td>';
            tr += '<td class="td_phac a_c">3</td>';
            tr += '<td class="td_phac a_r">' + val.pgiao3 + '</td>';
            tr += '<td class="td_phac a_r">' + val.pnhan3 + '</td>';
            tr += '<td class="td_phac a_r"></td>';
            tr += '<td class="td_phac a_r"></td>';
            tr += '<td class="td_phac a_r">' + val.mds3 + '</td>';
            tr += '<td class="td_phac a_r">' + val.mds3_time + '</td>';
            tr += '</tr>';
            tr += '<tr>';
            tr += '<td class="td_tong"></td>';
            tr += '<td class="td_tong"></td>';
            tr += '<td class="td_tong a_c">Tổng</td>';
            tr += '<td class="td_tong a_r">' + val.pgiaotong + '</td>';
            tr += '<td class="td_tong a_r">' + val.tpnhantong + '</td>';
            tr += '<td class="td_tong a_r">' + val.tcd1 + '</td>';
            tr += '<td class="td_tong a_r">' + val.tcd2 + '</td>';
            tr += '<td class="td_tong a_r"></td>';
            tr += '<td class="td_tong a_r"></td>';
            tr += '</tr>';
        });

        $("#cscthang_kh_data tbody").append(tr);
        $("#cb_sct_tsvh").empty();
        $("#cb_sct_tsvh").append(opt);
        $(".sobanghi").html("<span tkey='co'></span>" + data.length + "<span tkey='banghi'></span>");
        selectlang();
        stopLoad();
    } catch (e) {
        console.log(e);
    }
}

function result_cscthang_list_kh(config, para, lst) {
    try {
        var data = lst.data;
        $("#cscthang_kh_data tbody").empty();
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
            tr += '<tr class="tsvh_tendiemdo">';
            tr += '<td colspan="10">' + val.madiemdo + ' - ' + val.tendiemdo + ' - Loại công tơ: ' + val.chungloai + '</td>';

            tr += '<tr>';
            tr += '<td class="td_stt" rowspan="3">' + val.rnum + '</td>';
            tr += '<td class=""></td>';
            tr += '<td class="td_phaa a_c">1</td>';
            tr += '<td class="td_phaa a_r">' + replace0_0(val.pgiao1) + '</td>';
            tr += '<td class="td_phaa a_r">' + replace0_0(val.pnhan1) + '</td>';
            tr += '<td class="td_phaa a_r"></td>';
            tr += '<td class="td_phaa a_r"></td>';
            tr += '<td class="td_phaa a_r">' + replace0_0(val.mds1) + '</td>';
            tr += '<td class="td_phaa a_r">' + replace0_0(val.mds1_time) + '</td>';
            tr += '</tr>';
            tr += '<tr>';
            tr += '<td class="td_phab">BĐ: ' + val.billingdatestart + '</td>';
            tr += '<td class="td_phab a_c">2</td>';
            tr += '<td class="td_phab a_r">' + replace0_0(val.pgiao2) + '</td>';
            tr += '<td class="td_phab a_r">' + replace0_0(val.pnhan2) + '</td>';
            tr += '<td class="td_phab a_r"></td>';
            tr += '<td class="td_phab a_r"></td>';
            tr += '<td class="td_phab a_r">' + replace0_0(val.mds2) + '</td>';
            tr += '<td class="td_phab a_r">' + replace0_0(val.mds2_time) + '</td>';
            tr += '</tr>';
            tr += '<tr>';
            tr += '<td class="td_phac">KT: ' + val.billingdateend + '</td>';
            tr += '<td class="td_phac a_c">3</td>';
            tr += '<td class="td_phac a_r">' + val.pgiao3 + '</td>';
            tr += '<td class="td_phac a_r">' + val.pnhan3 + '</td>';
            tr += '<td class="td_phac a_r"></td>';
            tr += '<td class="td_phac a_r"></td>';
            tr += '<td class="td_phac a_r">' + val.mds3 + '</td>';
            tr += '<td class="td_phac a_r">' + val.mds3_time + '</td>';
            tr += '</tr>';
            tr += '<tr>';
            tr += '<td class="td_tong"></td>';
            tr += '<td class="td_tong"></td>';
            tr += '<td class="td_tong a_c">Tổng</td>';
            tr += '<td class="td_tong a_r">' + replace0_0(val.pgiaotong) + '</td>';
            tr += '<td class="td_tong a_r">' + replace0_0(val.tpnhantong) + '</td>';
            tr += '<td class="td_tong a_r">' + replace0_0(val.tcd1) + '</td>';
            tr += '<td class="td_tong a_r">' + replace0_0(val.tcd2) + '</td>';
            tr += '<td class="td_tong a_r"></td>';
            tr += '<td class="td_tong a_r"></td>';
            tr += '</tr>';
        });
        $("#cscngay_kh_data").hide();
        $("#cscthang_kh_data").show();

        $("#cscthang_kh_data tbody").append(tr);
        $("#cb_sct_tsvh").empty();
        $("#cb_sct_tsvh").append(opt);
        $(".sobanghi").html("<span tkey='co'></span>" + data.length + "<span tkey='banghi'></span>");
        selectlang();
        stopLoad();
    } catch (e) {
        console.log(e);
    }
}
