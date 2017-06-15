var countPage = 10;
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        loaddanhsach_bon(1);
    } catch (e) {
        console.log(e);
    }

});
function f_loadChangeTree() {
    loaddanhsach_bon(1);
}

function loaddanhsach_bon(page) {
    try{
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var config = { namesql: "PKG_CHOKHAIBAOBON.LOADBON", callback: "f_result_loaddanhsach", connstr: "ConnOracleXangDau" };
        var para = {
            v_Code: infotree.code,
            v_pagenum: page,
            v_numrecs: countPage
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddanhsach(config, para, lst) {
    try{
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) {
            try {
                var p = getAllIdMod();
                messInfo("messinfo_bon", "Không có dữ liệu hiển thị ", "error");
                $("#table_ttkhachhang_bon").empty();
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_bon", "", "error");
        datakhachhang_bon(data);

    } catch (e) {
        console.log(e);
    }
}
function datakhachhang_bon(data) {
    try{
        $("#table_ttkhachhang_bon").empty();
       
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.tenbon + "</td><td>"
                + setnull(val.tenxang) + "</td><td>"
                + setnull(val.thetichchua) + "</td><td>"
                + setnull(val.ngaytao) + "</td><td>"
                + val.tentram + "</td><td>"
                + "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_bon' value='" + val.mabon + "' id='btn_suamabon" + val.mabon + "'>Sửa</a> &nbsp;<a class='btn btn-danger btn-action' data-toggle='modal' href='#' value='" + val.mabon + "' id='btnxoa_bon" + val.mabon + "'>Xóa</a></div></form></td> </tr>";

            $("#table_ttkhachhang_bon").append(row);

            $("#btn_suamabon" + val.mabon).click(function () {
                loathongtinsuamabon(val.mabon);
            });
            $("#btnxoa_bon" + val.mabon).click(function () {
           
                f_confimYesNo("Bạn chắc chắn muốn xóa", "Bỏ qua", "Xác nhận", function () {
                    loadxoa_bon(val.mabon);
                });
            });
        });
        LoadPhanTrang("pageLst_bon", "pageCurent_bon", data, function () {
            loaddanhsach_bon($("#pagenumber").val());
        });

  
    } catch (e) {
        console.log(e);
    }
}
function loadxoa_bon(val) {
    try{
        var config = { namesql: "PKG_CHOKHAIBAOBON.XOABON", callback: "f_result_loadxoa_bon", connstr: "ConnOracleXangDau" };
        var para = {
            v_IDBON: val
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadxoa_bon(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_bonxoa", row, "ok");
            loaddanhsach_bon(1);
            setTimeout(function () { messInfo("messinfo_bonxoa", '', "ok"); }, 1000);
        } else {
            messInfo("messinfo_bonxoa", row, "error");
            setTimeout(function () { messInfo("messinfo_bonxoa", '', "error"); }, 1000);
        }
    } catch (e) {
        console.log(e);
    }
}