var dskh;
var okh;
$(document).ready(function () {
    $("#curentPage").html("Tạo hóa đơn");

    $('#txt_thang').datepicker({
        autoclose: true,
        format: 'mm/yyyy',
        todayHighlight: true,
        minViewMode: "months"
    }).on('changeDate', function (ev) {
        $('#txt_thang').datepicker('hide');
        f_lay_thoi_gian_ky_chot(ev.date);
    });

    $('#txt_thang').datepicker('setValue', new Date());

    f_lay_mau_hoa_don();
    f_lay_danh_sach_khach_hang();

    $("#btn_TinhHoaDon").click(function () {
        f_tinh_hoa_don($("#txt_makh").val());
    });

    $("#btn_GhiHoaDon").click(function () {
        f_ghi_hoa_don();
    });

});

function f_lay_mau_hoa_don() {
    try {
        var config = { namesql: "HD_MAUHOADON_PKG.DanhSachMauHoaDon", callback: "f_result_mau_hoa_don", connstr: "Oracle_HDDT" };
        var para = {
            v_Mamau: '',
            v_Trangthaisudung: null,
            v_Trangthaiphathanh: null,
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_mau_hoa_don(config, para, result) {
    try {
        var data = result.data;
        if (data == [] || data == null || data == undefined || data.length == 0) {
            $("#table_tmhd tbody").empty();
            return;
        }
        console.log(data);
        setValToTxt("txt_kyhieuhoadon_tmhd", data[0].mauso);
        dataToCob("cb_mausohoadon_tmhd", data, "kyhieu", "kyhieu");

    } catch (e) {
        console.log(e);
    }
}

function f_lay_thoi_gian_ky_chot(date) {
    var s_date = getFormattedDate(date);
    try {
        var config = { namesql: "HD_KHACHHANG_PKG.DanhSachKhachHang", callback: "f_result_chitietkhachhang", connstr: "Oracle_HDDT" };
        var para = { v_Makh: makh };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_lay_thong_tin_chi_tiet_kh(makh) {
    try {
        var config = { namesql: "HD_KHACHHANG_PKG.DanhSachKhachHang", callback: "f_result_chitietkhachhang", connstr: "Oracle_HDDT" };
        var para = { v_Makh: makh };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_chitietkhachhang(config, para, result) {
    try {
        var data = result.data;
        if (data == [] || data == null || data == undefined || data.length == 0) {
            $("#table_tmhd tbody").empty();
            return;
        }
        
        okh = data[0];
        $("#txt_tenkh").val(okh.tenkhachhang);
        $("#txt_dienthoaikh").val(okh.dienthoai);
        $("#txt_diachikh").val(okh.diachi);
        $("#txt_masothuekh").val(okh.masothue);
        $("#txt_socongto").val(okh.socongto);
        $("#txt_soho").val(okh.soho);
        $("#txt_capdienap").val(okh.capdienap);
        $("#txt_matt").val(okh.mathanhtoan);
        $("#txt_mann").val(okh.mann);
        $("#txt_magia").val(okh.magia);
        $("#txt_matram").val(okh.matram);
        $("#txt_soghi").val(okh.maso);
        $("#txt_p_gcs").val(okh.p_gcs);
    } catch (e) {
        console.log(e);
    }
}

function f_lay_danh_sach_khach_hang() {
    try {
        var config = { namesql: "HD_KHACHHANG_PKG.DanhSachKhachHang", callback: "f_result_danhsachkhachhang", connstr: "Oracle_HDDT" };
        var para = {v_Makh:''};
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_danhsachkhachhang(config, para, data) {
    dskh = data.data;

    var nameArr = [];
    nameArr.length = 0;
    $.each(dskh, function (key, val) {
        nameArr.push({
            label: val.tenkhachhang + ' - ' + val.makhachhang + ' - ' + val.socongto,
            value: val.makhachhang
        });
    });
    $("#txt_makh").autocomplete({
        minLength: 1,
        delay: 200,
        source: nameArr,
        select: function (event, ui) {
            f_lay_thong_tin_chi_tiet_kh(ui.item.value);
            f_tinh_hoa_don(ui.item.value);
        }
    });
    
}

function f_tinh_hoa_don(makh) {
    var p = getAllIdMod();
    try {
        var user = JSON.parse(localStorage["userinfo"]);
        var config = { namesql: "HD_HOADON.TinhHoaDonMotKhachHang", callback: "f_result_tinhoadon", connstr: "Oracle_HDDT" };
        var para = {
            v_Madiemdo : makh,
            v_KyChot: $("#cbb_kychot").val(),
            v_Date: '01/' + $('#txt_thang').val(),
            v_UserId: user.userid
        };
        console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_tinhoadon(config, para, result) {
    var data = result.data;
    console.log(data);
    if (data == [] || data == null || data == undefined || data.length == 0) {
        messInfo("messinfo_ttddxl", "Không có dữ liệu hiển thị", "error");
        $("#table_tmhd tbody").empty();
        return;
    }
    $("#table_tmhd tbody").empty();
    if (data[0].loaibacgia === '3BIEU' && data.length > 3) {
        f_ve_bang_nhieu_don_gia(data);
    } else {
        f_ve_bang_mot_don_gia(data);
    }
}

function f_ve_bang_mot_don_gia(data) {
    var val = data[0];
    var rowTong = "<tr><td>"
            + val.mabcs + "</td><td>"
            + (val.chisomoi === null ? "" : val.chisomoi) + "</td><td>"
            + (val.chisocu === null ? "" : val.chisocu) + "</td><td>"
            + val.hsn + "</td><td>"
            + val.sl_tong + "</td><td>" + "</td><td>"+ "</td></tr>";
    $("#table_tmhd tbody").append(rowTong);
    console.log(rowTong);
    $.each(data, function (key, val) {
        var row = "<tr><td>"+ "</td><td>" + "</td><td>"+ "</td><td>"+ "</td><td>"
            + val.sanluong + "</td><td>"
            + val.dongia + "</td><td>"
            + val.thanhtien + "</td></tr>";
        $("#table_tmhd tbody").append(row);
    });
    var sum0 = '<tr><td rowspan="4" colspan="3"></td></tr>';
    var sum1 = "<tr><td>Cộng: </td>"
            + "<td>" + data[0].sl_tong + "</td><td></td><td>" + data[0].tongtien + "</td></tr>";
    var sum2 = "<tr><td colspan=3>Thuế suất GTGT 10%   Thuế GTGT</td><td>" + data[0].vat + "</td></tr>";
    var sum3 = "<tr><td colspan=3>Tổng cộng tiền thanh toán</td><td>" + data[0].tongtienvat + "</td></tr>";

    $("#table_tmhd tbody").append(sum0 + sum1 + sum2 + sum3);
}

function f_ve_bang_nhieu_don_gia(data) {
    // Cao điểm
    var dataCD = $.grep(data, function (item, i) {
        return item.mabcs === 'CD';
    })
    $.each(dataCD, function (key, val) {
        if (key == 0) {
            var rowTong = "<tr><td>"
            + val.mabcs + "</td><td>"
            + (val.chisomoi === null ? "" : val.chisomoi) + "</td><td>"
            + (val.chisocu === null ? "" : val.chisocu) + "</td><td>"
            + val.hsn + "</td><td>"
            + val.sl_tong_mabcs + "</td><td>" + "</td><td>" + "</td></tr>";
            $("#table_tmhd tbody").append(rowTong);
        }

        var row = "<tr><td>" + "</td><td>" + "</td><td>" + "</td><td>" + "</td><td>"
        + val.sanluong + "</td><td>"
        + val.dongia + "</td><td>"
        + val.thanhtien + "</td></tr>";
        $("#table_tmhd tbody").append(row);
    });


    //////////////////////////////
    // Thấp điểm
    var dataTD = $.grep(data, function (item, i) {
        return item.mabcs === 'TD';
    })
    $.each(dataTD, function (key, val) {
        if (key == 0) {
            var rowTong = "<tr><td>"
            + val.mabcs + "</td><td>"
            + (val.chisomoi === null ? "" : val.chisomoi) + "</td><td>"
            + (val.chisocu === null ? "" : val.chisocu) + "</td><td>"
            + val.hsn + "</td><td>"
            + val.sl_tong_mabcs + "</td><td>" + "</td><td>" + "</td></tr>";
            $("#table_tmhd tbody").append(rowTong);
        } 
        var row = "<tr><td>" + "</td><td>" + "</td><td>" + "</td><td>" + "</td><td>"
        + val.sanluong + "</td><td>"
        + val.dongia + "</td><td>"
        + val.thanhtien + "</td></tr>";
        $("#table_tmhd tbody").append(row);
    });



    //////////////////////////
    // Bình thường
    var dataBT = $.grep(data, function (item, i) {
        return item.mabcs === 'BT';
    })
    $.each(dataBT, function (key, val) {
        if (key == 0) {
            var rowTong = "<tr><td>"
            + val.mabcs + "</td><td>"
            + (val.chisomoi === null ? "" : val.chisomoi) + "</td><td>"
            + (val.chisocu === null ? "" : val.chisocu) + "</td><td>"
            + val.hsn + "</td><td>"
            + val.sl_tong_mabcs + "</td><td>" + "</td><td>" + "</td></tr>";
            $("#table_tmhd tbody").append(rowTong);
        }

        var row = "<tr><td>" + "</td><td>" + "</td><td>" + "</td><td>" + "</td><td>"
        + val.sanluong + "</td><td>"
        + val.dongia + "</td><td>"
        + val.thanhtien + "</td></tr>";
        $("#table_tmhd tbody").append(row);
    });


    var sum0 = '<tr><td rowspan="4" colspan="3"></td></tr>';
    var sum1 = "<tr><td>Cộng: </td>"
            + "<td>" + data[0].sl_tong + "</td><td></td><td>" + data[0].tongtien + "</td></tr>";
    var sum2 = "<tr><td colspan=3>Thuế suất GTGT 10%   Thuế GTGT</td><td>" + data[0].vat + "</td></tr>";
    var sum3 = "<tr><td colspan=3>Tổng cộng tiền thanh toán</td><td>" + data[0].tongtienvat + "</td></tr>";

    $("#table_tmhd tbody").append(sum0 + sum1 + sum2 + sum3);
}

function f_ghi_hoa_don() {
    var user = JSON.parse(localStorage["userinfo"]);
    var config = { namesql: "HD_HOADON.TaoHoaDonMotKhachHang", callback: "f_result_ghihoadon", connstr: "Oracle_HDDT" };
    var para = {
        v_MeterId : okh.id,
        v_KyChot : $("#cbb_kychot").val(),
        v_Date :'01/' + $('#txt_thang').val(),
        v_Mahoadon: $("#txt_mahoadon_tmhd").val(),
        v_Socongto : okh.socongto,
        v_Cohieuluc : '1',
        v_TuNgay : $("#txt_tungay").val(),
        v_DenNgay : $("#txt_denngay").val(),
        v_Loaihoadon : 'GTGT',
        v_Ghichu : '',
        v_UserId: user.userid
    }
    console.log(para);
    ExecuteServiceSyns(config, para);
}

function f_result_ghihoadon(config, para, result) {
    var data = result.data;
    console.log(data);
    if (data == [] || data == null || data == undefined || data.length == 0 || data[0].kq == 0) {
        messInfo("messinfo_tmhd", "Tạo hóa đơn không thành công", "error");
        return;
    } else {
        messInfo("messinfo_tmhd", "Tạo hóa đơn thành công", "success");
    }   
}