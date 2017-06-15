var countpage = 10;
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        loadcatruc();
        loadnhanvien();
        danhsachnhanvien_ca(1);
        $("#btn_ct").click(function () {
            var check = check_ca();
            if (check != "") {
                messInfo("messinfo_taoca", check, 'error');
                return;
            }

            f_confimYesNo("Thêm thông tin ca trực", "Bỏ qua", "Xác nhận", function () {
                capnhatcatruc();
            });
        });


    } catch (e) {
        console.log(e);
    }

});
function f_loadChangeTree() {
    try {
        loadnhanvien();
    } catch (e) {
        console.log(e);
    }
}
function loadcatruc() {
    try {
        var config = { namesql: "CAR_PHANCA.LSTCA", callback: "f_result_loadcatruc", connstr: "Oracle_HDDT" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadcatruc(config, para, lst) {
    try {
        var data = lst.data
        if (data == null || data == '[]' || data == undefined || data.length == 0) { return; }
        dataToCob("cb_catruc_ct", data, "id", "ten");
    } catch (e) {
        console.log(e);
    }
}
function loadnhanvien() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "CAR_PHANCA.LSTNHANVIEN", callback: "f_result_loadnhanvien", connstr: "Oracle_HDDT" };
        var para = {
            v_CODE: p.cbDonVi_master
        };
        console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadnhanvien(config, para, lst) {
    try {
        var data = lst.data
        //  if (data == null || data == '[]' || data == undefined || data.length == 0) { return; }
        dataToCob("cb_nhanvien_ct", data, "id", "ten");
    } catch (e) {
        console.log(e);
    }
}
function capnhatcatruc() {
    try {
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "CAR_PHANCA.CHIACATRUC", callback: "f_result_capnhatcatruc", connstr: "Oracle_HDDT" };
        var para = {
            v_USERID: userinfo.userid,
            v_IDCA: p.cb_catruc_ct,
            v_IDNV: p.cb_nhanvien_ct,
            v_DIACHI: '',
            v_NGAY: '',
        }
        console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_capnhatcatruc(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        console.log(row);
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_taoca", row, 'ok');
            setTimeout(function () {
                danhsachnhanvien_ca(1);
            }, 500);
        } else {
            console.log('12312');
            messInfo("messinfo_taoca", row, 'error');
        }

    } catch (e) {
        console.log(e);
    }
}
function check_ca() {
    try {
        var p = getAllIdMod();
        if (p.cb_nhanvien_ct == "" || p.cb_nhanvien_ct == undefined) return "Vui lòng chọn nhân viên";

        return "";
    } catch (e) {
        console.log(e);
    }
}
function danhsachnhanvien_ca(page) {
    try {
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "CAR_PHANCA.DANHSACHCATRUC", callback: "f_result_danhsachnhanvien_ca", connstr: "Oracle_HDDT" };
        var para = {
            v_CODE: p.cbDonVi_master,
            v_pagenum: page,
            v_numrecs: countpage,
        }
     
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_danhsachnhanvien_ca(config, para, lst) {
    try{
        var data = lst.data;
        console.log(data);
        $("#table_khaibao_taoca").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.hoten + "</td><td>"
                + val.ten_ddx + "</td><td>"
                + setnull(val.tenca) + "</td></tr>";
            $("#table_khaibao_taoca").append(row);
        });
        LoadPhanTrang("pageLst_ca", "pageCurent_ca", data, function () {
            danhsachnhanvien_ca($("#pagenumber").val());
        });

    } catch (e) {
        console.log(e);
    }
}




