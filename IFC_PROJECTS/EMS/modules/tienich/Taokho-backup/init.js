$(document).ready(function () {
    try {
        loadConetent();
        lst_kho();
        $("#btn_taikhoan_tkho").on("click", function () {
            var check = check_validate_tkho();
            if (check != "") {
                messInfo("messinfo_tkho", check, "error");
                return;
            }
            messInfo("messinfo_tkho", '', "error");
           // f_confimYesNo("Bạn chắc chắn muốn thêm kho mới", "Bỏ qua", "Xác nhận", function () {
                them_taomoi();
           // });
        });
    } catch (e) {
        console.log(e);
    }
});
//load kho
function lst_kho() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TR_LSTKHO", callback: "f_result_lst_kho", connstr: "ConnectEMS" };
        var para = { 
            code: userInfo.code
        };
      
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_lst_kho(config, para, lst) {
    try {
        var data = lst.data;

        dataToCob("cbkho_taokho", data, "code", "name", "", "--Chọn ban miền--");



        $('select#cbkho_taokho').find('option').each(function () {
            if ($(this).val().length == 4) {
                text = $(this).text();
                $(this).text("-- " + text);
            }
            if ($(this).val().length == 6) {
                text = $(this).text();
                $(this).text("----- " + text);
            }
            if ($(this).val().length == 8) {
                text = $(this).text();
                $(this).text("-------- " + text);
            }
        });

    } catch (e) {
        console.log(e);
    }
}
function check_validate_tkho() {
    try{
        var p = getAllIdMod();
        if (p.txt_name_taokho == "") return "Tên kho không được bỏ trống";
      
        return "";
    } catch (e) {
        console.log(e);
    }
}

function them_taomoi() {
    try {
        var p = getAllIdMod();
        var userid = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TR_TAOKHO", callback: "f_result_them_taomoi", connstr: "ConnectEMS" };
        var para = {
            code: p.cbkho_taokho,
            name: p.txt_name_taokho,
            userid: userid.userid,
            IsKhoTong: $("#txt_khomacdinh_taokho").prop("checked")
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_them_taomoi(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_tkho", row, 'ok');
            setTimeout(function () {
                clear_taikho();
                messInfo("messinfo_tkho", '', 'ok');
            }, 2000);
        } else {
            messInfo("messinfo_tkho", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}
function clear_taikho() {
    try {
      
        $("#txt_name_taokho").val('');
        $("#txt_khomacdinh_taokho").prop("checked", false);
    } catch (e) {
        console.log(e);
    }
}


