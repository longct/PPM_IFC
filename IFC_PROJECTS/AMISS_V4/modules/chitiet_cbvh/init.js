$(document).ready(function () {
    showhideTree();
    try {
        initformelement();
        if (localStorage.getItem("para")) {
            var para = localStorage.getItem("para");
            getPara(para);
            get_ChitietCB();
        } else {
        }
        $("#btn_thuchien_ctcb").click(function () {
            get_ChitietCB();
        })
        var lstMeter = [];


        $("#btn_phieudd").click(function () {
            $("#md_phieudieudong").modal("show");
        });
        $("#excel_cbvh_chitiet").click(function () {
            excel();
        })
    } catch (e) {
        console.log(e.message);
    }
});
function getPara(p) {
    try {
        if ($("#cb_ct_loaicb option[value='" + p + "']").val() === undefined) {
            $("#cb_ct_loaicb").val("0").change();
        } else {
            $("#cb_ct_loaicb").val(p).change();
        }
    } catch (e) {
    }
}
function get_ChitietCB() {
    try {
        //console.log("OK");
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var loaicb = $("#cb_ct_loaicb option:selected").val();
        var trangthai = $("#cb_ct_trangthai option:selected").val();
        var loaikh = $("#cb_ct_loaikh option:selected").val();
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CANHBAOVANHANH.GetListWarningPage", callback: "drawTable_ctcb" };
        var para = {
            v_Type: 1,//-- 1: Dienluc(Code); 2: Nhom(UserId); 3:Nhom(GroupId); 4:Tram(CodeDM)
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
            v_TYPETABLE: 'WARNING_LAST',
            v_WARNINGTYPE: loaicb,
            v_CONDITION: '0',
            v_TYPEKH: loaikh,
            v_STATUSKP: trangthai,
            v_VALUEFROM: '0',
            v_VALUETO: '0',
            v_pagenum: 0,
            v_numrecs: 1000,
        };

        ////console.log(para);
        ExecuteServiceSyns(config, para);
        callLoad();
        //  

    } catch (e) {
        console.log(e);
    }
}
function drawTable_ctcb(config, para, lst) {
    var data = lst.data;
    //console.log(data);
    var countKhachhang = 0;
    var tempMeterId;
    var trData = "";
    var tsbanghi = 0;
    $.each(data, function (key, val) {
        tsbanghi = val.rowscount;
        if (tempMeterId != val.meterid) {
            tempMeterId = val.meterid;
            countKhachhang++;
            trData += "<tr id='" + tempMeterId + "' class='tsvh_tendiemdo'>" +
                          "<td class='stt'>" + countKhachhang + "</td>" +
                          "<td colspan='4'>MĐĐ: " + val.madiemdo + " - " + val.tendiemdo + "</td>" +
                           "<td class='a_c'><input type='checkbox' class='icheckbox_flat-blue check_cb' data-value='" + tempMeterId + "' data-tenkh='" + val.tendiemdo + "' data-mkh='" + val.madiemdo + "'/></td></tr> ";
            trData += "<tr class='line1'><td></td>" +
                          "<td>" + val.time_warning + "</td>" +
                          "<td class='cl'>" + val.warning_name + "</td>" +
                          "<td class='cl'>" + val.format + "</td>" +
                          "<td class='a_c'>" + rep_day(val.countday) + val.counthour + " Giờ " + val.countminute + " Phút </td>" +
                          "<td class='a_c'></td>" +
                       "</tr>";

        } else {
            trData += "<tr class='line1'><td></td>" +
                          "<td>" + val.time_warning + "</td>" +
                          "<td class='cl'>" + val.warning_name + "</td>" +
                          "<td class='cl'>" + val.format + "</td>" +
                          "<td class='a_c'>" + rep_day(val.countday) + val.counthour + " Giờ " + val.countminute + " Phút </td>" +
                          "<td class='a_c'></td>" +
                      "</tr>";
        }
    })
    $("#tbl_ctcb_data tbody").empty();
    $("#tbl_ctcb_data tbody").append(trData);
    $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "/" + tsbanghi + "<span tkey='banghi'></span>");
    selectlang();
    initformelement();
    $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "/" + tsbanghi + "<span tkey='banghi'></span>(" + countKhachhang + " Khách hàng)");

    $(".check_cb").change(function () {
        var numberOfChecked = $('#tbl_ctcb_data input:checkbox:checked').length;
        if (numberOfChecked > 0) {
            $("#btn_phieudd").removeAttr("disabled");
        }
        else {
            $("#btn_phieudd").attr("disabled", "disabled");
        }
    })
    loadContent();
    stopLoad();
}
function rep_day(d) {
    if (d == "0" || d == "undefined") {
        return "";
    } else {
        return d + " Ngày ";
    }
}

function excel() {
    var tungay = localStorage.getItem("dateF");
    var denngay = localStorage.getItem("dateT");
    if (tungay == "") tungay = gettimenow();
    if (denngay == "") denngay = gettimenow();
    var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
    var loaicb = $("#cb_ct_loaicb option:selected").val();
    var trangthai = $("#cb_ct_trangthai option:selected").val();
    var loaikh = $("#cb_ct_loaikh option:selected").val();

    var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
    var namef_l = 'ChiTietCanhBao_' + tendiemdo.replace('<span class=\"total\">', '_').replace('</span>', '') + "_" + tungay.replace("/", "-");
    var config = { connstr: "ConnectOracle233", namesql: "AMISS_CANHBAOVANHANH.GetListWarningPage", namefile: namef_l };
    var para = {
        v_Type: 1,//-- 1: Dienluc(Code); 2: Nhom(UserId); 3:Nhom(GroupId); 4:Tram(CodeDM)
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
        v_TYPETABLE: 'WARNING_LAST',
        v_WARNINGTYPE: loaicb,
        v_CONDITION: '0',
        v_TYPEKH: loaikh,
        v_STATUSKP: trangthai,
        v_VALUEFROM: '0',
        v_VALUETO: '0',
        v_pagenum: 0,
        v_numrecs: 10000,
    };
    var colum = {
        kq: [
            { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
        { field: "madiemdo", name: "Mã điểm đo", type: "TextAndBoldCenter" },
        { field: "tendiemdo", name: "Tên khách hàng", type: "TextAndBoldCenter" },
        { field: "dienluc", name: "Điện lực", type: "TextAndBoldCenter" },
        { field: "warning_name", name: "Loại cảnh báo", type: "Text" },
        { field: "time_warning", name: "Thời điểm cảnh báo", type: "Text" },
        { field: "countday", name: "Số ngày bị cảnh báo", type: "Text" },
        { field: "countminute", name: "Số phút của ngày", type: "Text" },
        { field: "format", name: "Nội dung cảnh báo", type: "Text" },
        { field: "wcontent", name: "Giá trị đọc về", type: "Text" }
        ]
    };
    ExecuteExportExcelOracle(config, para, colum);
}
//STT	Mã điểm đo	Tên khách hàng	Điện lực	Loại cảnh báo	Thời điểm cảnh báo	Số ngày bị cảnh báo	Số phút của ngày	Nội dung cảnh báo	Giá trị đọc về

