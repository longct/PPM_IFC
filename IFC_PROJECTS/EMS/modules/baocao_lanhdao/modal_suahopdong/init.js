var id_ = "";
$(document).ready(function () {
    var p = getAllIdMod();
    $('#btn_update').click(function () {
        f_confimYesNo(
                "Sửa thông tin hợp đồng này ?",
                "Bỏ qua",
                "Đồng ý",
                function () { f_update(); }
                );
    });
});

function f_load_detail(id) {
    try {
        id_ = id;
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_BCLD_Hopdong_by_id", callback: "f_result_load_detail", connstr: "ConnectEMS" };
        var para = {
            v_id: id,
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}

function f_result_load_detail(config, para, lst) {
    try {
        var data = lst.data;
        console.log(data);
        $(data).each(function (index, item) {
            $('#cbo_donvi_detail').val(item.donvi);
            $('#txt_sohopdong_detail').val(item.sohopdong);
            $('#date_ngayky_detail').val(item.ngayky);
            $('#txt_sodiemdo_detail').val(item.soluongdiemdo);
            $('#txt_ghichu_detail').val(item.ghichu);
        });
    } catch (e) {
        console.log(e);
    }
}

function f_update() {
    try {
        var p = getAllIdMod();
        if (p.txt_sohopdong_detail == "" || p.txt_sohopdong_detail == null) {
            messInfo("messinfo_detail", 'Không được bỏ trống Số hợp đồng', "error");
            return;
        }
        if (p.cbo_donvi_detail == "" || p.cbo_donvi_detail == null) {
            messInfo("messinfo_detail", 'Vui lòng chọn đơn vị', "error");
            return;
        }
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_BCLD_Hopdong_edit", callback: "f_result_update", connstr: "ConnectEMS" };
        var para = {
            v_id: id_,
            v_DonVi: p.cbo_donvi_detail,
            v_SoHopDong: p.txt_sohopdong_detail,
            v_GhiChu: p.txt_ghichu_detail,
            v_NgayKy: p.date_ngayky_detail,
            v_SoLuongDiemDo: p.txt_sodiemdo_detail
        };
        console.log(para);
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}

function f_result_update(config, para, lst) {
    var data = lst.data;
    console.log(data);
    if (data.length > 0 && data[0].result == "OK") {
        messInfo("messinfo_detail", 'Cập nhật hợp đồng thành công', "success");
        load_table();
        $('#modal_suahopdong').modal('toggle');
    } else {
        messInfo("messinfo_detail", 'Cập nhật không thành công', "error");
    }
}