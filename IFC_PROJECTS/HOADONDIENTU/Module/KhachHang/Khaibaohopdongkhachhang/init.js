var idkh = "";
var nameFileHd = "";
var tenhopdong =""
$(document).ready(function () {
    try {
        loadchecklog_master();

        initformelement();
       
        autoloadkhachnag();
        lstapgia_hdkh();
        lstmauhopdong_hdkh();
        lstcty_hdkh();
        lstngahang_Kbhd();
        //thongtincty_hdkh();
        //setTimeout(function () { thongtincty_hdkh(); }, 2000);
        setValToTxt("txt_date_kbhdkh", gettimenow());
        setValToTxt("txt_ngaycap_kbhdkh", gettimenow());
        setValToTxt("txt_datevb_kbhdkh", gettimenow());
        //$("#cb_congty_kbhdkh").change(function () {
        //    thongtincty_hdkh();

        //});
        $("#btn_them_kbhdkh").click(function () {
            var check = checkvalidate();
            if (check != "") {
                showToast(check,'error');
                return;
            }
            f_confimYesNo("Chắc chắn muốn thêm hợp đồng?", "Bỏ qua", "Xác nhận", function () {
                capnhat_kbhdkh();
                f_uploadHopDongPDF();
            });
        });


        $("#btn_in_kbhdkh").click(function () {
            replate(true);
        });

        $("input[name=rd_hinhthuctt_kbhdkh]").change(function () {
            if ($(this).val() == "TIENMAT") {
                $("#txt_noinoptien_kbhdkh").show();
                $("#txt_noinoptien_kbhdkh").focus();
            } else {
                $("#txt_noinoptien_kbhdkh").hide();
            }
        });
    } catch (e) {
        console.log(e);
    }
});
// load apgia
function lstapgia_hdkh() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_APGIA", callback: "result_lstapgia_hdkh" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lstapgia_hdkh(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_apgia_kbhdkh", data, "id", "ten", "-1", "Chọn mẫu áp giá");
    } catch (e) {
        console.log(e);
    }
}

//

function lstmauhopdong_hdkh() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_MAUHOPDONG", callback: "result_lstmauhopdong_hdkh" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lstmauhopdong_hdkh(config, para, lst) {
    try {
        var data = lst.data;
        tenhopdong = data[0].duongdanfile
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_mauhopdong_kbhdkh", data, "id", "ten", "", "");
    } catch (e) {
        console.log(e);
    }
}
function autoloadkhachnag() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOHDKH.LSTKHACHHANG", callback: "result_autoloadkhachnag" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_autoloadkhachnag(config, para, lst) {
    try {
        var data = lst.data;
        if (data == [] || data == null || data == undefined || data.length == 0) return;
        var nameArr = [];
        nameArr.length = 0;
       
        $.each(data, function (key, val) {
            nameArr.push({
                label: val.tenkhachhang + ' - ' + val.makhachhang + '-' + val.socongto + ' - ' + val.madiemdo 
                ,value: val.tenkhachhang
                , id: val.id,
            });
        });
      
        $("#txt_tthongtinchung_kbhdkh").autocomplete({
            minLength: 1,
            delay: 200,
            source: nameArr,
            select: function (event, ui) {
                loadhienthikh(ui.item.id);
                loadtontai(ui.item.id);
            }
        });

    } catch (e) {
        console.log(e);
    }
}
function lstngahang_Kbhd() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_NGANHANG", callback: "result_lstngahang_Kbhd" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lstngahang_Kbhd(config, para, lst) {
    try {
        var data = lst.data;
        if (data == "" || data == '[]' || data == null || data == undefined) return;
        dataToCob("txt_tennhang_kbhdkh", data, "id", "tenn_hang", "-1", "Chọn ngân hàng ");
    } catch (e) {
        console.log(e);
    }
}


function f_change(id) {
    try{
        loadhienthikh(id);
    } catch (e) {
        console.log(e);
    }
}


