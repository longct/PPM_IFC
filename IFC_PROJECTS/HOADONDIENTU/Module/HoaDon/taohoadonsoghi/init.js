var coutpage = 10;
$(document).ready(function () {
    $("#curentPage").html("Tạo hóa đơn");
    loadConetent();
    $('#txt_thang_thdsg').datepicker({
        format: 'mm/yyyy',
        todayHighlight: true,
        minViewMode: "months",
        autoclose: true
    }).datepicker('setDate', new Date());
      
    $('#txt_ngayxuathd').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true
    }).datepicker('setDate', new Date());
    f_lay_danh_sach_dien_luc_thdsg();
    f_lay_danh_sach_mau_hoa_don_thdsg();
    $("#btn_locdulieu").click(function () {
        f_loc_du_lieu_thdsg(1);
    });

    $("#btn_taohoadon").click(function () {
        f_confimYesNo("Xác nhận muốn tạo hóa đơn cho sổ ghi này không?", "Hủy", "Đồng ý", f_tao_hoa_don_so_ghi_thdsg);
    });

    //$("#cb_ky").on('change', function () {
    //    f_lay_thong_tin_ky_chot_thdsg();
    //});

    $("#cb_loaimauhoadon_thdsg").on('change', function () {
        f_lay_danh_sach_mau_hoa_don_thdsg();
    });
});

//function f_lay_thong_tin_ky_chot_thdsg() {
//    try {
//        var config = { namesql: "HD_THIETLAPKYCHOT_PKG.LayThongTinKyChot_SoGhi", callback: "f_result_lay_thong_tin_ky_chot_thdsg", connstr: "Oracle_HDDT" };
//        var code = $("#cb_soghi").val();
//        if (code == "-1") code = $("#cb_tram").val();
//        if (code == "-1") code = $("#cb_dienluc").val();
//        var para = {
//            v_code: code,
//            v_Kychot: $("#cb_ky").val(),
//            v_Date: '01/' + $("#txt_thang_thdsg").val()
//        };
//        ExecuteServiceSyns(config, para);
//    } catch (e) {
//        console.log(e.message);
//    }
//}

//function f_result_lay_thong_tin_ky_chot_thdsg(config, para, result) {
//    try {
//        var data = result.data;
//        if (data == [] || data == null || data == undefined || data.length == 0 || data[0].kq == '0') {
//            return;
//        }
//        $("#txt_dauky").val(data[0].tungay);
//        $("#txt_cuoiky").val(data[0].denngay);
//    } catch (e) {
//        console.log(e);
//    }
//}

function f_tao_hoa_don_so_ghi_thdsg() {
    try {
        var user = JSON.parse(localStorage["userinfo"]);
        var p = getAllIdMod();

        var config = {
            namesql: $("#cb_loaimauhoadon_thdsg").val() === '0' ? "HD_HOADON_TAOHOADON.TaoHoaDonSoGhi" : "HD_HOADON_TAOHOADON.TaoHoaDonSoGhi_Phankhang",
            callback: "f_result_tao_hoa_don_so_ghi_thdsg",
            connstr: "Oracle_HDDT"
        };
        var code = $("#cb_soghi").val();
        
        //if (code == "-1") code = $("#cb_tram").val();
        if (code == "-1" || code == null) code = $("#cb_dienluc").val();
        var para = {
            v_SoGhi: code,
            v_KyChot: p.cb_ky,
            v_Date: '01/' + p.txt_thang_thdsg,
            v_UserId: user.userid,
            v_TuNgay: p.txt_dauky,
            v_DenNgay: p.txt_cuoiky,
            v_Hinhthuchoadon: 'BINHTHUONG',
            v_Mauinhoadon: p.cb_mauhoadon_thdsg,
            v_Ngayxuathoadon: $("#txt_ngayxuathd").val(),
            v_Loaimauhoadon: $("#cb_loaimauhoadon_thdsg").val()
        };
        callLoad();
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e.message);
    }
}

function f_result_tao_hoa_don_so_ghi_thdsg(config, para, result) {
    try {
        var data = result.data;
        if (data == '[]' || data == null || data == undefined || data.length == '' || data[0].kq == '0') {
            messInfo('mess_thdsg', 'Không tạo được hóa đơn', 'error');
            stopLoad();
            return;
        }
        messInfo('mess_thdsg', 'Đã tạo ' + data[0].kq + ' hóa đơn', 'success');
        $("#tb_danhsachoadon tbody").html('');
        stopLoad();


        // Tạo và ký file
        var config = {
            namesql: "HD_CHUKYSOS.NGUOIKY_WEB",
            connstr: "Oracle_HDDT"
        };
        var user = JSON.parse(localStorage["userinfo"]);
        var para = { V_USERID: user.userid }
        ExecuteServiceSyns(config, para);
    } catch (e) {
        stopLoad();
    }
}

