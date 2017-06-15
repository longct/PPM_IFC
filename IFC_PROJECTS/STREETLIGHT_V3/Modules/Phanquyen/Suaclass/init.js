var idmd = "";
$(document).ready(function () {
    try {
        loadchecklog_master();

        $("#btn_sua_pquyen").click(function () {
            f_confimYesNo("Cập nhật chức năng", "Bỏ qua", "Xác nhận", function () {
                capnhatfrom();
            });
        });

    } catch (e) {
        console.log(e);
    }
});
function loadmodulesid(id) {
    try {
        idmd = id;
      
        var config = { connstr: "ConnectOracleStreetLight", namesql: "HD_PHANQUYEN.IDCLASS", callback: "result_loadmodulesid" };
        var para = {v_ID: id};
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_loadmodulesid(config, para,lst){
    try {
   
        var data = lst.data;
        $("#txt_chungnang_Spquyen").val(data[0].ten_md);
        $("#txt_class_Spquyen").val(data[0].class_md);

    } catch (e) {
        console.log(e);
    }
}

function capnhatfrom() {
    try {
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();
        var config = { connstr: "ConnectOracleStreetLight", namesql: "HD_PHANQUYEN.CAPNHATCLASS", callback: "result_capnhatfrom" };
        var para = {
            v_ID: idmd,
            v_TEN: p.txt_chungnang_Spquyen,
            v_CLASS: p.txt_class_Spquyen,
            v_USERID: userinfo.idnhanvien

        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_capnhatfrom(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_squyen", row, 'ok');
            setTimeout(function () { loaddanhsachmodule(1); }, 500);
        } else {
            messInfo("messinfo_squyen", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}