function loadhienthikh(id) {
    try {
        idkh = id;
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOHDKH.KHACHHANGID", callback: "result_loadhienthikh" };
        var para = {v_ID:id};
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_loadhienthikh(config, para, lst) {
    try{
        var data = lst.data;
        if (data == [] || data == null || data == undefined || data.length == 0) {
            $("#txt_tenkh_kbhdkh").val('');
            $("#txt_makhachh_kbhdkh").val('');
            $("#txt_madiemdo_kbhdkh").val('');
            $("#txt_socongto_kbhdkh").val('');
            $("#txt_diachikh_kbhdkh").val('');
            $("#txt_socmt_kbhdkh").val('');
            //
            $("#txt_ngaycap_kbhdkh").val('');
            $("#txt_soho_kbhdkh").val('');
            $("#txt_socmt_kbhdkh").val('');
            $("#txt_socongto_kbhdkh").val('');
            $("#txt_diachikh_kbhdkh").val('');
            $("#txt_socmt_kbhdkh").val('');
            $("#txt_ngaycap_kbhdkh").val(gettimenow());
            $("#txt_sotaikhoan_kbhdkh").val('');
            $("#txt_tennhang_kbhdkh").val('');


            return;
        }
    
        setValToTxt("txt_tenkh_kbhdkh", data[0].tenkhachhang);
        setValToTxt("txt_makhachh_kbhdkh", data[0].makhachhang);
        setValToTxt("txt_madiemdo_kbhdkh", data[0].madiemdo);
        setValToTxt("txt_socongto_kbhdkh", data[0].socongto);
        setValToTxt("txt_diachikh_kbhdkh", data[0].diachi);
        setValToTxt("txt_socmt_kbhdkh", data[0].scmt);
        setValToTxt("txt_noicap_kbhdkh", data[0].noi_cmt);
        setValToTxt("txt_soho_kbhdkh", data[0].soho);
        setValToTxt("txt_ngaycap_kbhdkh", data[0].ngaymt);
        setValToTxt("txt_sotaikhoan_kbhdkh",data[0].stk_ngh);
        setValToTxt("txt_tennhang_kbhdkh", data[0].idnganhang);
        setValToTxt("txt_emailk_kbhdkh", data[0].email);
        setValToTxt("txt_dienthoai_kbhdkh", data[0].dienthoai);
        
        nameFileHd = "HOPDONG_"+data[0].madiemdo + "_" + ngayhhmm() + '.docx';

    }catch(e) {
        console.log(e);
    }
}
function loadtontai(id) {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOHDKH.DOWLOADHOPDONG", callback: "result_loadtontai" };
        var para = { v_ID: id };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_loadtontai(config, para, lst) {
    try {
        var data = lst.data;
      
        if (data == [] || data == null || data == undefined || data.length == 0) {
            $("#btn_them_kbhdkh").removeAttr("disabled");
            $("#btn_in_kbhdkh").removeAttr("disabled");
     
            $("#messinfo_kbhdkh").hide();
            return;
        }
        var row = data[0].tenfilehd;
        if (row.indexOf("không") > 0) {
            
            $("#btn_them_kbhdkh").removeAttr("disabled");
            $("#btn_in_kbhdkh").removeAttr("disabled");
            $("#messinfo_kbhdkh").hide();
        } else {
            $('#btn_them_kbhdkh').attr('disabled', 'disabled');
            $('#btn_in_kbhdkh').attr('disabled', 'disabled');
            var madiemdo = $("#txt_madiemdo_kbhdkh").val();
            var link = urli + "/home/DownloadFileSaveOnServer/" + row;
            messInfo("messinfo_kbhdkh", 'Mã điểm đo ' + madiemdo + ' này đã tồn tại hợp đồng', 'error');
        }

    } catch (e) {
        console.log(e);
    }
}
function lstcty_hdkh() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_DONVICTY", callback: "result_lstcty_hdkh" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lstcty_hdkh(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_congty_kbhdkh", data, "id", "ten", "", "");

        thongtincty_hdkh();
    } catch (e) {
        console.log(e);
    }
}
function thongtincty_hdkh() {
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LUUTTMAYINHD.IDDONVICTY", callback: "result_thongtincty_hdkh" };
        var para = {
            v_ID: p.cb_congty_kbhdkh
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_thongtincty_hdkh(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            $("#txt_tencty_kbhdkh").val('');
            $("#txt_masothue_kbkh").val('');
            $("#txt_ndaidien_kbkh").val('');
            $("#txt_chucvudd_kbkh").val('');
            //
            $("#txt_nuquyen_kbkh").val('');
            $("#txt_chucuquyen_kbkh").val('');
            $("#txt_diachi_kbhdkh").val('');
            // 
            $("#txt_sdth_kbkh").val('');
            $("#txt_fax_kbkh").val('');
            $("#txt_email_kbhdkh").val('');
            //
            $("#txt_nganhang_kbkh").val('');
            $("#txt_taikhoanc_kbkh").val('');
            $("#txt_masothuec_kbhdkh").val('');
            $("#txt_dienthoaicstk_kbkh").val('');
            return;
        }
 
        $("#txt_tencty_kbhdkh").val(data[0].tencty);
        $("#txt_masothue_kbkh").val(data[0].masothue_cty);
        $("#txt_ndaidien_kbkh").val(data[0].nguoi_ddpl);
        $("#txt_chucvudd_kbkh").val(data[0].chuvu_ddpl);
        //
        $("#txt_nuquyen_kbkh").val(data[0].nguoi_uyq);
        $("#txt_chucuquyen_kbkh").val(data[0].chucvu_uyq);
        $("#txt_diachi_kbhdkh").val(data[0].diachi_cty);
        //
        $("#txt_sdth_kbkh").val(data[0].dienthoai_kdoanh);
        $("#txt_fax_kbkh").val(data[0].fax);
        $("#txt_email_kbhdkh").val(data[0].email);
        //
        $("#txt_nganhang_kbkh").val(data[0].enganhang);
        $("#txt_taikhoanc_kbkh").val(data[0].sotkn_hang);
        $("#txt_masothuec_kbhdkh").val(data[0].masothue_cty);
        $("#txt_dienthoaicstk_kbkh").val(data[0].dienthoai_cty);
    } catch (e) {
        console.log(e);
    }
}
function checkvalidate() {
    try{
        var p = getAllIdMod();
        if (p.cb_mauhopdong_kbhdkh == "-1") return "Vui lòng chọn mẫu hợp đồng";
        //if (p.txt_tthongtinchung_kbhdkh == "") return "Vui lòng tìm kiếm khách hàng thông tin chung";
        if (p.txt_tenkh_kbhdkh == "") return "Tên khách hàng  không được bỏ trống";
        if (p.txt_makhachh_kbhdkh == "") return "Mã khách hàng không được bỏ trống";
        if (p.txt_madiemdo_kbhdkh == "") return "Mã điểm đo không được bỏ trống";
        if (p.txt_socongto_kbhdkh == "") return "Số công tơ không được bỏ trống";
        if ($.isNumeric(p.txt_socongto_kbhdkh) == false) return "Số công tơ phải là số";
        if (p.txt_socmt_kbhdkh == "") return "Chứng minh thư khách hàng không được bỏ trống";
        if ($.isNumeric(p.txt_socmt_kbhdkh) == false) return "Chứng minh thư phải là số";
        if (p.cb_apgia_kbhdkh == '-1') return "Vui lòng chọn áp giá";
        if (p.cb_congty_kbhdkh == "-1") return "Vui lòng chọn công ty điện lực";
        if (p.txt_tencty_kbhdkh == "") return "Tên công ty không được bỏ trống";
        if (p.txt_masothue_kbkh == "") return "Mã số thuế công ty không được bỏ trống";
        if (p.txt_nguoiuyquyen_kbkh == "-1") return "Người ủy không được bỏ trống";
        if (p.txt_diachisdungdien_kbhdkh = "") return "Địa chỉ người sử dụng điện không được bỏ trống";
        //if (p.txt_thoihanngay_kbhdkh == "") return "Thời hạn thanh toán không được bỏ trống";
        //if ($.isNumeric(p.txt_thoihanngay_kbhdkh) == false) return "Thời hạn thanh toán phải là số";
      
        return "";
    } catch (e) {
        console.log(e);
    }
}