function f_loc_du_lieu_thdsg(page) {
    try {
        var loaimauhd = $("#cb_loaimauhoadon_thdsg").val()
        var user = JSON.parse(localStorage["userinfo"]);
        var config = {
            namesql: loaimauhd === '0' ? "HD_HOADON_TAOHOADON.TinhHoaDonSoGhi" : "HD_HOADON_TAOHOADON.TinhHoaDonSoGhi_Phankhang",
            callback: "f_result_loc_du_lieu_thdsg",
            connstr: "Oracle_HDDT"
        };
        var code = $("#cb_soghi").val();
        //if (code == "-1") code = $("#cb_tram").val();
        if (code == "-1" || code == null) code = $("#cb_dienluc").val();
        var para = {
            v_SoGhi: code,
            v_KyChot: $("#cb_ky").val(),
            v_Date: '01/' + $("#txt_thang_thdsg").val(),
            v_UserId: user.userid,
            v_Loaimauhoadon: loaimauhd,
            v_pagenum: page,
            v_numrecs: coutpage
        };
        callLoad();
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e.message);
    }
}

function f_result_loc_du_lieu_thdsg(config, para, result) {
    try {
        var data = result.data;
        $("#tb_danhsachoadon tbody").empty();
        $("#tb_danhsachoadonphankhang tbody").empty();
        console.log(data);
        if (data == [] || data == null || data == undefined || data.length == 0) {
            messInfo('mess_thdsg', 'Không có khách hàng nào cần tạo hóa đơn', 'error');
            $("#lb_tongso").text('Tổng số: 0');
            stopLoad();
            return;
        }
        messInfo('mess_thdsg', '', 'success');
        $("#lb_tongso").text('Tổng số: ' + data[0].rowscount);
        //
        //para.v_Loaimauhoadon === 0 trường hợp hóa đơn điện năng tiêu thụ
        //para.v_Loaimauhoadon === 2 trường hợp hóa đơn điện năng phản khang
        if (para.v_Loaimauhoadon === '0') {
            $("#tb_danhsachoadon").show();
            $("#tb_danhsachoadonphankhang").hide();
            $(data).each(function (i, item) {
                if (item.loaidiemdo == '1') {
                    var cbao = (item.cb_pgiaotong == 1 || item.cb_pgiaotong == -1 ? 'Sản lượng = 0' : '')
                        + (item.cb_pgiaotong == 2 ? 'Sản lượng thấp hơn ' + item.tyleduoi + ' kỳ trước' : '')
                        + (item.cb_pgiaotong == 3 ? 'Sản lượng cao hơn' + item.tyletren + ' kỳ trước' : '');
                    var tr = '<tr name="' + item.madiemdo + '"><td>'
                    + item.makhachhang + '</td><td>'
                    + item.tenkhachhang + '</td><td>'
                    + item.socongto + '</td><td>'
                    + 'KT' + '</td><td class="right">'
                    + item.csc_tong + '</td><td class="right">'
                    + item.csm_tong + '</td><td class="right">'
                    + item.pgiaotong + '</td><td class="right">'
                    + item.pgiaotongtruoc + '</td><td style="line-height: 26px;">'
                    + cbao + '</td><td class="center">'
                    + '<a data-madiemdo="' + item.madiemdo + '" class="modal-hoadonchitiet">Xem chi tiết</a></td><td class="center">'
                    + '<button data-madiemdo="' + item.madiemdo + '" data-idchiso="' + item.idchiso
                    + '"  name="btn_remove" class="btn btn-block btn-danger">-</button>' + '</td></tr>';
                    $("#tb_danhsachoadon tbody").append(tr);
                } else {
                    var cbao = (item.cb_pgiao1 == 1 || item.cb_pgiao1 == -1 ? 'Sản lượng BT <= 0 </br>' : '')
                        + (item.cb_pgiao1 == 2 ? 'Sản lượng BT thấp hơn ' + item.tyleduoi + ' kỳ trước</br>' : '')
                        + (item.cb_pgiao1 == 3 ? 'Sản lượng BT cao hơn' + item.tyletren + ' kỳ trước</br>' : '')
                        + (item.cb_pgiao2 == 1 || item.cb_pgiao2 == -1 ? 'Sản lượng CD <= 0 </br>' : '')
                        + (item.cb_pgiao2 == 2 ? 'Sản lượng CD thấp hơn ' + item.tyleduoi + ' kỳ trước</br>' : '')
                        + (item.cb_pgiao2 == 3 ? 'Sản lượng CD cao hơn ' + item.tyletren + ' kỳ trước</br>' : '')
                        + (item.cb_pgiao3 == 1 || item.cb_pgiao3 == -1 ? 'Sản lượng TD <= 0 </br>' : '')
                        + (item.cb_pgiao3 == 2 ? 'Sản lượng TD thấp hơn ' + item.tyleduoi + ' kỳ trước</br>' : '')
                        + (item.cb_pgiao3 == 3 ? 'Sản lượng TD cao hơn ' + item.tyletren + ' kỳ trước</br>' : '');

                    var tr1 = '<tr name="' + item.madiemdo + '"><td rowspan=3 class="middle">'
                        + item.makhachhang + '</td><td rowspan=3 class="middle">'
                        + item.tenkhachhang + '</td><td rowspan=3 class="middle">'
                        + item.socongto + '</td><td>'
                        + 'BT' + '</td><td class="right">'
                        + item.csc1 + '</td><td class="right">'
                        + item.csm1 + '</td><td class="right">'
                        + item.pgiao1 + '</td><td class="right">'
                        + item.pgiao1truoc + '</td><td  rowspan=3  style="line-height: 26px;">'
                        + cbao + '</td><td  rowspan=3  class="center middle">'
                        + '<a data-madiemdo="' + item.madiemdo + '" class="modal-hoadonchitiet">Xem chi tiết</a></td><td rowspan=3 class="center middle">'
                    + '<button data-madiemdo="' + item.madiemdo + '" data-idchiso="' + item.idchiso.toString()
                    + '" name="btn_remove" class="btn btn-block btn-danger">-</button>' + '</td></tr>';
                    var tr2 = '<tr name="' + item.madiemdo + '"><td>'
                        + 'CD' + '</td><td class="right">'
                        + item.csc2 + '</td><td class="right">'
                        + item.csm2 + '</td><td class="right">'
                        + item.pgiao2 + '</td><td class="right">'
                        + item.pgiao2truoc + '</td></tr>';
                    var tr3 = '<tr name="' + item.madiemdo + '"><td>'
                        + 'TD' + '</td><td class="right">'
                        + item.csc3 + '</td><td class="right">'
                        + item.csm3 + '</td><td class="right">'
                        + item.pgiao3 + '</td><td class="right">'
                        + item.pgiao3truoc + '</td></tr>';
                    $("#tb_danhsachoadon tbody").append(tr1 + tr2 + tr3);
                }
            });
        }
        else {
            $("#tb_danhsachoadonphankhang").show();
            $("#tb_danhsachoadon").hide();
            $(data).each(function (i, item) {
                var tr = '<tr name="' + item.madiemdo + '"><td>'
                + item.makhachhang + '</td><td>'
                + item.tenkhachhang + '</td><td>'
                + item.socongto + '</td><td class="right">'
                + item.csc + '</td><td class="right">'
                + item.csm + '</td><td class="right">'
                + item.sanluong + '</td><td class="center">'
                + '<a data-madiemdo="' + item.madiemdo + '" class="modal-hoadonchitiet">Xem chi tiết</a></td></tr>';
                $("#tb_danhsachoadonphankhang tbody").append(tr);
            });
        }
        


        LoadPhanTrang("pageLst_thdsg", "pageCurent_thdsg", data, function () {
          
            f_loc_du_lieu_thdsg($("#pagenumber").val());
        });

        // Xử lý click xem chi tiết hóa đơn
        $("a.modal-hoadonchitiet").click(function () {
            if ($("#cb_loaimauhoadon_thdsg").val() === '0') { // Hóa đơn tiêu thụ
                $("#txt_thang_cthd").val($("#txt_thang_thdsg").val());
                $("#cbb_kychot_cthd").val($("#cb_ky").val());
                $("#chitiethoadon").modal('show');
                var madiemdo = $(this).data('madiemdo');
                f_lay_mau_hoa_don_cthd($("#cb_loaimauhoadon_thdsg").val());
                f_lay_thong_tin_chi_tiet_kh_cthd(madiemdo);
                f_tinh_hoa_don_cthd(madiemdo);
                f_lay_thong_tin_ky_chot_cthd(madiemdo,
                   $("#cb_ky").val(),
                   '01/' + $("#txt_thang_thdsg").val());
            } else { // Hóa đơn phản kháng
                $("#txt_thang_cthdpk").val($("#txt_thang_thdsg").val());
                $("#cbb_kychot_cthdpk").val($("#cb_ky").val());
                $("#chitiethoadon_phankhang").modal('show');
                var madiemdo = $(this).data('madiemdo');
                f_lay_mau_hoa_don_cthdpk();
                f_lay_thong_tin_chi_tiet_kh_cthdpk(madiemdo);
                f_tinh_hoa_don_cthdpk(madiemdo);
                f_lay_thong_tin_ky_chot_cthdpk(madiemdo,
                   $("#cb_ky").val(),
                   '01/' + $("#txt_thang_thdsg").val());
            }
            
        });
        stopLoad();
        //// Xử lý click remove hoa don
        $("button[name=btn_remove]").click(function () {
            var madiemdo = $(this).data('madiemdo');
            var idchiso = $(this).data('idchiso')
            f_confimYesNo("Xác nhận đưa hóa đơn vào xử lý không?", "Hủy", "Đồng ý", function () {
                var config = {
                    namesql: "HD_HOADON_TAOHOADON.DanhDauChiSoBatThuong",
                    callback: "f_remove_callback_thdsg",
                    connstr: "Oracle_HDDT",
                    madiemdo: madiemdo
                };
                var user = JSON.parse(localStorage["userinfo"]);
                var para = {
                    v_IdChiSo: idchiso,
                    v_UserId: user.userid
                };
                ExecuteServiceSyns(config, para);
            });
        });
    } catch (e) {
        console.log(e);
        stopLoad();
    }
}

