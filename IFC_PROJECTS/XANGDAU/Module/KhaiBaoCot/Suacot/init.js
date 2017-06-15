
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        loadcot_lsttram();
      
        $("#btn_sua_cot").click(function () {
            var check = checkvailidate_suacot();
            if (check != "") {
                messInfo("messinfo_scot", check, "error");
              
                return;
            }
            f_confimYesNo("Bạn chắc chắn muốn cập nhật", "Bỏ qua", "Xác nhận", function () {
                capnhatcot();
            });
        });

    } catch (e) {
        console.log(e);
    }

});
function loadmacot_sua(val) {
    try {
        localStorage.setItem("txtmacot", val);
        var config = { namesql: "PKG_KHAIBAOCOT.LOADIDCOT", callback: "f_result_loadmacot_sua", connstr: "ConnOracleXangDau" };
        var para = {
            v_IDCOT: val
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadmacot_sua(config, para, lst) {
    try{
        var data = lst.data;
 
        if(data==null || data==undefined|| data.lenght==0 || data ==''){
            messInfo("messinfo_scot", "Không có dữ liệu hiển thị ", "error");
            return;
        }
        setValToTxt("txt_tens_cot", data[0].tencot);
        setValToTxt("cb_trams_cot", data[0].matram);
        setValToTxt("txt_sothu_cot", data[0].sothutu);
        

    } catch (e) {
        console.log(e);
    }
}
function checkvailidate_suacot() {
    try{
        var p = getAllIdMod();
        if (p.txt_tens_cot == "") return "Tên cột không được để trống";
        if (p.txt_sothu_cot == "") return "Số thứ tự cột không được để trống";
        if ($.isNumeric(p.txt_sothu_cot) == false) return "Số thứ tự cột phải là số";
        if (p.cb_trams_cot == "-1" || p.cb_trams_cot == "") return "Vui lòng trạm";

        return "";

    } catch (e) {
        console.log(e);
    }
}
function loadcot_lsttram() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_LSTCOMBOX.LSTTRAM", callback: "f_result_loadsua_lsttram", connstr: "ConnOracleXangDau" };
        var para = { v_Code: '' };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadsua_lsttram(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_trams_cot", data, "id", "name", "-1", "Chọn trạm");
    } catch (e) {
        console.log(e);
    }
}
// cap nhật cột
function capnhatcot() {
    try{
        var p = getAllIdMod();
        var id= localStorage.getItem("txtmacot");
        var config = { namesql: "PKG_KHAIBAOCOT.CAPNHATCOT", callback: "f_result_capnhatcot", connstr: "ConnOracleXangDau" };
        var para = {
            v_IDCOT:id,
            v_TENCOT: p.txt_tens_cot,
            v_SOTHUTU:p.txt_sothu_cot,
            v_MABON: '',
            v_MATRAM: p.cb_trams_cot,
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_capnhatcot(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        console.log(row);
        if (row.indexOf('thành công') > 0) {
            messInfo("messinfo_scot", row, "ok");
            loaddanhsach_cot(1);
        } else {
            messInfo("messinfo_scot", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}
