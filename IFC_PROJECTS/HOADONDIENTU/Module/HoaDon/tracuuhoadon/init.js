var coutpage = 10;
var page = 1;
var TCHD = {
    dskh:[]
}
$(document).ready(function () {
    $("#curentPage").html("Tra cứu hóa đơn");
    loadConetent();

    $('#txt_thang_tthd').datepicker({
        format: 'mm/yyyy',
        todayHighlight: true,
        minViewMode: "months",
        autoclose: true
    });
    $('#txt_thang_tthd').datepicker('setDate', new Date());
    $("input[type=radio][name=rdKieuLoc]").on("change", function () {
        if ($(this).val() == '0') {
            $("#cbDienluc").removeAttr('disabled');
            $("#cbTram").removeAttr('disabled');
            $("#cbSoGCS").removeAttr('disabled');
            $("#txtKH").attr('disabled', 'disabled');
        } else {
            $("#txtKH").removeAttr('disabled');
            $("#cbSoGCS").attr('disabled', 'disabled');
            $("#cbDienluc").attr('disabled', 'disabled');
            $("#cbTram").attr('disabled', 'disabled');
        }

    });
    f_lay_danh_sach_dien_luc_tchd();
    f_lay_danh_sach_khach_hang_tchd();
    $("#btn_laysolieu").click(function () {
        f_loc_du_lieu_tchd(1);
    });

    $("#download_allhoadon").click(function () {
        $(".filedownload").click();
        //window.open("file.pdf", "_blank");
    });
});



