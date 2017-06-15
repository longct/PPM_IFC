$(document).ready(function () {
    loadConetent();
    loadthongtin_modem();
    loadchecklog_master();
    $("#checkAllmdo").click(function () {
        $("input:checkbox").prop('checked', $(this).prop("checked"));
    });

    $("#btnThucHien_cbtu").click(function () {

        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "PKG_CHOIKHAIBAO.CAPNHATKHAIBAOTU", callback: "f_result_chuyentu", connstr: "ConnectOracleStreetLight" };
        var lstObj = [];
        $(".checkone_ckbmd").each(function () {
            var id = $(this).attr("value");
            if ($("#btn_click"+id).prop("checked") == true) {
                    var value = id;
                    lstObj.push(value);
                }
        });
        for (var i = 0; i < lstObj.length; i++) {
            var para = {
                v_userid: userinfo.idnhanvien,
                v_Id:lstObj[i],
                v_Code:'0119',
            };
            ExecuteServiceSyns(config, para, false);
        }

    });

    $("#btnThucHien_cbden").click(function () {


        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "PKG_CHOIKHAIBAO.CAPNHATKHAIBAODENTRANGTRI", callback: "f_result_chuyendentrangtri", connstr: "ConnectOracleStreetLight" };
        var lstObj = [];
        $(".checkone_ckbmd").each(function () {
            var id = $(this).attr("value");
            if ($("#btn_click" + id).prop("checked") == true) {
                var value = id;
                lstObj.push(value);
            }
        });
        for (var i = 0; i < lstObj.length; i++) {
            var para = {
                v_userid: userinfo.idnhanvien,
                v_Id: lstObj[i],
                v_Code: '0120',
            };
            ExecuteServiceSyns(config, para, false);
        }

    });
    $("#btn_timkiem_modem").click(function () {
        loadtimkiem();
    });
});
function f_result_chuyentu(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            loadthongtin_modem();
        } else {
            messInfo("messinfo_modem_chkb", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}
function f_result_chuyendentrangtri(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
           
            loadthongtin_modem();
        } else {
            messInfo("messinfo_modem_chkb", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}
function loadthongtin_modem() {
    try{
        var config = { namesql: "PKG_CHOIKHAIBAO.LOADCHOKHAIBAOTONG", callback: "f_result_loadthongtin_modem", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_Code: '0118'
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthongtin_modem(config, para,lst) {
    try{
        var data = lst.data;
        if (data == null || data.length == 0 || data == undefined || data == '[]') {
            messInfo("messinfo_modem_chkb", "Không có dữ liệu hiển thị", "error");
            $("#table_modem_chkb").empty();
            return;
        }
        messInfo("messinfo_modem_chkb", "", "ok");
        hienthi_modem(data);

    } catch (e) {
        console.log(e);
    }
}
function hienthi_modem(data) {
    try{
        $("#table_modem_chkb").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr class='checkone_ckbmd' value="+val.id+"><td><input type='checkbox' id='btn_click"+val.id+"'/></td><td>"
                + val.imei + "</td><td>"
                + setnull(val.tenkhachhang) + "</td><td>"
                + setnull(val.tenkhachhang) + "</td><td>"
                + setnull(val.ngaylapa) + "</td></tr>";
            $("#table_modem_chkb").append(row);
        });

    } catch (e) {
        console.log(e);
    }
}
function loadtimkiem() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_CHOIKHAIBAO.LOADCHOKHAIBAOTONGTKIEM", callback: "f_result_loadthongtintimkiem_modem", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_Code: '0118',
            v_Timkiem: p.txt_timkiemmodem
        };
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthongtintimkiem_modem(config,para,lst) {
    try{
       
        var data = lst.data;
        if (data == null || data.length == 0 || data == undefined || data == '[]') {
            messInfo("messinfo_modem_chkb", "Không có dữ liệu hiển thị", "error");
            $("#table_modem_chkb").empty();
            return;
        }
        messInfo("messinfo_modem_chkb", "", "ok");
        hienthitimkiem_modem(data);
    } catch (e) {
        console.log(e);
    }
}
function hienthitimkiem_modem(data) {
    try {
        $("#table_modem_chkb").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr class='checkone_ckbmd' value=" + val.id + "><td><input type='checkbox' id='btn_click" + val.id + "'/></td><td>"
                + val.imei + "</td><td>"
                + val.tenkhachhang + "</td><td>"
                + val.tenkhachhang + "</td><td>"
                + val.ngaylapa + "</td></tr>";
            $("#table_modem_chkb").append(row);
        });



    } catch (e) {
        console.log(e);
    }
}