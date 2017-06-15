var idsuanv;
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        loadnv_lst_diemdoxe();
      
        $("#btn_sua_manv").click(function () {
            var check = checkvailidate_suama();
            if (check != "") {
                messInfo("messinfo_manvsua", check, "error");
              
                return;
            }
            f_confimYesNo("Bạn chắc chắn muốn cập nhật", "Bỏ qua", "Xác nhận", function () {
                capnhatmanv();
            });
        });

    } catch (e) {
        console.log(e);
    }

});
//function f_loadChangeTree() {
//    try {
//        console.log("22");
//        loadnv_lst_diemdoxe();
//    } catch (e) {
//        console.log(e);
//    }
//}

function loadma_masua(val) {
    try {
        idsuanv = val;
        var config = { namesql: "CAR_CAPNHATNHANVIEN.THONGTIN", callback: "f_result_loadma_manvsua", connstr: "Oracle_HDDT" };
        var para = {
            v_ID: val
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadma_manvsua(config, para, lst) {
    try{
        var data = lst.data;
        if(data==null || data==undefined|| data.lenght==0 || data ==''){
            messInfo("messinfo_manvsua", "Không có dữ liệu hiển thị ", "error");
            return;
        }
        setValToTxt("txt_manv_sua", data[0].manhanvien);
        setValToTxt("txt_tennv_sua", data[0].hoten);
        setValToTxt("txt_sodienthoai_sua", data[0].dienthoai);
        setValToTxt("cb_diemdoxe_sua", data[0].iddiemdoxe);
        setValToTxt("txt_diachi_manv", data[0].diachi);
        setValToTxt("txt_ghichu_manv", data[0].ghichu);
        

    } catch (e) {
        console.log(e);
    }
}
function checkvailidate_suama() {
    try{
        var p = getAllIdMod();
        if (p.txt_tennv_sua == "") return "Tên nhân viên không được trống";
        if (p.txt_tennv_sua.length > 100) return "Tên nhân viên không được quá 100 ký tự";
        if ($.isNumeric(p.txt_sodienthoai_sua) == false) return "Số điện thoại phải là số";
        if (p.cb_diemdoxe_sua == '-1' || p.cb_diemdoxe_sua == "") return " Vui lòng chọn điểm đỗ xe"

        return "";

    } catch (e) {
        console.log(e);
    }
}
function loadnv_lst_diemdoxe() {
    try {
        var infotree = JSON.parse(localStorage.getItem('infotree'));
        var config = { namesql: "CAR_LOAD_LST.LOADLSTDIEMDOXE", callback: "f_result_loadnv_lstdiemdoxe", connstr: "Oracle_HDDT" };
        var para = { v_CODE: infotree.code };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadnv_lstdiemdoxe(config, para, lst) {
    try {
        var data = lst.data;
      
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_diemdoxe_sua", data, "id_ddx", "ten_ddx", "-1", "Chọn điểm đỗ xe");
    } catch (e) {
        console.log(e);
    }
}

function capnhatmanv() {
    try{
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "CAR_CAPNHATNHANVIEN.CAPNHAPNVIEN", callback: "f_result_capnhatcotnhanvien", connstr: "Oracle_HDDT" };
        var para = {
            v_USERID :userinfo.userid,
            v_ID:idsuanv,
            v_TEN:p.txt_tennv_sua,
            v_DIACHI:p.txt_diachi_manv,
            v_DIENTHOAI:p.txt_sodienthoai_sua,
            v_IDDIEMDOXE:p.cb_diemdoxe_sua,
            v_GHICHU: p.txt_ghichu_manv
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_capnhatcotnhanvien(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_manvsua", row, 'ok');
            setTimeout(function () {
                loaddanhsach_nv(1);
                $("button.close").click();
            }, 500);
        } else {
            messInfo("messinfo_manvsua", row, 'error');
        }

    } catch (e) {
        console.log(e);
    }
}
