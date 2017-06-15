
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        lsttram_themcot();
        $("#btn_them_tcot").click(function () {
            var check = checkvalidate_cot();
            if (check != "") {
                messInfo("messinfo_tcot", check, "error");
                return;
            }
            f_confimYesNo("Bạn chắc chắn muốn thêm", "Bỏ qua", "Xác nhận", function () {
                them_cot();
            });
        });
    } catch (e) {
        console.log(e);
    }

});
function checkvalidate_cot() {
    try {
        var p = getAllIdMod();
        if (p.txt_ten_tcot == "") return "Tên cột không được trống";
        if (p.txt_ten_tcot.length > 100) return "Tên cột không được quá 100 ký tự";
        if (p.txt_sothus_cot == "") return "Số thứ tự không được để trống";
        if ($.isNumeric(p.txt_sothus_cot) == false) return "Số thứ tự phải là số";
        if (p.cb_tram_tcot == "-1") return "Vui lòng chọn trạm";
    
        return "";
    } catch (e) {
        console.log();
    }
}
function lsttram_themcot() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_LSTCOMBOX.LSTTRAM", callback: "f_result_lsttram_themcot", connstr: "ConnOracleXangDau" };
        var para = { v_Code: '' };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_lsttram_themcot(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_tram_tcot", data, "id", "name", "-1", "Chọn trạm");
    } catch (e) {
        console.log(e);
    }
}
// cap nhật cột
function clear_null_cot() {
    try {
        setValToTxt("txt_ten_tcot", '');
        setValToTxt("txt_sothus_cot", '');
        setValToTxt("cb_tram_tcot", '-1');
    } catch (e) {
        console.log();
    }
}
function them_cot() {
    try{
        var p = getAllIdMod();
        var config = { namesql: "PKG_KHAIBAOCOT.THEMCOT", callback: "f_result_them_cot", connstr: "ConnOracleXangDau" };
        var para = {
            v_TENCOT: p.txt_ten_tcot,
            v_SOTHUTU: p.txt_sothus_cot,
            v_MABON: '',
            v_MATRAM: p.cb_tram_tcot,
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {

    }
}
function f_result_them_cot(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_tcot", row, "ok");
            loaddanhsach_cot(1);
        } else {
            messInfo("messinfo_tcot", row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}