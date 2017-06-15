var countpage = 10;
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        load_all();
        load_table();

        $('#btn_save').click(function () {
            $('#messinfo').hide();
            var p = getAllIdMod();
            if (p.txt_sohopdong == "" || p.txt_sohopdong == null) {
                messInfo("messinfo", 'Không được bỏ trống Số hợp đồng', "error");
                return;
            }
            if (p.cbo_donvi == "" || p.cbo_donvi == null) {
                messInfo("messinfo_detail", 'Vui lòng chọn đơn vị', "error");
                return;
            }
            f_confimYesNo(
                "Thêm mới hợp đồng này?",
                "Bỏ qua",
                "Đồng ý",
                function () { f_add_new() }
                );
        });
    } catch (e) {
        console.log(e);
    }
});

//============================================================ XY LY CAC CHUC NANG==========================================================
function load_all() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_load_all", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_load_all(config, para, lst) {
    try {
        var data = lst.data;
        console.log(data);
        f_load_cbo_donvi(data[6].kq6);
    } catch (e) {
        console.log(e);
    }
}

function f_load_cbo_donvi(data) {
    $('#cbo_donvi').html('');
    $('#cbo_donvi_detail').html('');
    $(data).each(function () {
        var option = '<option value="' + this.code + '">' + this.code + '</option>';
        $('#cbo_donvi_detail').append(option);
        $('#cbo_donvi').append(option);
    });
}

function load_table() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_BCLD_Hopdong", callback: "f_result_load_table", connstr: "ConnectEMS" };
        var para = {

        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}

function f_result_load_table(config, para, lst) {
    try {
        var data = lst.data;
        $('#tbl_bcld_hopdong tbody').empty();
        console.log(data);
        $(data).each(function (index, item) {
            var tr = "";
            tr = "<tr><td>" + (index + 1) + "</td>"
            + "<td>" + item.donvi + "</td>"
            + "<td>" + item.sohopdong + "</td>"
            + "<td>" + item.ngayky + "</td>"
            + "<td>" + item.soluongdiemdo + "</td>"
            + "<td>" + item.ghichu + "</td>"
            //+ "<td class='a_c' ><a class='viewdetail' style='color:#dd4b39' data-toggle='modal' href='#modal_suahopdong' id='viewdetail_" + item.id + "'>Sửa</a></td></tr>"

            $('#tbl_bcld_hopdong tbody').append(tr);
        });

        //$('.viewdetail').click(function () {
        //    f_load_detail(this.id.split('_')[1])
        //})

    } catch (e) {
        console.log(e);
    }
}

function f_add_new() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_BCLD_Hopdong_add", callback: "f_result_add_new", connstr: "ConnectEMS" };
        var para = {
            v_DonVi: p.cbo_donvi,
            v_SoHopDong: p.txt_sohopdong,
            v_GhiChu: p.txt_ghichu,
            v_NgayKy: p.date_ngayky,
            v_SoLuongDiemDo: p.txt_sodiemdo
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}

function f_result_add_new(config, para, lst) {
    var data = lst.data;
    if (data.length > 0 && data[0].result == "OK") {
        messInfo("messinfo", 'Thêm mới hợp đồng thành công', "success");
        load_table();
    } else {
        messInfo("messinfo", 'Thêm mới không thành công', "error");
    }
}