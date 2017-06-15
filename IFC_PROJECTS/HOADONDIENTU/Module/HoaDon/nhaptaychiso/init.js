var coutpage = 10;
var user = JSON.parse(localStorage["userinfo"]);
$(document).ready(function () {
    $("#curentPage").html("Nhập tay chỉ số");
    loadConetent();
    $('#txt_thang').datepicker({
        format: 'mm/yyyy',
        todayHighlight: true,
        minViewMode: "months",
        autoclose:true
    });
    $('#txt_thang').datepicker('setDate', new Date())
    .on('changeDate', function (ev) {
        f_lay_thong_tin_ky_chot_ntcs();
    });
    f_lay_danh_sach_dien_luc_ntcs();
    $("#btn_locdulieu_ntcs").click(function () {
        f_loc_du_lieu_ntcs(1);
    });

    $("#cb_ky").on('change', function () {
        f_lay_thong_tin_ky_chot_ntcs();
    });

    $("#btn_taohoadon").click(function () {
        f_confimYesNo("Bạn có chắc muốn tạo hóa đơn cho sổ ghi này không?", "Hủy", "Đồng ý", f_tao_hoa_don_so_ghi);
    });
});

function f_lay_thong_tin_ky_chot_ntcs() {
    try {
        var config = { namesql: "HD_THIETLAPKYCHOT_PKG.LayThongTinKyChot_SoGhi", callback: "f_result_lay_thong_tin_ky_chot_ntcs", connstr: "Oracle_HDDT" };
        var code = $("#cb_soghi").val();
        if (code == "-1") code = $("#cb_tram").val();
        if (code == "-1") code = $("#cb_dienluc").val();
        var para = {
            v_code: code,
            v_Kychot: $("#cb_ky").val(),
            v_Date: '01/' + $("#txt_thang").val()
        };
        console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e.message);
    }
}

function f_result_lay_thong_tin_ky_chot_ntcs(config, para, result) {
    try {
        var data = result.data;
        if (data == [] || data == null || data == undefined || data.length == 0 || data[0].kq == '0') {
            return;
        }

        $("#txt_dauky").val(data[0].tungay);
        $("#txt_cuoiky").val(data[0].denngay);

    } catch (e) {
        console.log(e);
    }
}

function f_loc_du_lieu_ntcs(page) {
    try {
        var config = { namesql: "HD_GHICHISODINHKY_PKG.DanhSachChiSoBatThuong", callback: "f_result_loc_du_lieu_ntcs", connstr: "Oracle_HDDT" };
        var code = $("#cb_soghi").val();
        if (code == "-1") code = $("#cb_tram").val();
        if (code == "-1") code = $("#cb_dienluc").val();
        var para = {
            v_SoGhi: code,
            v_KyChot: $("#cb_ky").val(),
            v_Date: '01/' + $("#txt_thang").val(),
            v_UserId: user.userid
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e.message);
    }
}

