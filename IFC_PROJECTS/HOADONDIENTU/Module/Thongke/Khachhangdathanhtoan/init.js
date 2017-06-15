var coutpage = 10;
var page = 1;
var TCHD = {
    dskh:[]
}
$(document).ready(function () {
    $("#curentPage").html("Khách hàng thanh toán");
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

    $("#btn_capnhat_khdtt").click(function () {
        f_confimYesNo("Cập nhật thông khách hàng thanh toán", "Bỏ qua", "Xác nhận", function () {
            if (capnhat_khdtt()) {
                f_loc_du_lieu_tchd(1);
            }
            refreshData();
        });

    });
});

function refreshData() {
    lstFile = [];
    _listID = "";
    $('input[type=file]').val('');
}


function f_loc_du_lieu_tchd(page) {
    try {
        var type = $("input[name=rdKieuLoc]:checked").val();
        var khtt = $("#cbThanhToan").val();
        var config = { namesql: "HD_HOADON_TRACUU.Tracuuhoadon_tt", callback: "f_result_loc_du_lieu_tchd", connstr: "Oracle_HDDT" };
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
            v_numrecs: coutpage,
            v_thanhtoan: khtt
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
                    filedownload = '<a href="' + urli + '/home/DownloadFileSaveOnServer/' + item.file_daky + '" name="a_filehd" class="filedownload-' + item.idhoadon + '" data-idhoadon="' + item.idhoadon + '"> Mặc định</a>';
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
                + '<input type="checkbox" name="khtt" class="khtt-' + item.idhoadon + '" data-idhoadon="' + item.idhoadon + '" data-mahoadon="' + item.mahoadon + '"/>' + "</td><td  class='a_c'>"
                //+ '<button data-idhoadon="' + item.idhoadon
                //    + '" name="btn_send" class="btn btn-block btn-danger">Gửi</button>' + '</td></tr>';
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

        //Gửi email
        //$("button[name=btn_send]").click(function () {
        //    var idhoadon = $(this).data('idhoadon');
        //    f_confimYesNo("Bạn chắc chắn muốn gửi thông báo tới khách hàng", "Bỏ qua", "Xác nhận", function () {
        //        $("#anhload").show();
        //        Capnhat_hd(_listID.substr(0,s.lastIndexOf(",")));
        //    });
        //});

        //$("input[name='khtt']").each(function (e) {
        //    $("input[name='khtt]").attr('checked', false);
        //});

        $("input[name='khtt']").change(function (e) {
            var id = e.target.getAttribute("data-idhoadon");
            var _class = ".khtt-" + id;
            var checked = $(_class).is(':checked');
            $(_class).attr('checked');
            $(_class).attr('checked', checked);
        });
        if ($("#cbThanhToan").val() == 1) {
            $("input[name='khtt']").each(function (e) {
                var id = $("input[name='khtt']")[e].getAttribute("data-idhoadon");
                var _class = ".khtt-" + id;
                $(_class).attr('checked');
                $(_class).attr('checked', true);
            });
        } else {
            $("input[name='khtt']").each(function (e) {
                var id = $("input[name='khtt']")[e].getAttribute("data-idhoadon");
                var _class = ".khtt-" + id;
                $(_class).attr('checked');
                $(_class).attr('checked', false);
            });
        }
        if (_listID != "") {
            //var s = _listID.split(',');
            //for (var i = 0; i < s.length; i++) {
            //    $("a[name='a_filehd']").each(function (e) {
            //        var id = $("a[name='a_filehd']")[e].getAttribute("data-idhoadon");
            //        var _class = ".filedownload-" + id;
            //        if (id == s[i]) {
            //            $(_class).html('File tải lên');
            //            $(_class).css({ 'color': "red" });
            //            $(_class).attr("href", "#");
            //            //lstFile.push(fileName);
            //            //_listID += idhoadon + ",";
            //            //_listID += id + ",";
            //        }
            //    });
            //}
            kiem_tra_id_file();
        }

    } catch (e) {
        console.log(e);
    }
}

