$(document).ready(function () {
    try {
        loadchecklog_master();

        initformelement();
        setValToTxt("txt_date_kbkh", gettimenow());
        setValToTxt("txt_ngaycapdate_kbkh", gettimenow());
        loadlist_loaidiemdo();
        lst_donvi();
        //lst_tram();
        lst_soghi();
        //lst_cot();
        lstngahang_Kb();
        f_lay_danh_sach_ma_dia_chinh();
        loadmadonviquanly();
        matusinhra();
        //$("#cb_donvi_kbkh").change(function () {
        //    matusinhra();
        //});

        $("#btn_khachang").click(function () {
            var check = check_kh();
                if(check!="") {
                    //messInfo("messinfo_kbkh", check, 'error');
                    showToast(check, 'error');
                    return;
                }
                capnhatkhachhang_khb();
        });

    } catch (e) {
        console.log(e);
    }
});

function check_kh() {
    try{
        var p = getAllIdMod();
        if (p.cb_donvi_kbkh == "-1") return "Vui lòng chọn đơn vị";
        if (p.txt_tenkhachang_kbkh == "") return "Tên khách hàng không được bỏ trống";
        if (p.txt_makhachang_kbkh == "") return "Mã khách hàng không được bỏ trống";
        if (p.txt_madiemdo_kbkh == "") return "Mã điểm đo không được bỏ trống";
        if (p.txt_socongto_kbkh == "") return "Số công tơ không được bỏ trống";
        if ($.isNumeric(p.txt_socongto_kbkh) == false) return "Số công tơ phải là số";
        if (p.txt_hesonhan_kbkh == "") return "Hệ số nhân không được bỏ trống";
        if (p.cb_masoghi_kbkh == "-1") return "Vui lòng chọn sổ ghi";
        if (p.cb_loaidiemdo_kbkh == "-1") return "Vui lòng chọn loại điểm đo";
        if (p.txt_sominhthu_kbkh == "") return "Phải điền Số chứng minh thư hoặc Số giấy phép kinh doanh";
        return "";

    } catch (e) {
        console.log(e);
    }
}
function loadlist_loaidiemdo() {
    try{
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_LOAIDIEMDO", callback: "result_loadlist_loaidiemdo" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_loadlist_loaidiemdo(config, para, lst) {
    try{
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_loaidiemdo_kbkh", data, "id", "ten", "-1", "Chọn loại điểm đo");
    } catch (e) {
        console.log(e);
    }
}
function lst_donvi() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_DONVI", callback: "result_lst_donvi" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lst_donvi(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_donvi_kbkh", data, "id", "ten", "-1", "Vui lòng đơn vị");
    } catch (e) {
        console.log(e);
    }
}
function lst_tram() {
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_TRAM", callback: "result_lst_tram" };
        var para = { v_CODE: p.cb_donvi_kbkh };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lst_tram(config, para, lst) {
    try {
     
        var data = lst.data;
   
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_matram_kbkh", data, "id", "ten", "-1", "Vui lòng chọn trạm");
    } catch (e) {
        console.log(e);
    }
}
function lst_soghi() {
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_SOGHI", callback: "result_lst_soghi" };
        var para = { v_CODE: '-1' };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lst_soghi(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_masoghi_kbkh", data, "id", "ten", "-1", "Vui lòng chọn sổ ghi");
    } catch (e) {
        console.log(e);
    }
}
function lst_cot() {
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_COT", callback: "result_lst_cot" };
        var para = { v_CODE: p.cb_masoghi_kbkh };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lst_cot(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_macot_kbkh", data, "id", "ten", "-1", "Vui lòng chọn cột");
    } catch (e) {
        console.log(e);
    }
}
function lstngahang_Kb() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_NGANHANG", callback: "result_lstngahang" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lstngahang(config, para, lst) {
    try {
        var data = lst.data;
        if (data == "" || data == '[]' || data == null || data == undefined) return;
        dataToCob("cb_tenganhang_kbkh", data, "id", "tenn_hang", "-1", "Chọn ngân hàng ");
    } catch (e) {
        console.log(e);
    }
}
function checkchon() {
    try{
        var p = getAllIdMod();
        var gia = "";
        if (p.cb_masoghi_kbkh != '-1') {
            gia= p.cb_masoghi_kbkh;
        }  else{
            gia= p.cb_donvi_kbkh;
        }
      
        return gia;
    } catch (e) {
        console.log(e);
    }
}