function f_result_loc_du_lieu_ntcs(config, para, result) {
    try {
        var data = result.data;
        console.log(data);
        $("#tb_danhsachoadon tbody").empty();
        if (data == [] || data == null || data == undefined || data.length == 0) {
            messInfo('mess_thdsg', 'Không có dữ liệu', 'error');
            return;
        }
        messInfo("mess_thdsg", "", "success");
        $("#lb_tongso").text('Tổng số: ' + data.length);

        $(data).each(function (i, item) {
            if (item.loaidiemdo == '1') {
                var tr = '<tr name="' + item.madiemdo + '"><td>'
                + item.makhachhang + '</td><td>'
                + item.tenkhachhang + '</td><td>'
                + item.socongto + '</td><td>'
                + 'KT' + '</td><td name="csc_' + item.madiemdo + '_1">'
                + item.csc_tong + '</td><td>'
                + '<input name="csm_' + item.madiemdo + '_1" type="text" value="' + item.csm_tong + '" validate="true" readonly />' + '</td><td name="sl_' + item.madiemdo + '_1">'
                + item.pgiaotong + '</td><td>'
                + '<a data-madiemdo="' + item.madiemdo + '" class="modal-hoadonchitiet">Xem chi tiết</a></td><td>'
                + '<button data-madiemdo="' + item.madiemdo + '" data-action="edit" data-idchiso="' + item.idchiso + '" data-loaidiemdo="' + item.loaidiemdo
                + '"  name="btn_edit" class="btn btn-block btn-danger"><i class="fa fa-edit"></i>Sửa</button>' + '</td></tr>';
                $("#tb_danhsachoadon tbody").append(tr);
            } else {
                var tr1 = '<tr name="' + item.madiemdo + '"><td rowspan=3>'
                    + item.makhachhang + '</td><td rowspan=3>'
                    + item.tenkhachhang + '</td><td rowspan=3>'
                    + item.socongto + '</td><td>'
                    + 'BT' + '</td><td name="csc_' + item.madiemdo + '_1">'
                    + item.csc1 + '</td><td>'
                    + '<input name="csm_' + item.madiemdo + '_1" type="text" value="' + item.csm1 + '" validate="true" readonly />' + '</td><td name="sl_' + item.madiemdo + '_1">'
                    + item.pgiao1 + '</td><td  rowspan=3>'
                    + '<a data-madiemdo="' + item.madiemdo + '" class="modal-hoadonchitiet">Xem chi tiết</a></td><td rowspan=3>'
                + '<button data-madiemdo="' + item.madiemdo + '" data-action="edit" data-idchiso="' + item.idchiso.toString() + '" data-loaidiemdo="' + item.loaidiemdo
                + '" name="btn_edit" class="btn btn-block btn-danger"><i class="fa fa-edit"></i>Sửa</button>' + '</td></tr>';
                var tr2 = '<tr name="' + item.madiemdo + '"><td>'
                    + 'CD' + '</td><td name="csc_' + item.madiemdo + '_2">'
                    + item.csc2 + '</td><td>'
                    + '<input name="csm_' + item.madiemdo + '_2" type="text" value="' + item.csm2 + '" validate="true" readonly />' + '</td><td name="sl_' + item.madiemdo + '_2">'
                    + item.pgiao2 + '</td></tr>';
                var tr3 = '<tr name="' + item.madiemdo + '"><td>'
                    + 'TD' + '</td><td name="csc_' + item.madiemdo + '_3">'
                    + item.csc3 + '</td><td>'
                    + '<input name="csm_' + item.madiemdo + '_3" type="text" value="' + item.csm3 + '" validate="true" readonly />' + '</td><td name="sl_' + item.madiemdo + '_3">'
                    + item.pgiao3 + '</td></tr>';
                $("#tb_danhsachoadon tbody").append(tr1 + tr2 + tr3);
            }
        });

        $("td input[type=text]").keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter, ctrl+A and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }

            var charValue = String.fromCharCode(e.keyCode)
                , valid = /^[0-9]+$/.test(charValue);

            if (!valid) {
                e.preventDefault();
            }
        });

        // Xử lý click xem chi tiết hóa đơn
        $("a.modal-hoadonchitiet").click(function () {
            $("#txt_thang_cthd").val($("#txt_thang").val());
            console.log($("#cb_ky").val());
            $("#cbb_kychot_cthd").val($("#cb_ky").val());
            $("#txt_tungay_cthd").val($("#txt_dauky").val());
            $("#txt_denngay_cthd").val($("#txt_cuoiky").val());
            $("#chitiethoadon").modal('show');
            var madiemdo = $(this).data('madiemdo');
            f_lay_thong_tin_chi_tiet_kh_cthd(madiemdo);
            f_tinh_hoa_don_cthd(madiemdo);
        });

        //// Xử lý click remove hoa don
        $("button[name=btn_edit]").click(function () {
            f_luu_chi_so_nhap_tay_ntcs(this);
        });
    } catch (e) {
        console.log(e);
    }
}

function f_luu_chi_so_nhap_tay_ntcs(button) {
    try {
        var madiemdo = $(button).data('madiemdo');
        var loaidiemdo = $(button).data('loaidiemdo');
        var idchiso = $(button).data('idchiso');
        var input1 = $('input[name=csm_' + madiemdo + '_1]');
        var input2 = $('input[name=csm_' + madiemdo + '_2]');
        var input3 = $('input[name=csm_' + madiemdo + '_3]');
        if ($(button).data('action') == 'edit') {
            if (loaidiemdo == "1"){
                $(input1).removeAttr('readonly').focus();
            }
            else {
                $(input1).removeAttr('readonly').focus();
                $(input2).removeAttr('readonly');
                $(input3).removeAttr('readonly');
            }
            $(button).html('<i class="fa fa-save"></i>Lưu');
            $(button).data('action','save');
        } else { // Lưu
            var value1 = $(input1).val();
            var value2 = $(input2).val() || '';
            var value3 = $(input3).val() || '';
            $(input1).removeClass("validateerror");
            $(input2).removeClass("validateerror");
            $(input3).removeClass("validateerror");
            if (value1 == ""){
                $(input1).addClass("validateerror");
                return;
            }
            if (loaidiemdo != "1" && value2 == "") {
                $(input2).addClass("validateerror");
                return;
            }
            if (loaidiemdo != "1" && value3 == "") {
                $(input3).addClass("validateerror");
                return;
            }
            var config = {
                namesql: "HD_GHICHISODINHKY_PKG.GhiTayChiSo",
                callback: "f_result_luu_chi_so_nhap_tay_ntcs",
                connstr: "Oracle_HDDT",
                button: button,
                madiemdo: madiemdo,
                csc1: $('td[name=csc_' + madiemdo + '_1]').text(),
                csc2: $('td[name=csc_' + madiemdo + '_2]').text(),
                csc3: $('td[name=csc_' + madiemdo + '_3]').text()
            };
            var para = {
                    v_value1: value1,
                    v_value2: value2,
                    v_value3: value3,
                    v_Loaidiemdo: loaidiemdo,
                    v_Idchiso: idchiso,
                    v_csc1: $('td[name=csc_' + madiemdo + '_1]').text(),
                    v_csc2: $('td[name=csc_' + madiemdo + '_2]').text(),
                    v_csc3: $('td[name=csc_' + madiemdo + '_3]').text(),
                    v_UserId: user.userid
                };
            ExecuteServiceSyns(config, para);
        }
    } catch (e) {
        console.log(e.message);
    }
}

