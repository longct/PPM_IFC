$(document).ready(function () {
    try {
        loadConetent();
        $('#txt_thang_taifilehd').datepicker({
            format: 'mm/yyyy',
            todayHighlight: true,
            minViewMode: "months",
            autoclose: true
        });
        $('#txt_thang_taifilehd').datepicker('setDate', new Date());
        $("#btnLaydulieuTaofile").click(function () {
            f_loc_du_lieu_tao_file(1);
        });

        $("#btnDownload").click(function () {
            f_loc_du_lieu_file_download();
        });

    } catch (e) {
        console.log(e);
    }
});

function f_loc_du_lieu_file_download() {
    try {
        var thangnam = $("#txt_thang_taifilehd").val();
        var thang = thangnam.toString().split('/')[0];
        if (thang.toString().startsWith("0")) thang = thang.toString().replace("0", "");
        var nam = thangnam.toString().split('/')[1];
        var config = {
            callback: "f_result_loc_du_lieu_file_download",
            connstr: "Oracle_HDDT"
        };
        var para = {
            namthangky: nam + thang + $("#cb_kychot_taifilehd").val(),
            loai:'hoadon'
        }
        api_XemFileChuaKy(config,para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_loc_du_lieu_file_download(config, para, result) {
    try {
        if (!result || result.length === 0) {
            messInfo("mess_tchd", "Không có file hóa đơn nào có thể tải xuống.", "error");
            return;
        }
        $(result).each(function (i, item) {
            $("#linkdownload").prop('href', urli + '/home/DownloadFileSaveOnServer/' + item);
            $('#linkdownload').get(0).click();           
        });
    } catch (e) {
        console.log(e);
    }
}


function f_loc_du_lieu_tao_file(page) {
    try {
        var config = {
            namesql: "HD_HOADON_TRACUU.DanhSachHoadonCanTaoFile",
            callback: "f_result_loc_du_lieu_tao_file", connstr: "Oracle_HDDT"
        };
        var para = {
            v_Taofile_YN:0,
            v_pagenum: page,
            v_numrecs: 10
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_loc_du_lieu_tao_file(config, para, result) {
    try {
        var data = result.data;
        $("#tb_dshoadon tbody").empty();
        if (data == [] || data == null || data == undefined || data.length == 0) {
            messInfo("mess_tchd", "Không có hóa đơn nào cần tạo file", "error");
            return;
        }
        messInfo("mess_tchd", "", "success");
        $(data).each(function (i, item) {
            var filedownload;
            if (item.file_daky != null) {
                filedownload = '<a href="' + urli + '/home/DownloadFileSaveOnServer/' + item.file_daky + '" class="filedownload"> Tải hóa đơn</a>';
            } else filedownload = "-";
            var tr = '<tr>'
                + '<td class="a_c">' + (i + 1) + '</td>'
            + '<td>' + item.tenkhachhang + '</td>'
            + '<td class="a_r">' + item.mahoadon + '</td>'
            + '<td class="a_c">' + item.ngayxuathoadon + '</td>'
            + '<td class="a_c">' + 'Kỳ ' + item.kyhoadon + '-' + item.ngayxuathoadon.toString().substr(3, 7) + '</td><td class="a_r">'
            + item.tongsanluong + '</td><td class="a_r">'
            + item.tongtiensauthue + '</td><td class="a_c">'
            + '<a  data-idhoadon="' + item.idhoadon + '" class="modal_hoadonchitiet">Xem chi tiết</a>' + '</td><td class="a_c">'
            + filedownload + '</td></tr>'
            $("#tb_dshoadon tbody").append(tr);
        });


        LoadPhanTrang("pageLst_tchd", "pageCurent_tchd", data, function () {
            f_loc_du_lieu_tchd($("#pagenumber").val());
        });

        // Xử lý click xem chi tiết hóa đơn
        $("a.modal_hoadonchitiet").click(function () {
            $("#chitiethoadon").modal('show');
            f_lay_chi_tiet_hoa_don_cthd($(this).data('idhoadon'));


            //if ($("#cbLoaimauhoadon").val() === '0') { // Hóa đơn tiêu thụ
            //    $("#chitiethoadon").modal('show');
            //    f_lay_chi_tiet_hoa_don_cthd($(this).data('idhoadon'));
            //} else { // Hóa đơn phản kháng
            //    $("#txt_thang_cthdpk").val($("#txt_thang_thdsg").val());
            //    $("#cbb_kychot_cthdpk").val($("#cb_ky").val());
            //    $("#txt_tungay_cthdpk").val($("#txt_dauky").val());
            //    $("#txt_denngay_cthdpk").val($("#txt_cuoiky").val());
            //    $("#chitiethoadon_phankhang").modal('show');
            //    var madiemdo = $(this).data('madiemdo');
            //    f_lay_mau_hoa_don_cthdpk();
            //    f_lay_thong_tin_chi_tiet_kh_cthdpk(madiemdo);
            //    f_tinh_hoa_don_cthdpk(madiemdo);
            //}
        });

    } catch (e) {
        console.log(e);
    }
}