function f_uploadHopDongPDF() {
    var fdata = new FormData();
    var file = $("#txt_file_hopdongpdf").get(0).files;
    if (file.length > 0) {
        fdata.append("file", file[0]);
        var config = { callback: "f_uploadHopDongPDF_result", namefile: file.name };
        api_uploadFileHopDongScan(config, fdata);
    }
}

function f_uploadHopDongPDF_result(config, para, lst) {
    if (lst != null && lst.data != null && lst.data != undefined)
        return;
}

function capnhat_kbhdkh() {
    try {
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var checka = "";
        var checkb = "";
        var tennganhang = $("#txt_tennhang_kbhdkh option:selected").text();
        
        var file = $("#txt_file_hopdongpdf").get(0).files;
        var file_pdf = '';
        if (file.length > 0)
            file_pdf = file[0].name;


        var hinhthucthanhtoan = $("input[name=rd_hinhthuctt_kbhdkh]:checked").val();
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOHDKH.THEMHOPDONG", callback: "result_capnhat_kbhdkh" };
        var para = {
            v_MAUHOP:p.cb_mauhopdong_kbhdkh,
            v_NGAYHIEULUC:p.txt_date_kbhdkh,
            v_IDKH:idkh,
            v_SOTK_KH:p.txt_sotaikhoan_kbhdkh,
            v_TENNGANHANG_KH: p.txt_tennhang_kbhdkh,
            v_NGAYCMT:p.txt_ngaycap_kbhdkh,
            v_CMTHU:p.txt_socmt_kbhdkh,
            v_IDMADONVI:p.cb_congty_kbhdkh,
            v_DIACHISD: p.txt_diachisdungdien_kbhdkh,
            v_VITRICLDIEN: p.txt_vitrixacdcluong_kbhdkh,
            v_VITRILAPCT:p.txt_vitrilapct_kbhdkh,
            v_hinhthucthanhtoan: hinhthucthanhtoan,
            v_NOINOP:p.txt_noinoptien_kbhdkh,
            v_THOIHAN:p.txt_thoihanngay_kbhdkh,
            v_HINHTHUCTT:p.txt_hinhthuc_kbhdkh,
            v_THOATHUANKHAC: p.txt_nhungthoathuan_kbhdkh,
            v_USEID: userinfo.userid,
            v_THEOVB: p.txtvanban_kbhdkh,
            v_NGAYVB: p.txt_datevb_kbhdkh,
            v_EMAIL_KH: p.txt_emailk_kbhdkh,
            v_SDT_KH: p.txt_dienthoai_kbhdkh,
            v_TENFILE: nameFileHd,
            v_IDAPGIA: p.cb_apgia_kbhdkh,
            v_FILEPDF:file_pdf
            
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_capnhat_kbhdkh(config, para, lst) {
    try {
        console.log(lst);
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            showToast(row, 'success');
            setTimeout(function () { replate(false); }, 500);
        } else {
            showToast(row, 'error');
          
        }
    } catch (e) {
        console.log(e);
    }
}
function chear_text() {
    try {
        $("#cb_mauhopdong_kbhdkh").val('-1');
        $("#txt_tthongtinchung_kbhdkh").val('');
        $("#cb_congty_kbhdkh").val('-1');
        $("#txt_tenhang_kbhdkh").val('');
        $("#txt_sotaikhoan_kbhdkh").val('');
        $("#txt_tenhang_kbhdkh").val('');
        $("#txt_diachisdungdien_kbhdkh").val('');
        $("#txt_vitrixacdcluong_kbhdkh").val('');
        $("#txt_vitrilapct_kbhdkh").val('');
        $("#txt_noinoptien_kbhdkh").val('');
        $("#txt_thoihanngay_kbhdkh").val('');
        $("#txt_hinhthuc_kbhdkh").val('');
        $("#txt_nhungthoathuan_kbhdkh").val('');
        $("#txt_tenkh_kbhdkh").val('');
        $("#txt_makhachh_kbhdkh").val('');
        $("#txt_madiemdo_kbhdkh").val('');
        $("#txt_socongto_kbhdkh").val('');
        $("#txt_diachikh_kbhdkh").val('');
        $("#txt_socmt_kbhdkh").val('');
        $("#txt_tencty_kbhdkh").val('');
        $("#txt_masothue_kbkh").val('');
        $("#txt_nguoiuyquyen_kbkh").val('');
        $("#txt_sodienthoicty_kbkh").val('');
       
    }catch (e) {
         console.log(e);
     }

}
function replate(chodownload)
{
    try {
        var config = {
            filemau: tenhopdong,
            filecreat: nameFileHd
        };
        var apgia = $("#cb_apgia_kbhdkh :selected").text();
        var ad= $("#txt_tennhang_kbhdkh :selected").text();
        var p = getAllIdMod();
        var ngayhieu = p.txt_date_kbhdkh.split('/');
        var para = {
            ngay:ngayhieu[0],
            thang: ngayhieu[1],
            nam: ngayhieu[2],
            daidien_bena: p.txt_ndaidien_kbkh,
            chucvu_bena: p.txt_chucvudd_kbkh,
            vanban_bena: p.txtvanban_kbhdkh,
            ngayuq_bena: p.txt_datevb_kbhdkh,
            nguoiuq_bena: p.txt_nuquyen_kbkh,
            chucvuq_bena:p.txt_chucuquyen_kbkh,
            diachi_bena: p.txt_diachi_kbhdkh,
            sodt_bena: p.txt_sdth_kbkh,
            fax_bena:p.txt_fax_kbkh,
            email_bena: p.txt_email_kbhdkh,
            taikhoan_bena:p.txt_taikhoanc_kbkh,
            nganhang_bena:p.txt_nganhang_kbkh,
            masothue_bena:p.txt_masothuec_kbhdkh,
            sodtcskh_bena: p.txt_dienthoaicstk_kbkh,
            khachhang_benb: p.txt_tenkh_kbhdkh,
            diachi_benb: p.txt_diachikh_kbhdkh,
            cmt_benb: p.txt_socmt_kbhdkh,
            ngaycap_benb: p.txt_ngaycap_kbhdkh,
            noicap_benb:p.txt_noicap_kbhdkh,
            dienthoai_benb: p.txt_dienthoai_kbhdkh,
            email_benb: p.txt_emailk_kbhdkh,
            dienthoaint_benb: p.txt_dienthoai_kbhdkh,
            soho_benb: p.txt_soho_kbhdkh,
            taikhoan_benb: p.txt_sotaikhoan_kbhdkh,
            nganhang_benb: ad,
            diachisd_benb: p.txt_diachisdungdien_kbhdkh,
            vitricld_benb: p.txt_vitrixacdcluong_kbhdkh,
            vitrilapdat_benb: p.txt_vitrilapct_kbhdkh,
            noptien_benb: p.txt_noinoptien_kbhdkh,
            thoihtt_benb: p.txt_thoihanngay_kbhdkh,
            hinhthuctt_benb: p.txt_hinhthuc_kbhdkh,
            thoathuankhac_benb: p.txt_nhungthoathuan_kbhdkh,
            benapgiakh: apgia,
            tendonvi1_bena: p.txt_tencty_kbhdkh,
            tendonvi1_benb: p.txt_tenkh_kbhdkh,
            tendonvi_benb: p.txt_tenkh_kbhdkh,
            tendonvi_bena: p.txt_tencty_kbhdkh,
            masothue_benb: '',
            chucvu_benb: '',
            fax_benb:''

        }
        ExecuteCreateFileWord(config, para);
        if (chodownload)
            window.open(urli + "/home/DownloadFileSaveOnServer/" + config.filecreat);
    } catch (e) {
        console.log(e);
    }
}