function capnhatkhachhang_khb() {
    try{
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOKHACHHANG.THEMKHACHHANG", callback: "result_capnhatkhachhang_khb" };
        var para = {
            v_TENKH:p.txt_tenkhachang_kbkh,
            v_MAKH:p.txt_makhachang_kbkh,
            v_MADIEMDO:p.txt_madiemdo_kbkh,
            v_SOCONGTO:p.txt_socongto_kbkh,
            v_MASOTHUE:p.txt_masothue_kbkh,
            v_HESONHAN:p.txt_hesonhan_kbkh,
            v_LOAIDIEMDO: p.cb_loaidiemdo_kbkh,
            v_MADIACHINH:p.txt_madiachinh_kbkh,
            v_DIACHI:p.txt_diachi_kbkh,
            v_MAHOM:'',
            v_MALO:'',
            v_MATO:'',
            v_MAKHUVUC:p.txt_makhuvuc_kbkh,
            v_SOHO:'',
            v_NGAY:p.txt_date_kbkh,
            v_DIENTHOAI:p.txt_dienthoai_kbkh,
            v_EMAIL:p.txt_email_kbkh,
            v_MANN: '',
            v_SCMT: p.txt_sominhthu_kbkh,
            v_NGAYCAP:p.txt_ngaycapdate_kbkh,
            v_NOICAP:p.txt_noicap_kbkh,
            v_SOTK:p.txt_sotaikhoan_kbkh,
            v_TENTK: p.cb_tenganhang_kbkh,
            v_CODE: checkchon(),
            v_KY: p.cb_kychot_nca,
            v_QUANLY: p.cb_donviqly_kbkh
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_capnhatkhachhang_khb(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            //messInfo("messinfo_kbkh", row, 'ok');
            showToast(row, 'success');
            setTimeout(function () { clear_null(); }, 500);
        } else {
            showToast(row, 'error');
            //messInfo("messinfo_kbkh", row, 'error');
        }

    } catch (e) {
        console.log(e);
    }
}
function clear_null() {
    try{
        setValToTxt("txt_tenkhachang_kbkh", "");
        setValToTxt("txt_makhachang_kbkh", "");
        setValToTxt("txt_madiemdo_kbkh", "");
        setValToTxt("txt_socongto_kbkh", "");
        setValToTxt("txt_masothue_kbkh", "");
        setValToTxt("txt_hesonhan_kbkh", "");
        setValToTxt("cb_loaidiemdo_kbkh", "-1");
        setValToTxt("txt_madiachinh_kbkh", "");
        setValToTxt("txt_diachi_kbkh", "");
        setValToTxt("cb_donvi_kbkh", "-1");
        //setValToTxt("cb_macot_kbkh", "-1");
        setValToTxt("cb_masoghi_kbkh", "-1");
        //setValToTxt("cb_mahom_kbkh", "");
        //setValToTxt("txt_malo_kbkh", "");
        //setValToTxt("txt_mato_kbkh", "");
        setValToTxt("txt_makhuvuc_kbkh", "");
        //setValToTxt("txt_soho_kbkh", "");
        setValToTxt("txt_date_kbkh", gettimenow());
        setValToTxt("txt_dienthoai_kbkh", "");
        setValToTxt("txt_email_kbkh", "");
        setValToTxt("txt_sominhthu_kbkh", "");
        setValToTxt("txt_ngaycapdate_kbkh", "");
        setValToTxt("txt_noicap_kbkh", "");
        setValToTxt("txt_sotaikhoan_kbkh", "");
        setValToTxt("cb_tenganhang_kbkh", "-1");
     
    } catch (e) {
        console.log(e);
    }
}
//autocomplete mã địa chính
function f_lay_danh_sach_ma_dia_chinh() {
    try {
        var config = { namesql: "HD_KHACHHANG_PKG.DanhSachMaDiaChinhTTKH", callback: "f_result_danhsachmadiachinh_ttkh", connstr: "Oracle_HDDT" };
        var para = {};
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_danhsachmadiachinh_ttkh(config, para, data) {
    try{

   var dsmdc = data.data;
    var nameArr = [];
    nameArr.length = 0;
    $.each(dsmdc, function (key, val) {
        nameArr.push({
            label: val.name,
            value: val.name,
            id: val.name,
        });
    });
    $("#txt_madiachinh_kbkh").autocomplete({
        minLength: 1,
        delay: 200,
        source: nameArr,
        select: function (event, ui) {
        }
    });
    } catch (e) {
        console.log(e);
    }

}
// trinnq10/01/2017
function loadmadonviquanly() {
    try {
        var config = { namesql: "HD_MATUSINH.MADONVIQUANLY", callback: "f_result_loadmadonviquanly", connstr: "Oracle_HDDT" };
        var para = {};
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadmadonviquanly(config, para, lst) {
    try {
        var data = lst.data;
        setValToTxt("cb_donviqly_kbkh", data[0].madonviqly);

    } catch (e) {
        console.log(e);
    }
}

function matusinhra() {
    try {
        var p = getAllIdMod();
        var config = { namesql: "HD_MATUSINH.MADIEMDO", callback: "f_result_matusinhra", connstr: "Oracle_HDDT" };
        var para = {
            v_MA: p.cb_donviqly_kbkh
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_matusinhra(config, para, lst) {
    try {
        var data = lst.data;
        setValToTxt("txt_makhachang_kbkh", data[0].makh);
        setValToTxt("txt_madiemdo_kbkh", data[0].madiemdo);
    } catch (e) {
        console.log(e);
    }
}