
$(document).ready(function () {
    try {
        loaddonvi_suacatruc();
        loadthoi_suatruc();
        $("#btn_checkluu_suacatruc").click(function () {
            f_confimYesNo("Bạn chắc chắn muốn sửa khách hàng ", "Bỏ qua", "Xác nhận", function () {
                load_capnhapthongtinsuacatruc();
            });

        });
      
    } catch (e) {
        console.log(e);
    }
});
function loaddonvi_suacatruc() {
    try {
        var config = { namesql: "PKG_USER.LST_DONVI", callback: "f_result_loadlstdonvi_suacatruc", connstr: "ConnOracleXangDau" };
        var para = [''];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadlstdonvi_suacatruc(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbdonvi_suacatruc", data, "madonvi", "tendonvi", "-1", "Chọn đơn vị");
    } catch (e) {
        console.log(e);
    }
}
function loadthoi_suatruc() {
    try {
        var config = { namesql: "PKG_CAKIP.THOIGIANTRUC", callback: "f_result_loadthoi_suatruc", connstr: "ConnOracleXangDau" };
        var para = [''];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthoi_suatruc(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cbthoigiankt_suacatruc", data, "time", "time", "", "");
        dataToCob("cbthoigianbd_suacatruc", data, "time", "time", "", "");
    } catch (e) {
        console.log(e);
    }
}
function loadthongtin_suaca(val) {
    try {
        localStorage.setItem("txt_sua", val);
        var config = { namesql: "PKG_CAKIP.GETIDCATRUC", callback: "f_result_loadthongtin_suacatruc", connstr: "ConnOracleXangDau" };
        var para = {
            v_maid:val
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthongtin_suacatruc(config, para, lst) {
    try {
        var data = lst.data; 
        setValToTxt("cbthoigianbd_suacatruc", data[0].giobatdau);
        setValToTxt("cbthoigiankt_suacatruc", data[0].gioketthuc); 
    } catch (e) {
        console.log(e);
    }
}
function load_capnhapthongtinsuacatruc() {
    try {
        var p = getAllIdMod();
       var idma= localStorage.getItem("txt_sua");
       var config = { namesql: "PKG_CAKIP.CAPNHATCATRUC", callback: "f_result_capnhapthongtinsuacatruc", connstr: "ConnOracleXangDau" };
        var para = {
            v_maid: idma,
            v_matram: '',
            v_catruc: '',
            v_thoigianbd: p.cbthoigianbd_suacatruc,
            v_thoigiankt: p.cbthoigiankt_suacatruc,
            v_type: "UPDATE"
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_capnhapthongtinsuacatruc(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_suacatruc", row, "ok");
            loaddanhsachcatruc();
            setTimeout(function () {
                messInfo("messinfo_suacatruc", "", "ok");
            }, 4000);
        } else {
            messInfo("messinfo_suacatruc", row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}


