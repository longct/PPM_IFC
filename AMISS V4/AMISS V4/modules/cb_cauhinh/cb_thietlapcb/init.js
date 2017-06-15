var Profileida = 0;
var profileId_dd = 0;
var id_random = Math.random().toString(36).substr(2);
$(document).ready(function () {
    console.log(id_random);
    try {
        showhideTree();
        loadContent();
        var tree = JSON.parse(localStorage.getItem("tree_node"))
        if (tree !=null) {
            // kiểm tra nếu socongto > 0 dang chon diem do, ngược lại chọn đơn vị
            // nếu socongto > 0 xet type=1: 1pha; type=3: 3 pha
            var istype = tree[0].type;
            var socongto = tree[0].socongto;
            var tendiemdo = tree[0].tendiemdo;
            if (socongto != "0" && istype != "4") {
                // thiet lap diem do
                if (istype == 1) {
                    // diem do 1 pha
                    thietlap1pha();
                } else {
                    thietlap3pha();
                }
            } else {
                // thiet lap don vi
                thietlapdonvi();
            }
        }
        // Load xem chi tiet cấu hình của từng điểm đo
        if (tree[0].socongto != '0' && tree[0].type != '4') {
            console.log('xem cau hinh diem do')
            Xemcauhinhdiemdo();
        } else {
            // Load xem chi tiết cấu hình khi chọn danh sách điện lực
            var profileId = localStorage.getItem("projectId");
            if (profileId != null) {
                Profileida = profileId;
                $("#l_tldm_u").attr("data-id", 1);
                $("#l_tldm_i").attr("data-id", 1);
                Xemcaidate(profileId);
            }
        }
       $("#btn_trolai_cbtl").on("click", function () {
           localStorage.removeItem("projectId");
           menuClick("cb_cauhinh/cb_cauhinhtab");
        });
        $("#cboWhichPha").change(function () {
            if ($("#cboWhichPha").val() == "1") {
                $(".tr_cb_3pha").hide();
            } else {
                $(".tr_cb_3pha").show();
            }
        });

        $("#btn_capnhat_cbtl").click(function () {
            var check = checkvalidate();
            if (check != "") {
                showToast(check, "error");
                return;
            }
            if (socongto != "0" && istype != "4") {
                // Thiết lập cấu hình cho từng điểm đo
                ThietLapCauhinhChoDiemDo();
            } else {
                // Thiet lap cấu hình cho đơn vị điện lực
                THIETLAPCAUHINHCANHBAOCHODONVI(Profileida);
            }
          
        });
        $("#btn_sudungma_cbtl").click(function () {
            // mặc định thì id =1;
            Xemcaidate(0);
        });
       
    } catch (e) {
        console.log(e);
    }
});
// Thiết lập show, hide 1 pha, 3 pha
function thietlap1pha() {
    $("#tr_cb_tencauhinh").hide();
    $("#tr_cb_apdungcho").hide();
    $(".tr_cb_3pha").hide();
    $(".tr_tldinhmuc").hide();
    $("#tr_chophepghide").show();
}
function thietlap3pha() {
    $("#tr_cb_tencauhinh").hide();
    $("#tr_cb_apdungcho").hide();
    $(".tr_cb_3pha").show();
    $(".tr_tldinhmuc").hide();
    $("#tr_chophepghide").show();
}
function thietlapdonvi() {
    $("#tr_cb_tencauhinh").show();
    $("#tr_cb_apdungcho").show();
    $("#btn_trolai_cbtl").show();
    $(".tr_tldinhmuc").show();
    $("#tr_chophepghide").hide();
}

