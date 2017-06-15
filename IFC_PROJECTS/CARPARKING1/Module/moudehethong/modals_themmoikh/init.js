$(document).ready(function () {
    try {
        loadConetent();
        loaddonvi();     
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
        var config = { namesql: "CAR_DANGNHAP.TAOTAIKHOANA", callback: "f_result_loadtaikhoan", connstr: "Oracle_HDDT" };
        var para = {
              v_USERID:userinfo.userid,
              v_TENDANGNHAP:p.txt_manhanvien_tmtk,
              v_MATKHAU:p.txt_matkhau_tmtk,
              v_TENNGUOIDUNG:p.txt_hoten_tmtk,
              v_SODIENTHOAI:p.txt_dienthoai_tmtk,
              v_EMAIL:p.txt_email_tmtk,
              v_DIACHI:p.txt_diachi_tmtk,
              v_GHICHU:'',
              v_CODE: p.cbdonvi_ThemTK,
              v_QUYEN:'',
              v_TYPE:'',
        };
    
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadtaikhoan(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_createtaokhoan", row, "ok");
            clearthemmoitaikhoan();
            loaddanhsachnhanvien(1);
        } else {
            messInfo("messinfo_createtaokhoan", row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}

function loaddonvi() {
    try{
        var config = { namesql: "CAR_CAYLISTBOX.CAYCAR", callback: "f_result_loadlstdonvi", connstr: "Oracle_HDDT" };
        var para = { v_CODE: '01' };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlstdonvi(config, para, lst) {
    try {
        var data = lst.data;
     
        dataToCob("cbdonvi_ThemTK", data, "code", "ten", "-1", "Chọn đơn vị");
        $('select#cbdonvi_ThemTK').find('option').each(function () {
            var text;
            if ($(this).val().length === 4) {
                text = $(this).text();
                $(this).text("-- " + text);
            }
            if ($(this).val().length == 6) {
                text = $(this).text();
                $(this).text("----- " + text);
            }
            if ($(this).val().length == 8) {
                text = $(this).text();
                $(this).text("-------- " + text);
            }
        });
    } catch (e) {
        console.log(e);
    }
}
//bat loi
function checknullthemmoitaikhoan() {
    try {
        var p = getAllIdMod();
        if (p.txt_manhanvien_tmtk == '') {
            return "Không được để trống tên đăng nhập";
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
            return "Không được để trống Họ tên";
        }
      
        if (p.txt_dienthoai_tmtk != "") {
            if ($.isNumeric(p.txt_dienthoai_tmtk) == false) return "Số điện thoại phải là số";
            if ((p.txt_dienthoai_tmtk).length < 10 || (p.txt_dienthoai_tmtk).length > 11) return " Số điện thoại phải từ 10 hoặc 11 số";
        }
        if (p.txt_email_tmtk != "") {
            if (IsEmail(p.txt_email_tmtk) == false) return "Email không đúng định dạng";
        }

        if (p.txt_diachi_tmtk == '') {
            return "Không được để trống địa chỉ";
        }
        if (p.cbdonvi_ThemTK == '-1')
        {
            return "Vui lòng chọn đơn vị ";
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
        $("#txt_email_tmtk").val("");

    } catch (e) {
        console.log(e);
    }
}




