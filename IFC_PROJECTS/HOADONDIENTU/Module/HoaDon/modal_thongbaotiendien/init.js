var okh;
$(document).ready(function () {

});


// ***********************************************
// REGION TÍNH CHI TIẾT HÓA ĐƠN CHƯA ĐƯỢC LẬP


function f_lay_thong_tin_chi_tiet_kh_tbtd(makh) {
    try {
        var config = { namesql: "HD_KHACHHANG_PKG.DanhSachKhachHang", callback: "f_result_chitietkhachhang_tbtd", connstr: "Oracle_HDDT" };
        var para = { v_Makh: makh };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_chitietkhachhang_tbtd(config, para, result) {
    try {
        var data = result.data;
        if (data == [] || data == null || data == undefined || data.length == 0) {
            return;
        }
        
        okh = data[0];
        fill_chitietkhachhang_tbtd(okh);
    } catch (e) {
        console.log(e);
    }
}

function fill_chitietkhachhang_tbtd(okh) {
    try {
        $("#txt_tenkh_tbtd").text(okh.tenkhachhang);
        $("#txt_dienthoaikh_tbtd").text(okh.dienthoai);
        $("#txt_diachikh_tbtd").text(okh.diachi);
        $("#txt_masothuekh_tbtd").text(okh.masothue);
    } catch (e) {
        console.log(e.message);
    }
}

function fill_thong_tin_dien_luc(data) {
    try {
        console.log(data);
        $("#txt_tencongty_tbtd").text(data.tencty);
        $("#txt_diachi_tbtd").text(data.diachi_cty);
        $("#txt_dienthoaicty_tbtd").text(data.dienthoai_cty);
        $("#txt_masothuecty_tbtd").text(data.masothue_cty);
        $("#txt_faxcty_tbtd").text(data.fax);
        $("#txt_dienthoaisuachuacty_tbtd").text(data.dienthoai_suachua);
        $("#txt_sotaikhoannh_tbtd").text(data.sotkn_hang);
        $("#txt_idnganhang_tbtd").text(data.idngan_hang);
    } catch (e) {
        console.log(e.message);
    }
}

function f_tinh_hoa_don_tbtd(makh) {
    try {
        var user = JSON.parse(localStorage["userinfo"]);
        var config = { namesql: "HD_HOADON.TinhHoaDonMotKhachHang", callback: "f_result_tinhoadon_tbtd", connstr: "Oracle_HDDT" };
        var para = {
            v_Madiemdo : makh,
            v_KyChot: $("#cbb_kychot_tbtd").val(),
            v_Date:  '01/' + $('#txt_thang_tbtd').val(),
            v_UserId: user.userid
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_tinhoadon_tbtd(config, para, result) {
    try {
        var data = result.data;
        if (data == [] || data == null || data == undefined || data.length == 0) {
            $("#table_tmhd tbody").empty();
            return;
        }
        $("#table_tmhd tbody").empty();
        $("#txt_magia_tbtd").text(data[0].magia);
        if (data[0].loaibacgia === '3BIEU') { // Loại hóa đơn 3 pha 3 biểu giá
            if (data[0].ghichu === 'TREOTHAO') { // Loại hóa đơn có treo tháo trong kỳ
                if (data.length > 6) // Có nhiều đơn giá
                    f_ve_bang_nhieu_don_gia_tbtd_treothao(data);
                else f_ve_bang_mot_don_gia_3bieu_tbtd_treothao(data);
            } else if (data[0].ghichu === 'TREOTHAODOIGIA') {
                f_ve_bang_mot_don_gia_3bieu_tbtd_treothao(data);
            } else {
                if (data.length > 3)
                    f_ve_bang_nhieu_don_gia_tbtd(data);
                else f_ve_bang_mot_don_gia_3bieu_tbtd(data);
            }
            
        } else { // Hóa đơn điện sinh hoạt, kiểu đơn giá bậc thang
            if (data[0].ghichu === 'TREOTHAO')
                f_ve_bang_mot_don_gia_tbtd_treothao(data);
            else f_ve_bang_mot_don_gia_tbtd(data);
        }

        var display = $('.sltruphu').css('display');
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

function f_ve_bang_mot_don_gia_tbtd_treothao(data) {
    try {
        var val = data[0];
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

function f_ve_bang_mot_don_gia_3bieu_tbtd_treothao(data) {
    try {
        var val = data[0];
        console.log('f_ve_bang_mot_don_gia_3bieu_tbtd_treothao');
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



function f_ve_bang_mot_don_gia_tbtd(data) {
    try {
        console.log('f_ve_bang_mot_don_gia_tbtd');
        var val = data[0];
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

function f_ve_bang_mot_don_gia_3bieu_tbtd(data) {
    try {
        console.log('f_ve_bang_mot_don_gia_3bieu_tbtd');
        var val = data[0];
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

function f_ve_bang_nhieu_don_gia_tbtd(data) {
    console.log('f_ve_bang_nhieu_don_gia_tbtd');
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

function f_ve_bang_nhieu_don_gia_tbtd_treothao(data) {
    console.log('f_ve_bang_nhieu_don_gia_tbtd_treothao');
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



function f_lay_thong_tin_ky_chot_tbtd(madiemdo, kychot, thangchot) {
    try {
        var config = {
            namesql: "HD_THIETLAPKYCHOT_PKG.LayThongTinKyChot_MaDiemDo",
            callback: "f_result_lay_thong_tin_ky_chot_tbtd",
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

function f_result_lay_thong_tin_ky_chot_tbtd(config, para, result) {
    try {
        var data = result.data;
        if (data == [] || data == null || data == undefined || data.length == 0 || data[0].kq == '0') {
            return;
        }
        $("#txt_tungay_tbtd").val(data[0].tungay);
        $("#txt_denngay_tbtd").val(data[0].denngay);
    } catch (e) {
        console.log(e);
    }
}

// ***********************************************
// END-REGION TÍNH CHI TIẾT HÓA ĐƠN CHƯA ĐƯỢC LẬP







// ***********************************************
// REGION LẤY THÔNG TIN CHI TIẾT HÓA ĐƠN ĐÃ LẬP

function f_lay_chi_tiet_hoa_don_tbtd(idhoadon) {
    try {
        var config = { namesql: "HD_HOADON_TRACUU.Chitiethoadon", callback: "f_result_chi_tiet_hoa_don_tbtd", connstr: "Oracle_HDDT" };
        var para = {
            v_Idhoadon: idhoadon
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e.message);
    }
}

function f_result_chi_tiet_hoa_don_tbtd(config, para, result) {
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
        var data_thongtindienluc = data[3].kq3;

        // Fill thông tin hóa đơn
        fill_thongtinhoadon_tbtd(data_chitiethd);

        var result = { data: data_chitiethd };
        f_result_tinhoadon_tbtd('', '', result);

        // Fill dữ liệu khách hàng
        fill_chitietkhachhang_tbtd(data_khachhang[0]);

        // Fill thông tin điện lực
        fill_thong_tin_dien_luc(data_thongtindienluc[0]);
    } catch (e) {
        console.log(e.message);
    }
    
}

function fill_thongtinhoadon_tbtd(data) {
    try {
        if (data == [] || data == null || data == undefined || data.length == 0) {
            $("#table_tmhd tbody").empty();
            return;
        }
        console.log(data);
        //$("#txt_thang_tbtd").val(data[0].ngayxuathoadon.toString().substr(3, 7));
        $("#txt_kyhoadon_tbtd").text(data[0].kyhoadon);
        $("#txt_tungay_tbtd").text(data[0].tungay);
        $("#txt_denngay_tbtd").text(data[0].denngay);
    } catch (e) {
        console.log(e.message);
    }
    
}