// thiet lap cai dat cau hinh mac dinh
function Xemcaidate(projectId) {
    try {
        // lấy thiết lập cảnh báo mặc định theo code khi user đăng nhập vào
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_CAUHINHCANHBAO.GETMACDINHCANHBAO", callback: "result_Xemcaidate_cd" };
        var para = {
            v_ProjectId: projectId
        };
        console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_Xemcaidate_cd(config, para, lst) {
    try {
        console.log(lst);
        if (lst == null) return;
        var data = lst.data;
        if (data.length == 0) return;
        setValToTxt("txt_tencauhinh_chtl", data[0].tencauhinh);
        // Cảnh báo điện áp (U)
        setValToTxt("txt_canhqua_tlcb", data[0].u_tren);
        setValToTxt("txt_canhthap_tlcb", data[0].u_duoi);
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

        // Cos(φ)
        setValToTxt("txt_hscos_tlcb", data[0].cos_value);
        if (data[0].cos_status == '1') { $("#cb_hscos_tlcb").prop("checked", true); } else { $("#cb_hscos_tlcb").prop("checked", false); }
        //Cảnh báo tần số (Freg)
        setValToTxt("txt_canhbaoquatanso_tlcb", data[0].freg_tren);
        setValToTxt("txt_canhbaothaptanso_tlcb", data[0].freg_duoi);
        setValToTxt("txt_cbts_dm_tlcb", data[0].freg_dinhmuc);
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
        setValToTxt("txt_cbcs_dm_tlcb", data[0].p_dinhmuc);
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
// xem cấu hình chọn điểm đo
function Xemcauhinhdiemdo() {
    try {
        // lấy thiết lập cảnh báo mặc định theo code khi user đăng nhập vào
        var tree = JSON.parse(localStorage.getItem("tree_node"));
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_CAUHINHCANHBAO.GETCAUHINHTUNGDIEMDO", callback: "result_Xemcauhinhtungdiemdo_cd" };
        var para = {
            v_meterId: parseInt(tree[0].meterid)
        };
        console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_Xemcauhinhtungdiemdo_cd(config, para, lst) {
    try {
        console.log(lst);
        if (lst == null) return;
        var data = lst.data;
        if (data.length == 0) return;
        profileId_dd = data[0].profileid;
        setValToTxt("txt_tencauhinh_chtl", data[0].tencauhinh);
        // Cảnh báo điện áp (U)
        setValToTxt("txt_canhqua_tlcb", data[0].u_tren);
        setValToTxt("txt_canhthap_tlcb", data[0].u_duoi);
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

        // Cos(φ)
        setValToTxt("txt_hscos_tlcb", data[0].cos_value);
        if (data[0].cos_status == '1') { $("#cb_hscos_tlcb").prop("checked", true); } else { $("#cb_hscos_tlcb").prop("checked", false); }
        //Cảnh báo tần số (Freg)
        setValToTxt("txt_canhbaoquatanso_tlcb", data[0].freg_tren);
        setValToTxt("txt_canhbaothaptanso_tlcb", data[0].freg_duoi);
        setValToTxt("txt_cbts_dm_tlcb", data[0].freg_dinhmuc);
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
        setValToTxt("txt_cbcs_dm_tlcb", data[0].p_dinhmuc);
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
        console.log("checkchophepsua: " +data[0].chophepsua);
        var checkchophepsua = data[0].chophepsua == 1 ? true : false;
        $("#chkchophepghide").prop("checked",checkchophepsua);

    } catch (e) {
        console.log(e);
    }
}
/*===========================================================
===Thiết lập cấu hình cảnh báo cho đơn vị điện lực======
===========================================================*/
function THIETLAPCAUHINHCANHBAOCHODONVI(v_profileId) {
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
        var tree = JSON.parse(localStorage.getItem("tree_node"));
        var codeCT = localStorage.getItem("CT");
        var codeDL = localStorage.getItem("DL");
        var p = getAllIdMod();
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_CAUHINHCANHBAO.THIETLAPCANHBAODIENLUC", callback: "result_thietlapcanhbaodonvidienluc" };
        var para = {
            v_PROFILEID: v_profileId,
            v_PROFILENAME: p.txt_tencauhinh_chtl,
            v_UTren:parseFloat(p.txt_canhqua_tlcb),
            v_UDuoi:parseFloat(p.txt_canhthap_tlcb),
            v_UStatus:parseInt(utaus),
            v_IQUA_Value:parseFloat(p.txt_idinhmuc_tlcb),
            v_IQUAStatus:parseInt(IQUAStatus),
            v_I1PHA_Value:parseFloat(p.txt_dong1pha2pha_tlcb),
            v_I1PHAStatus:parseInt(I1PHAStatus),
            v_I2PHA_Value:parseFloat(p.txt_dong2pha1pha_tlcb),
            v_I2PHAStatus:parseInt(I2PHAStatus),
            v_ILECH_Value:parseFloat(p.txt_donglenh1pha_tlcb),
            v_ILECHStatus: parseInt(ILECHStatus),
            v_COSValue:parseFloat(p.txt_hscos_tlcb),
            v_COSStatus:parseInt(COSStatus) ,
            v_FREGDinhMuc:parseFloat(p.txt_cbts_dm_tlcb),
            v_FREGTren:parseFloat(p.txt_canhbaoquatanso_tlcb),
            v_FREGDuoi:parseFloat(p.txt_canhbaothaptanso_tlcb),
            v_FREGStatus:parseInt(FREGStatus),
            v_ANGLEATren:parseFloat(p.txt_canhaqua_tlcb),
            v_ANGLEADuoi:parseFloat(p.txt_gocatanso_tlcb),
            v_ANGLEBTren:parseFloat(p.txt_canhbqua_tlcb),
            v_ANGLEBDuoi:parseFloat(p.txt_gocbtanso_tlcb),
            v_ANGLECTren:parseFloat(p.txt_canhcqua_tlcb),
            v_ANGLECDuoi:parseFloat(p.txt_gocctanso_tlcb),
            v_ANGLEStatus:parseInt(ANGLEStatus),    
            v_TIME_Value:parseFloat(p.txt_lenhthoigianct_tlcb),
            v_TIMEStatus:parseInt(TIMEStatus),
            v_PAM_Value:parseFloat(p.txt_congsuatvuot_tlcb),
            v_PAMStatus:parseInt(PAMStatus),
            v_PQUA_Value:parseFloat(p.txt_congsuatvuot_tlcb),
            v_PQUAStatus:parseInt(PAMStatus),  
            v_PDinhMuc:parseFloat(p.txt_cbcs_dm_tlcb),
            v_SLKYTREN:parseFloat(p.txt_sanluongkynguong_tlcb),
            v_SLKYTREN_STATUS:parseInt(sl2),
            v_SLKYDUOI:parseFloat(p.txt_sanluongkynguong_tlcb),
            v_SLKYDUOI_STATUS:parseInt(sl3),
            v_SLKODOI_SONGAY:parseFloat(p.txt_sanluongko_tlcb),
            v_SLKODOI_STATUS:parseInt(sl1),
            v_UserId: userinfo.userid,
            v_Emails: p.txtemaillist_tlcb,
            v_Tels: p.txtphonelist_tlcb,
            v_LoaiPha: parseInt(p.cboWhichPha),
            v_codeCT: codeCT,
            v_codeDL: codeDL,
            v_IDRanDom:id_random
        };
        console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_thietlapcanhbaodonvidienluc(config, para, lst) {
    try {
        if (lst == null) return;
        var data = lst.data;
        var row = parseInt(data[0].count);
        if (row == -1) {
            showToast("Lỗi không cập nhật được", "error");
        }
        else { showToast("Cập nhật thành công cấu hình cảnh báo", "success"); Profileida = row; }
        // gán data-id=1 để lấy dữ liệu ở bang cb_thietlap_danhdinh
        $("#l_tldm_u").attr("data-id", 1);
        $("#l_tldm_i").attr("data-id", 1);
    } catch (e) {
        console.log(e);
    }
}

function checkvalidate() {
    try {
        var p = getAllIdMod();
        if (p.txt_tencauhinh_chtl == "") return "Tên cấu hình không được bỏ trống";
        if (p.txt_canhqua_tlcb == "") return "Cảnh báo quá điện áp không được bỏ trống";
        if (p.txt_canhthap_tlcb == "") return "Cảnh báo quá điện áp không được bỏ trống";
        // i 
        if (p.txt_idinhmuc_tlcb == "") return "Cảnh báo quá dòng không được bỏ trống";
        if (p.txt_dong1pha2pha_tlcb == "") return "Cảnh báo quá dòng 1 pha và 2 pha  không được bỏ trống";
        if (p.txt_dong2pha1pha_tlcb == "") return "Cảnh báo quá dòng 2 pha và 1 pha không được bỏ trống";
        if (p.txt_donglenh1pha_tlcb == "") return "Cảnh báo dòng 1 pha lệch so với các pha không được bỏ trống";
        if (p.txt_hscos_tlcb == "") return "Cảnh báo hệ số công suất - Cos(φ) không được bỏ trống";
        if (p.txt_lenhthoigianct_tlcb == "") return "Cảnh báo lệch thời gian hệ thống và công tơ không được bỏ trống";
       
        return "";
    } catch (e) {
        console.log(e);
    }
}
/*===========================================================*/
// thiết lập định mức
function thietlapdinhmuc(setLCB) {
    try {
        $("#md_cb_tldm").modal("show");
        LoadThamSoCBDM(setLCB);
        
    } catch (e) {
        console.log(e);
    }
}
function LoadThamSoCBDM(setLCB) {
    try {
        var tl_dongy_u = $("#l_tldm_u").attr("data-id");
        var tl_dongy_i = $("#l_tldm_i").attr("data-id");
        var tr = "";
       
        if (setLCB.indexOf("U") > -1 && tl_dongy_u.indexOf("0") > -1) {
            $("#danhsach_cbvh").empty();
            tr += "<tr>";
            tr += "<td>TU</td>";
            tr += "<td><input type='text' name='txt_cb_ts' data_loai='" + setLCB + "' data-id='" + id_random + "'  placeholder='1'/> (V)</td>";
            tr += "<td>=> Điện áp định mức</td>";
            tr += "<td><input type='text' name='txt_cb_tsdm' placeholder='220' /> (V)</td>";
            tr += "<td><a href='#' onclick='Xoa_edit_cb_dm(this)' title='Xóa'><span  class='glyphicon glyphicon-remove-sign' aria-hidden='true'></span></a></td>";
            tr += "</tr>";
            $("#danhsach_cbvh").append(tr);
        } else if (setLCB.indexOf("I") > -1 && tl_dongy_i.indexOf("0") > -1) {
            $("#danhsach_cbvh").empty();
            tr += "<tr>";
            tr += "<td>TI</td>";
            tr += "<td><input type='text' name='txt_cb_ts' data_loai='" + setLCB + "'  data-id='" + id_random + "' placeholder='1'/> (A)</td>";
            tr += "<td>=> Dòng điện định mức</td>";
            tr += "<td><input type='text' name='txt_cb_tsdm' placeholder='100' /> (A)</td>";
            tr += " <td><a href='#' onclick='Xoa_edit_cb_dm(this)' title='Xóa'><span  class='glyphicon glyphicon-remove-sign' aria-hidden='true'></span></a></td>";
            tr += "</tr>";
            $("#danhsach_cbvh").append(tr);
        }
        else if (setLCB.indexOf("U") > -1 && tl_dongy_u.indexOf("1") > -1) {
            TEMP_CB_TLDANHDINH(setLCB, id_random);
        }
        else if (setLCB.indexOf("I") > -1 && tl_dongy_i.indexOf("1") > -1) {
            TEMP_CB_TLDANHDINH(setLCB, id_random);
        }
        else if (setLCB.indexOf("U") > -1 && tl_dongy_u.indexOf("2") > -1 ) {
            GETDATATEMPEDIT(setLCB, id_random)
        }
        else if (setLCB.indexOf("I") > -1 && tl_dongy_u.indexOf("2") > -1) {
            GETDATATEMPEDIT(setLCB, id_random)
        }
    } catch (e) {
        console.log(e);
    }
}
function GETDATATEMPEDIT(v_loaicb, v_idrandom) {
    try{
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_CAUHINHCANHBAO.GETDATA_TEMP_CB_TLDANHDINH", callback: "result_getdata_temp_cb_tldanhdinh" };
        var para = {
            v_IDRanDom: v_idrandom,
            v_loaicb: v_loaicb
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function TEMP_CB_TLDANHDINH(v_loaicb, v_idrandom) {
    try {
        if (Profileida == 0) {
            var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_CAUHINHCANHBAO.GETDATA_TEMP_CB_TLDANHDINH", callback: "result_getdata_temp_cb_tldanhdinh" };
            var para = {
                v_IDRanDom: v_idrandom,
                v_loaicb: v_loaicb
            };
        } else if (Profileida > 0 ) {
            var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_CAUHINHCANHBAO.GETDATA_CB_THIETLAPDANHDINH", callback: "result_getdata_temp_cb_tldanhdinh" };
            var para = {
                v_loaicb: v_loaicb,
                v_ProfileId:Profileida
            };
           
        }
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_getdata_temp_cb_tldanhdinh(config, para, lst) {
    try {
        if (lst == null || lst.data.length == 0) { // Kiểm tra nếu chua co trong bang tam, thì cho load mac dinh
            lstnull(para);
            return;
        };
        var data = lst.data;
        var tr = "";
        $("#danhsach_cbvh").empty();
        $.each(data, function (key, val) {
            if (val.loaicb.indexOf("U") > -1) {
                tr += "<tr>";
                tr += "<td>TU</td>";
                tr += "<td><input type='text' name='txt_cb_ts' data_loai='" + val.loaicb + "' data-id='" + id_random + "'  value='" + val.giatri + "'/> (V)</td>";
                tr += "<td>=> Điện áp định mức</td>";
                tr += "<td><input type='text' name='txt_cb_tsdm' value='" + val.giatri_dm + "' /> (V)</td>";
                tr += "<td><a href='#' onclick='Xoa_edit_cb_dm(this)' title='Xóa'><span  class='glyphicon glyphicon-remove-sign' aria-hidden='true'></span></a></td>";
                tr += "</tr>";
            } else if (val.loaicb.indexOf("I") > -1) {
                tr += "<tr>";
                tr += "<td>TI</td>";
                tr += "<td><input type='text' name='txt_cb_ts'  data_loai='" + val.loaicb + "' data-id='" + id_random + "' value='" + val.giatri + "' /> (A)</td>";
                tr += "<td>=> Dòng điện định mức</td>";
                tr += "<td><input type='text' name='txt_cb_tsdm'  value='" + val.giatri_dm + "'  /> (A)</td>";
                tr += "<td><a href='#' onclick='Xoa_edit_cb_dm(this)' title='Xóa'><span  class='glyphicon glyphicon-remove-sign' aria-hidden='true'></span></a></td>";
                tr += "</tr>";
            }
        });
        $("#danhsach_cbvh").append(tr);
    } catch (e) {
        console.log(e);
    }
}

function Xoa_edit_cb_dm(obj) {
    try{
        var loaicb = $(obj).parents("tr").find("input[name='txt_cb_ts']").attr("data_loai");
        $(obj).parents("tr").remove();
        if ($("#danhsach_cbvh").find("tr").length == 0) {
            if (loaicb.indexOf("U") > -1) {
                $("#l_tldm_u").attr("data-id", "0");
                LoadThamSoCBDM(loaicb);
            }
            else if (loaicb.indexOf("I") > -1) {
                $("#l_tldm_i").attr("data-id", "0");
                LoadThamSoCBDM(loaicb);
            }
        }
    } catch (e) {
        console.log(e);
    }
}
function lstnull(para) {
    try {
        var tr = "";
        if (para.v_loaicb.indexOf("U") > -1) {
            $("#l_tldm_u").attr("data-id", "0");
            LoadThamSoCBDM(para.v_loaicb);
        }
        else if (para.v_loaicb.indexOf("I") > -1) {
            $("#l_tldm_i").attr("data-id", "0");
            LoadThamSoCBDM(para.v_loaicb);
        }
      
    } catch (e) {
        console.log(e);
    }
}

/*================================================*/
/* Thiet lập cấu hình cho điểm đo*/
/*================================================*/
function ThietLapCauhinhChoDiemDo() {
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
        var codeCT = localStorage.getItem("CT");
        var codeDL = localStorage.getItem("DL");
        var tree = JSON.parse(localStorage.getItem("tree_node"));
        var p = getAllIdMod();
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_CAUHINHCANHBAO.THIETLAPCANHBAOTUNGDIEMDO", callback: "result_thietlapcauhinhtungdiemdo_cb" };
        var para = {
            v_PROFILENAME: "MẶC ĐỊNH",
            v_UTren:parseFloat(p.txt_canhqua_tlcb),
            v_UDuoi:parseFloat(p.txt_canhthap_tlcb),
            v_UStatus:parseInt(utaus),
            v_IQUA_Value:parseFloat(p.txt_idinhmuc_tlcb),
            v_IQUAStatus:parseInt(IQUAStatus),
            v_I1PHA_Value:parseFloat(p.txt_dong1pha2pha_tlcb),
            v_I1PHAStatus:parseInt(I1PHAStatus),
            v_I2PHA_Value:parseFloat(p.txt_dong2pha1pha_tlcb),
            v_I2PHAStatus:parseInt(I2PHAStatus),
            v_ILECH_Value:parseFloat(p.txt_donglenh1pha_tlcb),
            v_ILECHStatus: parseInt(ILECHStatus),
            v_COSValue:parseFloat(p.txt_hscos_tlcb),
            v_COSStatus:parseInt(COSStatus) ,
            v_FREGDinhMuc:parseFloat(p.txt_cbts_dm_tlcb),
            v_FREGTren:parseFloat(p.txt_canhbaoquatanso_tlcb),
            v_FREGDuoi:parseFloat(p.txt_canhbaothaptanso_tlcb),
            v_FREGStatus:parseInt(FREGStatus),
            v_ANGLEATren:parseFloat(p.txt_canhaqua_tlcb),
            v_ANGLEADuoi:parseFloat(p.txt_gocatanso_tlcb),
            v_ANGLEBTren:parseFloat(p.txt_canhbqua_tlcb),
            v_ANGLEBDuoi:parseFloat(p.txt_gocbtanso_tlcb),
            v_ANGLECTren:parseFloat(p.txt_canhcqua_tlcb),
            v_ANGLECDuoi:parseFloat(p.txt_gocctanso_tlcb),
            v_ANGLEStatus:parseInt(ANGLEStatus),    
            v_TIME_Value:parseFloat(p.txt_lenhthoigianct_tlcb),
            v_TIMEStatus:parseInt(TIMEStatus),
            v_PAM_Value:parseFloat(p.txt_congsuatvuot_tlcb),
            v_PAMStatus:parseInt(PAMStatus),
            v_PQUA_Value:parseFloat(p.txt_congsuatvuot_tlcb),
            v_PQUAStatus:parseInt(PAMStatus),  
            v_PDinhMuc:parseFloat(p.txt_cbcs_dm_tlcb),
            v_SLKYTREN:parseFloat(p.txt_sanluongkynguong_tlcb),
            v_SLKYTREN_STATUS:parseInt(sl2),
            v_SLKYDUOI:parseFloat(p.txt_sanluongkynguong_tlcb),
            v_SLKYDUOI_STATUS:parseInt(sl3),
            v_SLKODOI_SONGAY:parseFloat(p.txt_sanluongko_tlcb),
            v_SLKODOI_STATUS:parseInt(sl1),
            v_UserId:userinfo.userid,
            v_Emails: p.txtemaillist_tlcb,
            v_Tels: p.txtphonelist_tlcb,
            v_CodeDL:codeDL, //tree.socongto=0: thiet lap diem do
            v_LoaiPha: parseInt(tree[0].type),
            v_MeterId: parseInt(tree[0].meterid),
            v_ProfileId: profileId_dd,
            v_ChoPhepSua: $("#chkchophepghide").prop("checked") == true ? 1 : 0,
            v_Code: code
        };
        console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_thietlapcauhinhtungdiemdo_cb(config, para, lst) {
    try {
        console.log(lst);
        var tree = JSON.parse(localStorage.getItem("tree_node"));
        if (lst == null) return;
        var data = lst.data;
        var row = parseInt(data[0].count);
        if (row == 0) {
            showToast("Cập nhật cấu hình cảnh báo không thành công", "error");
        }
        else { showToast("Cập nhật cấu hình cảnh báo thành công", "success");  }
    } catch (e) {
        console.log(e);
    }
}