$(document).ready(function () {
    try {
        loadConetent();
        loadchecklog_master();
        loadcbthietlap();
        $("#cbchon_tlcb").change(function () {   
            var p = getAllIdMod();
            var val = p.cbchon_tlcb;
            localStorage.setItem("txtidthietlap",val);
            if (val == "-1") {
                clearnullthemmoi();
            } else {

                loadthongtinIdthietlap(val);
            }
        });
        //xóa thông tin
        $("#btn_xoach_tlcb").click(function () {
            f_confimYesNo("Bạn chắc chắn muốn xóa bỏ thiết lập này ", "Bỏ qua", "Xác nhận", function () {
                Xoathongtin();
            });
        });

        // thêm 
        $("#btn_checkluu_tlcb").click(function () {
            var p = getAllIdMod();
            var val = p.cbchon_tlcb;
            if (val == "-1") {
                var check = checkvalidate_tlcb();
                if (check != "") {
                    messInfo("messinfo_tlcb", check, "error");
                    return;
                }
                messInfo("messinfo_tlcb", "", "ok");
                f_confimYesNo("Bạn chắc chắn muốn thêm ", "Bỏ qua", "Xác nhận", function () {
                    capnhat_tlcb();
                });
            } else {
                var val = localStorage.getItem("txtidthietlap");
                f_confimYesNo("Bạn chắc chắn muốn cập nhật ", "Bỏ qua", "Xác nhận", function () {
                    Capnhathongtin_tkl(val);
                });
                
            }


         
        });
        // apdung cấu hình 
        $("#btn_apdungC_tlcb").click(function(){
            var id = localStorage.getItem("txtidthietlap");
            var p = getAllIdMod();
            var val = p.cbchon_tlcb;
            if (val == "-1") {
                messInfo("messinfo_tlcb", 'Bạn chưa chọn cấu hình áp dụng thiết lập cảnh báo', "error");
            } else {
              
                f_confimYesNo("Bạn chắc chắn muốn áp dụng cấu hình", "Bỏ qua", "Xác nhận", function () {
                    apdungcauhinh(id);
                });
            }
        });

    } catch (e) {
        console.log(e);
    }

});
function checkvalidate_tlcb() {
    try{
        var p = getAllIdMod();
        if (p.txt_canhbaoudc_tlcb == "") return "U định mức không được bỏ trống";
        if (p.txt_canhbaoidc_tlcb == "") return "I định mức không được bỏ trống";
        if (p.txt_tencauhinh_tlcb == "") return "Tên cảnh báo không được bỏ trống";
        if (p.txt_canhthap_tlcb == "") return "Cảnh báo thấp điện áp không được bỏ trống";
        if (p.txt_canhbaoquadong_tlcb == "") return "Cảnh báo quá dòng không được bỏ trống";
        if (p.txt_dong1pha_tlcb == "") return "Quá dòng 1 pha và 2 pha còn lại không được bỏ trống";
        if (p.txt_dong2pha_tlcb == "") return "Quá dòng 2 pha và 1 pha còn lại không được bỏ trống";
        if (p.txt_donglenh1pha_tlcb == "") return "Dòng 1 pha lệch so với các pha không được bỏ trống";
        if (p.txt_hscos_tlcb == "") return "Hệ số công suất không được bỏ trống";
        return "";

    } catch (e) {
        console.log(e);
    }
}
function capnhat_tlcb() {
    try {
        if ($("#txt_checkudinh_tlcb").is(':checked')) {var staus_udinhmuc = 1;} else {  var staus_udinhmuc = 0;}
        if ($("#txt_checkcanhbao").is(':checked')) { var staus_canh = 1; } else { var staus_canh = 0; }
        if ($("#txt_check1phaqua_tlcb").is(':checked')) { var staus_1pha = 1; } else { var staus_1pha = 0; }
        if ($("#txt_check2pha_tlcb").is(':checked')) { var staus_2pha = 1; } else { var staus_2pha = 0; }
        if ($("#txt_check1phadong_tlcb").is(':checked')) { var staus_1phadong = 1; } else { var staus_1phadong = 0; }
        if ($("#txt_checkcos_tlcb").is(':checked')) { var staus_cos = 1; } else { var staus_cos = 0; }
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "PKG_THIETLAPCANHBAO.CAPNHATTHIETLAPC", callback: "f_result_capnhacanhbao_tl", connstr: "ConnectOracleStreetLight" };
        var p = getAllIdMod();
        var para = {
                v_PROFILEID:'',
                v_PROFILENAME: p.txt_tencauhinh_tlcb,
                v_INSERTDATE:'',
                v_USERID:userinfo.idnhanvien,
                v_U_TREN:p.txt_canhqua_tlcb,
                v_U_DUOI:p.txt_canhthap_tlcb, 
                v_U_STATUS: staus_udinhmuc,
                v_COS_VALUE:p.txt_hscos_tlcb, 
                v_COS_STATUS: staus_cos,
                v_TIME_VALUE: '',
                v_TIME_STATUS:'',
                v_ILECH_VALUE:p.txt_donglenh1pha_tlcb,
                v_ILECH_STATUS: staus_1phadong,
                v_I1PHA_VALUE:p.txt_dong1pha_tlcb,
                v_I1PHA_STATUS: staus_1pha,
                v_I2PHA_VALUE:p.txt_dong2pha_tlcb,
                v_I2PHA_STATUS: staus_2pha,
                v_IQUA_VALUE: p.txt_canhbaoquadong_tlcb,
                v_IQUA_STATUS: staus_canh,
                v_UPDATEDATE:'',
                v_USERUPDATE:'', 
                v_USERPROFILE: '',
                v_IQUA_VALUE: p.txt_canhbaoquadong_tlcb,
                v_IDINHMUC: p.txt_canhbaoidc_tlcb,
                v_UDINHMUC: p.txt_canhbaoudc_tlcb,
                v_TYPE: 'THEM'
        };
        ExecuteServiceSyns(config, para);

    }catch(e){
        console.log(e);
    }
}
function f_result_capnhacanhbao_tl(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_tlcb", row, "ok");
            setTimeout(function () {
                clearnullthemmoi();
                loadcbthietlap();
            }, 1000);
        } else {
            messInfo("messinfo_tlcb", row, "error");
        }
    } catch (e) {
        console.log(e);
    }
}

