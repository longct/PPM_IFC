var datasuakh;
$(document).ready(function () {
    try {
        
        loaddonvi_sua();
        $("#btn_checkluu_sua").click(function () {
            var check = checknull_sua();
            if (check != "") {
                messInfo("messinfo_sua", check, "error");
                return;
            }
            f_confimYesNo("Bạn chắc chắn muốn sửa khách hàng ", "Bỏ qua", "Xác nhận", function () {
                loadsuakhachhang();
            });
           
        });
    } catch (e) {
        console.log(e);
    }

});
function loadkhachhang_id(val) {
    try {
        var p = getAllIdMod();
        datasuakh = val;
        var config = { namesql: "CAR_DANGNHAP.LSTTHONGTINTAIKHOAN", callback: "reset_loadkhachhang_id", connstr: "Oracle_HDDT" };
        var para = {
            v_ID: val
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function reset_loadkhachhang_id(config, para, lst) {
    try {
        var data = lst.data;
        setValToTxt("txt_hoten", data[0].ten);
        setValToTxt("txt_dienthoai", data[0].sodienthoai);
        setValToTxt("txt_email", data[0].mail);
        setValToTxt("txt_diachi", data[0].diachi);
        setValToTxt("cbdonvi", data[0].code);   
    } catch (e) {
        console.log(e);
    }
}

function loaddonvi_sua() {
    try {
        var config = { namesql: "CAR_CAYLISTBOX.CAYCAR", callback: "f_result_loadlstdonvi_sua", connstr: "Oracle_HDDT" }; 
        var para = { v_CODE:'01' };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlstdonvi_sua(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbdonvi", data, "code", "ten", "-1", "Chọn đơn vị");
        $('select#cbdonvi').find('option').each(function () {
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

function loadsuakhachhang() {
    try{
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "CAR_DANGNHAP.CAPNHATXOA", callback: "f_result_loadtaikhoan_suakhachhang", connstr: "Oracle_HDDT" };
        var para = {
            v_ID:datasuakh,
            v_TENNGUOIDUNG:p.txt_hoten,
            v_SODIENTHOAI:p.txt_dienthoai,
            v_EMAIL:p.txt_email,
            v_DIACHI:p.txt_diachi,
            v_GHICHU:'',
            v_CODE:p.cbdonvi,
            v_USERID: userinfo.userid,
            v_TYPE: 'UPDATE',
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadtaikhoan_suakhachhang(config, para, lst) {
    try{
        var data = lst.data; 
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_sua", row, "ok");
            loaddanhsachnhanvien(1);
        } else {
            messInfo("messinfo_sua", row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}
//
function checknull_sua() {
    try{
        var p = getAllIdMod();
    
        if (p.txt_hoten == '') {
            return "Không được để trống tên tài khoản";
        }
        if (p.txt_dienthoai != "") {
            if ($.isNumeric(p.txt_dienthoai) == false) return "Số điện thoại phải là số";
            if ((p.txt_dienthoai).length < 10 || (p.txt_dienthoai).length > 11) return " Số điện thoại phải từ 10 hoặc 11 số";
        }
        if (p.txt_email != "") {
            if (IsEmail(p.txt_email) == false) return "Email không đúng định dạng";
        }
        if (p.txt_diachi == '') {
            return "Không được để trống địa chỉ";
        }
        if (p.cbdonvi == '-1') {
            return "Vui lòng chọn đơn vị ";
        }
        return "";
    } catch (e) {
        console.log(e);
    }
}