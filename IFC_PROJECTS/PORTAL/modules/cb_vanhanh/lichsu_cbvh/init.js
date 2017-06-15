$(document).ready(function () {
    showhideTree();
    try {
        initformelement();
        $("#btn_thuchien_lscb").click(function () {
            get_LSCB(1);
        });
        var dateF = localStorage.getItem("dateF");
        var dateT = localStorage.getItem("dateT");
        if (dateF.length==0 && dateT.length==0) {
            $(".datepicker").val(gettimenow());
        } else {
            $("#ls_txttungay").val(dateF);
            $("#ls_txtdenngay").val(dateT);
        }
        $("#ls_txttungay").change(function () {
            localStorage.setItem("dateF", $("#ls_txttungay").val());
        });
        $("#ls_txtdenngay").change(function () {
            localStorage.setItem("dateT", $("#ls_txtdenngay").val());
        });
        $("#ls_cbloaicanhbao").change(function () {
            var loaicb = $("#ls_cbloaicanhbao").val();
            if (loaicb != '0') {
                getphanloaicb(loaicb);
            }
           
        });
        $("#excel_lscbvh").click(function () {
            xuatexcel_lstcbvh();
        });
    }
    catch (e) {
        console.log(e.message);
    }

});
function get_LSCB(page) {
    try {
        //console.log("OK");
        var tungay = localStorage.getItem("dateF");
        var denngay = localStorage.getItem("dateT");
        if (tungay == "") tungay = gettimenow();
        if (denngay == "") denngay = gettimenow();
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var loaicb = $("#ls_cbloaicanhbao option:selected").val();
        var ploaicb = $("#ls_cbphanloaicanhbao option:selected").val();
        var loaikh = $("#ls_cbloaikhachhang option:selected").val();
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_CANHBAOVANHANH.GETLICHSU_CBVH", callback: "drawTable_lscb" };
        var para = {
            V_CODE: code,
            v_LOAICB: loaicb,
            v_MA_CB: ploaicb,
            v_TIME_FROM: tungay,
            v_TIME_TO: denngay,
            v_TypeKH: loaikh,
            v_pagenum: page,
            v_numrecs: 20,
        };

        console.log(para);
        ExecuteServiceSyns(config, para);
 

    } catch (e) {
        console.log(e);
    }
}
function drawTable_lscb(config, para, lst) {
    try {
        console.log(lst);
        if (lst == null) return;
        var data = lst.data;
        var trData = "";
        var tsbanghi = 0;
        $("#tbl_lscb_data tbody").empty();
        $.each(data, function (key, val) {
            tsbanghi = val.rowscount;
            var stt = val.loai_cb == 'DCU' ? val.stt : '';
            if (para.v_LOAICB != 'DCU' && val.loai_cb !='DCU') {
                trData += "<tr id='" + val.meterid + "' class='tsvh_tendiemdo'>" +
                                "<td class='stt'>" + val.stt + "</td>" +
                                "<td colspan='8'>MĐĐ: " + val.ma_diemdo + " - " + val.tendiemdo + "</td></tr> ";
            }
            
            trData += "<tr class='line1'><td>" + stt + "</td>" +
                            "<td class='c'>" + setnull(val.thoidiem_bd) + "</td>" +
                            "<td class='c'>" + setnull(val.thoidiem_kt) + "</td>" +
                            "<td class='c'>" + setnull(val.giatri_cb) + "</td>" +
                            "<td class='c'>" + setnull(val.giatri_kp) + "</td>" +
                            "<td class='cl'>" + val.ten_cb + "</td>" +
                            "<td class='cl'>" + val.noidung + "</td>" +
                            "<td class='a_c'>" + rep_day(val.countday) + val.counthour + " Giờ " + val.countminute + " Phút </td>" +
                            "<td class='a_c'></td>" +
                        "</tr>";

           
        });
        $("#tbl_lscb_data tbody").append(trData);
        $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "/" + tsbanghi + "<span tkey='banghi'></span>");
        LoadPhanTrang("pageLst_lscbvh", "pageCurent_lscbvh", data, function () {
            get_LSCB($("#pagenumber").val());
        });
        selectlang();
    } catch (e) {
        console.log(e);
    }
}
function getphanloaicb(loaicb) {
    try {
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_CANHBAOVANHANH.GETPHANLOAICB", callback: "fn_return_loaicb" };
        var para = {
            v_Loaicb: loaicb
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function fn_return_loaicb(config, para, lst) {
    try {
       
        if (lst == null) return;
        var data = lst.data;  
        if (data.length == 0) return;
        $("#ls_cbphanloaicanhbao").empty();
        $("#ls_cbphanloaicanhbao").append("<option value='0'>–– TẤT CẢ ––</option>");
        $.each(data, function (index, val) {
            $("#ls_cbphanloaicanhbao").append("<option value=" + val.ma_cb + ">" + val.ten_cb + "</option>");
        });
    } catch (e) {
        console.log(e);
    }
}

function rep_day(d) {
    if (d == "0" || d == "undefined") {
        return "";
    } else {
        return d + " Ngày ";
    }
}
function xuatexcel_lstcbvh() {
    var tungay = localStorage.getItem("dateF");
    var denngay = localStorage.getItem("dateT");
    if (tungay == "") tungay = gettimenow();
    if (denngay == "") denngay = gettimenow();
    var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
    var loaicb = $("#ls_cbloaicanhbao option:selected").val();
    var ploaicb = $("#ls_cbphanloaicanhbao option:selected").val();
    var loaikh = $("#ls_cbloaikhachhang option:selected").val();
    var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
    var namef_l = 'lichsucanhbao_' + tendiemdo.replace('<span class=\"total\">', '_').replace('</span>', '') + "_" + tungay.replace("/", "-");
    var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_CANHBAOVANHANH.GETLICHSU_CBVH", namefile: namef_l };
    var para = {
        V_CODE: code,
        v_LOAICB: loaicb,
        v_MA_CB: ploaicb,
        v_TIME_FROM: tungay,
        v_TIME_TO: denngay,
        v_TypeKH: loaikh,
        v_pagenum: 1,
        v_numrecs: 100000000000000,
    };
    var colum = {
        kq: [
            { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
        { field: "ma_diemdo", name: "Mã điểm đo", type: "TextAndBoldCenter" },
        { field: "tendiemdo", name: "Tên khách hàng", type: "TextAndBoldCenter" },
        { field: "dienluc", name: "Điện lực", type: "TextAndBoldCenter" },
        { field: "thoidiem_bd", name: "Thời điểm cảnh báo", type: "Text" },
        { field: "thoidiem_kt", name: "Thời điểm hết cảnh báo", type: "Text" },
        { field: "giatri_cb", name: "Giá trị đọc về", type: "Text" },
        { field: "giatri_kp", name: "Giá trị hết cảnh báo", type: "Text" },
        { field: "ten_cb", name: "Phân loại cảnh báo", type: "Text" },
        { field: "noidung", name: "Nội dung cảnh báo", type: "Text" },
        { field: "countday", name: "Số ngày bị cảnh báo", type: "Text" },
        { field: "counthour", name: "Số giờ của ngày", type: "Text" },
        { field: "countminute", name: "Số phút của ngày", type: "Text" }
        ]
    };
    ExecuteExportExcelOracle(config, para, colum);
}