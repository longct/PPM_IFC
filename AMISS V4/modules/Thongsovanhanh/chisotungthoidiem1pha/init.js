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
        if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "0") {
            get_CSCTTD_KH_1pha(0);
            $("#btn_thuchien").removeAttr("disabled");
            $(".denngay_d").show();
            $("label.denngay").show();
            $("label.tungay").html("Từ ngày");
        } else if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto == "0") {
            get_CSCTTD_LIST_KH_1pha(0);
            $("#btn_thuchien").removeAttr("disabled");
            $("label.tungay").html("Ngày");
            $("label.denngay").hide();
            $(".denngay_d").hide();
        }

        $("#excel_csttd_1pha").click(function () {
            var ch_sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            if (ch_sct != "" && ch_sct != "0") {
                excel(1);
            } else {
                excel(2);
            }
        });

        $("#btnLocdulieu").click(function () {
            if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "0") {
                
                get_CSCTTD_KH_1pha(0);
            } else if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "" && JSON.parse(localStorage.getItem("tree_node"))[0].socongto == "0") {
                get_CSCTTD_LIST_KH_1pha(0);
            }
        });
    } catch (e) {
        console.log(e);
    }
    

});
function get_CSCTTD_KH_1pha(page) {
    try {
        var tungay = $("#dtTuNgay").val();
        var denngay = $("#dtDenNgay").val();
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var config = {
            connstr: "ConnectOracle_Amiss4",
            namesql: "PKG_THONGSOVANHANH.CSTTD_KHACHHANG_PAGE",
            callback: "result_cscttd_kh_1pha"
        };
        var para = {
            v_MeterId: meterid,
            v_Socongto: sct,
            v_dFrom: tungay,
            v_dTo: denngay,
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

function result_cscttd_kh_1pha(config, para, lst) {
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
        var tungay = $("#dtTuNgay").val();
        if (tungay == "") tungay = gettimenow();
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_THONGSOVANHANH.CSTTD_LISTKH_PAGE", callback: "result_cscttd_list_kh_1pha" };
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
