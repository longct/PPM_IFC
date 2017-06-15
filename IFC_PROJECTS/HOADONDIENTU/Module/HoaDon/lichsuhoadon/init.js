$(document).ready(function () {
    initformelement();
    loadConetent();
})

function f_lay_lich_su_hoa_don_lshd(madiemdo) {
    try {
        var config = { namesql: "HD_HOADON_TRACUU.LichSuHoaDon", callback: "f_result_lichsuhoadon_lshd", connstr: "Oracle_HDDT" };
        var para = { v_madiemdo: madiemdo };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_lichsuhoadon_lshd(config, para, result) {
    try {
        var data = result.data;
        
        $("#tb_hoadon_lshd tbody").empty();
        if (data == [] || data == null || data == undefined || data[0].mahoadon === null) {
            messInfo("messinfo_lshd", "Khách hàng chưa có hóa đơn nào", "error");
            return;
        }
        messInfo("messinfo_lshd", "", "success");
        $("#lb_madiemdo_lshd").text(data[0].madiemdo);
        $("#lb_tenkhachhang_lshd").text(data[0].tenkhachhang);
        $(data).each(function (i, item) {
            var tr = '<tr>'
                + '<td>' + (i+1) + '</td>'
            + '<td>' + item.mahoadon + '</td>'
            + '<td>' + item.ngayxuathoadon + '</td>'
            + '<td>' + 'Kỳ ' + item.kyhoadon + '-' + item.ngayxuathoadon.toString().substr(3, 7) + '</td>'
            + '<td>' + item.tongsanluong + '</td>'
            + '<td>' + item.tongtientruocthue + '</td>'
            + '<td>' + item.thue + '</td>'
            + '<td>' + item.tongtiensauthue + '</td>'
            + '<td><a class="modal_hoadonchitiet" data-idhoadon="' + item.idhoadon + '">Xem chi tiết</a></td></tr>';
            $("#tb_hoadon_lshd tbody").append(tr);
        });

        // Xử lý click xem chi tiết hóa đơn
        $("a.modal_hoadonchitiet").click(function () {
            f_lay_chi_tiet_hoa_don_cthd($(this).data('idhoadon'));
            $("#chitiethoadon").modal('show');
        });
    } catch (e) {
        console.log(e.message);
    }
}

function genChiTietHoaDon_lshd(item) {
    try {
        return '<a class="modal_hoadonchitiet" data-idhoadon="' + item.idhoadon + '" >Xem chi tiết</a>';
    } catch (e) {
        console.log(e);
    }
}