$(document).ready(function () {
    loadchecklog_master();

    $("#curentPage").html("Đăng ký phát hành hóa đơn");
    loadConetent();
   
    initformelement();
    //$('#txt_ngaybatdausd_dkhd').datepicker({
    //    format: 'dd/mm/yyyy'
    //}).on('changeDate', function (ev) {
    //    $('#txt_ngaybatdausd_dkhd').datepicker('hide');
    //});
    //var dat = new Date();
    $('#txt_ngaylapphieu_dkhd').val(gettimenow());

    $("#btn_ghi_dkhd").click(function () {
        ////var check = f_checkValidateAll();
        ////if (check) {
        ////    messInfo("mess_dkhd", "Kiểm tra lại giá trị", "error");
        ////    return;
        ////}
        var check = f_checkValidateAll();
        if (check) {
            showToast('Kiểm tra lại giá trị nhập vào ', 'error');
            return;
        }
        f_confimYesNo('Lưu thông tin ?', 'Hủy', 'Đồng ý', f_ghi_phieu_gui_thong_bao_phat_hanh_dkhd)
    });

    $("#btn_ketxuatxml_dkhd").click(function () {
        //var check = f_checkValidateAll();
        //if (check) {
        //    messInfo("mess_dkhd", "Kiểm tra lại giá trị", "error");
        //    return;
        //}
        f_ket_xuat_xml_dkhd();
    });

    $("input[name=sohoadon_dkhd]").focusout(function () {
        try {
            f_checkValidateAll(this);
            var tuso = $("#txt_tuso_dkhd").val();
            var denso = $("#txt_denso_dkhd").val();
            if (tuso.toString().trim() !== '' && denso.toString().trim() !== '') {
                if (!isNaN(denso) && !isNaN(tuso)) {
                    var i_tuso = parseInt(tuso);
                    var i_denso = parseInt(denso);
                    $("#txt_soluong_dkhd").val(i_denso - i_tuso + 1);
                    $("#txt_denso_dkhd").val(lpad(denso, 7));
                    $("#txt_tuso_dkhd").val(lpad(tuso, 7));
                }
            }
        } catch (e) {
            console.log(e.message);
        }
    });

    $("#cb_mamauhoadon_dkhd").change(function () {
        f_lay_danh_sach_mau_hoa_don_dkhd($(this).val());
    });

    f_lay_danh_sach_congty_dkhd();
    f_lay_danh_sach_co_quan_thue_dkhd();
    f_lay_danh_sach_mau_hoa_don_dkhd('');
});



function lpad(str, max) {
    str = str.toString();
    return str.length < max ? lpad("0" + str, max) : str;
}

function f_lay_danh_sach_congty_dkhd() {
    try {
        var config = { namesql: "HD_LSTCOMBOX.LST_DONVICTY", callback: "f_result_lay_danh_sach_congty_dkhd", connstr: "Oracle_HDDT" };
        var para = {};
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e.message);
    }
}

function f_result_lay_danh_sach_congty_dkhd(config, para, result) {
    var data = result.data;
    console.log(data);
    if (data == [] || data == null || data == undefined || data.length == 0) {
        return;
    }
    setValToTxt("txt_masothue_dkhd", data[0].masothue_cty);
    setValToTxt("txt_congty_dkhd", data[0].tencty);
    setValToTxt("txt_diachi_dkhd", data[0].diachi_cty);
    setValToTxt("txt_dienthoai_dkhd", data[0].dienthoai_cty);
    setValToTxt("txt_nguoidaidien_dkhd", data[0].nguoi_ddpl);
}

function f_lay_danh_sach_co_quan_thue_dkhd() {
    try {
        var config = { namesql: "HD_LSTCOMBOX.LST_COQTHUE", callback: "f_result_lay_danh_sach_co_quan_thue_dkhd", connstr: "Oracle_HDDT" };
        var para = {};
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e.message);
    }
}

function f_result_lay_danh_sach_co_quan_thue_dkhd(config, para, result) {
    var data = result.data;
    console.log(data);
    if (data == [] || data == null || data == undefined || data.length == 0) {
        return;
    }
    dataToCob("cb_tencoquanthue_dkhd", data, "tencqt", "tencqt");
}

function f_lay_danh_sach_mau_hoa_don_dkhd(mamau) {
    try {
        var config = { namesql: "HD_MAUHOADON_PKG.DanhSachMauHoaDon", callback: "f_result_lay_danh_sach_mau_hoa_don_dkhd", connstr: "Oracle_HDDT" };
        var para = {
            v_Mamau: mamau,
            v_Trangthaisudung: '',
            v_Trangthaiphathanh: ''
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e.message);
    }
}

function f_result_lay_danh_sach_mau_hoa_don_dkhd(config, para, result) {
    var data = result.data;
    if (data == [] || data == null || data == undefined || data.length == 0) {
        return;
    }
    $("#txt_kyhieuhoadon_dkhd").val(data[0].kyhieu);
    $("#txt_mausohoadon_dkhd").val(data[0].mauso);
    $("#txt_loaihoadon_dkhd").val(data[0].loaihoadon);
    if(para.v_Mamau === '')
        dataToCob("cb_mamauhoadon_dkhd", data, "mamauhoadon", "mamauhoadon");
}

