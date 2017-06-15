
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        loadsua_lstxang();
        loadsua_lsttram();
        messInfo("messinfo_sbon", '', "error");
        $("#btn_sua_bon").click(function () {
            var check = checkvalidate_sua();    
            if (check != "") {
                messInfo("messinfo_sbon", check, "error");
                return;
            }
            f_confimYesNo("Bạn chắc chắn muốn cập nhật", "Bỏ qua", "Xác nhận", function () {
                capnhatsua_bon();
            });

        });

    } catch (e) {
        console.log(e);
    }
});

function checkvalidate_sua() {
    try {
        var p = getAllIdMod();
        if (p.txt_tenbons_tbon == "") return "Tên bồn không được trống";
        if (p.txt_tenbons_tbon.length > 200) return "Tên bồn không được quá 200 ký tự";
        if (p.cbloaixangs_tbon == "-1") return "Vui lòng chọn loại xăng";
        if (p.cb_trams_tbon == "-1") return "Mã trạm không được bỏ trống";
        if ($.isNumeric(p.txt_thetichs_tbon) == false) return "Thể tích phải là số";
        return "";
    } catch (e) {
        console.log();
    }
}

function loathongtinsuamabon(val) {
    try {
        localStorage.setItem('txtmabon', val);
        var config = { namesql: "PKG_CHOKHAIBAOBON.LOADIDBON", callback: "f_result_loathongtinsuamabon", connstr: "ConnOracleXangDau" };
        var para = { v_IDBON: val }
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loathongtinsuamabon(config, para, lst) {
    try {
        var data = lst.data;
        setValToTxt("txt_tenbons_tbon", data[0].tenbon);
        setValToTxt("cbloaixangs_tbon",data[0].maxang);
        setValToTxt("cb_trams_tbon",data[0].matram);
        setValToTxt("txt_thetichs_tbon",data[0].thetichchua);

    } catch (e) {
        console.log(e);
    }
}
function loadsua_lstxang() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_LSTCOMBOX.LSTXANG", callback: "f_result_sualstxang", connstr: "ConnOracleXangDau" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_sualstxang(config, para, lst) {
    try {
        var data = lst.data;
        if (data.lenght == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cbloaixangs_tbon", data, "id", "name", "-1", "Chọn loại xăng");
    } catch (e) {
        console.log(e);
    }
}
function loadsua_lsttram() {
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
        dataToCob("cb_trams_tbon", data, "id", "name", "-1", "Chọn trạm");
    } catch (e) {
        console.log(e);
    }
}

// cập nhật
function capnhatsua_bon() {
    try{
        var p = getAllIdMod();
        var mabon = localStorage.getItem('txtmabon');
        var config = { namesql: "PKG_CHOKHAIBAOBON.CAPNHATBON", callback: "f_result_capnhatsua", connstr: "ConnOracleXangDau" };
        var para = {
            v_IDBON: mabon,
            v_TENBON:p.txt_tenbons_tbon,
            v_LoaiXang:p.cbloaixangs_tbon,
            v_TENTRAM: p.cb_trams_tbon,
            v_THETICH:p.txt_thetichs_tbon,
        };
     
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_capnhatsua(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_sbon", row, "ok");
            loaddanhsach_bon(1);
            
        } else {
            messInfo("messinfo_sbon", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}