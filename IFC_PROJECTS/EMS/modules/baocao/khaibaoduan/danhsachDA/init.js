$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        loadBanMien_search_da();
        loadtable_chitiet(1);
        $("#cb_banmien_search_da").change(function () {
            LoadDienLuc_search_da();
        });
        $("#btntimkiem_da").click(function () {
            loadtable_chitiet(1);
        });
    } catch (e) { console.log(e); }
});
// load ban miền
function loadBanMien_search_da() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadBanMien_search_da", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadBanMien_search_da(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cb_banmien_search_da", data[1].kq1, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
function LoadDienLuc_search_da() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loaddienluc_search_da", connstr: "ConnectEMS" };
        var para = {
            IsType: 'KBDUAN',
            Code: $("#cb_banmien_search_da").val()
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddienluc_search_da(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cb_dienluc_search_da", data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//------------------------------------------------------
function loadtable_chitiet(page) {
    try {
        var config = { namesql: "TB_KH_LoadKhaiBaoDuAn", callback: "result_tb_kh_loadkhaibaoduan", connstr: "ConnectEMS" };
        var para = {
            StockCode: $("#cb_banmien_search_da").val(),
            CodeDL: $("#cb_dienluc_search_da").val(),
            KeyWord: $("#txttenduan_search_da").val(),
            pagenum: page,
            numrecs: 10
        };

        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_tb_kh_loadkhaibaoduan(config, para, lst) {

    try {
      
        $("#myTableData_kbda").empty();
        if (lst == null || lst == undefined) return;
        var data = lst.data;
        if (data == null || data == "[]" || data == "" || data.length == 0) {
            try {
                messInfo("messinfo_kbda", "Không có dữ liệu hiển thị ", "error");
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_kbda", "", "error");
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td class='c'>"
                + val.stt + "</td><td>"
                + val.banmien + "</td><td>"
                + val.maduan + "</td><td>"
                + val.tenduan + "</td><td  class='c'>"
                + val.countdivice + "</td><td  class='c'>"
                + val.thoigiandk + "</td><td>"
                + val.ghichu + "</td><td style='width: 235px;'>"
                + "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#modalXemChiTietDuAn' style='width: 65px;height: 30px;' id='btn_chitiet" + val.id + "'>Chi tiết</a></div>"
                + "<div class='form-group classquyen_sua'><a class='btn btn-success btn-action' data-toggle='modal' href='#modalSuaDuAn' style='width: 65px;height: 30px;' onclick='suakbda(" + val.id + ")'>Sửa</a></div>"
                + "<div class='form-group classquyen_xoa'><a href='#' class='btn btn-success btn-action'  style='width: 65px;height: 30px; ' onclick='Xoakbda(" + val.id + ")'>Xóa</a></div></form></td> </tr>";
            $("#myTableData_kbda").append(row);
            $("#btn_chitiet" + val.id).click(function () {
                messInfo("messinfo_maduan", '', "error");
                loadthongtinchitiet_kbda(val.id);
            });

        });
        LoadPhanTrang("pageLst_kbda", "pageCurent_kbda", data, function () {
            loadtable_chitiet($("#pagenumber").val());
        });
    } catch (e) {
        console.log(e);
    }
}
//------------------------------------------------------
function suakbda(id) {
    messInfo("messinfo_maduan", '', "error");
    loadthongtinchitiet_edit_kbda(id);
}
function Xoakbda(id) {
    f_confimYesNo("Bạn chắc chắn muốn xóa?", "Bỏ qua", "Đồng ý", function () { f_xoa_kbda(id); });
}
function f_xoa_kbda(id) {
    try {
        var config = { namesql: "TB_Lis_XoaKBDA", callback: "fn_result_XoaKBDA", connstr: "ConnectEMS" };
        var para = {
            id:id
        };

        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function fn_result_XoaKBDA(config, para, lst) {
    try {

        if (lst == null || lst == undefined || lst=="[]") return;
        if (lst.data[0].result.toLowerCase().indexOf("thành công") > 0) {
            messInfo("messinfo_kbda", lst.data[0].result, "ok");
            loadtable_chitiet(1);
        }
        else
            messInfo("messinfo_kbda", lst.data[0].result, "error");
    } catch (e) {
        console.log(e);
    }
}