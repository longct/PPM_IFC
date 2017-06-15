var countpage = 10;
$(document).ready(function () {
    try {
		alert(123)
    	$("#fdsfds").html(apiLstLang.lang_hienthitatcasmartpacking);
    	$("#btn_khachhangreigster").click(function () {
    		SaveKhachHang_register();
    	});
    } catch (e) {
        console.log(e);
    }
});

function SaveKhachHang_register() {
	try {
		alert(1);
		var p = getAllIdMod();
		var config = { connstr: "Oracle_CarParking", namesql: "CAR_TAOTAIKHOAN", callback: "result_SaveKhachHang_register" };
		var para = {
			v_TEN: p.txt_ten_khregister,
			v_SODIENTHOAI: p.txt_sodienthoai_khregister,
			v_EMAIL: p.txt_email_khregister,
			v_IDAPP: p.txt_idapp_khregister,
			v_THOIDIEMDK: gettimenow(),
			v_CHOPHEPPUSH: '1',
			v_BIENSOXE: p.txt_biensoxe_khregister
		};
		ExecuteServiceSyns(config, para);
	} catch (e) {
		console.log(e);
	}
}
function result_SaveKhachHang_register(config, para, lst) {
	try {
console.log('lst');
		console.log(lst);
		var data = lst.data;
		var row = data[0].count;

		if (row.indexOf("thành công") > 0) {
			showToast(row, "success");
		
		} else {
			
			showToast(row, "error");
		}


	} catch (e) {
		console.log(e);
	}
}