
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        load_lsttram();
        load_lstxang();
        $("#btn_them_bon").click(function () {
            var check = checkvalidate();
            if (check != "") {
                messInfo("messinfo_tbon", check, "error");
                return;
            }
            f_confimYesNo("Bạn Muốn thêm bồn này ", "Bỏ qua", "Xác nhận", function () {
                them_bon();
            });
        });
 
    } catch (e) {
        console.log(e);
    }

});

function checkvalidate() {
    try{
        var p = getAllIdMod();
        if (p.txt_tenbon_tbon == "") return "Tên bồn không được trống";
        if (p.txt_tenbon_tbon.length > 200) return "Tên bồn không được quá 200 ký tự";
        if (p.cbloaixang_tbon == "-1") return "Vui lòng chọn loại xăng";
        if (p.cb_tram_tbon == "-1") return "Mã trạm không được bỏ trống";
        if ($.isNumeric(p.txt_thetich_tbon) == false) return "Thể tích phải là số";
        return "";
    } catch (e) {
        console.log();
    }
}
 function clear_null_bon() {
    try{
        setValToTxt("txt_tenbon_tbon", '');
        setValToTxt("cbloaixang_tbon", '-1');
        setValToTxt("cb_tram_tbon", '-1');
        setValToTxt("txt_thetich_tbon", '');
    } catch (e) {
        console.log();
    }
}


function load_lstxang() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_LSTCOMBOX.LSTXANG", callback: "f_result_lstxang", connstr: "ConnOracleXangDau" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_lstxang(config, para, lst) {
    try{
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cbloaixang_tbon", data, "id", "name", "-1", "Chọn loại xăng");
    }catch(e){
        console.log(e);
    }
}
function load_lsttram() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_LSTCOMBOX.LSTTRAM", callback: "f_result_load_lsttram", connstr: "ConnOracleXangDau" };
        var para = { v_Code :''};
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_load_lsttram(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_tram_tbon", data, "id", "name", "-1", "Chọn trạm");
    } catch (e) {
        console.log(e);
    }
}

function them_bon() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_CHOKHAIBAOBON.THEMBON", callback: "f_result_them_bon", connstr: "ConnOracleXangDau" };
        var para = {
            v_TENBON:p.txt_tenbon_tbon,
            v_LoaiXang:p.cbloaixang_tbon,
            v_TENTRAM:p.cb_tram_tbon,
            v_THETICH: p.txt_thetich_tbon,
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_them_bon(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_tbon", row, "ok");
            loaddanhsach_bon(1);
            clear_null_bon();
        } else {
            messInfo("messinfo_tbon", row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}