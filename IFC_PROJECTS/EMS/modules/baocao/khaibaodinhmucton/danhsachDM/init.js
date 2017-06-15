$(document).ready(function () {
    try {
        loadConetent();
        var date = new Date();
        var m = (date.getMonth() + 1).toString().length == 1 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        $('#txt_thoigian_search_kbdmcp').datepicker({
            format: 'mm/yyyy',
            todayHighlight: true,
            autoclose: true,
            viewMode: "months",
            minViewMode: 'months'
        });
       
        $('#txt_thoigian_search_kbdmcp').val(m + "/" + date.getFullYear())
        loadBanMien_search();
        loadtable_chitiet(1);
        $("#cb_vatttb_search_kbdm").change(function () {
            loadTenThietBi_Search($(this).val());
        });

        $("#btntimkiem_kbdm").click(function () {
            loadtable_chitiet(1);
        });
    } catch (e) { console.log(e); }
});

//------------------------------------------------------
function loadBanMien_search() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "result_loadbanmien_search", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loadbanmien_search(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("cb_vatttb_search_kbdm", data[0].kq0, "code", "name", "-1", "--Tất cả--");
        dataToCob("cb_banmien_search_kbdm", data[1].kq1, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
//------------------------------------------------------

function loadTenThietBi_Search(id) {
    try {
        try {
            var p = getAllIdMod();
            var config = { namesql: "TB_Import_LstLoadByCode", callback: "result_loadtenthietbi_search", connstr: "ConnectEMS" };
            var para = { IsType: 'LoaiThietBi', Code: parseInt(id) };
            ExecuteServiceSyns(config, para, false);
        } catch (e) {
            console.log(e);
        }

    } catch (e) {
        console.log(e);
    }
}
function result_loadtenthietbi_search(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("cb_tenvt_kbdm", data, "code", "name", "-1", "--Chọn loại thiết bị--");
    } catch (e) {
        console.log(e);
    }
}

//------------------------------------------------------
function loadtable_chitiet(page) {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_Import_LoadKhaiBaoDinhMuc", callback: "result_loadByID_chitiet", connstr: "ConnectEMS" };
        var para = {
            StockCode: p.cb_banmien_search_kbdm,
            TypeDeviceId:p.cb_vatttb_search_kbdm,
            VendorId: p.cb_loaitb_search_kbdm,
            Date:"01/"+ p.txt_thoigian_search_kbdmcp,
            pagenum: page,
            numrecs: 10
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loadByID_chitiet(config, para, lst) {
    try {
        console.log(lst);
        $("#myTableData_kbdm").empty();
        if (lst == null || lst == undefined || lst=="[]") return;
        var data = lst.data;
        if (data == null || data == "[]" || data == "" || data.length == 0) {
            try {
                messInfo("messinfo_kbdm", "Không có dữ liệu hiển thị ", "error");
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_kbdm", "", "error");
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td class='c'>"
                + val.stt + "</td><td>"
                + val.banmien + "</td><td>"
                + val.typedevicename + "</td><td>"
                + val.tenvattu + "</td><td class='c'>"
                + SetValnull(val.dinhmucttt) + "</td><td class='c'>"
                + SetValnull(val.dinhmucttd) + "</td><td class='c'>"
                + SetValnull(val.sldp) + "</td><td class='c'>"
                + SetValnull(val.slcp) + "</td><td>"
                + SetValnull(val.ghichu) + "</td><td style='width: 120px;'>"
                + "<div style='float:left'><a class='btn btn-success btn-action' data-toggle='modal' href='#xemchitiet_kbdm' onclick='XemChitiet_kdm(" + val.id+")'>Chi tiết</a></div><div style='float:left'><a class='btn btn-success btn-action' data-toggle='modal' style='width: 35px;' onclick=' Xoakbdm(" + val.id + ")' >Xóa</a></div></td> </tr>";
            $("#myTableData_kbdm").append(row);
           
        });
        LoadPhanTrang("pageLst_kbdm", "pageCurent_kbdm", data, function () {
            loadtable_chitiet($("#pagenumber").val());
        });
    } catch (e) {
        console.log(e);
    }
}
function XemChitiet_kdm(id) {
    messInfo("messinfo_themdmcp", '', "error");
    LoadThongTinChiTietKBDMCP(id);
}
//------------------------------------------------------
function Xoakbdm(id) {
    f_confimYesNo("Bạn chắc chắn muốn xóa?", "Bỏ qua", "Đồng ý", function () { f_xoa_kbdm(id); });
}
function f_xoa_kbdm(id) {
    try {
        var config = { namesql: "TB_Lis_XoaKBDM", callback: "resutl_XoaKBDM", connstr: "ConnectEMS" };
        var para = {
            v_id: parseInt(id)
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function resutl_XoaKBDM(config, para, lst) {
    try {
        if (lst == null || lst == undefined) return;
        if (lst.data[0].result.toLowerCase().indexOf("thành công") > 0) {
            messInfo("messinfo_kbdm", lst.data[0].result, "ok");
            loadtable_chitiet(1);
        }
        else
            messInfo("messinfo_kbdm", lst.data[0].result, "error");
    } catch (e) {
        console.log(e);
    }
}

