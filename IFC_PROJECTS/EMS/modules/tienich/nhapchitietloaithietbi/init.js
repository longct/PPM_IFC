$(document).ready(function () {
    try {
        
        loadConetent();
        loadInitDate();
        loadtable_chitiet(1);
        loadloaithietbi();
        $("#btn_search_qlvt").click(function () {
            loadtable_chitiet(1);
        });
    } catch (e) { console.log(e); }
});


function loadloaithietbi() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadloaithietbi_chitiet", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadloaithietbi_chitiet(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("sl_loaivatu", data[0].kq0, "code", "name", "0", "--Chọn loại thiết bị-");
    } catch (e) {
        console.log(e);
    }
}
function loadtable_chitiet(page) {
    try {
        var config = { namesql: "TB_Import_LoadChiTietLoaiThietBi", callback: "f_result_loadByCode_chitiet", connstr: "ConnectEMS" };
        var para = {
            
            MaVatTu: $("#txt_matb_search").val(),
            TypeDeviceId: parseInt($("#sl_loaivatu").val()),
            pagenum: page,
            numrecs:10
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadByCode_chitiet(config, para, lst) {
    try {
        if (lst == null || lst == undefined) return;
        var data = lst.data;
        if (data == null || data == "[]" || data == "" || data.length == 0) {
            try {
                messInfo("messinfo_tienichctlb", "Không có dữ liệu hiển thị ", "error");
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_tienichctlb", "", "error");

        var Count =1;
        $("#myTableData_nhapchitiettb").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.typedevicename + "</td><td>"
                + SetValnull(val.typedevicename1) + "</td><td>"
                + SetValnull(val.mavattu) + "</td><td>"
                + SetValnull(val.tenvattu) + "</td><td>"
                + SetValnull(val.hangvattu) + "</td><td>"
                + SetValnull(val.donvitinh) + "</td><td>"
                + SetValnull(val.typedetailorcount) + "</td><td>"
                + SetValnull(val.inserteddate) + "</td><td style='width: 100px;'>"
                + "<div style='float:left' class='classquyen_sua'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_ttvattu' style='width: 35px;height: 30px;' id='btn_suatenx" + val.vendorid + "'>Sửa</a></div><div style='float:left' class='classquyen_xoa'><a class='btn btn-success btn-action' data-toggle='modal' style='width: 35px;height: 30px;' onclick='Xoavattb(" + val.vendorid + ")' >Xóa</a></div></td> </tr>";
            $("#myTableData_nhapchitiettb").append(row);
            $("#btn_suatenx" + val.vendorid).click(function () {
                messInfo("messinfo_tenvattu", '', "error");
                loadthongtinvatu(val.vendorid);
            });

        });
        LoadPhanTrang("pageLst_qlvt", "pageCurent_qlvt", data, function () {
            loadtable_chitiet($("#pagenumber").val());
        });
    } catch (e) {
        console.log(e);
    }
}

function Xoavattb(id) {
    f_confimYesNo("Bạn chắc chắn muốn xóa?", "Bỏ qua", "Đồng ý", function () { f_xoa_cntttb(id); });
}
function f_xoa_cntttb(id) {
    try {
        var config = { namesql: "TB_Lis_XoaVendor", callback: "resutl_fn_TB_Lis_XoaVendor", connstr: "ConnectEMS" };
        var para = {
          
            vendorid:parseInt(id)
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function resutl_fn_TB_Lis_XoaVendor(config, para, lst) {
    try{
        if (lst == null || lst == undefined) return;
        if (lst.data[0].result.toLowerCase().indexOf("thành công") > 0) {
            loadtable_chitiet(1);
            messInfo("messinfo_tienichctlb", lst.data[0].result, "ok");
          
            setTimeout(function () {
                messInfo("messinfo_tienichctlb", '', 'ok');
            }, 2000);
        }
        else
            messInfo("messinfo_tienichctlb", lst.data[0].result, "error");
    } catch (e) {
        console.log(e);
    }
}