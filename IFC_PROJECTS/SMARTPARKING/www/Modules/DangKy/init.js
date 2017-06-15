$(document).ready(function () {
    try {
        clearTimer();
        getLangText();
	    getLoaiXe();
	    getKhachHang();
	 
	    $("#btn_dangkys").click(function () {
	        var check = check_kh_dk();
	        if (check != "") {
	            //messInfo("messinfo_kh_dk", check, 'error');
	            showToast(check, 'error');
	            return;
	        }
	        SaveKhachHangDK();
	    });
	    
	} catch (e) {
	    console.log(e);
	}
});
function getLangText() {
    $("#mod_name").html(apiLstLang.lang_modName);
    $("#txt_tendaydu_dk").attr('placeholder', apiLstLang.lang_placeholedername);
    $("#txt_bienso_dk").attr('placeholder', apiLstLang.lang_placeholederbienso);
    $("#btn_dangkys").text(apiLstLang.lang_dangky);
}
function getKhachHang() {
    try {
        var user = localStorage.getItem("userinfo");     
        if (user != null) {
            setValToTxt("hd_id", JSON.parse(user).id_kh);
            setValToTxt("txt_tendaydu_dk",JSON.parse(user).tendaydu);
            setValToTxt("txt_phone_dk",JSON.parse(user).dienthoai);
            setValToTxt("txt_email_dk",JSON.parse(user).email);
            setValToTxt("txt_bienso_dk",JSON.parse(user).biensoxe);
            setValToTxt("cb_loaixe_dk",JSON.parse(user).id_loaixe);
            $("#btn_dangkys").text(apiLstLang.lang_buttontextdangky);
        }
          

    } catch (e) {
        console.log(e);
    }
}
function getLoaiXe() {
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_CarParking", namesql: "CAR_GETLOAIXE.GETLOAIXE" };
        var para = {};

        var lst = ExecuteServiceSyns(config, para);
        result_getLoaiXe(lst);
    } catch (e) {
        console.log(e);
    }
}
function result_getLoaiXe(data) {
    try {
        var data = data.data;
        //var text = apiLstLang.lang_selectloaixe;
        dataToCob("cb_loaixe_dk", data, "id", "loaixe", "-1", apiLstLang.lang_selectloaixe);

    } catch (e) {
        console.log(e);
    }
}
function check_kh_dk() {
    try {
        var p = getAllIdMod();
        if (p.txt_tendaydu_dk == "") return apiLstLang.lang_kiemtratendaydu;
        if (!IsEmail(p.txt_email_dk)) return apiLstLang.lang_kiemtraemail;
        if (p.txt_bienso_dk == "") return apiLstLang.lang_kiemtrabiensoxe;

        return "";

    } catch (e) {
        console.log(e);
    }
}
function SaveKhachHangDK() {
    try {

        var p = getAllIdMod();
        var model = deviceInfo != undefined ? deviceInfo.model : "";
        var app_id = deviceInfo != undefined ? deviceInfo.uuid : "";
        var platform = deviceInfo != undefined ? deviceInfo.platform : "";
        //var allowpush = deviceInfo != undefined ? deviceInfo.allowpush : "0";
        if (p.hd_id > 0) { // update tai khoan
            var config = { connstr: "Oracle_CarParking", namesql: "CAR_UPDATETAIKHOAN.UPDATETAIKHOAN" };
            var para = {
                v_TEN: p.txt_tendaydu_dk,
                v_SODIENTHOAI: p.txt_phone_dk,
                v_EMAIL: p.txt_email_dk,
                v_IDAPP: app_id,
                v_CHOPHEPPUSH: 1,
                v_BIENSOXE: p.txt_bienso_dk,
                v_PLATFORM: platform,
                v_MODEL: model,
                v_IDLOAIXE: parseInt(p.cb_loaixe_dk),
                v_IDKH: p.hd_id,
            };
            var lst = ExecuteServiceSyns(config, para);

            result_UpdateKhachHang_tk(lst);
        } else { // insert tai khoan
            var config = { connstr: "Oracle_CarParking", namesql: "CAR_TAOTAIKHOAN.TAOTAIKHOAN" };
            var para = {
                v_TEN: p.txt_tendaydu_dk,
                v_SODIENTHOAI: p.txt_phone_dk,
                v_EMAIL: p.txt_email_dk,
                v_IDAPP: app_id,
                v_THOIDIEMDK: gettimenow(),
                v_CHOPHEPPUSH: 1,
                v_BIENSOXE: p.txt_bienso_dk,
                v_PLATFORM: platform,
                v_MODEL: model,
                v_IDLOAIXE: parseInt(p.cb_loaixe_dk)

            };
            var lst = ExecuteServiceSyns(config, para);
            console.log(para);
            result_SaveKhachHang_tk(lst);
        }
    } catch (e) {
        console.log(e);
    }
}
function result_SaveKhachHang_tk(data) {
    try {
        var data = data.data;
        var row = data[0].count;

        if (row.indexOf("OK") > -1) {
            showToast(apiLstLang.lang_thongbaodangkythanhcong, "success");

        }
        else if (row.indexOf("Error") > -1) {
            showToast(apiLstLang.lang_thongbaodangkyloi, "error");
        }
        else if (row.indexOf("1") > -1) {
            showToast(apiLstLang.lang_thongbaodangkytaikhoantontai, "error");
        }
        else if (row.indexOf("2") > -1) {
            showToast(apiLstLang.lang_thongbaodangkybiensotontai, "error");
        }
        else if (row.indexOf("3") > -1) {
            showToast(apiLstLang.lang_thongbaodangkydienthoaitontai, "error");
        }
        else if (row.indexOf("4") > -1) {
            showToast(apiLstLang.lang_thongbaodangkyemailtontai, "error");
        }
    } catch (e) {
        console.log(e);
    }
}
function result_UpdateKhachHang_tk(data) {
    try {
        var data = data.data;
        var row = data[0].count;
        if (row.indexOf("OK") > -1) {
            showToast(apiLstLang.lang_thongbaoupdatedangkythanhcong, "success");

        } else if (row.indexOf("Error") > -1) {
            showToast(apiLstLang.lang_thongbaoupdatedangkyloi, "error");
        }
        else if (row.indexOf("2") > -1) {
            showToast(apiLstLang.lang_thongbaodangkybiensotontai, "error");
        }
        else if (row.indexOf("3") > -1) {
            showToast(apiLstLang.lang_thongbaodangkydienthoaitontai, "error");
        }
        else if (row.indexOf("4") > -1) {
            showToast(apiLstLang.lang_thongbaodangkyemailtontai, "error");
        }
    } catch (e) {
		console.log(e);
	}
}