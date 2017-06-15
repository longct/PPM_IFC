var XNCSHHU = {};
$(document).ready(function () {
    try {
        showhideTree()
        selectlang();
        initformelement();
        loadContent();
        $("#date_ngay").val(gettimenow());
        $('#cmis_input').change(function () {
            XNCSHHU.f_clear_temp_table();
        });

        //Sự kiện cho
        $("input[name=rdtype]").change(function () {

            if ($(this).val() == "xuatdulieu") {
                $("#btnLocdulieu").show();
                $("#btnXuatfilexml").show();

                $("#btnLuuChiSoMoi").hide();

            } else {
                $("#btnLocdulieu").hide();
                $("#btnXuatfilexml").hide();
                $("#btnLuuChiSoMoi").show();
            }
        });

        $("#btnLocdulieu").click(function () {
            XNCSHHU.f_loc_du_lieu_hhu();
        });

        $("#btnLuuChiSoMoi").click(function () {
            XNCSHHU.f_luu_chi_so_hhu_vao_db();
        });

    } catch (e) {
        console.log(e);
    }

});

XNCSHHU.f_luu_chi_so_hhu_vao_db = function () {
    try {
        var objUser = JSON.parse(localStorage.getItem("userinfo"));

        var config = {
            connstr: "ConnectOracle233",
            namesql: "AMISS_DONGBOCMISS.SaveCSMXmlCmiss_HHU",
            callback: "XNCSHHU.f_luu_chi_so_hhu_vao_db_callback"
        };
        var para = {
            v_userId: objUser.userid,
            v_Username: objUser.usercode,
            timeInput: $("#date_ngay").val()
        };
        callLoad();
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

XNCSHHU.f_luu_chi_so_hhu_vao_db_callback = function (config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            showToast('Không có dữ liệu hiển thị', "error");
            stopLoad();
            return;
        }
        showToast('Nhập thành công ' + data[0].kq + ' chỉ số mới', "success");
        stopLoad();
    } catch (e) {
        console.log(e);
        stopLoad();
    }
}

XNCSHHU.f_loc_du_lieu_hhu = function () {
    try {
        var objUser = JSON.parse(localStorage.getItem("userinfo"));

        var config = {
            connstr: "ConnectOracle233",
            namesql: "AMISS_DONGBOCMISS.SelectXmlCmiss_HHU",
            callback: "XNCSHHU.f_loc_du_lieu_hhu_callback"
        };
        var para = {
            v_TimeInput: $("#date_ngay").val(),
            v_userId: objUser.userid
        };
        callLoad();
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
        stopLoad();
    }
}

