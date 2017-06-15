var okh;
$(document).ready(function () {

});


// ***********************************************
// REGION TÍNH CHI TIẾT HÓA ĐƠN CHƯA ĐƯỢC LẬP

function f_lay_thong_tin_ky_chot_cthdpk(madiemdo, kychot, thangchot) {
    try {
        var config = {
            namesql: "HD_THIETLAPKYCHOT_PKG.LayThongTinKyChot_MaDiemDo",
            callback: "f_result_lay_thong_tin_ky_chot_cthdpk",
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

function f_result_lay_thong_tin_ky_chot_cthdpk(config, para, result) {
    try {
        var data = result.data;
        if (data == [] || data == null || data == undefined || data.length == 0 || data[0].kq == '0') {
            return;
        }
        $("#txt_tungay_cthdpk").val(data[0].tungay);
        $("#txt_denngay_cthdpk").val(data[0].denngay);
    } catch (e) {
        console.log(e);
    }
}

function f_lay_mau_hoa_don_cthdpk() {
    try {
        var config = { namesql: "HD_MAUHOADON_PKG.DanhSachMauHoaDon", callback: "f_result_mau_hoa_don_cthdpk", connstr: "Oracle_HDDT" };
        var para = {
            v_Mamau: '',
            v_Trangthaisudung: null,
            v_Loaimauhoadon: 2,
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_mau_hoa_don_cthdpk(config, para, result) {
    try {
        var data = result.data;
        if (data == [] || data == null || data == undefined || data.length == 0) {
            $("#table_tmhd tbody").empty();
            return;
        }
        fill_mau_hoa_don_cthdpk(data);
    } catch (e) {
        console.log(e);
    }
}

function fill_mau_hoa_don_cthdpk(data) {
    try {
        setValToTxt("txt_kyhieuhoadon_cthdpk", data[0].mauso);
        setValToTxt("txt_mahoadon_cthdpk", data[0].mahoadon == null ? '' : data[0].mahoadon);
        setValToTxt("cb_mausohoadon_cthdpk", data[0].kyhieu);
    } catch (e) {
        console.log(e.message);
    }
}


function f_lay_thong_tin_chi_tiet_kh_cthdpk(makh) {
    try {
        var config = { namesql: "HD_KHACHHANG_PKG.DanhSachKhachHang", callback: "f_result_chitietkhachhang_cthdpk", connstr: "Oracle_HDDT" };
        var para = { v_Makh: makh };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_chitietkhachhang_cthdpk(config, para, result) {
    try {
        var data = result.data;
        if (data == [] || data == null || data == undefined || data.length == 0) {
            return;
        }
        
        okh = data[0];
        fill_chitietkhachhang_cthdpk(okh);
    } catch (e) {
        console.log(e);
    }
}

function fill_chitietkhachhang_cthdpk(okh) {
    try {
        $("#txt_tenkh_cthdpk").text(okh.tenkhachhang);
        $("#txt_makh_cthdpk").text(okh.madiemdo);
        $("#txt_dienthoaikh_cthdpk").text(okh.dienthoai);
        $("#txt_diachikh_cthdpk").text(okh.diachi);
        $("#txt_masothuekh_cthdpk").text(okh.masothue);
        $("#txt_socongto_cthdpk").text(okh.socongto);
        $("#txt_soho_cthdpk").text(okh.soho);
        $("#txt_capdienap_cthdpk").text(okh.capdienap);
        $("#txt_matt_cthdpk").text(okh.mathanhtoan);
        $("#txt_mann_cthdpk").text(okh.mann);
        
        $("#txt_matram_cthdpk").text(okh.matram);
        $("#txt_soghi_cthdpk").text(okh.maso);
        $("#txt_p_gcs_cthdpk").text(okh.p_gcs);
    } catch (e) {
        console.log(e.message);
    }
}

function f_tinh_hoa_don_cthdpk(makh) {
    try {
        var user = JSON.parse(localStorage["userinfo"]);
        var config = { namesql: "HD_HOADON.TinhHDMotKhachHang_Phankhang", callback: "f_result_tinhoadon_cthdpk", connstr: "Oracle_HDDT" };
        var para = {
            v_Madiemdo : makh,
            v_KyChot: $("#cbb_kychot_cthdpk").val(),
            v_Date:  '01/' + $('#txt_thang_cthdpk').val(),
            v_UserId: user.userid
        };
        callLoad();
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_tinhoadon_cthdpk(config, para, result) {
    try {
        var data = result.data;
        console.log(data);
        if (data == [] || data == null || data == undefined || data.length == 0) {
            $("#table_tmhd tbody").empty();
            return;
        }
        $("#table_tmhd tbody").empty();
        $("#txt_magia_cthdpk").text(data[0].magia);
        f_draw_table_cthdpk(data);
        stopLoad();
    } catch (e) {
        console.log(e.message);
    }
    
}

function f_draw_table_cthdpk(data) {
    try {
        var val = data[0];
        console.log(data[0]);
        $("#table_tmhdpk tbody").empty();
        var rowTong = "<tr style='height:70px;'><td class='a_c'>"
                + val.socongto + "</td><td class='a_c'>"
                + (val.chisomoi_char === null ? "" : val.chisomoi_char) + "</td><td class='a_c'>"
                + (val.chisocu_char === null ? "" : val.chisocu_char) + "</td><td class='a_c'>"
                + val.hsn + "</td><td class='a_r'>"
                + val.sl_tong_char + "</td></tr>";
        $("#table_tmhdpk tbody").append(rowTong);
        var sum0 = '<tr><td rowspan="8" colspan="2"></td></tr>';
        var sum1 = "<tr><td colspan=2>Cộng: </td>"
                + "<td class='a_r'>" + data[0].sl_tong_char + "</td></tr>";
        var sum2 = "<tr><td colspan=2>Tổng ĐN hữu công </td>"
                + "<td class='a_r'>" + data[0].tongsanluonghuucong_char + "</td></tr>";
        var sum3 = "<tr><td colspan=2>Cosfi: " + data[0].cosfi + " </td>"
                + "<td class='a_r'>" + data[0].kcosfi + "</td></tr>";
        var sum4 = "<tr><td colspan=2>Tiền điện năng hữu công (Tp) </td>"
                + "<td class='a_r'>" + data[0].tongtienhuucong_char + " </td></tr>";
        var sum5 = "<tr><td colspan=2>Tiền CSPK (Tp*k)</td>"
                + "<td class='a_r'>" + data[0].tongtien_char + "</td></tr>";
        var sum6 = "<tr><td colspan=2>Thuế suất GTGT 10%</td>"
                + "<td class='a_r'>" + data[0].vat_char + "</td></tr>";
        var sum7 = "<tr><td colspan=2>Tổng tiền thanh toán</td>"
                + "<td class='a_r'>" + data[0].tongtienvat_char + "</td></tr>";
        var sotienchu = "<tr><td colspan=5>Số tiền viết bằng chữ: " + data[0].sotienbangchu + "</td></tr>";
        $("#table_tmhdpk tbody").append(sum0 + sum1 + sum2 + sum3 + sum4 + sum5 + sum6 + sum7 + sotienchu);
        stopLoad();
    } catch (e) {
        console.log(e.message);
    }

}


// ***********************************************
// END-REGION TÍNH CHI TIẾT HÓA ĐƠN CHƯA ĐƯỢC LẬP







// ***********************************************
// REGION LẤY THÔNG TIN CHI TIẾT HÓA ĐƠN ĐÃ LẬP

function f_lay_chi_tiet_hoa_don_cthdpk(idhoadon) {
    try {
        var config = { namesql: "HD_HOADON_TRACUU.Chitiethoadon", callback: "f_result_chi_tiet_hoa_don_cthdpk", connstr: "Oracle_HDDT" };
        var para = {
            v_Idhoadon: idhoadon
        };
        console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e.message);
    }
}

function f_result_chi_tiet_hoa_don_cthdpk(config, para, result) {
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
        fill_thongtinhoadon_cthdpk(data_chitiethd);


        // Vẽ bảng chi tiết hóa đơn
        if (data_chitiethd[0].loaibacgia === '3BIEU' && data_chitiethd.length > 3) {
            if (data_chitiethd[0].ghichu === 'TREOTHAO')
                f_ve_bang_nhieu_don_gia_cthdpk_treothao(data_chitiethd);
            else f_ve_bang_nhieu_don_gia_cthdpk(data_chitiethd);
        } else {
            if (data_chitiethd[0].ghichu === 'TREOTHAO')
                f_ve_bang_mot_don_gia_cthdpk_treothao(data_chitiethd);
            else f_ve_bang_mot_don_gia_cthdpk(data_chitiethd);
        }

        // Fill dữ liệu khách hàng
        fill_chitietkhachhang_cthdpk(data_khachhang[0]);

        // Fill dữ liệu mẫu hóa đơn
        fill_mau_hoa_don_cthdpk(data_mauhoadon);
    } catch (e) {
        console.log(e.message);
    }
    
}

function fill_thongtinhoadon_cthdpk(data) {
    try {
        if (data == [] || data == null || data == undefined || data.length == 0) {
            $("#table_tmhd tbody").empty();
            return;
        }
        console.log(data);
        $("#txt_thang_cthdpk").val(data[0].ngayxuathoadon.toString().substr(3, 7));
        $("#cbb_kychot_cthdpk").val(data[0].kyhoadon);
        $("#txt_tungay_cthdpk").val(data[0].tungay);
        $("#txt_denngay_cthdpk").val(data[0].denngay);
        $("#txt_magia_cthdpk").text(data[0].magia);
    } catch (e) {
        console.log(e.message);
    }
    
}

function f_ve_bang_mot_don_gia_cthdpk(data) {
    try {
        var val = data[0];
        console.log(data[0]);
        $("#table_tmhdpk tbody").empty();
        var rowTong = "<tr style='height:70px;'><td class='a_c'>"
                + val.socongto + "</td><td class='a_c'>"
                + (val.chisomoi_char === null ? "" : val.chisomoi_char) + "</td><td class='a_c'>"
                + (val.chisocu_char === null ? "" : val.chisocu_char) + "</td><td class='a_c'>"
                + val.hsn + "</td><td class='a_r'>"
                + val.sl_tong_char + "</td></tr>";
        $("#table_tmhdpk tbody").append(rowTong);
        var sum0 = '<tr><td rowspan="8" colspan="2"></td></tr>';
        var sum1 = "<tr><td colspan=2>Cộng: </td>"
                + "<td class='a_r'>" + data[0].sl_tong_char + "</td></tr>";
        var sum2 = "<tr><td colspan=2>Tổng ĐN hữu công </td>"
                + "<td class='a_r'>" + data[0].tongsanluonghuucong_char + "</td></tr>";
        var sum3 = "<tr><td colspan=2>Cosfi: " + data[0].cosfi + " </td>"
                + "<td class='a_r'>" + data[0].kcosfi + "</td></tr>";
        var sum4 = "<tr><td colspan=2>Tiền điện năng hữu công (Tp) </td>"
                + "<td class='a_r'>" + data[0].tongtienhuucong_char + " </td></tr>";
        var sum5 = "<tr><td colspan=2>Tiền CSPK (Tp*k)</td>"
                + "<td class='a_r'>" + data[0].tongtien_char + "</td></tr>";
        var sum6 = "<tr><td colspan=2>Thuế suất GTGT 10%</td>"
                + "<td class='a_r'>" + data[0].vat_char + "</td></tr>";
        var sum7 = "<tr><td colspan=2>Tổng tiền thanh toán</td>"
                + "<td class='a_r'>" + data[0].tongtienvat_char + "</td></tr>";
        var sotienchu = "<tr><td colspan=5>Số tiền viết bằng chữ: " + data[0].sotienbangchu + "</td></tr>";
        $("#table_tmhdpk tbody").append(sum0 + sum1 + sum2 + sum3 + sum4 + sum5 + sum6 + sum7 + sotienchu);
        stopLoad();
    } catch (e) {
        console.log(e.message);
    }

}