function f_loc_du_lieu_tchd(page) {
    try {
        var type = $("input[name=rdKieuLoc]:checked").val();
        var config = { namesql: "HD_HOADON_TRACUU.Tracuuhoadon", callback: "f_result_loc_du_lieu_tchd", connstr: "Oracle_HDDT" };
        var code = $("#cbSoGCS").val();
        //if (code == "-1") code = $("#cbTram").val();
        if (code == "-1") code = $("#cbDienluc").val();
        var para = {
            v_Soghi: type == 0 ? code : "",
            v_Date: '01/' + $("#txt_thang_tthd").val(),
            v_Kychot: $("#cb_kychot").val(),
            v_Keysearch: type == 1 ? $("#txtKH").val() : "",
            v_cohoadon: $("#cbCohoadon").val(),
            v_Loaimauhoadon: $("#cbLoaimauhoadon").val(),
            v_pagenum: page,
            v_numrecs: coutpage
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_loc_du_lieu_tchd(config, para, result)     {
    try {
        var data = result.data;
        $("#tb_dshoadon tbody").empty();
        if (data == [] || data == null || data == undefined || data.length == 0) {
            messInfo("mess_tchd", "Không có hóa đơn nào tìm thấy", "error");
            return;
        }
        messInfo("mess_tchd", "", "success");
        if (para.v_cohoadon === '1') {
            $(data).each(function (i, item) {
                var filedownload;
                if (item.file_daky !== null) {
                    filedownload = '<a href="' + urli + '/home/DownloadFileSaveOnServer/' + item.file_daky + '" class="filedownload"> Tải hóa đơn</a>';
                } else filedownload = "-";
                var tr = '<tr>'
                    + '<td class="a_c">' + (i + 1) + '</td>'
                + '<td>' + item.tenkhachhang + '</td>'
                + '<td class="a_r">' + item.mahoadon + '</td>'
                + '<td class="a_c">' + item.ngayxuathoadon + '</td>'
                //+ '<td class="a_c">' + 'Kỳ ' + item.kyhoadon + '-' + item.ngayxuathoadon.toString().substr(3, 7) + '</td><td class="a_r">'
                + '<td class="a_c">' + 'Kỳ ' + item.kyhoadon + '-' + item.thangxuathd.toString().substr(3, 7) + '</td><td class="a_r">'
                + item.tongsanluong + '</td><td class="a_r">'
                + item.tongtiensauthue + '</td><td class="a_c">'
                + '<a  data-idhoadon="' + item.idhoadon + '" class="modal_hoadonchitiet">Xem chi tiết</a>' + '</td><td class="a_c">'
                + filedownload + '</td></tr>'
                $("#tb_dshoadon tbody").append(tr);
            });
        } else {
            $(data).each(function (i, item) {
                var tr = '<tr>'
                    + '<td class="a_c">' + (i + 1) + '</td>'
                + '<td>' + item.tenkhachhang + '</td>'
                + '<td class="a_r">' + item.mahoadon + '</td>'
                + '<td class="a_c">' + item.ngayxuathoadon + '</td>'
                + '<td class="a_c">' +  '-' + '</td><td class="a_r">'
                + item.tongsanluong + '</td><td class="a_r">'
                + item.tongtiensauthue + '</td><td class="a_c">'
                + '-' + '</td><td class="a_c">';
                + '-' + '</td></tr>';
                $("#tb_dshoadon tbody").append(tr);
            });
        }
        

        LoadPhanTrang("pageLst_tchd", "pageCurent_tchd", data, function () {
            f_loc_du_lieu_tchd($("#pagenumber").val());
        });

        // Xử lý click xem chi tiết hóa đơn
        $("a.modal_hoadonchitiet").click(function () {
            if ($("#cbLoaimauhoadon").val() === '0') { // Hóa đơn tiêu thụ
                $("#chitiethoadon").modal('show');
                f_lay_chi_tiet_hoa_don_cthd($(this).data('idhoadon'));
            } else { // Hóa đơn phản kháng
                //$("#txt_thang_cthdpk").val($("#txt_thang_thdsg").val());
                //$("#cbb_kychot_cthdpk").val($("#cb_ky").val());
                //$("#txt_tungay_cthdpk").val($("#txt_dauky").val());
                //$("#txt_denngay_cthdpk").val($("#txt_cuoiky").val());
                //$("#chitiethoadon_phankhang").modal('show');
                //var madiemdo = $(this).data('madiemdo');  
                //f_lay_mau_hoa_don_cthdpk();
                //f_lay_thong_tin_chi_tiet_kh_cthdpk(madiemdo);
                //f_tinh_hoa_don_cthdpk(madiemdo);

                f_lay_chi_tiet_hoa_don_cthdpk($(this).data('idhoadon'));
                $("#chitiethoadon_phankhang").modal('show');
            }
        });

    } catch (e) {
        console.log(e);
    }
}





function f_lay_danh_sach_dien_luc_tchd() {
    try {
        var config = { namesql: "HD_LSTCOMBOX.LST_DONVI", callback: "f_result_danh_sach_dien_luc_tchd", connstr: "Oracle_HDDT" };
        var para = {};
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_danh_sach_dien_luc_tchd(config, para, result) {
    try {
        var data = result.data;
        if (data == [] || data == null || data == undefined || data.length == 0) {
            return;
        }
        dataToCob("cbDienluc", data, "id", "ten");

        // Set sự kiện chọn combobox
        $("#cbDienluc").change(f_lay_danh_sach_tram_tchd);

        f_lay_danh_sach_tram_tchd();

    } catch (e) {
        console.log(e);
    }
}

function f_lay_danh_sach_tram_tchd() {
    try {
        var config = { namesql: "HD_LSTCOMBOX.LST_TRAM", callback: "f_result_danh_sach_tram_tchd", connstr: "Oracle_HDDT" };
        var para = { v_CODE: $("#cbDienluc").val() };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_danh_sach_tram_tchd(config, para, result) {
    try {
        var data = result.data;
        if (data == [] || data == null || data == undefined || data.length == 0) {
            return;
        }
        dataToCob("cbTram", data, "id", "ten", "-1", "Tất cả");

        // Set sự kiện chọn combobox
        $("#cbTram").change(f_lay_danh_sach_so_ghi_tchd);

        f_lay_danh_sach_so_ghi_tchd();
    } catch (e) {
        console.log(e);
    }
}

function f_lay_danh_sach_so_ghi_tchd() {
    try {
        var config = { namesql: "HD_LSTCOMBOX.LST_SOGHI", callback: "f_result_danh_sach_so_ghi_tchd", connstr: "Oracle_HDDT" };
        var para = { v_CODE: $("#cbTram").val() };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_danh_sach_so_ghi_tchd(config, para, result) {
    try {
        var data = result.data;
        if (data == [] || data == null || data == undefined || data.length == 0) {
            return;
        }
        dataToCob("cbSoGCS", data, "id", "ten", "-1", "Tất cả");

    } catch (e) {
        console.log(e);
    }
}


function f_lay_danh_sach_khach_hang_tchd() {
    try {
        var config = { namesql: "HD_KHACHHANG_PKG.DanhSachKhachHang", callback: "f_result_danhsachkhachhang_tchd", connstr: "Oracle_HDDT" };
        var para = { v_Makh: '' };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_danhsachkhachhang_tchd(config, para, data) {


    TCHD.dskh = data.data;

    var nameArr = [];
    nameArr.length = 0;
    $.each(dskh, function (key, val) {
        nameArr.push({
            label: val.tenkhachhang + ' - ' + val.makhachhang + ' - ' + val.socongto,
            value: val.makhachhang,
            id: val.madiemdo,
        });
    });
    $("#txtKH").autocomplete({
        minLength: 1,
        delay: 200,
        source: nameArr,
        select: function (event, ui) {
            f_loc_du_lieu_tchd(1);

            //setTimeout(function () {
            //    f_lay_thong_tin_chi_tiet_kh_tkkh(ui.item.id);
            //}, 300);
        }
    });

}