XNCSHHU.f_loc_du_lieu_hhu_callback = function (config, para, lst) {
    try {
        var data = lst.data;
        //console.log(data);
        $("#tbl_nxhhu tbody").empty();
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            showToast('Không có dữ liệu hiển thị', "error");
            stopLoad();
            return;
        }

        $.each(data, function (index, value) {
            var row = "<tr>"
            + "<td>" + setnull(value.ma_nvgcs) + "</td>"
            + "<td>" + setnull(value.ma_khang) + "</td>"
            + "<td>" + setnull(value.ma_ddo) + "</td>"
            + "<td>" + setnull(value.ma_dviqly) + "</td>"
            + "<td>" + setnull(value.ma_gc) + "</td>"
            + "<td>" + setnull(value.ma_quyen) + "</td>"
            + "<td>" + setnull(value.ma_tram) + "</td>"
            + "<td>" + setnull(value.bocso_id) + "</td>"
            + "<td>" + setnull(value.loai_bcs) + "</td>"
            + "<td>" + setnull(value.loai_cs) + "</td>"
            + "<td>" + setnull(value.ten_khang) + "</td>"
            + "<td>" + setnull(value.dia_chi) + "</td>"
            + "<td>" + setnull(value.ma_nn) + "</td>"
            + "<td>" + setnull(value.so_ho) + "</td>"
            + "<td>" + setnull(value.ma_cto) + "</td>"
            + "<td>" + setnull(value.sery_cto) + "</td>"
            + "<td>" + setnull(value.hsn) + "</td>"
            + "<td>" + setnull(value.cs_cu) + "</td>"
            + "<td>" + setnull(value.ttr_cu) + "</td>"
            + "<td>" + setnull(value.sl_cu) + "</td>"
            + "<td>" + setnull(value.sl_ttiep) + "</td>"
            + "<td>" + setnull(value.ngay_cu) + "</td>"
            + "<td>" + setnull(value.cs_moi) + "</td>"
            + "<td>" + setnull(value.sl_moi) + "</td>"
            + "<td>" + setnull(value.chuoi_gia) + "</td>"
            + "<td>" + setnull(value.ky) + "</td>"
            + "<td>" + setnull(value.thang) + "</td>"
            + "<td>" + setnull(value.nam) + "</td>"
            + "<td>" + setnull(value.ngay_moi) + "</td>"
            + "<td>" + setnull(value.nguoi_gcs) + "</td>"
            + "<td>" + setnull(value.sl_thao) + "</td>"
            + "<td>" + setnull(value.kimua_cspk) + "</td>"
            + "<td>" + setnull(value.ma_cot) + "</td>"
            + "<td>" + setnull(value.sluong_1) + "</td>"
            + "<td>" + setnull(value.sluong_2) + "</td>"
            + "<td>" + setnull(value.sluong_3) + "</td>"
            + "<td>" + setnull(value.so_hom) + "</td>"
            + "<td>" + setnull(value.pmax) + "</td>"
            + "<td>" + setnull(value.ngay_pmax) + "</td>"
            + "</tr>";
            $("#tbl_nxhhu tbody").append(row);
        });
        stopLoad();
    } catch (e) {
        console.log(e);
        stopLoad();
    }
}

