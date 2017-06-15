$(document).ready(function () {
    try {
        loadchecklog_master();

        $("#btn_khachang").click(function () {
            //f_inportFileCmiss();
            var check = checkvaidate();
            if (check != "") {
                messInfo("messinfo_xmlkbkh", check, 'error');
                $("#thonghopdong").hide();
                clear_nullxacthuc();
                return;
            }
       

            f_xacThucChuKySoa();


        });

    } catch (e) {
        console.log(e);
    }
});
function f_xacThucChuKySoa() {
    try{
      
        var p = getAllIdMod();
        var check = checkvaidate();
        if (check != "") {
            messInfo("messinfo_xmlkbkh", check, 'error');
            $("#thonghopdong").hide();
            clear_nullxacthuc();
            return;
        }
        messInfo("messinfo_xmlkbkh", '', 'error');
        $("#thonghopdong").hide();
        $("#anhload").show();

        var fdata = new FormData();
        var file = $("#txt_file").get(0).files;
    
        fdata.append("file", file[0]);
        fdata.append("serialNumber", serialNumber_Sign);
        var config = { callback: "f_result_xacThucChuKySo_xtcks", namefile: file.name };

        f_Sign_Verify_Xml(config, fdata);


    } catch (e) {
        console.log(e);
    }
}


function f_xacThucChuKySo_xtcks(thiss) {
    try {
    
        var p = getAllIdMod();
        var check = checkvaidate();
        if (check != "") {
            messInfo("messinfo_xmlkbkh", check, 'error');
            $("#thonghopdong").hide();
            clear_nullxacthuc();
            return;
        }
        messInfo("messinfo_xmlkbkh", '', 'error');
        $("#thonghopdong").hide();
        $("#anhload").show();
      
        var fdata = new FormData();
        var file = thiss.files[0];
        fdata.append("file", file);
        fdata.append("serialNumber", serialNumber_Sign);
        var config = { callback: "f_result_xacThucChuKySo_xtcks", namefile: file.name };

        f_Sign_Verify_Xml(config, fdata);

    } catch (e) {
        console.log(e);
    }
}
function f_result_xacThucChuKySo_xtcks(config, para, lst) {
    try {
        $("#anhload").hide();
        var data = lst.data;
        if (data == "ERROR" || data == [] || data == null) {
            messInfo("messinfo_xmlkbkh", 'File xác thực hóa đơn không đúng', 'error');
            $("#thonghopdong").hide();
            clear_nullxacthuc();
            return;
        }
       
        messInfo("messinfo_xmlkbkh", 'Xác thực hóa đơn thành công', 'ok');
        $("#thonghopdong").show();
        f_inportFileCmiss();

    } catch (e) {
        console.log(e);
    }
}
function checkvaidate() {
    try {
        var p = getAllIdMod();
        if (p.txt_file == '') return "Bạn chưa chọn file";
        var filePath = $('#txt_file')[0].files[0].name;
        var data = filePath.split('.');
        if (data[1] != 'xml') return "Không đúng đinh dạng file xml";
        return "";
    } catch (e) {
        console.log(e);
    }
}
function f_inportFileCmiss() {
    try {
      
        var p = getAllIdMod();
        var fdata = new FormData();
        var files = $('#txt_file')[0].files[0];
        fdata.append("file", files);
        var config = { callback: "f_resultImportXML", namefile: files.name };
        f_importFileXml(config, fdata);
    } catch (e) {
        console.log(e);
    }

}

