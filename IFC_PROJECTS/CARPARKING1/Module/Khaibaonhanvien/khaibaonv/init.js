var countPage = 10;
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
    try {
     
            loaddanhsach_nv(1);
        } catch (e) {
            console.log(e);
        }
}

function loaddanhsach_nv(page) {
    try {
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var config = { namesql: "CAR_CAPNHATNHANVIEN.DanhSachNhanVien", callback: "f_result_loaddanhsach_nv", connstr: "Oracle_HDDT" };
        var para = {
            v_CODE: infotree.code,
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
                clear_nvkb();
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
                + (key + 1) + "</td><td>"
                + setnull(val.hoten) + "</td><td>"
                + setnull(val.manhanvien) + "</td><td>"
                + setnull(val.ngaytao) + "</td><td>"
                + setnull(val.sodienthoai) + "</td><td>"
                + val.ten_ddx + "</td><td>"
                + "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_nv' value='" + val.idnhanvien + "' id='btn_suanv" + val.idnhanvien + "'>Sửa</a> &nbsp;<a class='btn btn-danger btn-action' data-toggle='modal' href='#' value='" + val.idnhanvien + "' id='btnxoa_nv" + val.idnhanvien + "'>Xóa</a></div></form></td> </tr>";

            $("#table_khaibao_nv").append(row);

            $("#btn_suanv" + val.idnhanvien).click(function () {
                messInfo("messinfo_manvsua", '', "error");
                loadma_masua(val.idnhanvien);
            });
            $("#btnxoa_nv" + val.idnhanvien).click(function () {
                f_confimYesNo("Bạn chắc muốn xóa", "Bỏ qua", "Xác nhận", function () {
                    xoa_manv(val.idnhanvien);
                });
            });
        });
        LoadPhanTrang("pageLst_nv", "pageCurent_nv", data, function () {
            loaddanhsach_nv($("#pagenumber").val());
        });


    } catch (e) {
        console.log(e);
    }
}
function clear_nvkb() {
    try{
        $("#table_khaibao_nv").empty();
        $("#pageLst_nv").empty();
        $("#pageCurent_nv").empty();
    } catch (e) {
        console.log(e);
    }
}

function xoa_manv(val) {
    try{
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "CAR_CAPNHATNHANVIEN.THANHLYNV", callback: "f_result_xoa_manv", connstr: "Oracle_HDDT" };
        var para = {
            v_USERID:userinfo.userid,
            v_ID:val
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
            messInfo("messinfo_xoanv", row, 'ok');
            setTimeout(function () {
                loaddanhsach_nv(1);
            }, 1000);
        } else {
            messInfo("messinfo_xoanv", row, 'error');
            setTimeout(function () { messInfo("messinfo_xoanv", '', "error"); }, 2000);
        }

    } catch (e) {
        console.log(e);
    }
}