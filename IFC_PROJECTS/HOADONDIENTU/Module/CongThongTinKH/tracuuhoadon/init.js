var coutpage = 10;
var page = 1;
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

    f_loc_du_lieu_tchd(1);
});



function f_loc_du_lieu_tchd(page) {
    try {
        var userObj = JSON.parse(localStorage['userinfo']);
        var config = { namesql: "HD_HOADON_TRACUU.Tracuuhoadon_1kh", callback: "f_result_loc_du_lieu_tchd", connstr: "Oracle_HDDT" };
        var para = {
            v_Madiemdo: userObj.usercode,
            v_pagenum: page,
            v_numrecs: coutpage
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_loc_du_lieu_tchd(config, para, result) {
    try {
        var data = result.data;
        console.log(data);
        $("#tb_dshoadon tbody").empty();
        if (data == [] || data == null || data == undefined || data.length == 0) {
            messInfo("mess_tchd", "Không có hóa đơn nào tìm thấy", "error");
            return;
        }
        messInfo("mess_tchd", "", "success");
        $(data).each(function (i, item) {
            var filedownload;
            if (item.file_daky !== null) {
                filedownload = '<a href="' + urli + '/home/DownloadFileSaveOnServer/' + item.file_daky + '"> Tải hóa đơn</a>';
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
            + '<a  data-idhoadon="' + item.idhoadon + '" class="modal_thongbaotiendien">Xem thông báo</a>' + '</td><td class="a_c">'
            + filedownload + '</td></tr>';
            $("#tb_dshoadon tbody").append(tr);
        });
        

        LoadPhanTrang("pageLst_tchd", "pageCurent_tchd", data, function () {
            f_loc_du_lieu_tchd($("#pagenumber").val());
        });

        // Xử lý click xem chi tiết hóa đơn
        $("a.modal_hoadonchitiet").click(function () {
            $("#chitiethoadon").modal('show');
            f_lay_chi_tiet_hoa_don_cthd($(this).data('idhoadon'));
        });

        // Xử lý click xem thông báo tiền điện
        $("a.modal_thongbaotiendien").click(function () {
            $("#mod_thongbaodiendien").modal('show');
            f_lay_chi_tiet_hoa_don_tbtd($(this).data('idhoadon'));
        });

    } catch (e) {
        console.log(e);
    }
}

