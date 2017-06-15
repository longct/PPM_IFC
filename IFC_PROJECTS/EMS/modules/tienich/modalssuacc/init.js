var datasuacc = "";
$(document).ready(function () {
    try {
        loaddatabase_snhacc();
        $("#btn_checkluu_suacc").click(function () {
            var check = validate_suacc();
            if (check != "") {
                messInfo("messinfo_suacc", check, "error");
                return;
            }
            capnhatnhasancc();
           
        });
   
    } catch (e) {
        console.log(e);
    }

});
function validate_suacc() {
    try {
        var p = getAllIdMod();
        if (p.cb_nhasanxuat_suacc == "-1") return "Bạn chưa chọn nhà sản xuất";
        if (p.txt_manhacc_suacc == "") return "Không được để trống mã nhà cung cấp";
        if (p.txt_nhacungcap_suacc == "") return "Không được để trống  tên nhà cung cấp";
        return "";
    } catch (e) {
        console.log(e);
    }
}

function loaddatabase_snhacc() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_loaddatabase_snhacc", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddatabase_snhacc(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cb_nhasanxuat_suacc", data[3].kq3, "code", "name", "-1", "--Chọn nhà sản xuất-");
   
    } catch (e) {
        console.log(e);
    }
}

function loadmanhsuaacc(val) {
    try {
        datasuacc = val;
        var config = { namesql: "TB_IDTenNhaCungCap", callback: "f_result_loadmanhsuaacc", connstr: "ConnectEMS" };
        var para = {
            ID : val
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadmanhsuaacc(config, para, lst) {
    try {
        var data = lst.data;
        $("#cb_nhasanxuat_suacc").val(data[0].idnhasanxuat);
        $("#txt_manhacc_suacc").val(data[0].manhacungcap);
        $("#txt_nhacungcap_suacc").val(data[0].tennhacungcap);
    } catch (e) {
        console.log(e);
    }
}
function capnhatnhasancc() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_IDUPDATETenNhaCungCap", callback: "f_result_capnhatnhasancc", connstr: "ConnectEMS" };
        var para = {
            ID: datasuacc,
            IDNSX:p.cb_nhasanxuat_suacc,
            TENCC: p.txt_nhacungcap_suacc,
            ManCC: p.txt_manhacc_suacc
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_capnhatnhasancc(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_suacc", row, "ok");
            loaddatabase_nhacc();
        } else {
            messInfo("messinfo_suacc", row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}


