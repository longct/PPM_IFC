$(document).ready(function () {
    try {
        loadConetent();
        $("#btn_them_pquyen").click(function () {
            var check = validate();
            if (check != "") {
                messInfo("messinfo_tquyen",check, "error");
                return;
            }
            messInfo("messinfo_tquyen", '', "error");
            themmoi();
           
        });

    } catch (e) {
        console.log(e);
    }
});
function validate() {
    try{
        var p = getAllIdMod();
        if (p.txt_chungnang_pquyen == "") return "Tên chức năng không được bỏ trống";
        if (p.txt_class_pquyen == "") return "Tên chức năng không được bỏ trống";

        return "";
    } catch (e) {
        console.log(e);
    }
}
function themmoi() {
    try {

        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();
        var config = { connstr: "ConnectEMS", namesql: "THEMCLASS", callback: "result_themmoi" };
        var para = {
            v_TEN: p.txt_chungnang_pquyen,
            v_CLASS: p.txt_class_pquyen,
            v_USERID: userinfo.id
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_themmoi(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_tquyen", row, 'ok');
            setTimeout(function () { loaddanhsachmodule(1); clear_quyn(); }, 500);
        } else {
            messInfo("messinfo_tquyen", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}
function clear_quyn() {
    try{
        $("#txt_chungnang_pquyen").val('');
        $("#txt_class_pquyen").val('');
    } catch (e) {
        console.log(e);
    }
}