function f_resultImportXML(config, para, lst) {
    try {
        var data = lst.data;    
        var data1 = data[0].kq0[0];
        $("#mausohoadon").text(setnull(data1.MAU_SO));
        $("#kyhieuhoadon").text(setnull(data1.KIHIEU_SERY));
        $("#sohoadon").text(setnull(data1.SO_SERY));
        $("#idhoadon").text(setnull(data1.ID_HDON));
        $("#tungay").text(setnull(data1.NGAY_DKY));
        $("#denngay").text(setnull(data1.NGAY_CKY));
        $("#txt_tendonvi").text(setnull(data1.TEN_DVIQLY_CT));
        $("#txt_diachi").text(setnull(data1.DIA_CHI_CT));
        //
        $("#txt_tendonvi_ct").text(setnull(data1.TEN_DVIQLY));
        $("#txt_diachi_ct").text(setnull(data1.DIA_CHI_CT));
        $("#txt_dienthoai_nong").text(setnull(data1.DIEN_THOAIDV));
        $("#txt_masothue").text(setnull(data1.MASO_THUEDL));
        $("#txt_dienthoai_sua").text(setnull(data1.DTHOAI_NONG));
        $("#txt_tenkhachhang_kh").text(setnull(data1.TEN_KHANG));
        $("#txt_idachi_kh").text(setnull(data1.DCHI_KHANG));
        //
        $("#txt_dienthoai_kh").text(setnull(data1.DTHOAI));
        $("#txt_masothue_kh").text(setnull(data1.MASO_THUEKH));
        $("#txt_soncongto_kh").text(setnull(data1.SO_CTO));
        $("#txt_soho_kh").text(setnull(data1.SO_HO));
        //
        $("#txt_makhachang_kh").text(setnull(data1.MA_KHANG));
        $("#txt_mathanhtoan_kh").text(setnull(data1.MA_KHANGTT));
        $("#txt_mann_kh").text(setnull(data1.MA_NN));
        $("#txt_mato_kh").text(setnull(data1.MA_TO));
        //
        $("#txt_matram_kh").text(setnull(data1.MA_TRAM));
        $("#txt_macapda_kh").text(setnull(data1.MA_CAPDA));
        $("#txt_sogcs_kh").text(setnull(data1.MA_SOGCS));
        $("#txt_phien_gcs_kh").text(setnull(data1.MA_GCS));
        $("#txt_magias_kh").text(setnull(data1.MA_GIA));
        //
        $("#txt_ngayky_kh").text(setnull(data1.NGAY_KY));
        $("#txt_nguoiky_kh").text(setnull(data1.TEN_NGUOI_KY));
        $("#txt_sotienchu_kh").text(setnull(data1.SO_TIEN_BANG_CHU));
        //
        $("#txt_tongcongtien_kh").text(data1.TONG_TIEN);
        $("#txt_thuesuat_gtgt").text(data1.TYLE_THUE);
        $("#txt_thue_gtgt").text(data1.TIEN_GTGT);
        $("#txt_tieuthu").text(data1.TIEN_GTGT);
      
        //
        $("#txt_dn_thu_tt").text(data1.DIEN_TTHU);
        $("#txt_thanhtien_tt").text(data1.SO_TIEN);
        // load bảng 



        loadbangxml(data);

    } catch (e) {
        console.log(e);
    }
}
function loadbangxml(data) {
    try{
        var datakq3 = data[3].kq3;
        $("#table_xml_xacthuc").empty();
        $.each(data[3].kq3, function (key, val) {
            var row = "";
            row += "<tr Class='" + val.BCS + "'><td>"
                + val.BCS + "</td><td>"
                + val.CHISO_MOI + "</td><td>"
                + val.CHISO_CU + "</td><td>"
                + val.HS_NHAN + "</td><td>"
                + val.SAN_LUONG + "</td><td>"
                + '' + "</td><td>"
                + '' + "</td></tr>";

            var result = $.grep(data[5].kq5, function (e) { return e.BCS == val.BCS; });
            var row1 = "";
            $.each(result, function (key1, val1) {               
                row1 += "<tr Class='" + val1.BCS + "'><td>"
                    + ""  + "</td><td>"
                    + '' + "</td><td>"
                    + '' + "</td><td>"
                    + '' + "</td><td>"
                    + val1.DIEN_TTHU + "</td><td>"
                    + val1.DON_GIA + "</td><td>"
                    +val1.SO_TIEN + "</td></tr>";

               

            });
            
            $("#table_xml_xacthuc").append(row + row1);
            row1 = "";
        });
        $(".VC").hide();
    } catch (e) {
        console.log(e);
    }
}
function numberformat(a) {
    try {
        return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } catch (e) {
        console.log(e);
    }
}
function clear_nullxacthuc() {
    try{
        $("#mausohoadon").text('');
        $("#kyhieuhoadon").text('');
        $("#sohoadon").text('');
        $("#idhoadon").text('');
        $("#tungay").text('');
        $("#denngay").text('');
        $("#txt_tendonvi").text('');
        $("#txt_diachi").text('');
        //
        $("#txt_tendonvi_ct").text('');
        $("#txt_diachi_ct").text('');
        $("#txt_dienthoai_nong").text('');
        $("#txt_masothue").text('');
        $("#txt_dienthoai_sua").text('');
        $("#txt_tenkhachhang_kh").text('');
        $("#txt_idachi_kh").text('');
        //
        $("#txt_dienthoai_kh").text('');
        $("#txt_masothue_kh").text('');
        $("#txt_soncongto_kh").text('');
        $("#txt_soho_kh").text('');
        //
        $("#txt_makhachang_kh").text('');
        $("#txt_mathanhtoan_kh").text('');
        $("#txt_mann_kh").text('');
        $("#txt_mato_kh").text('');
        //
        $("#txt_matram_kh").text('');
        $("#txt_macapda_kh").text('');
        $("#txt_sogcs_kh").text('');
        $("#txt_phien_gcs_kh").text('');
        $("#txt_magias_kh").text('');
        //
        $("#txt_ngayky_kh").text('');
        $("#txt_nguoiky_kh").text('');
        $("#txt_sotienchu_kh").text('');
        //
        $("#txt_tongcongtien_kh").text('');
        $("#txt_thuesuat_gtgt").text('');
        $("#txt_thue_gtgt").text('');
        $("#txt_tieuthu").text('');

        //
        $("#txt_dn_thu_tt").text('');
        $("#txt_thanhtien_tt").text('');

        $("#table_xml_xacthuc").empty();
    } catch (e) {
        console.log(e);
    }
}
