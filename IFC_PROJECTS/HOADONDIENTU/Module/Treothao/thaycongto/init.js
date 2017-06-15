var dskha;
var idtreothao;
$(document).ready(function () {
    try {
        loadConetent();
     
        $('#txt_thang_ttd').datepicker({
            format: 'mm/yyyy',
            todayHighlight: true,
            minViewMode: "months",
            autoclose: true
        });
        $('#txt_thang_ttd').datepicker('setDate', new Date());
        initformelement();
        loadnhanvien_ttd();
        loadlydo_ttd();
        setValToTxt('datetreothao_ttdd', gettimenow());
        setValToTxt('datekepchi_ttdd', gettimenow());
        setValToTxt('txtctdatethao_ttdd', gettimenow());
        setValToTxt('txtctdatetreo_ttdd', gettimenow());
        Danhsachkhachhang_tcto();
      

        $('#txt_timkiem_ttdd').on('keydown', function (e) {
            if (e.which == 13) {
                var p = getAllIdMod();
                Laythongtinrakhachhang(p.txt_timkiem_ttdd);
            }
        });
        $("#btn_tiep_ttdd").click(function () {
            var check = validate_tct();
            if (check != "") {
                showToast(check, 'error');
                return;
            }
            Thaycongtotreothao();
        });

    } catch (e) {
        console.log(e);
    }
});


