﻿var countpage = 10;
$(document).ready(function () {
    try {
        loadchecklog_master();

        loadConetent();
        loaddanhsachmodule(1);
    } catch (e) {
        console.log(e);
    }
});

function loaddanhsachmodule(page) {
    try{
        var config = { connstr: "Oracle_HDDT", namesql: "HD_PHANQUYEN.THONGDANHSACHQUYEN", callback: "resut_loaddanhsachmodule" };
        var para = {
            v_pagenum: page,
            v_numrecs:countpage
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function resut_loaddanhsachmodule(config, para, lst) {
    try{
        var data = lst.data;
        if (data == "[]" || data == null || data.length == 0) {
            messInfo("messinfo_quyen", "Không có dữ liệu hiển thị từ", "error");
            clera_quyen();
            return;
        }
     
        messInfo("messinfo_quyen", "", "error");
        $("#table_quyen").empty();
        $.each(data, function (key, val) {
            row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.ten_md + "</td><td>"
                + val.class_md + "</td><td>"
                + val.thoidiem + "</td><td class='c'>"
                + "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' alt='Chỉnh sửa' href='#sua_quyen' value='" + val.id_md + "' id='btn_sua" + val.id_md + "'><i class='fa fa-edit'></i> Sửa</a></div>  &nbsp;&nbsp;<div class='form-group'><a class='btn btn-danger btn-action' data-toggle='modal' href='#confirm-yn' value='" + val.id_md + "' id='btn_xoa" + val.id_md + "'><i class='fa fa-trash-o'></i> Xóa</a></div></form></td> </tr>";
            $("#table_quyen").append(row);
            $("#btn_sua" + val.id_md).click(function () {
                loadmodulesid(val.id_md);
                messInfo("messinfo_tquyen", '', 'error');
            });
            $("#btn_xoa" + val.id_md).click(function () {
                f_confimYesNo("Xóa thông tin chức năng", "Bỏ qua", "Xác nhận", function () {
                    Xoathongtin(val.id_md);
                    messInfo("messinfoxoa_quyen", '', 'error');
                });
            });
        });
        LoadPhanTrang("pageLst_dquyen", "pageCurent_dquyen", data, function () {
        
            loaddanhsachmodule($("#pagenumber").val());
        });

    } catch (e) {
        console.log(e);
    }
}
function clera_quyen() {
    try{
        $("#table_quyen").empty();
        $("#pageCurent_dquyen").empty();
        $("#pageLst_dquyen").empty();

    } catch (e) {
        console.log(e);
    }
}
function Xoathongtin(id) {
    try{
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "Oracle_HDDT", namesql: "HD_PHANQUYEN.XOACLASS", callback: "resut_Xoathongtin" };
        var para = {
            v_ID: id,
            v_USERID: userinfo.userid
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function resut_Xoathongtin(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfoxoa_quyen", row, 'ok');
            setTimeout(function () { loaddanhsachmodule(1); messInfo("messinfoxoa_quyen", '', 'ok'); }, 500);
        } else {
            messInfo("messinfoxoa_quyen", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}