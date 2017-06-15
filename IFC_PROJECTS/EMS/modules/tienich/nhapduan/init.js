$(document).ready(function () {
    try {
        
        loadConetent();
        loadInitDate();
        loadbamiennda();
      
        $("#btn_search_qlnda").click(function () {
            loadtable_chitiet_qlnda(1);
        });
        $("#sl_banmien_qlnda_search").change(function () {
            loaddienluc_search($("#sl_banmien_qlnda_search").val());
        });
    } catch (e) { console.log(e); }
});


function loadbamiennda() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loadbamiennda", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadbamiennda(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("sl_banmien_qlnda_search", data[1].kq1, "code", "name", "-1", "--Tất cả--");
        loadtable_chitiet_qlnda(1);

    } catch (e) {
        console.log(e);
    }
}
function loaddienluc_search() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_loaddienluc_search_qlnda", connstr: "ConnectEMS" };
        var para = {
            IsType: 'LoadDienlucDuAn',
            Code: $("#sl_banmien_qlnda_search").val()
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_loaddienluc_search_qlnda(config, para, lst) {
    try {

        if (lst == null || lst == undefined || lst == "[]") return;
        var data = lst.data;
        dataToCob("sl_dienluc_qlnda_search", data, "code", "name", "-1", " Tất cả");
       
    } catch (e) { console.log(e); }
}
function loadtable_chitiet_qlnda(page) {
    try {
        var config = { namesql: "TB_TienIch_Project_LoadDuAn", callback: "f_loadtable_chitiet_qlnda", connstr: "ConnectEMS" };
        var para = {
            
            KeyWord: $("#txt_manda_search").val(),
            Code: $("#sl_banmien_qlnda_search").val(),
            CodeDL: $("#sl_dienluc_qlnda_search").val(),
            pagenum: page,
            numrecs:10
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_loadtable_chitiet_qlnda(config, para, lst) {
    try {
        $("#myTableData_nhapqlnda").empty();
        if (lst == null || lst == undefined) return;
        var data = lst.data;
        if (data == null || data == "[]" || data == "" || data.length == 0) {
            try {
                messInfo("messinfo_qlnda", "Không có dữ liệu hiển thị ", "error");
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_qlnda", "", "error");

        var Count =1;
      
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.banmien + "</td><td>"
                + SetValnull(val.maduan) + "</td><td>"
                + SetValnull(val.projectname) + "</td><td style='width: 100px;'>"
                + "<div style='float:left' class='classquyen_sua'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_nhapduan' style='width: 35px;height: 30px;' id='btn_suatnda" + val.projectid + "'>Sửa</a></div><div style='float:left' class='classquyen_xoa'><a class='btn btn-success btn-action' data-toggle='modal' style='width: 35px;height: 30px;' onclick='Xoanda(" + val.projectid + ")' >Xóa</a></div></td> </tr>";
            $("#myTableData_nhapqlnda").append(row);
            $("#btn_suatnda" + val.projectid).click(function () {

                messInfo("messinfo_qlnda", '', "error");
                loadthongtin_qlnda(val.projectid);
            });

        });
        LoadPhanTrang("pageLst_qlnda", "pageCurent_qlnda", data, function () {
            loadtable_chitiet_qlnda($("#pagenumber").val());
        });
    } catch (e) {
        console.log(e);
    }
}

function Xoanda(id) {
    f_confimYesNo("Bạn chắc chắn muốn xóa?", "Bỏ qua", "Đồng ý", function () { f_xoa_qlnda(id); });
}
function f_xoa_qlnda(id) {
    try {
        var config = { namesql: "TB_TienIch_Project_XoaDA", callback: "resutl_fn_tb_tienich_xoada", connstr: "ConnectEMS" };
        var para = {
          
            projectid:parseInt(id)
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function resutl_fn_tb_tienich_xoada(config, para, lst) {
    try {
        console.log(lst);
        if (lst == null || lst == undefined) return;
        if (lst.data[0].result.toLowerCase().indexOf("thành công") > 0) {
            loadtable_chitiet_qlnda(1);
            messInfo("messinfo_qlnda", lst.data[0].result, "ok");
          
            setTimeout(function () {
                messInfo("messinfo_qlnda", '', 'ok');
            }, 8000);
        }
        else
            messInfo("messinfo_qlnda", lst.data[0].result, "error");
    } catch (e) {
        console.log(e);
    }
}