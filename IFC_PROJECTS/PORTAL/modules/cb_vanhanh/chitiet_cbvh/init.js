var page=1
$(document).ready(function () {
    showhideTree();
    try {
        initformelement();
        if (localStorage.getItem("para")) {
            var para = localStorage.getItem("para");
            getPara(para);
            get_ChitietCB(page);
        } else {
        }
        $("#btn_thuchien_ctcb").click(function () {
            get_ChitietCB(page);
        })
        var lstMeter = [];


        $("#btn_phieudd").click(function () {
            $("#md_phieudieudong").modal("show");
        });
        $("#excel_cbvh_chitiet").click(function () {
            excel_ctcbvh();
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
function get_ChitietCB(page) {
    try {
    
        var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
        var loaicb = $("#cb_ct_loaicb option:selected").val();
        var trangthai = $("#cb_ct_trangthai option:selected").val();
        var loaikh = $("#cb_ct_loaikh option:selected").val();
        var khacphuc=$("#cb_ct_trangthai").val();
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_CANHBAOVANHANH.CHITIETCBVH", callback: "fn_drawTable_ctcb" };
        var para = {
            V_CODE: code,
            v_LOAICB: loaicb,
            v_TypeKH: loaikh,
            v_KHACPHUC: khacphuc,
            v_pagenum: page,
            v_numrecs: 20
        };
        console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function fn_drawTable_ctcb(config, para, lst) {
    if (lst == null) return;
    var data = lst.data;
    var trData = "";
    var tsbanghi = 0;
    $("#tbl_ctcb_data tbody").empty();
    $.each(data, function (key, val) {
        tsbanghi = val.rowscount;
        var stt = val.loai_cb == 'DCU' ? val.stt : '';
        if (para.v_LOAICB != 'DCU' && val.loai_cb != 'DCU') {
            trData += "<tr id='" + val.meterid + "' class='tsvh_tendiemdo'>" +
                            "<td class='stt'>" + val.stt + "</td>" +
                            "<td colspan='4'>MĐĐ: " + val.ma_diemdo + " - " + val.tendiemdo + "</td></tr> ";
        }

        trData += "<tr class='line1'><td>" + stt + "</td>" +
                        "<td class='c'>" + setnull(val.thoidiem_bd) + "</td>" +
                        "<td class='c'>" + setnull(val.ten_cb) + "</td>" +
                        "<td class='cl'>" + val.noidung + "</td>" +
                        "<td class='a_c'>" + rep_day(val.countday) + val.counthour + " Giờ " + val.countminute + " Phút </td>" 
                    "</tr>";

    });
   
    $("#tbl_ctcb_data tbody").append(trData);
    $(".sobanghi").html("<span tkey='hienthi'></span>" + data.length + "/" + tsbanghi + "<span tkey='banghi'></span>");
    LoadPhanTrang("pageLst_ctcbvh", "pageCurent_ctcbvh", data, function () {
        get_ChitietCB($("#pagenumber").val());
    });
    selectlang();
  
}
function rep_day(d) {
    if (d == "0" || d == "undefined") {
        return "";
    } else {
        return d + " Ngày ";
    }
}

function excel_ctcbvh() {

    var tungay = gettimenow();
    var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
    var loaicb = $("#cb_ct_loaicb option:selected").val();
    var trangthai = $("#cb_ct_trangthai option:selected").val();
    var loaikh = $("#cb_ct_loaikh option:selected").val();
    var khacphuc = $("#cb_ct_trangthai").val();
    var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
    var namef_l = 'ChiTietCanhBao_' + tendiemdo.replace('<span class=\"total\">', '_').replace('</span>', '') + "_" + tungay.replace("/", "-");
    var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_CANHBAOVANHANH.CHITIETCBVH", namefile: namef_l };
    var para = {
        V_CODE: code,
        v_LOAICB: loaicb,
        v_TypeKH: loaikh,
        v_KHACPHUC: khacphuc,
        v_pagenum: 1,
        v_numrecs: 100000000000000000
    };
    var colum = {
        kq: [
            { field: "rnum", name: "STT", type: "TextAndBoldCenter" },
            { field: "ma_diemdo", name: "Mã điểm đo", type: "TextAndBoldCenter" },
            { field: "tendiemdo", name: "Tên khách hàng", type: "TextAndBoldCenter" },
            { field: "dienluc", name: "Điện lực", type: "TextAndBoldCenter" },
            { field: "thoidiem_bd", name: "Thời điểm cảnh báo", type: "Text" },
            { field: "ten_cb", name: "Loại cảnh báo", type: "Text" },
            { field: "giatri_cb", name: "Giá trị đọc về", type: "Text" },
            { field: "noidung", name: "Nội dung cảnh báo", type: "Text" },
            { field: "countday", name: "Số ngày bị cảnh báo", type: "Text" },
            { field: "counthour", name: "Số giờ của ngày", type: "Text" },
            { field: "countminute", name: "Số phút của ngày", type: "Text" }        
        ]
    };
    ExecuteExportExcelOracle(config, para, colum);
}