function f_ghi_phieu_gui_thong_bao_phat_hanh_dkhd() {
    try {
        
        var p = getAllIdMod();
        var user = JSON.parse(localStorage["userinfo"]);
        var config = { namesql: "HD_PHATHANHHOADON_PKG.HD_PHATHANHHOADON_INSERT", callback: "f_result_ghi_phieu_gui_thong_bao_phat_hanh_dkhd", connstr: "Oracle_HDDT" };
        var para = {
            p_MAMAUHOADON: p.cb_mamauhoadon_dkhd,
            p_NGAYCHAPNHANPHATHANH: null,
            p_MASOTHUE: p.txt_masothue_dkhd,
            p_MASOTHUEDONVICHUQUAN: p.txt_masothuedvchuquan_dkhd,
            p_GHICHU: p.txt_ghichu_dkhd,
            p_SOLUONG: p.txt_soluong_dkhd,
            p_TRANGTHAI: '5', // 5: Đã gửi thông báo phát hành cho thuế
            p_TENCOQUANTHUE: p.cb_tencoquanthue_dkhd,
            p_NGAYLAPPHIEU: p.txt_ngaylapphieu_dkhd,
            p_NGUOITAO: user.userid,
            p_TENDONVICHUQUAN: p.txt_tendonvichuquan_dkhd,
            p_DENSO: p.txt_denso_dkhd,
            p_TENDONVI: p.txt_congty_dkhd,
            p_TUSO: p.txt_tuso_dkhd,
            p_NGAYTAO: p.txt_ngaylapphieu_dkhd,
            p_ID: '',
            p_NGAYBATDAUSUDUNG: p.txt_ngaybatdausd_dkhd,
            p_NGUOIDAIDIENPHAPLUAT: p.txt_nguoidaidien_dkhd
        };
        console.log(para);
        ExecuteServiceSyns(config, para);
        
    } catch (e) {
        console.log(e);
    }
}

function f_result_ghi_phieu_gui_thong_bao_phat_hanh_dkhd(config, para, result) {
    var data = result.data;
    if (data == [] || data == null || data == undefined || data.length == 0 || data[0].kq == "0") {
        //messInfo("mess_dkhd", "Lưu dữ liệu không thành công", "error");
        showToast('Lưu dữ liệu không thành công', 'error');
        return;
    } else if (data[0].kq == "2") {
        //messInfo("mess_dkhd", "Mẫu hóa đơn này đã phát hành rồi.", "error");
        showToast('Mẫu hóa đơn này đã phát hành rồi. ', 'error');
        return;
    }
    else //messInfo("mess_dkhd", "Thông báo thành công", "success");
        showToast('Ghi thông báo phát hành hóa đơn thành công ', 'success');
}

function f_ket_xuat_xml_dkhd() {
    try {
        var p = getAllIdMod();
        var user = JSON.parse(localStorage["userinfo"]);
        var config = {
            callback: "f_result_ket_xuat_xml_dkhd",
            namefiletemplate: "MAU_PHAT_HANH_HOA_DON.txt",
            namefilecreate: "PhatHanhHoaDon.xml",
            savefileonserver: true
        };
        var para = {
            madvu_rep: 'HDDT-IFC',
            tendvu_rep: 'HDDT-IFC',
            pbandvu_rep: '1.0',
            ttinNhaCCapDVu_rep: '',
            matkhai_rep: '106',
            tentkhai_rep: 'Thông báo phát hành hóa đơn (TB01/AC)',
            motabmau_rep: '',
            pbantkhaixml_rep: '2.1.2',
            loaitkhai_rep: 'C',
            solan_rep: '0',
            kieuky_rep: 'D',
            kykkhai_rep: p.txt_ngaylapphieu_dkhd,
            kykkhaitungay_rep: p.txt_ngaylapphieu_dkhd,
            kykkhaidenngay_rep: p.txt_ngaylapphieu_dkhd,
            kykkhaituthang_rep: '',
            kykkhaidenthang_rep: '',
            macqtnoinop_rep: '',
            tencqtnoinop_rep: p.cb_tencoquanthue_dkhd,
            ngaylaptkhai: p.txt_ngaylapphieu_dkhd,
            malydogiahan_rep: '',
            lydogiahan_rep: '',
            nguoiky_rep: '',
            ngayky_rep: '',
            nganhnghekd_rep: '',
            mst_rep: p.txt_masothue_dkhd,
            tennnt_rep: p.txt_congty_dkhd,
            dchinnt_rep: p.txt_diachi_dkhd,
            phuongxa_rep: '',
            mahuyennnt_rep: '',
            tenhuyennnt_rep: '',
            matinhnnt_rep: '',
            tentinhnnt_rep: '',
            dthoainnt_rep: p.txt_dienthoai_dkhd,
            faxnnt_rep: '',
            emailnnt_rep: '',
            tenloaihdon_rep: p.txt_loaihoadon_dkhd,
            mauso_rep: p.txt_mausohoadon_dkhd,
            kyhieu_rep: p.txt_kyhieuhoadon_dkhd,
            soluong_rep: p.txt_soluong_dkhd,
            tuso_rep: p.txt_tuso_dkhd,
            denso_rep: p.txt_denso_dkhd,
            ngaybdausdung_rep: p.txt_ngaybatdausd_dkhd,
            tendoanhnghiepin_rep: '',
            mstdoanhnghiepin_rep: '',
            sohopdongdatin_rep: '',
            ngayhopdongdatin_rep: '',
            ten_donvichuquan_rep: p.txt_tendonvichuquan_dkhd,
            mst_donvichuquan_rep: p.txt_masothuedvchuquan_dkhd,
            tencqttiepnhan_rep: p.cb_tencoquanthue_dkhd,
            nguoidaidien_rep: p.txt_nguoidaidien_dkhd,
            ngaybcao_rep: p.txt_ngaylapphieu_dkhd
        };
        console.log(para);
        f_CreateFileXmlFromTemp_Api(config, para);

        
    } catch (e) {
        console.log(e);
    }
}

function f_result_ket_xuat_xml_dkhd(config, para, result) {
    console.log(result);
    window.open(urli + "/home/DownloadFileSaveOnServer/PhatHanhHoaDon.xml");
}