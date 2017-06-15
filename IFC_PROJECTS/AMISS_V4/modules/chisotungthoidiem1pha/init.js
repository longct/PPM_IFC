$(document).ready(function () {
    showhideTree();
    var ch_sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
    if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "0") {
        get_CSCTTD_KH_1pha(0);
        $("#btn_thuchien").removeAttr("disabled");
        $(".denngay_d").show();
        $(".sct").show();
        $(".tungay_d label").html("Từ ngày");
    } else if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto == "0") {
        get_CSCTTD_LIST_KH_1pha(0);
        $("#btn_thuchien").removeAttr("disabled");
        $(".tungay_d label").html("Ngày");
        $(".denngay_d").hide();
        $(".sct").hide();
    }
    
    $("#excel_csttd_1pha").click(function () {
        if (ch_sct != "" && ch_sct != "0") {
            excel(1);
        } else {
            excel(2);
        }
    })

});
function get_CSCTTD_KH_1pha(page) {
    try {
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_VANHANH.CSTTD_KHACHHANG_PAGE", callback: "result_cscttd_kh_1pha" };
        var para = {
            v_MeterId: meterid,
            v_Socongto: sct,
            v_dFrom: tungay,
            v_dTo: denngay,
            v_HienThi: '0',
            v_pagenum: page,
            v_numrecs: 20
        };

        ////console.log(para);
        ExecuteServiceSyns(config, para);
        callLoad();
        //  

    } catch (e) {
        console.log(e);
    }
}

function result_cscttd_kh_1pha(config, para, lst) {
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
        var opt = ""
        var tsbanghi;
        //console.log(data);
        $.each(data, function (i, val) {
            tsbanghi = val.rowscount;
            opt = '<option value="' + val.socongto + '">' + val.socongto + '</option>';
            tr += '</tr>' +
                '<tr>' +
                    '<td class="th_stt1pha a_c">' + val.rnum + '</td>' +
                    '<td class="td_1pha a_c">' + val.socongto + '</td>' +
                    '<td class="td_1pha a_c">' + replace0_0(val.chungloai) + '</td>' +
                    '<td class="td_1pha a_c">' + val.timemeter + '</td>' +
                    '<td class="td_1pha a_c">' + val.tpgiaotong + '</td>' +
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

function get_CSCTTD_LIST_KH_1pha(page) {
    try {
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var type = JSON.parse(localStorage.getItem("tree_node"))[0].type;
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_VANHANH.CSTTD_LISTKH_PAGE", callback: "result_cscttd_list_kh_1pha" };
        var para = {
            v_Type: 1,// 1: Dienluc(Code); 2:Tram(CodeDM)  3:Nhom(GroupId) 4: List ID;
            v_Value: code,
            v_From: "",
            v_To: "",
            v_SoGhi: "", // SoGhi -- lay tai bang Meter_Info
            v_ChungLoai: "",//Loaicongto - lay trong TreoThao
            v_LoaiCongTo: 0,//TypePha -- lay trong TreoThao
            v_TrangThai: null,
            v_ChuKiChot: null,
            v_UserId: 1,
            v_Permission: 1,
            v_Date: tungay,
            v_Hour: "",
            v_Minute: "",
            v_HienThi: "1",
            v_pagenum: page,
            v_numrecs: 20,
        };

        //console.log(para);
        ExecuteServiceSyns(config, para);
        callLoad();
        //  

    } catch (e) {
        console.log(e);
    }
}

function result_cscttd_list_kh_1pha(config, para, lst) {
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
                    '<td colspan="5">' + val.madiemdo + ' - ' + val.tendiemdo + ' - HSN= ' + val.hsnhan + '</td>' +
                    '<tr>' +
                    '<td class="td_stt1pha a_c">' + val.rnum + '</td>' +
                    '<td class="td_1pha a_c">' + val.socongto + '</td>' +
                    '<td class="td_1pha a_c">' + replace0_0(val.chungloai) + '</td>' +
                    '<td class="td_1pha a_c">' + val.timemeter + '</td>' +
                    '<td class="td_1pha a_c">' + val.tpgiaotong + '</td>' +
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
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var namef = "CSTTD_" + JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo + "_" + tungay.replace("/", "-") + "_" + denngay.replace("/", "-");
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_VANHANH.CSTTD_KHACHHANG_PAGE", namefile: namef };
        var para = {
            v_MeterId: meterid,
            v_Socongto: sct,
            v_dFrom: tungay,
            v_dTo: denngay,
            v_HienThi: '0',
            v_pagenum: 0,
            v_numrecs: 1020
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
        var namef_l = 'CSTTD_' + tendiemdo.replace('<span class=\"total\">', '_').replace('</span>', '') + "_" + tungay.replace("/", "-");
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_VANHANH.CSTTD_LISTKH_PAGE", namefile: namef_l };
        var para = {
            v_Type: 1,// 1: Dienluc(Code); 2:Tram(CodeDM)  3:Nhom(GroupId) 4: List ID;
            v_Value: code,
            v_From: "",
            v_To: "",
            v_SoGhi: "", // SoGhi -- lay tai bang Meter_Info
            v_ChungLoai: "",//Loaicongto - lay trong TreoThao
            v_LoaiCongTo: 0,//TypePha -- lay trong TreoThao
            v_TrangThai: null,
            v_ChuKiChot: null,
            v_UserId: 1,
            v_Permission: 1,
            v_Date: tungay,
            v_Hour: h,
            v_Minute: m,
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
