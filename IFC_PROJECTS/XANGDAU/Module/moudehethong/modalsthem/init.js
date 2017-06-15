
$(document).ready(function () {
    try {
        loadlistquyen();

        $("#btn_checkluu_themmoitk").click(function () {
            var checkover = checknullthemmoitaikhoan();
            if (checkover != "") {
                messInfo("messinfo_createtaokhoan", checkover, "error");
                return;
            }
            taotaikhoan();
            //f_confimYesNo("Bạn chắc chắn muốn thêm tài khoản này ", "Bỏ qua", "Xác nhận", function () {
            //    taotaikhoan();
            //});

        });
    } catch (e) {
        console.log(e);
    }

});

// load danh sach tài khoản
function loaddanhsachtaikhoan() {
    try {
        var config = { namesql: "PKG_USER.LISTNGUOIDUNG", callback: "f_result_loaddanhsach", connstr: "ConnOracleXangDau" };
        var para = {
            v_pagenum: 20,
            v_numrecs: 0,
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddanhsach(config, para, lst) {
    try {
        var data = lst.data;
        console.log('hihihi');
        console.log(data);
    } catch (e) {
        console.log(e);
    }
}

function taotaikhoan() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_USER.CREATEUSER", callback: "f_result_loadtaikhoan", connstr: "ConnOracleXangDau" };
        var para = {
            v_IDNHANVIEN: '',
            v_MANHANVIEN: p.txt_manhanvien_tmtk,
            v_TENNHANVIEN: p.txt_hoten_tmtk,
            v_MATKHAU: p.txt_matkhau_tmtk,
            v_SODIENTHOAI: p.txt_dienthoai_tmtk,
            v_DIACHI: p.txt_diachi_tmtk,
            v_QUYEN: p.cbquyen_ThemTK,
            v_TYPE: 'CREATE',
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadtaikhoan(config, para, lst) {
    try {
        var data = lst.data;
        console.log('hi');
        console.log(data);
        //console.log("hihihi tao thanh cong");
        var row = data[0].count;
        console.log(row);
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_createtaokhoan", row, "ok");
            clearthemmoitaikhoan();
        } else {
            messInfo("messinfo_createtaokhoan", row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}
function loadlistquyen() {
    try {
        var config = { namesql: "PKG_USER.LSTQUYEN", callback: "f_result_loadlstquyen", connstr: "ConnOracleXangDau" };
        var para = [''];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlstquyen(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbquyen_ThemTK", data, "id", "name", "-1", "Chọn quyền");
    } catch (e) {
        console.log(e);
    }
}

//bat loi

function checknullthemmoitaikhoan() {
    try {
        var p = getAllIdMod();
        if (p.txt_manhanvien_tmtk == '') {
            return "Không được để trống mã nhân viên";
        }
        if (p.txt_matkhau_tmtk == '') {
            return "Không được để trống mật khẩu";
        }
        if (p.txt_matkhau2_tmtk == '') {
            return "Không được để trống mật khẩu nhập lại";
        }
        if (p.txt_matkhau_tmtk != p.txt_matkhau2_tmtk) {
            clearthemmoitaikhoanmatkhau();
            return "Mật khẩu nhập không trùng nhau";
        }
        if (p.txt_hoten_tmtk == '') {
            return "Không được để trống tên nhân viên";
        }
        if (p.txt_dienthoai_tmtk == '') {
            return "Không được để trống diện thoại";
        }
        if ($("#txt_dienthoai_tmtk").val().replace(/[0-9]*/g, "")) {
            return "Điện thoại phải là số ";
        }
        if (p.txt_diachi_tmtk == '') {
            return "Không được để trống địa chỉ";
        }
        return "";
    } catch (e) {
        console.log(e);
    }
}
function clearthemmoitaikhoanmatkhau() {
    try {
        $("#txt_matkhau_tmtk").val('');
        $("#txt_matkhau2_tmtk").val('');
    } catch (e) {
        console.log(e);
    }
}
function clearthemmoitaikhoan() {
    try {
        $("#txt_manhanvien_tmtk").val("");
        $("#txt_matkhau_tmtk").val("");
        $("#txt_matkhau2_tmtk").val("");
        $("#txt_hoten_tmtk").val("");
        $("#txt_dienthoai_tmtk").val("");
        $("#txt_diachi_tmtk").val("");
        $("#cbquyen_ThemTK").val("-1");

    } catch (e) {
        console.log(e);
    }
}




