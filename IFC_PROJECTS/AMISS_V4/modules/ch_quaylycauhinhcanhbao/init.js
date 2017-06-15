var Profileida;
$(document).ready(function () {
    try {
        showhideTree();
        var sct = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
        //console.log(sct);
        if (sct != "0") {
            $("#quanly_cht").html("Vui lòng chọn Sổ ghi hoặc Đơn vị");
            $("#tao_table_chtl").hide();
            return;
        }
        $("#tao_table_chtl").show();
        $("#btn_trolai_chtl").click(function () {
            $("#t_cauhinh_chtl").hide();
            $("#tao_table_chtl").show();
            Aplycauhinh_cd();
        });
        $("#btn_tao_chtl").click(function () {
            Profileida = 0;
          
            $("#tao_table_chtl").hide();
            $("#t_cauhinh_chtl").show();
       
            macdinh_cauhinh();
        });
        $("#btn_capnhat_chtl").click(function () {
            var check= checkvalidate();
            if (check != "") {
                showToast(check, "error");
                return;
            }
            taomoicauhinh_cb();
        });
        $("#btn_sudungma_chtl").click(function () {
            // mặc định thì id =1;
            Xemcaidate(1);
        });



        Aplycauhinh_cd();
    } catch (e) {
        console.log(e);
    }
});
// vẽ ra thiết lập cấu hình
function Aplycauhinh_cd() {
    try {
        var tree = JSON.parse(localStorage.getItem("tree_node"));
        var ParentNode = localStorage.getItem("CT");
        var ValueNode = localStorage.getItem("DL");
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAUHINHCANHBAO.GetListProfile", callback: "result_Aplycauhinh_cd" };
        var para = {
            v_TypeNode: '2',
            v_ParentNode: ParentNode,
            v_ValueNode: ValueNode,
            v_UserId: userinfo.userid
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_Aplycauhinh_cd(config, para, lst) {
    try {
        var data = lst.data;

        if (data == "" || data == null || data == undefined || data.length == 0) {
            $("#tabl_thietlapch").hide();
            $("#table_cauhinhtl").empty();
            return;
        }

        $("#table_cauhinhtl").empty();

        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + (key + 1) + "</td><td>"
                + setnull(val.profilename) + "</td><td>"
                + setnull(val.insertdate) + "</td><td>"
                + setnull(val.username) + "</td><td>"
                + setnull(val.updatedate) + "</td><td>"
                + setnull(val.thuocdienluc) + "</td><td>"
                + " <form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action'  id='btn_apdung_cd" + val.profileid + "'> Áp dụng </a></div></form></td><td>"
                + " <form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action'  id='btn_xem_cd" + val.profileid + "'> Xem </a></div></form></td><td>"
                + " <form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action'   id='btn_xoa_cd" + val.profileid + "'> Xóa </a></div></form></td></tr>";
            $("#table_cauhinhtl").append(row);

            $("#btn_apdung_cd" + val.profileid).click(function () {
                var tree = JSON.parse(localStorage.getItem("tree_node"));
                f_confimYesNo("Chắc chắn muốn áp dụng cấu hình cho " + tree[0].tendiemdo, "Bỏ qua", "Xác nhận", function () {
                    ApplyProfile_thietlap(val.profileid);
                });
            });
            $("#btn_xem_cd" + val.profileid).click(function () {
                Profileida = val.profileid;
                Xemcaidate(val.profileid);
            });
            $("#btn_xoa_cd" + val.profileid).click(function () {
                f_confimYesNo("Chắc chắn muốn áp xóa", "Bỏ qua", "Xác nhận", function () {
                    Xoa_thietlap(val.profileid);
                });
            });
        });


    } catch (e) {
        console.log(e);
    }
}

// Hàm áp dụng thiết lập
function ApplyProfile_thietlap(profileid) {
    try {
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var tree = JSON.parse(localStorage.getItem("tree_node"));
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAUHINHCANHBAO.ApplyProfileCanhBao", callback: "result_ApplyProfile_thietlap_cd" };
        var para = {
            v_Type: '2',
            v_TypeValue: '2',
            v_Value: tree[0].id,
            v_ProfileId: profileid,
            v_UserId: userinfo.userid
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_ApplyProfile_thietlap_cd(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row > 0) {
            showToast("Thiết lập thành công cho " + row + " điểm đo", "success");
            setTimeout(function () { Aplycauhinh_cd(); }, 1500);
        } else {
            showToast("Lỗi thiết lập ", "error");
        }

    } catch (e) {
        console.log(e);
    }
}
// xóa
function Xoa_thietlap(profileid) {
    try {
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));

        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAUHINHCANHBAO.DeleteProfileCanhBao", callback: "result_Xoa_thietlap" };
        var para = {
            v_ProfileId: profileid,
            v_UserId: userinfo.userid
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_Xoa_thietlap(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row == 1) {
            showToast("Xóa thành công", "success");
            setTimeout(function () { Aplycauhinh_cd(); }, 1500);
        } else {
            showToast("Lỗi thiết lập ", "error");
        }
    } catch (e) {
        console.log(e);
    }
}

function Xemcaidate(profileid) {
    try {

        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAUHINHCANHBAO.GetProfileCanhBao", callback: "result_Xemcaidate_cd" };
        var para = {
            v_ProfileId: profileid
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_Xemcaidate_cd(config, para, lst) {
    try {
        $("#tao_table_chtl").hide();
        $("#t_cauhinh_chtl").show();
   
        var data = lst.data;


        setValToTxt("txt_tencauhinh_chtl", data[0].profilename);
        //$("#cboWhichPha").val(data[0].phasetype);
        // Cảnh báo điện áp (U)
        setValToTxt("txt_canhqua_tlcb", data[0].u_tren);
        setValToTxt("txt_canhthap_tlcb", data[0].u_duoi);
        setValToTxt("txt_canhbaoudc_tlcb", data[0].u_dinhmuc);
        if (data[0].u_status == '1') { $("#cb_canhqua_tlcb").prop("checked", true); } else { $("#cb_canhqua_tlcb").prop("checked", false); }
        //Cảnh báo dòng điện (I)
        setValToTxt("txt_idinhmuc_tlcb", data[0].iqua_value);
        if (data[0].iqua_status == '1') { $("#cb_idinhmuc_tlcb").prop("checked", true); } else { $("#cb_idinhmuc_tlcb").prop("checked", false); }

        setValToTxt("txt_dong1pha2pha_tlcb", data[0].i1pha_value);
        if (data[0].i1pha_status == '1') { $("#cb_dong1pha2pha_tlcb").prop("checked", true); } else { $("#cb_dong1pha2pha_tlcb").prop("checked", false); }

        setValToTxt("txt_dong2pha1pha_tlcb", data[0].i2pha_value);
        if (data[0].i1pha_status == '1') { $("#cb_dong2pha1pha_tlcb").prop("checked", true); } else { $("#cb_dong2pha1pha_tlcb").prop("checked", false); }

        setValToTxt("txt_donglenh1pha_tlcb", data[0].ilech_value);
        if (data[0].ilech_status == '1') { $("#cb_donglenh1pha_tlcb").prop("checked", true); } else { $("#cb_donglenh1pha_tlcb").prop("checked", false); }
        setValToTxt("txt_canhbaoidc_tlcb", data[0].i_dinhmuc);
        // Cos(φ)
        setValToTxt("txt_hscos_tlcb", data[0].cos_value);
        if (data[0].cos_status == '1') { $("#cb_hscos_tlcb").prop("checked", true); } else { $("#cb_hscos_tlcb").prop("checked", false); }
        //Cảnh báo tần số (Freg)
        setValToTxt("txt_canhbaoquatanso_tlcb", data[0].freg_tren);
        setValToTxt("txt_canhbaothaptanso_tlcb", data[0].freg_duoi);
        setValToTxt("txt_canhbaofagudc_tlcb", data[0].freg_dinhmuc);
        if (data[0].freg_status == '1') { $("#cb_canhbaoquatanso_tlcb").prop("checked", true); } else { $("#cb_canhbaoquatanso_tlcb").prop("checked", false); }
        //Cảnh báo góc lệch pha (φ)
        setValToTxt("txt_gocatanso_tlcb", data[0].anglea_duoi);
        setValToTxt("txt_canhaqua_tlcb", data[0].anglea_tren);
        setValToTxt("txt_gocbtanso_tlcb", data[0].angleb_duoi);
        setValToTxt("txt_canhbqua_tlcb", data[0].angleb_tren);
        setValToTxt("txt_gocctanso_tlcb", data[0].anglec_duoi);
        setValToTxt("txt_canhcqua_tlcb", data[0].anglec_tren);
        if (data[0].angle_status == '1') { $("#cb_gocatanso_tlcb").prop("checked", true); } else { $("#cb_gocatanso_tlcb").prop("checked", false); }
        //Cảnh báo thời gian
        setValToTxt("txt_lenhthoigianct_tlcb", data[0].time_value);
        if (data[0].time_status == '1') { $("#cb_lenhthoigianct_tlcb").prop("checked", true); } else { $("#cb_lenhthoigianct_tlcb").prop("checked", false); }
        //Cảnh báo công suất (P)
        setValToTxt("txt_congsuatvuot_tlcb", data[0].pqua_value);
        setValToTxt("txt_canhqcong_tlcb", data[0].p_dinhmuc);
        if (data[0].pqua_status == '1') { $("#cb_congsuatvuot_tlcb").prop("checked", true); } else { $("#cb_congsuatvuot_tlcb").prop("checked", false); }

        //Cảnh báo sản lượng

        setValToTxt("txt_sanluongko_tlcb", data[0].slkodoi_songay);
        if (data[0].slkodoi_status == '1') { $("#cb_sanluongko_tlcb").prop("checked", true); } else { $("#cb_sanluongko_tlcb").prop("checked", false); }
        setValToTxt("txt_sanluongkynguong_tlcb", data[0].slkytren);
        if (data[0].slkytren_status == '1') { $("#cb_sanluongkynguong_tlcb").prop("checked", true); } else { $("#cb_sanluongkynguong_tlcb").prop("checked", false); }
        setValToTxt("txt_sanluongkyduoi_tlcb", data[0].slkyduoi);
        if (data[0].slkyduoi_status == '1') { $("#cb_sanluongkyduoi_tlcb").prop("checked", true); } else { $("#cb_sanluongkyduoi_tlcb").prop("checked", false); }

        //Danh sách gửi email: 

        setValToTxt("txtemaillist_tlcb", data[0].emails);
        setValToTxt("txtphonelist_tlcb", data[0].tels);

    } catch (e) {
        console.log(e);
    }
}
function macdinh_cauhinh() {
    try {
        setValToTxt("txt_tencauhinh_chtl", "");

        // Cảnh báo điện áp (U)
        setValToTxt("txt_canhqua_tlcb", "");
        setValToTxt("txt_canhthap_tlcb", "");
        setValToTxt("txt_canhbaoudc_tlcb", "");
        $("#cb_canhqua_tlcb").prop("checked", true);
        //Cảnh báo dòng điện (I)
        setValToTxt("txt_idinhmuc_tlcb", "");
        $("#cb_idinhmuc_tlcb").prop("checked", true);
        setValToTxt("txt_dong1pha2pha_tlcb", "");
        $("#cb_dong1pha2pha_tlcb").prop("checked", false);

        setValToTxt("txt_dong2pha1pha_tlcb", "");
        $("#cb_dong2pha1pha_tlcb").prop("checked", false);

        setValToTxt("txt_donglenh1pha_tlcb", "");
        $("#cb_donglenh1pha_tlcb").prop("checked", false);
        setValToTxt("txt_canhbaoidc_tlcb", "");
        // Cos(φ)
        setValToTxt("txt_hscos_tlcb", "");
        $("#cb_hscos_tlcb").prop("checked", true);
        //Cảnh báo tần số (Freg)
        setValToTxt("txt_canhbaoquatanso_tlcb", "");
        setValToTxt("txt_canhbaothaptanso_tlcb", "");
        setValToTxt("txt_canhbaofagudc_tlcb", "");
        $("#cb_canhbaoquatanso_tlcb").prop("checked", false);
        //Cảnh báo góc lệch pha (φ)
        setValToTxt("txt_gocatanso_tlcb", "");
        setValToTxt("txt_canhaqua_tlcb", "");
        setValToTxt("txt_gocbtanso_tlcb", "");
        setValToTxt("txt_canhbqua_tlcb", "");
        setValToTxt("txt_gocctanso_tlcb", "");
        setValToTxt("txt_canhcqua_tlcb", "");
        $("#cb_gocatanso_tlcb").prop("checked", false);
        //Cảnh báo thời gian
        setValToTxt("txt_lenhthoigianct_tlcb", "");
        $("#cb_lenhthoigianct_tlcb").prop("checked", true);
        //Cảnh báo công suất (P)
        setValToTxt("txt_congsuatvuot_tlcb", "");
        setValToTxt("txt_canhqcong_tlcb", "");
        $("#cb_congsuatvuot_tlcb").prop("checked", false);
        //Cảnh báo sản lượng
        setValToTxt("txt_sanluongko_tlcb", "");
        $("#cb_sanluongko_tlcb").prop("checked", false);
        setValToTxt("txt_sanluongkynguong_tlcb", "");
        $("#cb_sanluongkynguong_tlcb").prop("checked", false);
        setValToTxt("txt_sanluongkyduoi_tlcb", "");
        $("#cb_sanluongkyduoi_tlcb").prop("checked", false);
        //Danh sách gửi email: 
        setValToTxt("txtemaillist_tlcb", "");
        setValToTxt("txtphonelist_tlcb", "");
    } catch (e) {
        console.log(e);
    }
}

function taomoicauhinh_cb() {
    try {
        var utaus = $("#cb_canhqua_tlcb").is(':checked') == true ? 1 : 0;
        var IQUAStatus = $("#cb_idinhmuc_tlcb").is(':checked') == true ? 1 : 0;
        var I1PHAStatus = $("#cb_dong1pha2pha_tlcb").is(':checked') == true ? 1 : 0;
        var I2PHAStatus = $("#cb_dong1pha2pha_tlcb").is(':checked') == true ? 1 : 0;
        var ILECHStatus = $("#cb_donglenh1pha_tlcb").is(':checked') == true ? 1 : 0;
        var COSStatus = $("#cb_hscos_tlcb").is(':checked') == true ? 1 : 0;
        var FREGStatus = $("#cb_canhbaoquatanso_tlcb").is(':checked') == true ? 1 : 0;
        var ANGLEStatus = $("#cb_gocatanso_tlcb").is(':checked') == true ? 1 : 0;
        var TIMEStatus = $("#cb_lenhthoigianct_tlcb").is(':checked') == true ? 1 : 0;
        var PAMStatus = $("#cb_lenhthoigianct_tlcb").is(':checked') == true ? 1 : 0;
        var sl1 = $("#cb_sanluongko_tlcb").is(':checked') == true ? 1 : 0;
        var sl2 = $("#cb_sanluongkynguong_tlcb").is(':checked') == true ? 1 : 0;
        var sl3 = $("#cb_sanluongkyduoi_tlcb").is(':checked') == true ? 1 : 0;
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_CAUHINHCANHBAO.ThietLapProfile", callback: "result_taomoicauhinh_cb" };
        var para = {
            v_PROFILEID: Profileida,
            v_PROFILENAME: p.txt_tencauhinh_chtl,
            v_USERPROFILE: '0',
            v_UDinhMuc: p.txt_canhbaoudc_tlcb,
            v_UTren: p.txt_canhbaoudc_tlcb,
            v_UDuoi: p.txt_canhthap_tlcb,
            v_UStatus: utaus,
            v_IQUA_Value: p.txt_idinhmuc_tlcb,
            v_IQUAStatus: IQUAStatus,
            v_I1PHA_Value: p.txt_dong1pha2pha_tlcb,
            v_I1PHAStatus: I1PHAStatus,
            v_I2PHA_Value: p.txt_dong2pha1pha_tlcb,
            v_I2PHAStatus: I2PHAStatus,
            v_ILECH_Value: p.txt_donglenh1pha_tlcb,
            v_ILECHStatus: ILECHStatus,
            v_COSValue: p.txt_hscos_tlcb,
            v_COSStatus: COSStatus,
            v_FREGDinhMuc: p.txt_canhbaofagudc_tlcb,
            v_FREGTren: p.txt_canhbaoquatanso_tlcb,
            v_FREGDuoi: p.txt_canhbaothaptanso_tlcb,
            v_FREGStatus: FREGStatus,
            v_ANGLEATren: p.txt_canhaqua_tlcb,
            v_ANGLEADuoi: p.txt_gocatanso_tlcb,
            v_ANGLEBTren: p.txt_canhbqua_tlcb,
            v_ANGLEBDuoi: p.txt_gocbtanso_tlcb,
            v_ANGLECTren: p.txt_canhcqua_tlcb,
            v_ANGLECDuoi: p.txt_gocctanso_tlcb,
            v_ANGLEStatus: ANGLEStatus,
            v_TIME_Value: p.txt_lenhthoigianct_tlcb,
            v_TIMEStatus: TIMEStatus,
            v_PAM_Value: p.txt_congsuatvuot_tlcb,
            v_PAMStatus: PAMStatus,
            v_PQUA_Value: p.txt_congsuatvuot_tlcb,
            v_PQUAStatus: PAMStatus,
            v_SLKYTREN: p.txt_sanluongkynguong_tlcb,
            v_SLKYTREN_STATUS: sl2,
            v_SLKYDUOI: p.txt_sanluongkynguong_tlcb,
            v_SLKYDUOI_STATUS: sl3,
            v_SLKODOI_SONGAY: p.txt_sanluongko_tlcb,
            v_SLKODOI_STATUS: sl1,
            v_PDinhMuc: p.txt_canhqcong_tlcb,
            v_IDinhMuc: p.txt_canhbaoidc_tlcb,
            v_UserId: userinfo.userid,
            v_PhaseType: p.cboWhichPha,
            v_Emails: p.txtemaillist_tlcb,
            v_Tels: p.txtphonelist_tlcb,
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_taomoicauhinh_cb(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            showToast(row, "success");
        }
        else { showToast(row, "error"); }
    } catch (e) {
        console.log(e);
    }
}
function checkvalidate() {
    try{
        var p = getAllIdMod();
        if (p.txt_tencauhinh_chtl == "") return "Tên cấu hình không được bỏ trống";
        if (p.txt_canhqua_tlcb == "") return "Cảnh báo quá điện áp không được bỏ trống";
        if (p.txt_canhthap_tlcb == "") return "Cảnh báo quá điện áp không được bỏ trống";
        if (p.txt_canhbaoudc_tlcb == "") return "Cảnh báo U định mức không được bỏ trống";
        // i 
        if (p.txt_idinhmuc_tlcb == "") return "Cảnh báo quá dòng không được bỏ trống";
        if (p.txt_dong1pha2pha_tlcb == "") return "Quá dòng 1 pha và 2 pha còn lại = 0 không được bỏ trống";
        if (p.txt_dong2pha1pha_tlcb == "") return "Quá dòng 2 pha và 1 pha còn lại = 0 không được bỏ trống";
        if (p.txt_donglenh1pha_tlcb == "") return "Dòng 1 pha lệch so với các pha không được bỏ trống";
        if (p.txt_canhbaoidc_tlcb == "") return " Cảnh báo dòng điện  I định mức không được bỏ trống";
        if (p.txt_hscos_tlcb == "") return "Hệ số công suất - Cos(φ) không được bỏ trống";
        if (p.txt_lenhthoigianct_tlcb == "") return "Cảnh báo lệch thời gian hệ thống và công tơ không được bỏ trống";
        if (p.txtemaillist_tlcb == "") return "Danh sách gửi email không được bỏ trống";
        if (p.txtphonelist_tlcb == "") return "Danh sách số điện thoại không được bỏ trống";

        return "";
    } catch (e) {
        console.log(e);
    }
}