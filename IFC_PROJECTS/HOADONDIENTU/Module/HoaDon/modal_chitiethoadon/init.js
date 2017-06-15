var okh;
$(document).ready(function () {

});


// ***********************************************
// REGION TÍNH CHI TIẾT HÓA ĐƠN CHƯA ĐƯỢC LẬP

function f_lay_mau_hoa_don_cthd(loaimauhd) {
    try {
        var config = { namesql: "HD_MAUHOADON_PKG.DanhSachMauHoaDon", callback: "f_result_mau_hoa_don_cthd", connstr: "Oracle_HDDT" };
        var para = {
            v_Mamau: '',
            v_Trangthaisudung: null,
            v_Loaimauhoadon: loaimauhd
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_mau_hoa_don_cthd(config, para, result) {
    try {
        var data = result.data;
        if (data == [] || data == null || data == undefined || data.length == 0) {
            $("#table_tmhd tbody").empty();
            return;
        }
        fill_mau_hoa_don_cthd(data);
    } catch (e) {
        console.log(e);
    }
}

function fill_mau_hoa_don_cthd(data) {
    try {
        setValToTxt("txt_kyhieuhoadon_cthd", data[0].kyhieu);
        setValToTxt("txt_mahoadon_cthd", data[0].mahoadon == null ? '' : data[0].mahoadon);
        setValToTxt("cb_mausohoadon_cthd", data[0].mauso);
    } catch (e) {
        console.log(e.message);
    }
}

function f_lay_thong_tin_chi_tiet_kh_cthd(makh) {
    try {
        var config = { namesql: "HD_KHACHHANG_PKG.DanhSachKhachHang", callback: "f_result_chitietkhachhang_cthd", connstr: "Oracle_HDDT" };
        var para = { v_Makh: makh };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_chitietkhachhang_cthd(config, para, result) {
    try {
        var data = result.data;
        if (data == [] || data == null || data == undefined || data.length == 0) {
            return;
        }
        
        okh = data[0];
        fill_chitietkhachhang_cthd(okh);
    } catch (e) {
        console.log(e);
    }
}

function fill_chitietkhachhang_cthd(okh) {
    try {
        $("#txt_tenkh_cthd").text(okh.tenkhachhang);
        $("#txt_makh_cthd").text(okh.madiemdo);
        $("#txt_dienthoaikh_cthd").text(okh.dienthoai);
        $("#txt_diachikh_cthd").text(okh.diachi);
        $("#txt_masothuekh_cthd").text(okh.masothue);
        $("#txt_socongto_cthd").text(okh.socongto);
        $("#txt_soho_cthd").text(okh.soho);
        $("#txt_capdienap_cthd").text(okh.capdienap);
        $("#txt_matt_cthd").text(okh.mathanhtoan);
        $("#txt_mann_cthd").text(okh.mann);
        
        $("#txt_matram_cthd").text(okh.matram);
        $("#txt_soghi_cthd").text(okh.maso);
        $("#txt_p_gcs_cthd").text(okh.p_gcs);
    } catch (e) {
        console.log(e.message);
    }
}

function f_tinh_hoa_don_cthd(makh) {
    try {
        var user = JSON.parse(localStorage["userinfo"]);
        var config = { namesql: "HD_HOADON.TinhHoaDonMotKhachHang", callback: "f_result_tinhoadon_cthd", connstr: "Oracle_HDDT" };
        var para = {
            v_Madiemdo : makh,
            v_KyChot: $("#cbb_kychot_cthd").val(),
            v_Date:  '01/' + $('#txt_thang_cthd').val(),
            v_UserId: user.userid
        };
        console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_tinhoadon_cthd(config, para, result) {
    try {
        var data = result.data;
        console.log(data);
        if (data == [] || data == null || data == undefined || data.length == 0) {
            $("#table_tmhd tbody").empty();
            return;
        }
        $("#table_tmhd tbody").empty();
        $("#txt_magia_cthd").text(data[0].magia);
        if (data[0].loaibacgia === '3BIEU') { // Loại hóa đơn 3 pha 3 biểu giá
            if (data[0].ghichu === 'TREOTHAO') { // Loại hóa đơn có treo tháo trong kỳ
                if (data.length > 6) // Có nhiều đơn giá
                    f_ve_bang_nhieu_don_gia_cthd_treothao(data);
                else f_ve_bang_mot_don_gia_3bieu_cthd_treothao(data);
            } else if (data[0].ghichu === 'TREOTHAODOIGIA') {
                f_ve_bang_mot_don_gia_3bieu_cthd_treothao(data);
            } else {
                if (data.length > 3)
                    f_ve_bang_nhieu_don_gia_cthd(data);
                else f_ve_bang_mot_don_gia_3bieu_cthd(data);
            }
            
        } else { // Hóa đơn điện sinh hoạt, kiểu đơn giá bậc thang
            if (data[0].ghichu === 'TREOTHAO')
                f_ve_bang_mot_don_gia_cthd_treothao(data);
            else f_ve_bang_mot_don_gia_cthd(data);
        }

        var display = $('.sltruphu').css('display');
        console.log(display);
        if (display === 'none') {
            var colspan1 = $("#rowsum").attr('colspan');
            $("#rowsum").attr('colspan', colspan1 - 2);
            var colspan2 = $("#tienbangchu").attr('colspan');
            $("#tienbangchu").attr('colspan', colspan2 - 2);
        }

    } catch (e) {
        console.log(e.message);
    }
    
}

function f_ve_bang_mot_don_gia_cthd_treothao(data) {
    try {
        var val = data[0];
        console.log(data[0]);
        $("#table_tmhd th.socongto").show();
        var rowTong = "<tr><td class='a_c'>"
                + val.mabcs + val.loaitreothao + "</td><td></td><td class='a_c'>"
                + (val.chisomoi_char === null ? "" : val.chisomoi_char) + "</td><td class='a_c'>"
                + (val.chisocu_char === null ? "" : val.chisocu_char) + "</td><td class='a_c'>"
                + val.hsn + "</td><td class='a_r'>"
                + val.sl_tong_char + "</td><td>" + "</td><td>" + "</td></tr>";
        $("#table_tmhd tbody").append(rowTong);
        $.each(data, function (key, val) {
            var row = "<tr><td>" + "</td><td>"
                + val.socongto + "</td><td"
                + "</td><td>" + "</td><td>" + "</td><td>" + "</td><td class='a_r'>"
                + val.sanluong_char + "</td><td class='sltruphu a_c'>"
                + val.sltruphu_char + "</td><td class='dnthucte a_r'>"
                + val.slthucte_char + "</td><td class='a_r'>"
                + val.dongia_char + "</td><td class='a_r'>"
                + val.thanhtien_char + "</td></tr>";
            $("#table_tmhd tbody").append(row);
        });
        var sum0 = '<tr><td rowspan="4" colspan="6" id="rowsum"></td></tr>';
        var sum1 = "<tr><td>Cộng: </td>"
                + "<td class='a_r'>" + data[0].sl_tong_char + "</td><td class='a_r'></td><td class='a_r text-bold'>" + data[0].tongtien_char + "</td></tr>";
        var sum2 = "<tr><td colspan=3>Thuế suất GTGT 10%   Thuế GTGT</td><td class='a_r text-bold'>" + data[0].vat_char + "</td></tr>";
        var sum3 = "<tr><td colspan=3>Tổng cộng tiền thanh toán</td><td class='a_r text-bold'>" + data[0].tongtienvat_char + "</td></tr>";
        var sotienchu = "<tr><td colspan=10 id='tienbangchu'>Số tiền viết bằng chữ: " + data[0].sotienbangchu + "</td></tr>";
        $("#table_tmhd tbody").append(sum0 + sum1 + sum2 + sum3 + sotienchu);
    } catch (e) {
        console.log(e.message);
    }
    
}

function f_ve_bang_mot_don_gia_3bieu_cthd_treothao(data) {
    try {
        var val = data[0];
        console.log('f_ve_bang_mot_don_gia_3bieu_cthd_treothao');
        console.log(data[0]);
        $("#table_tmhd th.socongto").show();
        
        $.each(data, function (key, val) {
            var row = "<tr><td class='a_c'>"
                + val.mabcs + val.loaitreothao + "</td><td>"
                + val.socongto + "</td><td class='a_c'>"
                + (val.chisomoi_char === null ? "" : val.chisomoi_char) + "</td><td class='a_c'>"
                + (val.chisocu_char === null ? "" : val.chisocu_char) + "</td><td class='a_c'>"
                + val.hsn + "</td><td class='a_r'>"
                + val.sanluong_char + "</td><td class='sltruphu a_c'>"
                + val.sltruphu_char + "</td><td class='dnthucte a_r'>"
                + val.slthucte_char + "</td><td class='a_r'>"
                + val.dongia_char + "</td><td class='a_r'>"
                + val.thanhtien_char + "</td></tr>";
            
            $("#table_tmhd tbody").append(row);
        });
        var sum0 = '<tr><td rowspan="4" colspan="6" id="rowsum"></td></tr>';
        var sum1 = "<tr><td>Cộng: </td>"
                + "<td class='a_r'>" + data[0].sl_tong_char + "</td><td class='a_r'></td><td class='a_r text-bold'>" + data[0].tongtien_char + "</td></tr>";
        var sum2 = "<tr><td colspan=3>Thuế suất GTGT 10%   Thuế GTGT</td><td class='a_r text-bold'>" + data[0].vat_char + "</td></tr>";
        var sum3 = "<tr><td colspan=3>Tổng cộng tiền thanh toán</td><td class='a_r text-bold'>" + data[0].tongtienvat_char + "</td></tr>";
        var sotienchu = "<tr><td colspan=10 id='tienbangchu'>Số tiền viết bằng chữ: " + data[0].sotienbangchu + "</td></tr>";
        $("#table_tmhd tbody").append(sum0 + sum1 + sum2 + sum3 + sotienchu);
    } catch (e) {
        console.log(e.message);
    }

}



function f_ve_bang_mot_don_gia_cthd(data) {
    try {
        console.log('f_ve_bang_mot_don_gia_cthd');
        var val = data[0];
        console.log(data[0]);
        $("#table_tmhd th.socongto").hide();
        var rowTong = "<tr><td class='a_c'>"
                + val.mabcs + "</td><td class='a_c'>"
                + (val.chisomoi_char === null ? "" : val.chisomoi_char) + "</td><td class='a_c'>"
                + (val.chisocu_char === null ? "" : val.chisocu_char) + "</td><td class='a_c'>"
                + val.hsn + "</td><td class='a_r'>"
                + val.sl_tong_char + "</td><td>" + "</td><td>" + "</td></tr>";
        $("#table_tmhd tbody").append(rowTong);
        $.each(data, function (key, val) {
            var row = "<tr><td>"
                + "</td><td>" + "</td><td>" + "</td><td>" + "</td><td class='a_r'>"
                + val.sanluong_char + "</td><td class='sltruphu a_c'>"
                + val.sltruphu_char + "</td><td class='dnthucte a_r'>"
                + val.slthucte_char + "</td><td class='a_r'>"
                + val.dongia_char + "</td><td class='a_r'>"
                + val.thanhtien_char + "</td></tr>";
            $("#table_tmhd tbody").append(row);
        });
        var sum0 = '<tr><td rowspan="4" colspan="5" id="rowsum"></td></tr>';
        var sum1 = "<tr><td>Cộng: </td>"
                + "<td class='a_r'>" + data[0].sl_tong_char + "</td><td class='a_r'></td><td class='a_r text-bold'>" + data[0].tongtien_char + "</td></tr>";
        var sum2 = "<tr><td colspan=3>Thuế suất GTGT 10%   Thuế GTGT</td><td class='a_r text-bold'>" + data[0].vat_char + "</td></tr>";
        var sum3 = "<tr><td colspan=3>Tổng cộng tiền thanh toán</td><td class='a_r text-bold'>" + data[0].tongtienvat_char + "</td></tr>";
        var sotienchu = "<tr><td colspan=9 id='tienbangchu'>Số tiền viết bằng chữ: " + data[0].sotienbangchu + "</td></tr>";
        $("#table_tmhd tbody").append(sum0 + sum1 + sum2 + sum3 + sotienchu);
    } catch (e) {
        console.log(e.message);
    }

}

function f_ve_bang_mot_don_gia_3bieu_cthd(data) {
    try {
        console.log('f_ve_bang_mot_don_gia_3bieu_cthd');
        var val = data[0];
        console.log(data[0]);
        $("#table_tmhd th.socongto").hide();
        $.each(data, function (key, val) {
            var row = "<tr><td class='a_c'>"
                + val.mabcs + "</td><td class='a_c'>"
                + (val.chisomoi_char === null ? "" : val.chisomoi_char) + "</td><td class='a_c'>"
                + (val.chisocu_char === null ? "" : val.chisocu_char) + "</td><td class='a_c'>"
                + val.hsn + "</td><td class='a_r'>"
                + val.sanluong_char + "</td><td class='sltruphu a_c'>"
                + val.sltruphu_char + "</td><td class='dnthucte a_r'>"
                + val.slthucte_char + "</td><td class='a_r'>"
                + val.dongia_char + "</td><td class='a_r'>"
                + val.thanhtien_char + "</td></tr>";
            $("#table_tmhd tbody").append(row);
        });
        var sum0 = '<tr><td rowspan="4" colspan="5" id="rowsum"></td></tr>';
        var sum1 = "<tr><td>Cộng: </td>"
                + "<td class='a_r'>" + data[0].sl_tong_char + "</td><td class='a_r'></td><td class='a_r text-bold'>" + data[0].tongtien_char + "</td></tr>";
        var sum2 = "<tr><td colspan=3>Thuế suất GTGT 10%   Thuế GTGT</td><td class='a_r text-bold'>" + data[0].vat_char + "</td></tr>";
        var sum3 = "<tr><td colspan=3>Tổng cộng tiền thanh toán</td><td class='a_r text-bold'>" + data[0].tongtienvat_char + "</td></tr>";
        var sotienchu = "<tr><td colspan=9 id='tienbangchu'>Số tiền viết bằng chữ: " + data[0].sotienbangchu + "</td></tr>";
        $("#table_tmhd tbody").append(sum0 + sum1 + sum2 + sum3 + sotienchu);
    } catch (e) {
        console.log(e.message);
    }

}

function f_ve_bang_nhieu_don_gia_cthd(data) {
    console.log('f_ve_bang_nhieu_don_gia_cthd');
    $("#table_tmhd th.socongto").hide();
    try {
        // Cao điểm
        var dataCD = $.grep(data, function (item, i) {
            return item.mabcs === 'CD';
        })
        $.each(dataCD, function (key, val) {
            if (key == 0) {
                var rowTong = "<tr><td class='a_c'>"
                + val.mabcs + "</td><td class='a_c'>"
                + (val.chisomoi_char === null ? "" : val.chisomoi_char) + "</td><td class='a_c'>"
                + (val.chisocu_char === null ? "" : val.chisocu_char) + "</td><td class='a_c'>"
                + val.hsn + "</td><td class='a_r'>"
                + val.sl_tong_mabcs_char + "</td><td>" + "</td><td>" + "</td></tr>";
                $("#table_tmhd tbody").append(rowTong);
            }

            var row = "<tr><td>" + "</td><td>" + "</td><td>" + "</td><td>" + "</td><td class='a_r'>"
            + val.sanluong_char + "</td><td class='a_r'>"
            + val.dongia_char + "</td><td class='a_r'>"
            + val.thanhtien_char + "</td></tr>";
            $("#table_tmhd tbody").append(row);
        });


        //////////////////////////////
        // Thấp điểm
        var dataTD = $.grep(data, function (item, i) {
            return item.mabcs === 'TD';
        })
        $.each(dataTD, function (key, val) {
            if (key == 0) {
                var rowTong = "<tr><td class='a_c'>"
                + val.mabcs + "</td><td class='a_c'>"
                + (val.chisomoi_char === null ? "" : val.chisomoi_char) + "</td><td class='a_c'>"
                + (val.chisocu_char === null ? "" : val.chisocu_char) + "</td><td class='a_c'>"
                + val.hsn + "</td><td class='a_r'>"
                + val.sl_tong_mabcs_char + "</td><td>" + "</td><td>" + "</td></tr>";
                $("#table_tmhd tbody").append(rowTong);
            }
            var row = "<tr><td>" + "</td><td>" + "</td><td>" + "</td><td>" + "</td><td class='a_r'>"
            + val.sanluong_char + "</td><td class='a_r'>"
            + val.dongia_char + "</td><td class='a_r'>"
            + val.thanhtien_char + "</td></tr>";
            $("#table_tmhd tbody").append(row);
        });



        //////////////////////////
        // Bình thường
        var dataBT = $.grep(data, function (item, i) {
            return item.mabcs === 'BT';
        })
        $.each(dataBT, function (key, val) {
            if (key == 0) {
                var rowTong = "<tr><td class='a_c'>"
                + val.mabcs + "</td><td class='a_c'>"
                + (val.chisomoi_char === null ? "" : val.chisomoi_char) + "</td><td class='a_c'>"
                + (val.chisocu_char === null ? "" : val.chisocu_char) + "</td><td class='a_c'>"
                + val.hsn + "</td><td class='a_r'>"
                + val.sl_tong_mabcs_char + "</td><td>" + "</td><td>" + "</td></tr>";
                $("#table_tmhd tbody").append(rowTong);
            }

            var row = "<tr><td>" + "</td><td>" + "</td><td>" + "</td><td>" + "</td><td class='a_r'>"
            + val.sanluong_char + "</td><td class='a_r'>"
            + val.dongia_char + "</td><td class='a_r'>"
            + val.thanhtien_char + "</td></tr>";
            $("#table_tmhd tbody").append(row);
        });


        var sum0 = '<tr><td rowspan="4" colspan="3"></td></tr>';
        var sum1 = "<tr><td>Cộng: </td>"
                + "<td class='a_r'>" + data[0].sl_tong_char + "</td><td></td><td class='a_r' text-bold>" + data[0].tongtien_char + "</td></tr>";
        var sum2 = "<tr><td colspan=3>Thuế suất GTGT 10%   Thuế GTGT</td><td class='a_r  text-bold'>" + data[0].vat_char + "</td></tr>";
        var sum3 = "<tr><td colspan=3>Tổng cộng tiền thanh toán</td><td class='a_r text-bold'>" + data[0].tongtienvat_char + "</td></tr>";
        var sotienchu = "<tr><td colspan=7>Số tiền viết bằng chữ: " + data[0].sotienbangchu + "</td></tr>";
        $("#table_tmhd tbody").append(sum0 + sum1 + sum2 + sum3 + sotienchu);
    } catch (e) {
        console.log(e.message);
    }
    
}

function f_ve_bang_nhieu_don_gia_cthd_treothao(data) {
    console.log('f_ve_bang_nhieu_don_gia_cthd_treothao');
    $("#table_tmhd th.socongto").show();
    try {
        // Cao điểm
        var dataCD = $.grep(data, function (item, i) {
            return item.mabcs === 'CD';
        })
        $.each(dataCD, function (key, val) {
            if (key == 0) {
                var rowTong = "<tr><td class='a_c'>"
                + val.mabcs + "</td><td></td><td class='a_c'>"
                + (val.chisomoi_char === null ? "" : val.chisomoi_char) + "</td><td class='a_c'>"
                + (val.chisocu_char === null ? "" : val.chisocu_char) + "</td><td class='a_c'>"
                + val.hsn + "</td><td class='a_r'>"
                + val.sl_tong_mabcs_char + "</td><td>" + "</td><td>" + "</td></tr>";
                $("#table_tmhd tbody").append(rowTong);
            }

            var row = "<tr><td></td>"
            + "<td class='a_c'>" + val.socongto + "</td><td"
            + "</td><td>" + "</td><td>" + "</td><td>" + "</td><td class='a_r'>"
            + val.sanluong_char + "</td><td class='a_r'>"
            + val.dongia_char + "</td><td class='a_r'>"
            + val.thanhtien_char + "</td></tr>";
            $("#table_tmhd tbody").append(row);
        });


        //////////////////////////////
        // Thấp điểm
        var dataTD = $.grep(data, function (item, i) {
            return item.mabcs === 'TD';
        })
        $.each(dataTD, function (key, val) {
            if (key == 0) {
                var rowTong = "<tr><td class='a_c'>"
                + val.mabcs + "</td><td></td><td class='a_c'>"
                + (val.chisomoi_char === null ? "" : val.chisomoi_char) + "</td><td class='a_c'>"
                + (val.chisocu_char === null ? "" : val.chisocu_char) + "</td><td class='a_c'>"
                + val.hsn + "</td><td class='a_r'>"
                + val.sl_tong_mabcs_char + "</td><td>" + "</td><td>" + "</td></tr>";
                $("#table_tmhd tbody").append(rowTong);
            }
            var row = "<tr><td></td>"
            + "<td class='a_c'>" + val.socongto + "</td><td"
            + "</td><td>" + "</td><td>" + "</td><td>" + "</td><td class='a_r'>"
            + val.sanluong_char + "</td><td class='a_r'>"
            + val.dongia_char + "</td><td class='a_r'>"
            + val.thanhtien_char + "</td></tr>";
            $("#table_tmhd tbody").append(row);
        });



        //////////////////////////
        // Bình thường
        var dataBT = $.grep(data, function (item, i) {
            return item.mabcs === 'BT';
        })
        $.each(dataBT, function (key, val) {
            if (key == 0) {
                var rowTong = "<tr><td class='a_c'>"
                + val.mabcs + "</td><td></td><td class='a_c'>"
                + (val.chisomoi_char === null ? "" : val.chisomoi_char) + "</td><td class='a_c'>"
                + (val.chisocu_char === null ? "" : val.chisocu_char) + "</td><td class='a_c'>"
                + val.hsn + "</td><td class='a_r'>"
                + val.sl_tong_mabcs_char + "</td><td>" + "</td><td>" + "</td></tr>";
                $("#table_tmhd tbody").append(rowTong);
            }

            var row = "<tr><td></td>"
            + "<td class='a_c'>" + val.socongto + "</td><td"
            + "</td><td>" + "</td><td>" + "</td><td>" + "</td><td class='a_r'>"
            + val.sanluong_char + "</td><td class='a_r'>"
            + val.dongia_char + "</td><td class='a_r'>"
            + val.thanhtien_char + "</td></tr>";
            $("#table_tmhd tbody").append(row);
        });


        var sum0 = '<tr><td rowspan="4" colspan="4"></td></tr>';
        var sum1 = "<tr><td>Cộng: </td>"
                + "<td class='a_r'>" + data[0].sl_tong_char + "</td><td></td><td class='a_r' text-bold>" + data[0].tongtien_char + "</td></tr>";
        var sum2 = "<tr><td colspan=3>Thuế suất GTGT 10%   Thuế GTGT</td><td class='a_r  text-bold'>" + data[0].vat_char + "</td></tr>";
        var sum3 = "<tr><td colspan=3>Tổng cộng tiền thanh toán</td><td class='a_r text-bold'>" + data[0].tongtienvat_char + "</td></tr>";
        var sotienchu = "<tr><td colspan=8>Số tiền viết bằng chữ: " + data[0].sotienbangchu + "</td></tr>";
        $("#table_tmhd tbody").append(sum0 + sum1 + sum2 + sum3 + sotienchu);
    } catch (e) {
        console.log(e.message);
    }

}



function f_lay_thong_tin_ky_chot_cthd(madiemdo, kychot, thangchot) {
    try {
        var config = {
            namesql: "HD_THIETLAPKYCHOT_PKG.LayThongTinKyChot_MaDiemDo",
            callback: "f_result_lay_thong_tin_ky_chot_cthd",
            connstr: "Oracle_HDDT"
        };
        var code = $("#cb_soghi").val();
        if (code == "-1") code = $("#cb_tram").val();
        if (code == "-1") code = $("#cb_dienluc").val();
        var para = {
            v_madiemdo: madiemdo,
            v_Kychot: kychot,
            v_Date: thangchot
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e.message);
    }
}

function f_result_lay_thong_tin_ky_chot_cthd(config, para, result) {
    try {
        var data = result.data;
        if (data == [] || data == null || data == undefined || data.length == 0 || data[0].kq == '0') {
            return;
        }
        $("#txt_tungay_cthd").val(data[0].tungay);
        $("#txt_denngay_cthd").val(data[0].denngay);
    } catch (e) {
        console.log(e);
    }
}

// ***********************************************
// END-REGION TÍNH CHI TIẾT HÓA ĐƠN CHƯA ĐƯỢC LẬP







// ***********************************************
// REGION LẤY THÔNG TIN CHI TIẾT HÓA ĐƠN ĐÃ LẬP

function f_lay_chi_tiet_hoa_don_cthd(idhoadon) {
    try {
        var config = { namesql: "HD_HOADON_TRACUU.Chitiethoadon", callback: "f_result_chi_tiet_hoa_don_cthd", connstr: "Oracle_HDDT" };
        var para = {
            v_Idhoadon: idhoadon
        };
        console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e.message);
    }
}

function f_result_chi_tiet_hoa_don_cthd(config, para, result) {
    try {
        var data = result.data;
        console.log(data);
        $("#table_tmhd tbody").empty();
        if (data == [] || data == null || data == undefined || data.length == 0) {
            return;
        }
        var data_mauhoadon = data[0].kq0;
        var data_khachhang = data[1].kq1;
        var data_chitiethd = data[2].kq2;

        // Fill thông tin hóa đơn
        fill_thongtinhoadon_cthd(data_chitiethd);

        var result = { data: data_chitiethd };
        f_result_tinhoadon_cthd('', '', result);

        // Fill dữ liệu khách hàng
        fill_chitietkhachhang_cthd(data_khachhang[0]);

        // Fill dữ liệu mẫu hóa đơn
        fill_mau_hoa_don_cthd(data_mauhoadon);
    } catch (e) {
        console.log(e.message);
    }
    
}

function fill_thongtinhoadon_cthd(data) {
    try {
        if (data == [] || data == null || data == undefined || data.length == 0) {
            $("#table_tmhd tbody").empty();
            return;
        }
        console.log(data);
        $("#txt_thang_cthd").val(data[0].ngayxuathoadon.toString().substr(3, 7));
        $("#cbb_kychot_cthd").val(data[0].kyhoadon);
        $("#txt_tungay_cthd").val(data[0].tungay);
        $("#txt_denngay_cthd").val(data[0].denngay);
        $("#txt_magia_cthd").text(data[0].magia);
    } catch (e) {
        console.log(e.message);
    }
    
}



