var countpage = 10;
$(document).ready(function () {
    try {
        loadchecklog_master();

        loadConetent();
        loadapgia_kh(1);
    } catch (e) {
        console.log(e);
    }

});
function loadapgia_kh(page) {
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_APGIAKH.LOADLISTAPGIA", callback: "result_loadapgia_kh" };
        var para = {
            v_pagenum: page,
            v_numrecs: countpage
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_loadapgia_kh(config, para, lst) {
    try{
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            messInfo("messinfo_ldapgia", "Không có dữ liệu hiển thị", 'error');
            clear_ldapgia();
            return;
        }
        messInfo("messinfo_ldapgia", "", 'error');
        $("#table_ldapgia").empty();
   
        $.each(data, function (key, val) {
            var row = "";
            var button_xem = "<div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#xem_apgia' value='" + val.id_chung + "' id='btn_xemapgia" + val.id_chung + "'><i class='glyphicon glyphicon-eye-open'></i> Xem</a> &nbsp</div>";
            var check_sudung = "<div ><input type='checkbox' class='chk_sudung' value='" + val.id_chung + "' id='chk_sudung" + val.id_chung + "' " + (val.sudung == 1 ? "checked" : "") + "></div>";
            row  += "<tr><td class='c'>"
                 + setnull(val.stt) + "</td><td>"
                 + setnull(val.tenapgia) + "</td><td class='c'>"
                 + setnull(val.ngaytao) + "</td><td class='c'>"
                 + check_sudung + "</td><td class='c'>"
                 + "<form class='form-inline' role=''form'>" + button_xem +  "</form></td> </tr>";
           //+ "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_apgia' value='" + val.id_chung + "' id='btn_suaapgia" + val.id_chung + "'>Sửa</a> &nbsp</div></form></td> </tr>";
            $("#table_ldapgia").append(row);

            $("#btn_xemapgia" + val.id_chung).click(function () {
                loadthongtin_chungxem(val.id_chung);
            });

            

        });
        LoadPhanTrang("pageLst_ldapgia", "pageCurent_ldapgia", data, function () {
            loadapgia_kh($("#pagenumber").val());
        });

        $(".chk_sudung").change(function () {
            var id = $(this).val();
            var sudung = ($(this).is(':checked') ? 1 : 0);
            var config = {
                connstr: "Oracle_HDDT",
                namesql: "HD_APGIAKH.CAPNHATTINHTRANGSUDUNG", callback: "result_capnhattinhtrangapgia"
            };
            var para = {
                v_idapgia: id,
                v_sudung: sudung
            };
            ExecuteServiceSyns(config, para);
        });
    } catch (e) {
        console.log(e);
    }
}

function result_capnhattinhtrangapgia(config, para, lst) {
    var data = lst.data;
    if (data.length == 0 || data == '' || data == null || data == undefined) {
        showToast("Cập nhật không thành công", 'error');
        return;
    }
    showToast("Cập nhật thành công", 'success');
}

function clear_ldapgia() {
    try{
        $("#table_ldapgia").empty();
        $("#pageCurent_ldapgia").empty();
        $("#pageLst_ldapgia").empty();

    } catch (e) {
        console.log(e);
    }
}





