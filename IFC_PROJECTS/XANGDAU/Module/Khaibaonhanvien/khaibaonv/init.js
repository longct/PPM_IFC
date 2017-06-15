var countPage = 5;
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        loaddanhsach_nv(1);
    } catch (e) {
        console.log(e);
    }

});
function f_loadChangeTree() {
    loaddanhsach_nv(1);
}

function loaddanhsach_nv(page) {
    try {
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var config = { namesql: "PKG_KHAIBAONHANVIEN.LOADNHANVIEN", callback: "f_result_loaddanhsach_nv", connstr: "ConnOracleXangDau" };
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
function f_result_loaddanhsach_nv(config, para, lst) {
    try {
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) {
            try {
                var p = getAllIdMod();
                messInfo("messinfo_nv", "Không có dữ liệu hiển thị ", "error");
                $("#table_khaibao_cot").empty();
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_nv", "", "error");
        datakhachhang_nv(data);

    } catch (e) {
        console.log(e);
    }
}
function datakhachhang_nv(data) {
    try {
        $("#table_khaibao_nv").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + setnull(val.tennhanvien) + "</td><td>"
                + setnull(val.ngaytao) + "</td><td>"
                + setnull(val.sodienthoai) + "</td><td>"
                + val.tentram + "</td><td>"
                + "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_nv' value='" + val.manv + "' id='btn_suanv" + val.manv + "'>Sửa</a> &nbsp;<a class='btn btn-danger btn-action' data-toggle='modal' href='#' value='" + val.manv + "' id='btnxoa_nv" + val.manv + "'>Xóa</a></div></form></td> </tr>";

            $("#table_khaibao_nv").append(row);

            $("#btn_suanv" + val.manv).click(function () {
                messInfo("messinfo_manvsua", '', "error");
                loadma_masua(val.manv);
                
            });
            $("#btnxoa_nv" + val.manv).click(function () {
                f_confimYesNo("Bạn chắc muốn xóa", "Bỏ qua", "Xác nhận", function () {
                    xoa_manv(val.manv);
                });
            });
        });
        LoadPhanTrang("pageLst_cot", "pageCurent_cot", data, function () {
            loaddanhsach_cot($("#pagenumber").val());
        });


    } catch (e) {
        console.log(e);
    }
}
function xoa_manv(val) {
    try{
        var config = { namesql: "PKG_KHAIBAONHANVIEN.IDXOA", callback: "f_result_xoa_manv", connstr: "ConnOracleXangDau" };
        var para = {
            v_ID: val
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_xoa_manv(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_xoanv", row, "ok");
            loaddanhsach_nv(1);
        } else {
            messInfo("messinfo_xoanv", row, "error");
            setTimeout(function () { messInfo("messinfo_xoanv", '', "error"); }, 2000);
        }

    } catch (e) {
        console.log(e);
    }
}