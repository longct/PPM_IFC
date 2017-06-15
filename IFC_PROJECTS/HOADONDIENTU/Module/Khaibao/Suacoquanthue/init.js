var idkhthue = "";
$(document).ready(function () {
    try {
        loadchecklog_master();

        loadConetent();

        $("#btn_sua_kh_ct").click(function () {
            var check = check_vailidate();
            if (check != "") {
                messInfo("messinfo_kh_sct", check, 'error');
                return;
            }
            f_confimYesNo("Cập nhật thông tin cơ quan thuế", "Bỏ qua", "Xác nhận", function () {
                capnhatthongtincoquanthue();
            });
        });

    } catch (e) {
        console.log(e);
    }
});

function loadthongtinid(id) {
    try {
        idkhthue = id;
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOCQTHUE.LAYID", callback: "result_loadthongtinid" };
        var para = {v_ID:id};
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_loadthongtinid(config, para, lst) {
    try {
        var data = lst.data;
        if (data == "[]" || data == null || data == undefined || data.length == 0) {
            messInfo("messinfo_kh_sct", 'Không có dữ liệu hiển thị', 'ok');
            clear_khcqt();
            return;
        }
        $("#txt_ten_kh_sct").val(data[0].tencqt);
        $("#txt_coquan_kh_sct").val(data[0].ma_cqt);
        $("#txt_diachi_kh_sct").val(data[0].diachi);
        $("#txt_sodienthoai_kh_sct").val(data[0].dienthoai);
        $("#txt_ngaytao_kh_sct").val(data[0].ngaytao);

    } catch (e) {
        console.log(e);
    }
}
function clear_khcqt() {
    try{
        $("#txt_ten_kh_sct").val('');
        $("#txt_coquan_kh_sct").val('');
        $("#txt_diachi_kh_sct").val('');
        $("#txt_sodienthoai_kh_sct").val('');
        $("#txt_ngaytao_kh_sct").val(gettimenow());
    } catch (e) {
        console.log(e);
    }
}

function check_vailidate() {
    try{
        var p = getAllIdMod();
        if (p.txt_ten_kh_sct == "") return "Tên cơ quan thuế không được bỏ trống";
        if (p.txt_coquan_kh_sct == "") return "Mã cơ quan thuế không được bỏ trống";
        if (p.txt_sodienthoai_kh_sct == "") return "Số điện thoại không được bỏ trống";
        if ($.isNumeric(p.txt_sodienthoai_kh_sct) == false) return "Số điện thoại phải là số";
        if (p.txt_diachi_kh_sct == "") return "Địa chỉ không được bỏ trống";
        var ovderday1 = compareDates(new Date(), timeyyyymmdd(p.txt_ngaytao_kh_sct));
        if (ovderday1.days > 0) return "Ngày tạo không được chọn quá ngày hiện tại";

        return "";

    } catch (e) {
        console.log(e);
    }
}
function capnhatthongtincoquanthue() {
    try {
      var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOCQTHUE.CAPNHATCOQTHUE", callback: "result_capnhatthongtincoquanthue" };
        var para = {    
            v_ID:idkhthue,
            v_TEN:p.txt_ten_kh_sct,
            v_MACT:p.txt_coquan_kh_sct,
            v_DIACHI: p.txt_diachi_kh_sct,
            v_SDT:p.txt_sodienthoai_kh_sct,
            v_NGAY:p.txt_ngaytao_kh_sct,
            v_USERID: userinfo.userid
                };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_capnhatthongtincoquanthue(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_kh_sct", row, 'ok');
            setTimeout(function () {
                loaddanhcoquanthue(1); 
            }, 500);
        } else {
            messInfo("messinfo_kh_sct", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}


