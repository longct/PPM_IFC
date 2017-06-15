
$(document).ready(function () {
    try {
        

    } catch (e) {
        console.log(e);
    }
});

function f_load_baocaonhap_chitiet(idvendor, datefrom, dateto, khonhap, pagenum, typedeviceid) {
    try {
        var config = {
            namesql: "TB_BAOCAO_NHAPCHITIET",
            callback: "f_result_f_load_baocaonhap_chitiet",
            connstr: "ConnectEMS",
            typedeviceid: typedeviceid
        };
        var para = {
            FromDate: datefrom,
            ToDate: dateto,
            Khonhap: khonhap,
            Idvendor: idvendor,
            pagenum: pagenum,
            pagerecord: 10
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e.message);
    }
}

function f_result_f_load_baocaonhap_chitiet(config, para, result) {
    try {
        var data = result.data;
        $("#tb_bcnhap_chitiet tbody").empty();
     
        if (!data || data === '[]') {
            return;
        }
        $(data[0].kq0).each(function (i, item) {
            var tr = '<tr>'
            + '<td class="text-center">' + item.stt + '</td>'
            + '<td class="text-center">' + item.voicecode + '</td>'
            + '<td class="text-center">' + item.soluong + '</td>'
            + '<td class="text-center"><a data-voicecode="' + item.voicecode + '" data-idvendor="' + item.idvendor + '">Xuất excel</a></td>'
            $("#tb_bcnhap_chitiet tbody").append(tr);
        });
        $("#txt_tongsobanghi_baocaonhapchitiet").empty();
        $.each(data[1].kq1, function (key, val) {
            var row1 = "Tổng" + val.allrow;
            $("#txt_tongsobanghi_baocaonhapchitiet").append(row1);
        });
        loadphantrang_baocaonhap_chitiet(data, para, config);

        // Set click download
        $("#tb_bcnhap_chitiet a").click(function () {
            var voicecode = $(this).data('voicecode');
            var idvendor = $(this).data('idvendor');
            f_xuat_excel_bcnhap_chitiet(voicecode, config.typedeviceid, idvendor);
        });
    } catch (e) {
        console.log(e.message);
    }
}

function f_xuat_excel_bcnhap_chitiet(voicecode, typedeviceid, idvendor) {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "[TB_BAOCAO_NHAPCHITIET_EXPORT]",
            namefile: "BaoCaoNhapChiTiet",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = { VoiceCode: voicecode, idvendor: idvendor }
        switch (typedeviceid) {
            case 1: // Sim
                var colum = {
                    kq: [{ field: "STT", name: "Stt", type: "TextCenter" },
                        { field: "Mavattu", name: "Mã VT", type: "TextCenter" },
                       { field: "SeriesDivice1", name: "Series SIM", type: "TextCenter" },
                       { field: "TenVatTu", name: "Loại sim", type: "TextCenter" },
                       { field: "VoiceCode", name: "Mã phiếu", type: "TextCenter" },
                       { field: "FullName", name: "Người nhập", type: "TextCenter" },
                       { field: "InputDate", name: "Ngày nhập", type: "TextCenter" },
                       { field: "soluong", name: "Số lượng", type: "TextCenter" }]
                }; break;
            case 2: // Modem
                var colum = {
                    kq: [{ field: "STT", name: "Stt", type: "TextCenter" },
                        { field: "Mavattu", name: "Mã VT", type: "TextCenter" },
                       { field: "SeriesDivice1", name: "Imei", type: "TextCenter" },
                       { field: "TenVatTu", name: "Loại thiết bị", type: "TextCenter" },
                       { field: "VoiceCode", name: "Mã phiếu", type: "TextCenter" },
                       { field: "FullName", name: "Người nhập", type: "TextCenter" },
                       { field: "InputDate", name: "Ngày nhập", type: "TextCenter" },
                       { field: "soluong", name: "Số lượng", type: "TextCenter" }]
                }; break;
            case 3: // Adapter
            case 5:
            case 8:
                var colum = {
                    kq: [{ field: "STT", name: "Stt", type: "TextCenter" },
                        { field: "Mavattu", name: "Mã VT", type: "TextCenter" },
                       { field: "TenVatTu", name: "Loại thiết bị", type: "TextCenter" },
                       { field: "VoiceCode", name: "Mã phiếu", type: "TextCenter" },
                       { field: "FullName", name: "Người nhập", type: "TextCenter" },
                       { field: "InputDate", name: "Ngày nhập", type: "TextCenter" },
                       { field: "soluong", name: "Số lượng", type: "TextCenter" }]
                }; break;
            
            case 4: // Sim + Modem
                var colum = {
                    kq: [{ field: "STT", name: "Stt", type: "TextCenter" },
                        { field: "Mavattu", name: "Mã VT", type: "TextCenter" },
                       { field: "SeriesDivice1", name: "Series SIM", type: "TextCenter" },
                       { field: "TenVatTu", name: "Loại sim", type: "TextCenter" },
                       { field: "VoiceCode", name: "Mã phiếu", type: "TextCenter" },
                       { field: "FullName", name: "Người nhập", type: "TextCenter" },
                       { field: "InputDate", name: "Ngày nhập", type: "TextCenter" },
                       { field: "soluong", name: "Số lượng", type: "TextCenter" }]
                }; break;
            default: var colum = { kq: [] }; break;
        }
        excuteExcel(config, para, colum, true);
    } catch (e) {
        console.log(e);
    }
}

function loadphantrang_baocaonhap_chitiet(data, para, config) {
    try {
        $("#pagecurent_baocaonhapchitiet ul").empty();
        $("#pagecurent_baocaonhapchitiet ul").append('<li><a  >Trang đầu</a></li>');
        $.each(data[2].kq2, function (key, val) {
            var row2 = "";
            row2 += '<li><a  >' + val.pape + '</a></li>';
            $("#pagecurent_baocaonhapchitiet ul").append(row2);
        });
        $("#pagecurent_baocaonhapchitiet ul li a").click(function () {
            var cuoi = $("#txt_tongsobanghi_baocaonhapchitiet").html().split('/')[1].trim();
            var page = $(this).html() == "Trang đầu" ? 1 : $(this).html() == "Trang cuối" ? cuoi : $(this).html();
            $("#pagecurent_baocaonhapchitiet ul li a").addClass("active");
            f_load_baocaonhap_chitiet(para.Idvendor,
                                    para.datefrom,
                                    para.dateto,
                                    para.khonhap,
                                    page,
                                    config.typedeviceid);
        });
    } catch (e) {
        console.log(e);
    }
}