XNCSHHU.f_clear_temp_table = function () {
    try {
        var objUser = JSON.parse(localStorage.getItem("userinfo"));

        var config = {
            connstr: "ConnectOracle233",
            namesql: "AMISS_DONGBOCMISS.CLEAR_TEMP_NHAPXUAT_CMIS_HHU",
            callback: "XNCSHHU.f_upload_file_xml"
        };
        var para = {
            v_userId:objUser.userid
        };

        callLoad();
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

XNCSHHU.f_select_data_from_temp_table = function (config, para, result) {
    try {
        var data = result.data;
        if(!data || data.length === 0 || data[0].status !== 'OK'){
            showToast('Upload file không thành công', "error");
            stopLoad();
            return;
        }
        var objUser = JSON.parse(localStorage.getItem("userinfo"));

        var config = {
            connstr: "ConnectOracle233",
            namesql: "AMISS_DONGBOCMISS.SELECT_TEMP_NHAPXUAT_CMIS_HHU",
            callback: "XNCSHHU.f_select_data_from_temp_table_callback"
        };
        var para = {
            v_userId: objUser.userid
        };

        
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
        stopLoad();
    }
}

XNCSHHU.f_select_data_from_temp_table_callback = function (config, para, lst) {
    try {
        var data = lst.data;
        $("#tbl_nxhhu tbody").empty();
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            showToast('Không có dữ liệu hiển thị', "error");
            stopLoad();
            return;
        }
        
        $.each(data, function (index, value) {
            var row = "<tr>"
            + "<td>" + setnull(value.ma_nvgcs) + "</td>"
            + "<td>" + setnull(value.ma_khang) + "</td>"
            + "<td>" + setnull(value.ma_ddo) + "</td>"
            + "<td>" + setnull(value.ma_dviqly) + "</td>"
            + "<td>" + setnull(value.ma_gc) + "</td>"
            + "<td>" + setnull(value.ma_quyen) + "</td>"
            + "<td>" + setnull(value.ma_tram) + "</td>"
            + "<td>" + setnull(value.bocso_id) + "</td>"
            + "<td>" + setnull(value.loai_bcs) + "</td>"
            + "<td>" + setnull(value.loai_cs) + "</td>"
            + "<td>" + setnull(value.ten_khang) + "</td>"
            + "<td>" + setnull(value.dia_chi) + "</td>"
            + "<td>" + setnull(value.ma_nn) + "</td>"
            + "<td>" + setnull(value.so_ho) + "</td>"
            + "<td>" + setnull(value.ma_cto) + "</td>"
            + "<td>" + setnull(value.sery_cto) + "</td>"
            + "<td>" + setnull(value.hsn) + "</td>"
            + "<td>" + setnull(value.cs_cu) + "</td>"
            + "<td>" + setnull(value.ttr_cu) + "</td>"
            + "<td>" + setnull(value.sl_cu) + "</td>"
            + "<td>" + setnull(value.sl_ttiep) + "</td>"
            + "<td>" + setnull(value.ngay_cu) + "</td>"
            + "<td>" + setnull(value.cs_moi) + "</td>"
            + "<td>" + setnull(value.sl_moi) + "</td>"
            + "<td>" + setnull(value.chuoi_gia) + "</td>"
            + "<td>" + setnull(value.ky) + "</td>"
            + "<td>" + setnull(value.thang) + "</td>"
            + "<td>" + setnull(value.nam) + "</td>"
            + "<td>" + setnull(value.ngay_moi) + "</td>"
            + "<td>" + setnull(value.nguoi_gcs) + "</td>"
            + "<td>" + setnull(value.sl_thao) + "</td>"
            + "<td>" + setnull(value.kimua_cspk) + "</td>"
            + "<td>" + setnull(value.ma_cot) + "</td>"
            + "<td>" + setnull(value.sluong_1) + "</td>"
            + "<td>" + setnull(value.sluong_2) + "</td>"
            + "<td>" + setnull(value.sluong_3) + "</td>"
            + "<td>" + setnull(value.so_hom) + "</td>"
            + "<td>" + setnull(value.pmax) + "</td>"
            + "<td>" + setnull(value.ngay_pmax) + "</td>"
            + "</tr>";
            $("#tbl_nxhhu tbody").append(row);
        });
        stopLoad();
    } catch (e) {
        console.log(e);
        stopLoad();
    }
}

XNCSHHU.f_upload_file_xml = function () {
    try {
        var objUser = JSON.parse(localStorage.getItem("userinfo"));
        var fdata = new FormData();
        var files = $('#cmis_input')[0].files[0];
        fdata.append("file", files);

        fdata.append("connstr", "Oracle_HDDT");
        fdata.append("insertto", "AM_TEMP_NHAPXUAT_CMIS_HHU");
        fdata.append("ma_nvgcs", "");
        fdata.append("ma_khang", "");
        fdata.append("ma_ddo", "");
        fdata.append("ma_dviqly", "");
        fdata.append("ma_gc", "");
        fdata.append("ma_quyen", "");
        fdata.append("ma_tram", "");
        fdata.append("bocso_id", "");
        fdata.append("loai_bcs", "");
        fdata.append("loai_cs", "");
        fdata.append("ten_khang", "");
        fdata.append("dia_chi", "");
        fdata.append("ma_nn", "");
        fdata.append("so_ho", "");
        fdata.append("ma_cto", "");
        fdata.append("sery_cto", "");
        fdata.append("hsn", "");
        fdata.append("cs_cu", "");
        fdata.append("ttr_cu", "");
        fdata.append("sl_cu", "");
        fdata.append("sl_ttiep", "");
        fdata.append("ngay_cu", "");
        fdata.append("cs_moi", "");
        fdata.append("sl_moi", "");
        fdata.append("chuoi_gia", "");
        fdata.append("ky", "");
        fdata.append("thang", "");
        fdata.append("nam", "");
        fdata.append("ngay_moi", "");
        fdata.append("nguoi_gcs", "");
        fdata.append("sl_thao", "");
        fdata.append("kimua_cspk", "");
        fdata.append("ma_cot", "");
        fdata.append("sluong_1", "");
        fdata.append("sluong_2", "");
        fdata.append("sluong_3", "");
        fdata.append("so_hom", "");
        fdata.append("pmax", "");
        fdata.append("ngay_pmax", "");
        //fdata.append("userid", objUser.userid);;

        var config = { callback: "XNCSHHU.f_select_data_from_temp_table", namefile: files.name };
        api_uploadFileXmlToOracle(config, fdata);
    } catch (e) {
        console.log(e);
    }
}