function f_result_luu_chi_so_nhap_tay_ntcs(config, para, result) {
    try {
        var data = result.data;
        console.log(config);
        if (data == null || data == undefined || data == "" || data[0].kq == "0") {
            messInfo('mess_ntcs', 'Không <i class="fa fa-search"> </i> Thực hiện được', 'error');
            return;
        } else {
            $('input[name=csm_' + config.madiemdo + '_1]').attr('readonly', 'readonly');
            $('input[name=csm_' + config.madiemdo + '_2]').attr('readonly', 'readonly');
            $('input[name=csm_' + config.madiemdo + '_3]').attr('readonly', 'readonly');
            $(config.button).html('<i class="fa fa-edit"></i>Sửa');
            $(config).data('action', 'edit');
            $(config.button).removeClass('btn-danger').addClass('btn-success');
            

            if (para.v_Loaidiemdo != "1") {
                var sl1 = data[0].sl1;
                var sl2 = data[0].sl2;
                var sl3 = data[0].sl3;
                $('td[name=sl_' + config.madiemdo + '_2]').html(sl2);
                $('td[name=sl_' + config.madiemdo + '_3]').html(sl3);
                $('td[name=sl_' + config.madiemdo + '_1]').html(sl1);
            } else {
                var sl1 = data[0].sl1;
                $('td[name=sl_' + config.madiemdo + '_1]').html(sl1);
            }
            
            showToast('Cập nhật thành công ', 'success');
        }
    } catch (e) {
        console.log(e.message);
    }
    
}

function f_remove_callback(config, para, result) {
    try {
        var data = result.data;
            if (data == null || data == undefined || data == "" || data[0].kq == "0") {
                messInfo('mess_thdsg', 'Không <i class="fa fa-search"> </i> Thực hiện được', 'error');
                return;
            } else {
                $('tr[name=' + config.madiemdo + ']').remove();
            }
    } catch (e) {
        console.log(e.message);
    }
    
}

function f_lay_danh_sach_dien_luc_ntcs() {
    try {
        var config = { namesql: "HD_LSTCOMBOX.LST_DONVI", callback: "f_result_danh_sach_dien_luc_ntcs", connstr: "Oracle_HDDT" };
        var para = {};
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_danh_sach_dien_luc_ntcs(config, para, result) {
    try {
        var data = result.data;
        console.log(data);
        if (data == [] || data == null || data == undefined || data.length == 0) {
            return;
        }
        dataToCob("cb_dienluc", data, "id", "ten");

        // Set sự kiện chọn combobox
        $("#cb_dienluc").change(f_lay_danh_sach_tram_ntcs);

        f_lay_danh_sach_tram_ntcs();

    } catch (e) {
        console.log(e);
    }
}

function f_lay_danh_sach_tram_ntcs() {
    try {
        var config = { namesql: "HD_LSTCOMBOX.LST_TRAM", callback: "f_result_danh_sach_tram_ntcs", connstr: "Oracle_HDDT" };
        var para = { v_CODE: $("#cb_dienluc").val() };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_danh_sach_tram_ntcs(config, para, result) {
    try {
        var data = result.data;
        if (data == [] || data == null || data == undefined || data.length == 0) {
            return;
        }
        dataToCob("cb_tram", data, "id", "ten","-1","Tất cả");

        // Set sự kiện chọn combobox
        $("#cb_tram").change(f_lay_danh_sach_so_ghi_ntcs);

        f_lay_danh_sach_so_ghi_ntcs();
    } catch (e) {
        console.log(e);
    }
}


function f_lay_danh_sach_so_ghi_ntcs() {
    try {
        var config = { namesql: "HD_LSTCOMBOX.LST_SOGHI", callback: "f_result_danh_sach_so_ghi_ntcs", connstr: "Oracle_HDDT" };
        var para = { v_CODE: $("#cb_tram").val() };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_danh_sach_so_ghi_ntcs(config, para, result) {
    try {
        var data = result.data;
        if (data == [] || data == null || data == undefined || data.length == 0) {
            return;
        }
        dataToCob("cb_soghi", data, "id", "ten", "-1", "Tất cả");
        f_lay_thong_tin_ky_chot_ntcs();
    } catch (e) {
        console.log(e);
    }
}
