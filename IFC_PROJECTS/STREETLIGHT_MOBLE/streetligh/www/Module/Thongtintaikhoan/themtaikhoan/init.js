$(document).ready(function () {
    try {
        loadConetent();
        loadlistquyen();
        loaddonvi();
        loadchecklog_master();
        $("#btn_checkluu_themmoitk").click(function () {
            var checkover = checknullthemmoitaikhoan();
            if (checkover != "") {
                messInfo("messinfo_createtaokhoan", checkover, "error");
                return;
            }
            f_confimYesNo("Bạn chắc chắn muốn thêm khách hàng ", "Bỏ qua", "Xác nhận", function () {
                taotaikhoan();
            });


        });
    } catch (e) {
        console.log(e);
    }

});

function taotaikhoan() {
    try {
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "PKG_USERS.CREATEUSER", callback: "f_result_loadtaikhoan", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_userid: userinfo.idnhanvien,
            v_IDNHANVIEN: '',
            v_MANHANVIEN: p.txt_manhanvien_tmtk,
            v_TENNHANVIEN: p.txt_hoten_tmtk,
            v_MATKHAU: p.txt_matkhau_tmtk,
            v_SODIENTHOAI: p.txt_dienthoai_tmtk,
            v_MADONVI: p.cbdonvi_ThemTK,
            v_DIACHI: p.txt_diachi_tmtk,
            v_QUYEN: p.cbquyen_ThemTK,
            v_TYPE: 'CREATE',
        };
        //console.log('para');
        //console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadtaikhoan(config, para, lst) {
    try {
        var data = lst.data;
        //console.log("hihihi tao thanh cong");
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_createtaokhoan", row, "ok");
            clearthemmoitaikhoan();
            loaddanhsachtaikhoang(1);
        } else {
            messInfo("messinfo_createtaokhoan", row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}
function loadlistquyen() {
    try {
        var config = { namesql: "PKG_USERS.LSTQUYEN", callback: "f_result_loadlstquyen", connstr: "ConnectOracleStreetLight" };
        var para = [''];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlstquyen(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        dataToCob("cbquyen_ThemTK", data, "id", "name", "-1", "Chọn quyền");
    } catch (e) {
        console.log(e);
    }
}
function loaddonvi() {
    try {
        var config = { namesql: "PKG_USERS.LSTDONVI", callback: "f_result_loadlstdonvi", connstr: "ConnectOracleStreetLight" };
        var para = [''];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlstdonvi(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        dataToCob("cbdonvi_ThemTK", data, "madonvi", "tendonvi", "-1", "Chọn đơn vị");
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
        if (p.cbdonvi_ThemTK == '-1') {
            return "Vui lòng chọn đơn vị ";
        }
        if (p.cbquyen_ThemTK == '-1') {
            return "Vui lòng chọn quyền ";
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
        $("#cbdonvi_ThemTK").val("-1");

    } catch (e) {
        console.log(e);
    }
}




