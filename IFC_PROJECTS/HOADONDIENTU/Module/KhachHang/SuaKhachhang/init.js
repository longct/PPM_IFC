var dik="";
$(document).ready(function () {
    try {
        loadchecklog_master();

        lst_donvis();
       // lst_trams();
        lst_soghis();
       // lst_cost();
        lstngahang_Ksb();
        f_lay_danh_sach_ma_dia_chinhs();
        //$("#cb_donvis_kbkh").change(function () {
        //    lst_trams();
        //});
        //$("#cb_matrams_kbkh").change(function () {
        //    lst_soghis();
        //});
        //$("#cb_masoghis_kbkh").change(function () {
        //    lst_cost();
        //});
        $("#btn_capnhatkhachang").click(function () {
            var check = checkvalidate();
            if (check != "") {
                messInfo("messinfo_skbkh", check, 'error');
                return;
            }
            capnhats_kh();
        });

        loadlists_loaidiemdo();
    } catch (e) {
        console.log(e);
    }
});
function loadkhachhangsuaid(id) {
    try{
        dik=id;
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOKHACHHANG.IDKHHANG", callback: "result_idkhachhang_lstkh" };
        var para = {
            v_ID: id
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_idkhachhang_lstkh(config,para,lst) {
    try{
        var data = lst.data;
      
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            messInfo("messinfo_kbkh", "không tồn tại điểm do", 'error');
            return;
        }
       
      
        $("#txt_tenkhachang_skbkh").val(data[0].tenkhachhang);
        $("#txt_makhachang_skbkh").val(data[0].makhachhang);
        $("#txt_madiemdos_kbkh").val(data[0].madiemdo);
        $("#txt_socongto_skbkh").val(data[0].socongto);
        $("#txt_masothue_skbkh").val(data[0].masothue);
        $("#txt_hesonhan_skbkh").val(data[0].hesonhan);
        $("#cb_loaidiemdos_kbkh").val(data[0].loaidiemdos);
        $("#txt_madiachinhs_kbkh").val(data[0].madiachinh);
        $("#txt_diachis_kbkh").val(data[0].diachi);
        //$("#cb_mahoms_kbkh").val(data[0].mahom);
        //$("#txt_malos_kbkh").val(data[0].malo);
        //$("#txt_matos_kbkh").val(data[0].mato);
        $("#txt_makhuvuc_skbkh").val(data[0].makhuvuc);
        //$("#txt_soho_skbkh").val(data[0].soho);
        if (data[0].ngaytaos == "" || data[0].ngaytaos == null) {
            $("#txt_sdate_kbkh").val(gettimenow());
        } else {
            $("#txt_sdate_kbkh").val(data[0].ngaytaos);
        }
        $("#txt_sominhthus_kbkh").val(data[0].scmt);
        if (data[0].ngay_cmts == "" || data[0].ngay_cmts == null) {
           
            $("#txt_ngaycapdates_kbkh").val(gettimenow());
        } else {
            $("#txt_ngaycapdates_kbkh").val(data[0].ngay_cmts);
        }
       
        $("#txt_noicaps_kbkh").val(data[0].noi_cmt);
        $("#txt_sotaikhoans_kbkh").val(data[0].stk_ngh);
        $("#cb_tenganhangs_kbkh").val(data[0].idnganhangs);
        $("#txt_dienthoais_kbkh").val(data[0].dienthoai);
        $("#txt_emails_kbkh").val(data[0].email);
        $("#cb_kychot_sca").val(data[0].kychot);
        $("#cb_donviqlys_kbkh").val(data[0].madonviqly);
        loadcode(data[0].codes);
    } catch (e) {
        console.log(e);
    }
}
function loadcode(code) {
    try {
        //console.log('code');
        //console.log(code);
        //console.log(code.length);
        if (code == "1") {
            $("#cb_donvis_kbkh").val('-1');
            $("#cb_matrams_kbkh").val('-1');
            $("#cb_masoghis_kbkh").val('-1');
            $("#cb_macots_kbkh").val('-1');
        } else if (code.length == 12) {
            $("#cb_donvis_kbkh").val(code.substring(0, 8));
            $("#cb_matrams_kbkh").val(code.substring(0, 10));
            $("#cb_masoghis_kbkh").val(code.substring(0, 12));
            $("#cb_macots_kbkh").val(code);
        } else if (code.length == 10) {
            $("#cb_donvis_kbkh").val(code.substring(0, 6));
            $("#cb_matrams_kbkh").val(code.substring(0, 8));
            $("#cb_masoghis_kbkh").val(code);
            $("#cb_macots_kbkh").val('-1');
        } else if (code.length == 8) {
            $("#cb_donvis_kbkh").val(code.substring(0, 6));
            $("#cb_matrams_kbkh").val(code);
            $("#cb_masoghis_kbkh").val('-1');
            $("#cb_macots_kbkh").val('-1');
        } else {
            console.log('vao');
            $("#cb_donvis_kbkh").val(code);
            $("#cb_matrams_kbkh").val('-1');
            $("#cb_masoghis_kbkh").val('-1');
            $("#cb_macots_kbkh").val('-1');
        }

    } catch (e) {
        console.log(e)
    }
}
function loadlists_loaidiemdo() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_LOAIDIEMDO", callback: "result_loadlists_loaidiemdo" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_loadlists_loaidiemdo(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_loaidiemdos_kbkh", data, "id", "ten", "-1", "Chọn loại điểm đo");
    } catch (e) {
        console.log(e);
    }
}
function lst_donvis() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_DONVI", callback: "result_lst_donvis" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lst_donvis(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_donvis_kbkh", data, "id", "ten", "-1", "Vui lòng đơn vị");
    } catch (e) {
        console.log(e);
    }
}
function lst_trams() {
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_TRAMCHANGE", callback: "result_lst_trams" };
        var para = {
            v_CODE: p.cb_donvis_kbkh
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lst_trams(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_matrams_kbkh", data, "id", "ten", "-1", "Vui lòng chọn trạm");
    } catch (e) {
        console.log(e);
    }
}
function lst_soghis() {
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_SOGHI", callback: "result_lst_soghis" };
        var para = { v_CODE: '-1' };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lst_soghis(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_masoghis_kbkh", data, "id", "ten", "-1", "Vui lòng chọn sổ ghi");
    } catch (e) {
        console.log(e);
    }
}
function lst_cost() {
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_COT", callback: "result_lst_cost" };
        var para = { v_CODE: p.cb_masoghis_kbkh };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lst_cost(config, para, lst) {
    try {
        var data = lst.data;
      
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_macots_kbkh", data, "id", "ten", "-1", "Vui lòng chọn sổ ghi");
    } catch (e) {
        console.log(e);
    }
}
function lstngahang_Ksb() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_NGANHANG", callback: "result_lstngahang_Ksb" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lstngahang_Ksb(config, para, lst) {
    try {
        var data = lst.data;
        if (data == "" || data == '[]' || data == null || data == undefined) return;
        dataToCob("cb_tenganhangs_kbkh", data, "id", "tenn_hang", "-1", "Chọn ngân hàng ");
    } catch (e) {
        console.log(e);
    }
}
function checkvalidate() {
    try{
        var p = getAllIdMod();
        if (p.txt_tenkhachang_skbkh == "") return " Tên khách hàng không được bỏ trống";
        if (p.txt_tenkhachang_skbkh = "") return " Tên khách hàng không được bỏ trống";
        if (p.cb_loaidiemdos_kbkh == "-1") return " Loại điểm đo không được bỏ trống";
        if (p.cb_donvis_kbkh == "-1") return "Đơn vị không được bỏ trống";
        if (p.cb_masoghis_kbkh == "-1") return "Sổ ghi không được bỏ trống";
        if (p.txt_sominhthus_kbkh == "") return "Chứng minh thư không được bỏ trống";
        if (p.txt_ngaycapdates_kbkh == "") return " Ngày cấp không được bỏ trống";
        if (p.txt_noicaps_kbkh == "") return " Nơi không được bỏ trống";
        if (p.cb_kychot_sca == "") return "Kỳ không được bỏ trống";

        return "";
    } catch (e) {
        console.log(e);
    }
}
function checkchons() {
    try {
        var p = getAllIdMod();
        var gia = "";
        if (p.cb_masoghis_kbkh != '-1') {
            gia = p.cb_masoghis_kbkh;
        }  else {
            gia = p.cb_donvis_kbkh;
        }
       
        return gia;
    } catch (e) {
        console.log(e);
    }
}

function capnhats_kh() {
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOKHACHHANG.CAPNHAT", callback: "result_capnhats_kh" };
        var para = {
            v_ID:dik,
            v_TENKH: p.txt_tenkhachang_skbkh,
            v_MAKH: p.txt_makhachang_skbkh,
            v_MADIEMDO: p.txt_madiemdos_kbkh,
            v_SOCONGTO: p.txt_socongto_skbkh,
            v_MASOTHUE: p.txt_masothue_skbkh,
            v_HESONHAN: p.txt_hesonhan_skbkh,
            v_LOAIDIEMDO: p.cb_loaidiemdos_kbkh,
            v_MADIACHINH: p.txt_madiachinhs_kbkh,
            v_DIACHI: p.txt_diachis_kbkh,
            v_MAHOM: '',
            v_MALO: '',
            v_MATO: '',
            v_MAKHUVUC: p.txt_makhuvuc_skbkh,
            v_SOHO: '',
            v_NGAY: p.txt_sdate_kbkh,
            v_DIENTHOAI: p.txt_dienthoais_kbkh,
            v_EMAIL: p.txt_emails_kbkh,
            v_MANN: '',
            v_SCMT: p.txt_sominhthus_kbkh,
            v_NGAYCAP: p.txt_ngaycapdates_kbkh,
            v_NOICAP: p.txt_noicaps_kbkh,
            v_SOTK: p.txt_sotaikhoans_kbkh,
            v_TENTK: p.cb_tenganhangs_kbkh,
            v_CODE: checkchons(),
            v_USERID: '',
            v_KY: p.cb_kychot_sca,
            v_QUANLY: p.cb_donviqlys_kbkh

        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function result_capnhats_kh(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
    
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_skbkh", row, 'ok');
            //setTimeout(function () { timkiem_lstkh(1); }, 500);
        } else {
            messInfo("messinfo_skbkh", row, 'error');
        }

    } catch (e) {
        console.log(e);
    }
}

//autocomplete mã địa chính
function f_lay_danh_sach_ma_dia_chinhs() {
    try {
        var config = { namesql: "HD_KHACHHANG_PKG.DanhSachMaDiaChinhTTKH", callback: "f_result_danhsachmadiachinhs_ttkh", connstr: "Oracle_HDDT" };
        var para = {};
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_danhsachmadiachinhs_ttkh(config, para, data) {
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
        $("#txt_madiachinhs_kbkh").autocomplete({
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





