$(document).ready(function () {
    showhideTree();
    try {
        var ch_sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var type_m = JSON.parse(localStorage.getItem("tree_node"))[0].type;
        if (type_m == "1") {
            $("#mesMain").html("<i class='icon fa fa-ban'></i>Chức năng không áp dụng cho điểm đo 1 pha");
            $("#btn_thuchien").attr("disabled", "disabled");
            return;
        }
        if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "0") {
            get_CSCThang_KH();
            $("#btn_thuchien").removeAttr("disabled");

            $(".tungay_d label").html("Từ ngày");
        } else {
            get_CSCThang_list_KH();
            $("#btn_thuchien").removeAttr("disabled");
            $(".tuthang_d label").html("Tháng");
            $(".denngay_d").hide();
            $(".denthang_d").hide();
            
            $(".sct").hide();
        }

        $("#excel_cscthang").click(function () {
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

function get_CSCThang_KH() {
    try {
        var type = JSON.parse(localStorage.getItem("tree_node"))[0].type;
        var sql;
        var call;
        if (type == "3" || type == "31") {
            sql = "AMISS_VANHANH.CSCTHANG_KHACHHANG_PAGE";
            call = "result_cscthang_kh";
            $(".denngay_d").hide();
            $(".sct").hide();
        }
        else {
            $(".denngay_d").show();
            $(".sct").show();
            sql = "AMISS_VANHANH.CSCNGAY_KHACHHANG_PAGE";
            call = "result_cscngay_kh";
        }
        var d = new Date;
        var tuthang = "01/" + $("#date_tuthang").val();
        if ($("#date_tuthang").val() == "") {
            $("#date_tuthang").val(d.getMonth() + "/" + d.getFullYear());
            tuthang = "01/" + d.getMonth() + "/" + d.getFullYear();

        }
        var denthang = "01/" + $("#date_denthang").val();
        if ($("#date_denthang").val() == "") {
            $("#date_denthang").val(d.getMonth() + "/" + d.getFullYear());
            denthang = "01/" + d.getMonth() + "/" + d.getFullYear();

        }

        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var config = { connstr: "ConnectOracle233", namesql: sql, callback: call };
        var para = {
            v_MeterId: meterid,
            v_Socongto: sct,
            v_dFrom: tuthang,
            v_dTo: denthang,
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

function get_CSCThang_list_KH() {
    try {
        var d = new Date;
        var thang = "01/" + $("#date_tuthang").val();
        if ($("#date_tuthang").val() == "") {
            $("#date_tuthang").val(d.getMonth() + "/" + d.getFullYear());
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
        sql = "AMISS_VANHANH.CSC_LISTKH_PAGE";
        para = {
            v_Type: 1,//-- 1: Dienluc(Code); 2:Tram(CodeDM)  3:Nhom(GroupId) 4: List ID;
            v_Value: code,
            v_From: '',
            v_To: '',
            v_SoGhi: '', //-- SoGhi -- lay tai bang Meter_Info
            v_ChungLoai: '',//--Loaicongto - lay trong TreoThao
            v_LoaiCongTo: 0,//--TypePha -- lay trong TreoThao
            v_TrangThai: 0,
            v_ChuKiChot: 0,
            v_UserId: 1,
            v_Permission: 1,
            v_Date: thang,
            v_Ngaychot: 0,
            v_HienThi: 0,
            v_pagenum: 0,
            v_numrecs: 1000,
        }
        call = "result_cscthang_list_kh";

        var config = { connstr: "ConnectOracle233", namesql: sql, callback: call };
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

function excel(type) {
    if (type == 1) {
        var d = new Date;
        var tuthang = "01/" + $("#date_tuthang").val();
        if ($("#date_tuthang").val() == "") {
            $("#date_tuthang").val(d.getMonth() + "/" + d.getFullYear());
            tuthang = "01/" + d.getMonth() + "/" + d.getFullYear();

        }
        var denthang = "01/" + $("#date_denthang").val();
        if ($("#date_denthang").val() == "") {
            $("#date_denthang").val(d.getMonth() + "/" + d.getFullYear());
            denthang = "01/" + d.getMonth() + "/" + d.getFullYear();

        }

        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var namef = "CSCThang_" + JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo + "_" + d.getMonth() + "-" + d.getFullYear() + "_" + denthang.replace("/", "-");
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_VANHANH.CSCTHANG_KHACHHANG_PAGE", namefile: namef };
        var para = {
            v_MeterId: meterid,
            v_Socongto: sct,
            v_dFrom: tuthang,
            v_dTo: denthang,
            v_HienThi: '0',
            v_pagenum: 0,
            v_numrecs: 1020
        };
        var colum = {
            kq: [
            { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
            { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
            { field: "chungloai", name: "Loại công tơ", type: "Text" },
            { field: "billingdatestart", name: "Thời gian bắt đầu", type: "Text" },
            { field: "billingdateend", name: "Thời gian kết thúc", type: "Text" },
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
            { field: "tcd1", name: "ΣQ giao (KVARh)", type: "Text" },
            { field: "tcd2", name: "ΣQ nhận (KVARh)", type: "Text" },
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
        var d = new Date;
        var thang = "01/" + $("#date_tuthang").val();
        if ($("#date_tuthang").val() == "") {
            $("#date_tuthang").val(d.getMonth() + "/" + d.getFullYear());
            thang = "01/" + d.getMonth() + "/" + d.getFullYear();

        }

        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        var meterid = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].meterid);
        var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
        var namef_l = 'CSCThang_' + tendiemdo.replace('<span class=\"total\">', '_').replace('</span>', '') + "_" + thang.replace("/", "-");
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_VANHANH.CSC_LISTKH_PAGE", namefile: namef_l };
        var para = {
            v_Type: 1,//-- 1: Dienluc(Code); 2:Tram(CodeDM)  3:Nhom(GroupId) 4: List ID;
            v_Value: code,
            v_From: '',
            v_To: '',
            v_SoGhi: '', //-- SoGhi -- lay tai bang Meter_Info
            v_ChungLoai: '',//--Loaicongto - lay trong TreoThao
            v_LoaiCongTo: 0,//--TypePha -- lay trong TreoThao
            v_TrangThai: 0,
            v_ChuKiChot: 0,
            v_UserId: 1,
            v_Permission: 1,
            v_Date: thang,
            v_Ngaychot: 0,
            v_HienThi: 0,
            v_pagenum: 0,
            v_numrecs: 1000,
        };
        var colum = {
            kq: [
                { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
            { field: "madiemdo", name: "Mã điểm đo", type: "TextAndBoldCenter" },
            { field: "tendiemdo", name: "Tên khách hàng", type: "TextAndBoldCenter" },
            { field: "socongto", name: "Số công tơ", type: "TextAndBoldCenter" },
            { field: "chungloai", name: "Loại công tơ", type: "Text" },
            { field: "billingdatestart", name: "Thời gian bắt đầu", type: "Text" },
            { field: "billingdateend", name: "Thời gian kết thúc", type: "Text" },
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
            { field: "tcd1", name: "ΣQ giao (KVARh)", type: "Text" },
            { field: "tcd2", name: "ΣQ nhận (KVARh)", type: "Text" },
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