function f_remove_callback_thdsg(config, para, result) {
    try {
        var data = result.data;
        if (data == null || data == undefined || data == "" || data[0].kq == "0") {
            messInfo('mess_thdsg', 'Không <i class="fa fa-search"> </i> Thực hiện được', 'error');
            return;
        } else {
            showToast("Đưa vào xử lý riêng thành công", "success");
            $('tr[name=' + config.madiemdo + ']').remove();
        }
    } catch (e) {
        console.log(e.message);
    }
    
}

function f_lay_danh_sach_dien_luc_thdsg() {
    try {
        var config = { namesql: "HD_LSTCOMBOX.LST_DONVI", callback: "f_result_danh_sach_dien_luc_thdsg", connstr: "Oracle_HDDT" };
        var para = {};
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_danh_sach_dien_luc_thdsg(config, para, result) {
    try {
        var data = result.data;
        if (data == [] || data == null || data == undefined || data.length == 0) {
            return;
        }
        dataToCob("cb_dienluc", data, "id", "ten");

        // Set sự kiện chọn combobox
        $("#cb_dienluc").change(f_lay_danh_sach_tram_thdsg);

        f_lay_danh_sach_tram_thdsg();

    } catch (e) {
        console.log(e);
    }
}

function f_lay_danh_sach_tram_thdsg() {
    try {
        var config = { namesql: "HD_LSTCOMBOX.LST_TRAM", callback: "f_result_danh_sach_tram_thdsg", connstr: "Oracle_HDDT" };
        var para = { v_CODE: $("#cb_dienluc").val() };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_danh_sach_tram_thdsg(config, para, result) {
    try {
        var data = result.data;
        if (data == [] || data == null || data == undefined || data.length == 0) {
            return;
        }
        dataToCob("cb_tram", data, "id", "ten", "-1", "Tất cả");

        // Set sự kiện chọn combobox
        $("#cb_tram").change(f_lay_danh_sach_so_ghi_thdsg);

        f_lay_danh_sach_so_ghi_thdsg();
    } catch (e) {
        console.log(e);
    }
}

function f_lay_danh_sach_so_ghi_thdsg() {
    try {
        var config = { namesql: "HD_LSTCOMBOX.LST_SOGHI", callback: "f_result_danh_sach_so_ghi_thdsg", connstr: "Oracle_HDDT" };
        var para = { v_CODE: $("#cb_tram").val() };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_danh_sach_so_ghi_thdsg(config, para, result) {
    try {
        var data = result.data;
        if (data == [] || data == null || data == undefined || data.length == 0) {
            return;
        }
        dataToCob("cb_soghi", data, "id", "ten", "-1", "Tất cả");
        ///f_lay_thong_tin_ky_chot_thdsg();

    } catch (e) {
        console.log(e);
    }
}

function f_lay_danh_sach_mau_hoa_don_thdsg() {
    try {
        var config = { namesql: "HD_MAUHOADON_PKG.DanhSachMauHoaDon", callback: "f_result_danh_sach_mau_hoa_don_thdsg", connstr: "Oracle_HDDT" };
        var para = {
            v_Mamau: '',
            v_Trangthaisudung: 1,
            v_Loaimauhoadon: $("#cb_loaimauhoadon_thdsg").val()
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_danh_sach_mau_hoa_don_thdsg(config, para, result) {
    try {
        var data = result.data;
        if (data == [] || data == null || data == undefined || data.length == 0) {
            return;
        }
        dataToCob("cb_mauhoadon_thdsg", data, "id", "mauso");

    } catch (e) {
        console.log(e);
    }
}