function Capnhathongtin_tkl(val) {
    try {
        if ($("#txt_checkudinh_tlcb").is(':checked')) { var staus_udinhmuc = 1; } else { var staus_udinhmuc = 0; }
        if ($("#txt_checkcanhbao").is(':checked')) { var staus_canh = 1; } else { var staus_canh = 0; }
        if ($("#txt_check1phaqua_tlcb").is(':checked')) { var staus_1pha = 1; } else { var staus_1pha = 0; }
        if ($("#txt_check2pha_tlcb").is(':checked')) { var staus_2pha = 1; } else { var staus_2pha = 0; }
        if ($("#txt_check1phadong_tlcb").is(':checked')) { var staus_1phadong = 1; } else { var staus_1phadong = 0; }
        if ($("#txt_checkcos_tlcb").is(':checked')) { var staus_cos = 1; } else { var staus_cos = 0; }
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "PKG_THIETLAPCANHBAO.CAPNHATTHIETLAPC", callback: "f_result_capnhacanhbao_tl", connstr: "ConnectOracleStreetLight" };
        var p = getAllIdMod();
        var para = {
            v_PROFILEID: val,
            v_PROFILENAME: p.txt_tencauhinh_tlcb,
            v_INSERTDATE: '',
            v_USERID: userinfo.idnhanvien,
            v_U_TREN: p.txt_canhqua_tlcb,
            v_U_DUOI: p.txt_canhthap_tlcb,
            v_U_STATUS: staus_udinhmuc,
            v_COS_VALUE: p.txt_hscos_tlcb,
            v_COS_STATUS: staus_cos,
            v_TIME_VALUE: '',
            v_TIME_STATUS: '',
            v_ILECH_VALUE: p.txt_donglenh1pha_tlcb,
            v_ILECH_STATUS: staus_1phadong,
            v_I1PHA_VALUE: p.txt_dong1pha_tlcb,
            v_I1PHA_STATUS: staus_1pha,
            v_I2PHA_VALUE: p.txt_dong2pha_tlcb,
            v_I2PHA_STATUS: staus_2pha,
            v_IQUA_VALUE: p.txt_canhbaoquadong_tlcb,
            v_IQUA_STATUS: staus_canh,
            v_UPDATEDATE: '',
            v_USERUPDATE: '',
            v_USERPROFILE: '',
            v_IQUA_VALUE: p.txt_canhbaoquadong_tlcb,
            v_IDINHMUC: p.txt_canhbaoidc_tlcb,
            v_UDINHMUC: p.txt_canhbaoudc_tlcb,
            v_TYPE: 'UPDATE'
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}





function clearnullthemmoi() {
    try {
        setValToTxt("txt_canhbaoudc_tlcb", '');
        setValToTxt("txt_canhbaoidc_tlcb", '');
        setValToTxt("txt_tencauhinh_tlcb", '');
        setValToTxt("txt_canhqua_tlcb", '');
        setValToTxt("txt_canhthap_tlcb", '');
        $("#txt_checkudinh_tlcb").prop("checked", false);
        setValToTxt("txt_canhbaoquadong_tlcb", '');
        $("#txt_checkcanhbao").prop("checked", false);
        setValToTxt("txt_dong1pha_tlcb", '');
        $("#txt_check1phaqua_tlcb").prop("checked", false);
        setValToTxt("txt_dong2pha_tlcb", '');
        $("#txt_check2pha_tlcb").prop("checked", false);
        setValToTxt("txt_donglenh1pha_tlcb", '');
        $("#txt_check1phadong_tlcb").prop("checked", false);
        setValToTxt("txt_hscos_tlcb", '');
        $("#txt_checkcos_tlcb").prop("checked", false);
        messInfo("messinfo_tlcb", "", "ok");
    } catch (e) {
        console.log(e);
    }
}
function loadcbthietlap() {
    try{
        var config = { namesql: "PKG_THIETLAPCANHBAO.LSTLOADPROFILE", callback: "f_result_lstloadthietlap", connstr: "ConnectOracleStreetLight" };
        var para = [];
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_lstloadthietlap(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        dataToCob("cbchon_tlcb", data, "profileid", "profilename", "-1", "TẠO CẤU HÌNH MỚI");
    } catch (e) {
        console.log(e);
    }
}
// hien thi thong tin load
function loadthongtinIdthietlap(val) {
    try{
        var config = { namesql: "PKG_THIETLAPCANHBAO.LOADPROFILEID", callback: "f_result_loadthongtinIdthietlap", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_ID:val
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthongtinIdthietlap(config, para, lst) {
    try {
        var data = lst.data;
        setValToTxt("txt_tencauhinh_tlcb", data[0].profilename);
        setValToTxt("txt_canhqua_tlcb", data[0].u_tren);
        setValToTxt("txt_canhthap_tlcb", data[0].u_duoi);
        setValToTxt("txt_canhbaoudc_tlcb", data[0].udinhmuc);
        setValToTxt("txt_canhbaoidc_tlcb", data[0].idinhmuc);
        if (data[0].u_status == "1") {
            $("#txt_checkudinh_tlcb").prop("checked", true);
        } else {
            $("#txt_checkudinh_tlcb").prop("checked", false);
        }
        setValToTxt("txt_canhbaoquadong_tlcb", data[0].iqua_value);
        if (data[0].iqua_status == "1") {
            $("#txt_checkcanhbao").prop("checked", true);
        } else {
            $("#txt_checkcanhbao").prop("checked", false);
        }
        setValToTxt("txt_dong1pha_tlcb", data[0].i1pha_value);
        if (data[0].i1pha_status == "1") {
            $("#txt_check1phaqua_tlcb").prop("checked", true);
        } else {
            $("#txt_check1phaqua_tlcb").prop("checked", false);
        }
        setValToTxt("txt_dong2pha_tlcb", data[0].i2pha_value);
        if (data[0].i2pha_status == "1") {
            $("#txt_check2pha_tlcb").prop("checked", true);
        } else {
            $("#txt_check2pha_tlcb").prop("checked", false);
        }
        setValToTxt("txt_donglenh1pha_tlcb", data[0].ilech_value);
        if (data[0].ilech_status == "1") {
            $("#txt_check1phadong_tlcb").prop("checked", true);
        } else {
            $("#txt_check1phadong_tlcb").prop("checked", false);
        }
        setValToTxt("txt_hscos_tlcb", data[0].cos_value);
        if (data[0].cos_status == "1") {
            $("#txt_checkcos_tlcb").prop("checked", true);
        } else {
            $("#txt_checkcos_tlcb").prop("checked", false);
        }
       

    } catch (e) {
        console.log(e);
    }
}
// xoa thong tin thiet lập
function Xoathongtin() {
    try{
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var val = localStorage.getItem("txtidthietlap");
        var config = { namesql: "PKG_THIETLAPCANHBAO.XOACAUHINH", callback: "f_result_xoathongtinthietlap", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_ID: val,
            v_userid:userinfo.idnhanvien
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_xoathongtinthietlap(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_tlcb", row, "ok");
            setTimeout(function () {
                clearnullthemmoi();
            }, 1000);
            loadcbthietlap();
        } else {
            messInfo("messinfo_tlcb", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}
function apdungcauhinh(id) {
    try{

        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "PKG_THIETLAPCANHBAO.LOADAPDUNG", callback: "f_result_apdungcauhinh", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_userid: userinfo.idnhanvien,
              v_meter:'',
              v_PROFILEID:id,
              v_Edit:'',
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_apdungcauhinh(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_tlcb", row, "ok");
            setTimeout(function () { messInfo("messinfo_tlcb", '', "ok"); }, 3000);
        } else {
            messInfo("messinfo_tlcb", row, "error");
        }
    } catch (e) {
        console.log();
    }
}