function kiem_tra_id_file() {
    var myFile = $('input[type=file]').prop('files');
    for (var i = 0; i < myFile.length; i++) {
        var idhoadon = myFile[i].name.split("___")[1];

        $("a[name='a_filehd']").each(function (e) {
            var id = $("a[name='a_filehd']")[e].getAttribute("data-idhoadon");
            var _class = ".filedownload-" + id;
            if (id == idhoadon) {
                //$(_class).html('File tải lên');
                $(_class).css({ 'color': "red" });
                //$(_class).attr("href", "#");
                //lstFile.push(fileName);
                _listID += idhoadon + ",";
                //_listID += id + ",";
            } else {
                $(_class).html('Mặc định');
                if (_listID.indexOf(id) == -1)
                    $(_class).css({ 'color': "" });
                //$(_class).removeAttr("style");
            }
        });
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

//function f_result_danh_sach_tram_tchd(config, para, result) {
//    try {
//        var data = result.data;
//        if (data == [] || data == null || data == undefined || data.length == 0) {
//            return;
//        }
//        dataToCob("cbTram", data, "id", "ten", "-1", "Tất cả");

//        // Set sự kiện chọn combobox
//        $("#cbTram").change(f_lay_danh_sach_so_ghi_tchd);

//        f_lay_danh_sach_so_ghi_tchd();
//    } catch (e) {
//        console.log(e);
//    }
//}

//function f_lay_danh_sach_so_ghi_tchd() {
//    try {
//        var config = { namesql: "HD_LSTCOMBOX.LST_SOGHI", callback: "f_result_danh_sach_so_ghi_tchd", connstr: "Oracle_HDDT" };
//        var para = { v_CODE: $("#cbTram").val() };
//        ExecuteServiceSyns(config, para);
//    } catch (e) {
//        console.log(e);
//    }
//}

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

function Capnhat_hd(listID) {

    var userinfo = JSON.parse(localStorage.getItem("userinfo"));
    var config = {
        connstr: "Oracle_HDDT", namesql: "HD_THONGKEGUIMAIL.CAPNHATTBHD_tt",
        callback: "result_saveluulong"
    };
    var para = {
        v_userID: userinfo.userid,
        v_listID: listID
    };
    console.log(para);
    ExecuteServiceSyns(config, para);
}
function result_saveluulong(config, para, lst) {

    $("#anhload").hide();
    try {
        var data = lst.data;
        var row = data[0].count;
        console.log(lst);
        if (row.indexOf("OK") > -1) {
            messInfo("mess_tchd", "Cập nhật dữ liệu thành công", 'success');
        }
    } catch (e) {
        console.log(e);
    }
}

function ktThanhToan() {
    var check = false;
    $("input[name='khtt']").each(function (i) {
        if ($("input[name='khtt']")[i].getAttribute("checked") != null) {
            check = true;
        }
    });
    return check;
}

function capnhat_khdtt() {
    var check = false;
    $("#mess_tchd").hide();
    //messInfo("mess_tchd", "Cập nhật dữ liệu thành công", 'success');
    if (lstFile.length != 0) {
        //Thực hiện upload file
        //for (var i = 0; i < lstFile.length; i++) {
            f_uploadFileHD_had();
        //}
        if (ktThanhToan()) {
            //Cập nhật thanh toán
            $("input[name='khtt']").each(function (i) {
                if ($("input[name='khtt']")[i].getAttribute("checked") != null) {
                    //Thực hiện cập nhật thanh toán
                    var thanhtoan = 1;
                    var mahoadon = $("input[name='khtt']")[i].getAttribute("data-mahoadon");
                    var userinfo = JSON.parse(localStorage.getItem("userinfo"));
                    var config = { connstr: "Oracle_HDDT", namesql: "HD_THONGKEGUIMAIL.CAPNHATKHTHANHTOAN", callback: "result_capnhat_khdtt" };
                    var para = {
                        v_MAHOADON: mahoadon,
                        v_THANHTOAN: thanhtoan,
                    };
                    ExecuteServiceSyns(config, para);

                    Capnhat_hd(mahoadon);
                }
            });
            //Gửi email
            //Capnhat_hd(_listID.substr(0, _listID.lastIndexOf(",")));
            check = true;
            messInfo("mess_tchd", "Cập nhật dữ liệu thành công", 'success');
        } else {
            check = false;
            messInfo("mess_tchd", "Chưa tích chọn hóa đơn thanh toán", 'error');
        }
    } else {
        check = false;
        messInfo("mess_tchd", "Không tìm thấy hóa đơn tương ứng", 'error');
    }
    return check;
}

function result_capnhat_khdtt(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        //if (row.indexOf("thành công") > 0) {
        //    messInfo("messinfo_ncso", row, 'ok');
        //    setTimeout(function () {
        //        loaddanhsachchiso(1);
        //    }, 1500);
        //} else {
        //    messInfo("messinfo_ncso", row, 'error');
        //}
        messInfo("mess_tchd", "Cập nhật dữ liệu thành công", 'success');
    } catch (e) {
        console.log(e);
    }
}

var lstFile = [];
var _listID = "";
function readURL(input) {
    $("#mess_tchd").hide();
    lstFile = [];
    _listID = "";
    if ($("#tb_dshoadon tbody tr td").length == 0) {
        //Chưa có thông tin
        messInfo("mess_tchd", "Chưa có dữ liệu hóa đơn", 'error');
        $('input[type=file]').val('');
    } else {
        var len = input.files.length;
        for (var i = 0; i < len; i++) {
            var fileName = input.files[i].name;
            var idhoadon = input.files[i].name.split("___")[1];
            $("a[name='a_filehd']").each(function (e) {
                var id = $("a[name='a_filehd']")[e].getAttribute("data-idhoadon");
                var _class = ".filedownload-" + id;
                if (id == idhoadon) {
                    //$(_class).html('File tải lên');
                    $(_class).css({ 'color': "red" });
                    //$(_class).attr("href", "#");
                    lstFile.push(fileName);
                    _listID += idhoadon + ",";
                    //_listID += id + ",";
                } else {
                    $(_class).html('Mặc định');
                    if (_listID.indexOf(id)==-1)
                        $(_class).css({ 'color': "" });
                    //$(_class).removeAttr("style");
                }
            });
        }
        //messInfo("mess_tchd", "Tìm thấy " + _listID.split(',').length - 1 + " hóa đơn trong trang", 'success');
    }
}

function f_uploadFileHD_had() {
    var fdata = new FormData();
    var file = $("#txt_file_khhd_tt").get(0).files;
    $(file).each(function (i, item) {
        fdata.append("file" + i, item);
    });
    //var file = $("#txt_sfile_khhd_t").get(0).files;
    //fdata.append("file", fileName);
    var config = { callback: "f_result_f_uploadFileHD_had", namefile: file.name };
    api_uploadDaKy(config, fdata);
}

function f_result_f_uploadFileHD_had(config, para, lst) {
    //if (lst != null && lst.data != null && lst.data != undefined)
        //capnhatthongtin_had();
}
