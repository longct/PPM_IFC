var countpage = 10;
$(document).ready(function () {
    try {
        loadConetent();
        loadInitDate();
        load_all_tdld();
        load_table_tdld();
        setValToTxt("date_ngaythang_tdld", gettimenow());
        $('#btn_add_tdld').click(function () {
            $('#messinfo').hide();
            var p = getAllIdMod();
            f_confimYesNo(
                "Thêm mới tiến độ lắp đặt nghiệm thu ?",
                "Bỏ qua",
                "Đồng ý",
                function () { f_add_new_tdld() }
                );
        });

    } catch (e) {
        console.log(e);
    }
});

//============================================================ XY LY CAC CHUC NANG==========================================================
function load_all_tdld() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_BCLD_LOADBANDAU", callback: "f_result_load_all_vttb", connstr: "ConnectEMS" };
        var para = {
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_load_all_vttb(config, para, lst) {
    try {
        var data = lst.data;
        f_load_cbo_khachhang_tdld(data);
        f_load_cbo_nghiemthu_tdld();
      
    } catch (e) {
        console.log(e);
    }
}

function f_load_cbo_khachhang_tdld(data) {
    $('#cbo_khachhang_tdld').html('');
    if (data.length != 0) {
        $.each(data, function (key, val) {
            var option = '<option value="' + val.code + '">' + val.name + '</option>';
            $('#cbo_khachhang_tdld').append(option);
        });
    }
    else
        $('#cbo_khachhang_tdld').append('<option value="">[Chọn đơn vị]</option>');
}

function f_load_cbo_nghiemthu_tdld() {
    $('#cbo_nghiemthu_tdld').html('');
    var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        $.each(data,function (key,val) {
            var option = '<option value="' + val+ '">' +"Nghiệm thu lần " + val + '</option>';
            $('#cbo_nghiemthu_tdld').append(option);
        });

}



function load_table_tdld() {
    try {
        var config = { namesql: "TB_BCLD_TIENDOLAPDATNGHIEMTHU", callback: "f_result_load_table_tdld", connstr: "ConnectEMS" };
        var para = {
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}

function f_result_load_table_tdld(config, para, lst) {
    try {
        var data = lst.data;
        $('#tbl_bcld_hopdong_tdldnt tbody').empty();
       
        $.each(data,function (index, item) {
            var tr = "";
            tr += "<tr><td class='c'>" + item.idx + "</td>"
            + "<td  class='c'>" + item.codedonvi + "</td>"
            + "<td  class='c'>" + item.tennghiemthu + "</td>"
            + "<td  class='c'>" + item.slnghiemthu + "</td>"
            + "<td  class='c'>" + item.ngaythang + "</td>"
            + "<td  class='c'>" + item.nghichu + "</td>"
            + "</tr>";
            $('#tbl_bcld_hopdong_tdldnt tbody').append(tr);
        });


    } catch (e) {
        console.log(e);
    }
}

function f_add_new_tdld() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_BCLD_TIENDOLAPDATNGHIEMTHU_ADD", callback: "f_result_add_new_tdld", connstr: "ConnectEMS" };
        var para = {
            CodeDonVi: p.cbo_khachhang_tdld,
            TenNghiemThu:parseInt(p.cbo_nghiemthu_tdld),
            NgayThangNgiemThu: p.date_ngaythang_tdld,
            SLNghiemThu: parseInt(p.txt_soluongnghiemthu_tdld),
            NghiChu: p.txt_ghichu_tdld,
          
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}

function f_result_add_new_tdld(config, para, lst) {
  
    var data = lst.data;
    if (data.length > 0 && data[0].count ==1) {
        messInfo("messinfo", 'Thêm mới thành công', "success");
        load_table_tdld();
    } else {
        messInfo("messinfo", 'Thêm mới không thành công', "error");
    }
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
}
