var countpage = 10;
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        load_all_vttb();
        load_table_vttb();
        setValToTxt("date_ngayky_vttb", gettimenow());
        $('#btn_add_vttb').click(function () {
            $('#messinfo').hide();
            var p = getAllIdMod();
            if (p.txt_sohopdong_vttb == "" || p.txt_sohopdong_vttb == null) {
                messInfo("messinfo", 'Không được bỏ trống Số hợp đồng', "error");
                return;
            }
            f_confimYesNo(
                "Thêm mới vật tư thiết bị ?",
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
function load_all_vttb() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_LstLoadBanDau", callback: "f_result_load_all_vttb", connstr: "ConnectEMS" };
        var para = {
            Type: 'Basic',
            UserId: userInfo.userid
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_load_all_vttb(config, para, lst) {
    try {
        var data = lst.data;
        f_load_cbo_vattuthietbi_vttb(data[0].kq0);
        f_load_cbo_donvidathang_vttb(data[2].kq2);
        f_load_cbo_nhacungcap_vttb(data[4].kq4)
      
    } catch (e) {
        console.log(e);
    }
}

function f_load_cbo_vattuthietbi_vttb(data) {
    $('#cbo_vattuthietbi_vttb').html('');
    $.each(data, function (key, val) {
        console.log("key", val);
        var option = '<option value="' + val.code + '">' + val.name + '</option>';
        $('#cbo_vattuthietbi_vttb').append(option);
    });
}

function f_load_cbo_nhacungcap_vttb(data) {
    $('#cbo_nhacungcap_vttb').html('');
    if (data.length != 0)
        $.each(data,function (key,val) {
            var option = '<option value="' + val.name + '">' + val.name + '</option>';
            $('#cbo_nhacungcap_vttb').append(option);
        });
    else
        $('#cbo_nhacungcap_vttb').append('<option value="">[Chọn vật tư thiết bị]</option>');
}

function f_load_cbo_donvidathang_vttb(data) {
    $('#cbo_donvidathang_vttb').html('');
    $.each(data,function (key,val) {
        var option = '<option value="' + val.name + '">' + val.name + '</option>';
        $('#cbo_donvidathang_vttb').append(option);
    });
}

function load_table_vttb() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_BCLD_vattuthietbi", callback: "f_result_load_table_vttb", connstr: "ConnectEMS" };
        var para = {
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}

function f_result_load_table_vttb(config, para, lst) {
    try {
        var data = lst.data;
        $('#tbl_bcld_hopdong_vttb tbody').empty();
        $(data).each(function (index, item) {
            var tr = "";
            tr = "<tr class='" + (item.idx != 0 ? '' : 'bg-info text-uppercase') + "'><td>" + (item.idx != 0 ? item.idx : '') + "</td>"
            + "<td>" + item.vend_name + "</td>"
            + "<td>" + item.sohopdong + "</td>"
            + "<td>" + item.ngayky + "</td>"
            + "<td>" + item.slchinhthuc + "</td>"
            + "<td>" + item.slduphong + "</td>"
            + "<td>" + item.tongtb + "</td>"
            + "<td>" + item.danhanhang + "</td>"
            + "<td>" + item.dvdathang + "</td>"
            //+ "<td class='a_c' ><a class='viewdetail' style='color:#dd4b39' data-toggle='modal' href='#modal_suahopdong_vttb' id='viewdetail_" + item.id + "'>" + (item.idx != 0 ? 'Sửa' : '') + "</a></td></tr>"

            $('#tbl_bcld_hopdong_vttb tbody').append(tr);
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
        var config = { namesql: "TB_BCLD_Vattuthietbi_add", callback: "f_result_add_new", connstr: "ConnectEMS" };
        var para = {
            v_ClassificationId: p.cbo_vattuthietbi_vttb,
            v_DaNhanHang:parseInt(p.txt_soluongdanhan_vttb),
            v_DVDatHang: p.cbo_donvidathang_vttb,
            v_NgayKy: p.date_ngayky_vttb,
            v_SLChinhThuc:parseInt(p.txt_soluongchinhthuc_vttb),
            v_SLDuPhong: parseInt(p.txt_soluongduphong_vttb),
            v_SoHopDong: p.txt_sohopdong_vttb,
            v_Vend_Name: p.cbo_nhacungcap_vttb
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}

function f_result_add_new(config, para, lst) {
    var data = lst.data;
    if (data.length > 0 && data[0].result == "OK") {
        messInfo("messinfo", 'Thêm mới thành công', "success");
        load_table_vttb();
    } else {
        messInfo("messinfo", 'Thêm mới không thành công', "error");
    }
}
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
}