function Danhsachkhachhang_tcto() {
    try {
        var config = { namesql: "HD_KHACHHANG_PKG.DanhSachKhachHang", callback: "f_result_dsachkhachhang_tcto", connstr: "Oracle_HDDT" };
        var para = { v_Makh: '' };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_dsachkhachhang_tcto(config, para, data) {
    try{
        dskha = data.data;
        var nameArr = [];
        nameArr.length = 0;
        $.each(dskha, function (key, val) {
            nameArr.push({
                label: val.tenkhachhang + ' - ' + val.madiemdo + ' - ' + val.socongto,
                value: val.madiemdo,
                id: val.madiemdo,
            });
        });
        $("#txt_timkiem_ttdd").autocomplete({
            minLength: 1,
            delay: 200,
            source: nameArr,
            select: function (event, ui) {
                setTimeout(function () { Laythongtinrakhachhang(ui.item.id); }, 300);
            }
        });
    } catch (e) {
        console.log(e);
    }
}
function Laythongtinrakhachhang(id) {
    try {
        console.log(id);
        var config = { namesql: "HD_TREOTHAOCONGTO.THONGTINKHACHGANG", callback: "f_result_Laythongtinrakhachhang", connstr: "Oracle_HDDT" };
        var para = { v_TIMKIEM: id };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_Laythongtinrakhachhang(config, para, lst) {
    try {
        var data = lst.data;
        idtreothao = data[0].id;
        setValToTxt("txt_tenkhachhang_ttdd", data[0].tenkhachhang);
        setValToTxt("cb_loaidiemdo_ttdd", data[0].loaidiemdo);
        setValToTxt("txt_diachi_ttdd", data[0].diachi);
        setValToTxt("txt_socongtotk_ttdd", data[0].socongto);
        
        // cong to treo

    }catch (e) {
        console.log(e);
    }
}
function Thaycongtotreothao() {
    try {
        $("#anhload").show();
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();
        var ngaytr = p.txt_thang_ttd.split("/");
        var config = { namesql: "HD_TREOTHAOCONGTO.CAPTHONGTINCONGTOTREO", callback: "f_result_thaycongtotreothao", connstr: "Oracle_HDDT" };
        var para = {
            v_USERID:userinfo.userid,
            v_IDKH:idtreothao,
            v_BIENBAN:p.txt_sobienban_ttdd,
            v_LYDO:p.txt_lydo_ttdd,
            v_NHANVIENTREOTHAO:p.txt_nhvientreothao_ttdd,
            v_NHANVIENKEPCHI:p.txt_nhvienkepchi_ttdd,
            v_CONGTO:p.txt_congtotreo_ttdd,
            v_NGAY:p.txtctdatetreo_ttdd,
            v_GIAOTONG:p.txtbieutonghuuconggiaotr_ttdd,
            v_GIAOVC:p.txtvoconggiaotr_ttdd,
            v_GIAOBT:p.txtbieu1btgiaotr_ttdd,
            v_GIAOCD:p.txtbieu2CDgiaotr_ttdd,
            v_GIAOTD:p.txtbieu3TDgiaotr_ttdd,
            v_LAPTRINH: p.txtlaptrinh_ttdd,
            v_TI: p.txtTugiao_ttdd,
            v_TU: p.txtTigiao_ttdd,
            v_CONGTO_T:p.txt_congtothao_ttdd,
            v_NGAY_T:p.txtctdatethao_ttdd,
            v_GIAOTONG_T:p.txtbieutonghuuconggiaot_ttdd,
            v_GIAOVC_T:p.txtvoconggiaot_ttdd,
            v_GIAOBT_T:p.txtbieu1btgiaot_ttdd,
            v_GIAOCD_T:p.txtbieu2CDgiaot_ttdd,
            v_GIAOTD_T: p.txtbieu3TDgiaot_ttdd,
            v_LAPTRINH_T:p.txtlaptrinhtr_ttdd,
            v_TI_T: p.txtTugiaotr_ttdd,
            v_TU_T: p.txtTigiaotr_ttdd,
            v_KYCHOT: p.cb_kychot_ttdd,
            v_THANG_T: ngaytr[0],
            v_NAM_T: ngaytr[1]
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function f_result_thaycongtotreothao(config, para, lst) {
    try {
        $("#anhload").hide();
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            showToast(row, 'success');
        } else {
            showToast(row, 'error');
           
        }

    } catch (e) {
        console.log(e);
    }
}

function validate_tct() {
    try{
        var p = getAllIdMod();
        if (p.txt_timkiem_ttdd == "") return "Vui lòng tìm kiếm thông tin";
        if (p.txt_nhvientreothao_ttdd == "") return "Vui lòng điền tên nhân vien treo";
        if (p.txt_nhvientreothao_ttdd == "") return "Vui lòng điền tên nhân vien kẹp chỉ";
        if (p.txt_nhvientreothao_ttdd == "") return "Vui lòng điền tên nhân vien kẹp chỉ";
        if (p.txt_congtothao_ttdd == "") return "Công tơ tháo không được bỏ trống";
        if (p.txt_congtotreo_ttdd == "") return "Công tơ treo không được bỏ trống";
        if (p.txtctdatethao_ttdd=="") return "Ngày tháo không được bỏ trống";
        var ovderday1 = compareDates(new Date(), timeyyyymmdd(p.txtctdatethao_ttdd));
        if (ovderday1.days > 0) return "Ngày tháo không được lớn hơn ngày hiện tại";
        if (p.txtbieutonghuuconggiaot_ttdd == "") return "Giao Biểu tổng hữu công công tơ tháo không được bỏ trống";
        if (p.txtctdatetreo_ttdd == "") return "Ngày treo không được bỏ trống";
        var ovderday2 = compareDates(new Date(), timeyyyymmdd(p.txtctdatetreo_ttdd));
        if (ovderday2.days > 0) return "Ngày treo không được lớn hơn ngày hiện tại";
        if (p.txtbieutonghuuconggiaotr_ttdd == "") return "Giao Biểu tổng hữu công công tơ treo không được bỏ trống";

        return "";
    } catch (e) {
        console.log(e);
    }
}

//autocomplete mã địa chính trinhnq
function loadnhanvien_ttd() {
    try {
        var config = { namesql: "HD_LSTCOMBOX.HD_NHANVIENTREOTHAO", callback: "f_result_nhvientreothao_ttdd", connstr: "Oracle_HDDT" };
        var para = {};
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_nhvientreothao_ttdd(config, para, data) {
    try {
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
        $("#txt_nhvientreothao_ttdd").autocomplete({
            minLength: 1,
            delay: 200,
            source: nameArr,
            select: function (event, ui) {
            }
        });

        $("#txt_nhvienkepchi_ttdd").autocomplete({
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

function loadlydo_ttd() {
    try {
        var config = { namesql: "HD_LSTCOMBOX.HD_LYDOTREOTHAO", callback: "f_result_lydo_ttdd", connstr: "Oracle_HDDT" };
        var para = {};
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_lydo_ttdd(config, para, data) {
    try {
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
        $("#txt_lydo_ttdd").autocomplete({
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





