
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        lstbonxang_khaibao();
        lstcot_khaibao();

        $("#btn_checkluu_suakhaibao").click(function () {
            var check = checknull_suakhaibao();
            if (check != "") {
                messInfo("messinfo_suakhaibao", check, "error");
                return;
            }
          //  loadsuakhachhang_khaibao();
            f_confimYesNo("Bạn chắc chắn muốn sửa điểm đo", "Bỏ qua", "Xác nhận", function () {
                capnhatkhaibao();
            });
           
        });
    } catch (e) {
        console.log(e);
    }

});
function checknull_suakhaibao() {
    try{
        var p = getAllIdMod();
        if (p.txt_tenvoibom == "") { return "Tên vòi bơm không được bỏ trống "; }
        if (p.txt_tenvoibom.length>250) { return "Tên vòi bơm không được quá 250 ký tự"; }
        if (p.txtimei_khaibao == "") { return "Không được để imei để trống";}
        if (p.cbmacot_khaibao == "-1") {return "Bạn chưa chọn cột";}
        if (p.datecot_khaibao == "") { return "Bạn chưa chọn ngày"; }
        var ovderday = compareDates(new Date(), timeyyyymmdd(p.datecot_khaibao));
        if (ovderday.days > 0) { return "Ngày không được chọn quá ngày hiện tại"; }
        if (p.txt_sothutu == "") return "Số thứ tự phải không được bỏ trống"
        if ($.isNumeric(p.txt_sothutu) == false) return "Số thứ tự phải là số";
        if (p.cbtenbonxang_khaibao == '-1') return 'Vui lòng chọn Bồn xăng';
        return "";   
    } catch (e) {
        console.log(e);
    }
}
function loadkhachhang_khaibaoid(val) {
    try {
        var p = getAllIdMod();
        localStorage.setItem('khaibaott', val);
        var config = { namesql: "PKG_KHAIBAOVOI.IDVOI", callback: "resut_loadkhachhang_idkhaibao", connstr: "ConnOracleXangDau" };
        var para = {
            v_ID: val
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function resut_loadkhachhang_idkhaibao(config, para, lst) {
    try {
        var data = lst.data;
        console.log(data);
        setValToTxt("txt_tenvoibom", data[0].tenvoibom);
        setValToTxt("txtimei_khaibao", data[0].imei);
        setValToTxt("datecot_khaibao", data[0].thoidiemkhaibao);
        setValToTxt("cbmacot_khaibao", data[0].macot);
        setValToTxt("cbtram_khaibao", data[0].matram);
        setValToTxt("txt_sothutu", data[0].sothutu);
        setValToTxt("cbtenbonxang_khaibao", data[0].mabon);
  
    } catch (e) {
        console.log(e);
    }
}

function lstbonxang_khaibao() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_LSTCOMBOX.LST_BONXANG", callback: "f_result_lstbonxang_khaibao", connstr: "ConnOracleXangDau" };
        var para = { v_Code: '' };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_lstbonxang_khaibao(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cbtenbonxang_khaibao", data, "id", "name", "-1", "Chọn bồn xăng");
    } catch (e) {
        console.log(e);
    }
}

function lstcot_khaibao() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_LSTCOMBOX.LSTCOT", callback: "f_result_lstcot_khaibao", connstr: "ConnOracleXangDau" };
        var para = { v_Code: '' };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_lstcot_khaibao(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cbmacot_khaibao", data, "id", "name", "-1", "Vui lòng chọn cột");
    } catch (e) {
        console.log(e);
    }
}

// cập nhật dữ liệu.
function capnhatkhaibao() {
    try{
        var id=  localStorage.getItem('khaibaott');
        var p = getAllIdMod();
        var config = { namesql: "PKG_KHAIBAOVOI.CAPNHATVOI", callback: "resut_capnhatkhaibao", connstr: "ConnOracleXangDau" };
        var para = {
          v_ID: id,
          v_IMEI: p.txtimei_khaibao,
          v_MACOT: p.cbmacot_khaibao,
          v_NGAY: p.datecot_khaibao,
          v_SOTHUTU: p.txt_sothutu,
          v_TENVOI: p.txt_tenvoibom,
          v_MABON: p.cbtenbonxang_khaibao
        };     
      ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function resut_capnhatkhaibao(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_suakhaibao", row, "ok");
            loaddanhsachtram_khaibao(1);
        } else {
            messInfo("messinfo_suakhaibao", row, "error");
        }


    } catch (e) {
        console.log(e);
    }
}
