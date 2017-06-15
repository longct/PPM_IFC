$(document).ready(function () {
    try {
        loadchecklog_master();

        loadConetent();
        initformelement();
        setValToTxt("txt_ngaytao_kh_ct", gettimenow());
        $("#btn_them_kh_ct").click(function () {
            var check = check_validate();
         
            if (check != "") {
                messInfo("messinfo_kh_ct", check, 'error');
                return;
            }
            f_confimYesNo("Chắc chắn muốn thêm thông tin cơ quan thuế", "Bỏ qua", "Xác nhận", function () {
                themtaikhoancoquan();
            });
        });

        $("#bt_thoatcq").click(function () {
            clear_kh_ct();
            messInfo("messinfo_kh_ct", '', 'error');
        });
    } catch (e) {
        console.log(e);
    }
});


function themtaikhoancoquan() {
    try {
        var p = getAllIdMod();
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOCQTHUE.THEMCOQTHUE", callback: "result_themtaikhoancoquan" };
        var para = {
            v_TEN:p.txt_ten_kh_ct,
            v_MACT:p.txt_coquan_kh_ct,
            v_DIACHI: p.txt_diachi_kh_ct,
            v_SDT:p.txt_sodienthoai_kh_ct,
            v_NGAY:p.txt_ngaytao_kh_ct,
            v_USERID: userinfo.userid
        };
   
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function result_themtaikhoancoquan(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_kh_ct", row, 'ok');
            setTimeout(function () {
                loaddanhcoquanthue(1);
                clear_kh_ct();
            }, 1000);
        } else {
            messInfo("messinfo_kh_ct", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}
function clear_kh_ct() {
    try{
        $("#txt_ten_kh_ct").val('');
        $("#txt_coquan_kh_ct").val('');
        $("#txt_sodienthoai_kh_ct").val('');
        $("#txt_diachi_kh_ct").val('');
        setValToTxt("txt_ngaytao_kh_ct", gettimenow());
    } catch (e) {
        console.log(e);
    }
}
function check_validate() {
    try{
        var p = getAllIdMod();
        if (p.txt_ten_kh_ct == "") return "Tên cơ quan thuế không được bỏ trống";
        if (p.txt_coquan_kh_ct == "") return "Mã cơ quan thuế không được bỏ trống";
        if (p.txt_sodienthoai_kh_ct == "") return "Số điện thoại không được bỏ trống";
        if ($.isNumeric(p.txt_sodienthoai_kh_ct) == false) return "Số điện thoại phải là số";
        if (p.txt_diachi_kh_ct == "") return "Địa chỉ không được bỏ trống";
        var ovderday1 = compareDates(new Date(), timeyyyymmdd(p.txt_ngaytao_kh_ct));
        if (ovderday1.days > 0) return "Ngày tạo không được chọn quá ngày hiện tại";

        return "";
        
    } catch (e) {
        console.log(e);
    }
}