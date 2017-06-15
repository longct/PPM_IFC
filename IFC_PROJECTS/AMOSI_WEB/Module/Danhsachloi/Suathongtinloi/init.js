var dik = "";
var isUpdate = false;
$(document).ready(function () {
    try {
         $("#cb_loailoi_s").change(function () {
             loadlists_chitietloi($("#cb_loailoi_s").val());
         });
        LoadLoaiLoi_s();
        loadlists_chitietloi($("#cb_loailoi_s").val());
    } catch (e) {
        console.log(e);
    }
});
function loadloidiemdosuaid(id) {
    try {
        dik=id;
        var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_DIEMDO.DIEMDOLOI", callback: "result_idloidiemdo_lstdd" };
        var para = {
            v_ID: id
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_idloidiemdo_lstdd(config, para, lst) {
    try{
        var data = lst.data;
      
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            messInfo("messinfo_kbkh", "không tồn tại điểm do", 'error');
            return;
        }
        clearnull_ttddl();
        $("#txt_madiemdo_s").val(data[0].madiemdo);
        $("#txt_maduan_s").val(data[0].maduan);
        $("#txt_ngayloi_s").val(data[0].ngayloi);
        if(data[0].loailoi != null) $("#cb_loailoi_s").val(data[0].loailoi);
        if (data[0].chitietloi != null) $("#cb_chitietloi_s").val(data[0].chitietloi);
        if (data[0].ngayxuly != null) 
            $("#txt_ngayxuly_s").val(data[0].ngayxuly);
        //else setValToTxt("txt_ngayxuly_s", gettimenow());
        if(data[0].trangthaixuly != null) $("#cb_trangthaixuly_s").val(data[0].trangthaixuly);
        if(data[0].ketquaxuly != null) $("#cb_ketquaxuly_s").val(data[0].ketquaxuly);
        $("#txt_nguoixuly_s").val(data[0].nguoixuly);
        //setValToTxt("txt_ngayloi", gettimenow());
        //setValToTxt("txt_ngayxuly", gettimenow());
        $("#txt_ghichu_s").val(data[0].ghichu);

        $("#btn_capnhat").click(function () {
            var check = checkvalidate();
            if (check != "") {
                messInfo("messinfo_skbkh", check, 'error');
                return;
            }
            capnhats_ldd();
        });

        $("#btn_thoat").click(function () {
            if (isUpdate) {
                laydulieu(1);
            }
        });

        $("#cb_loailoi_s").change(function () {
            LoadChiTietLoi($("#cb_loailoi_s").val());
        });

        $('#messinfo_skbkh').hide();
        
    } catch (e) {
        console.log(e);
    }
}

function clearnull_ttddl() {
    try {
        $("#txt_madiemdo_s").val('');
        $("#txt_maduan_s").val('');
        $("#txt_ngayloi_s").val('');
        $("#cb_loailoi_s").val(-1);
        $("#cb_chitietloi_s").val(-1);
        //setValToTxt("txt_ngayxuly_s", gettimenow());
        $("txt_ngayxuly_s").val('');
        $("#cb_trangthaixuly_s").val(-1);
        $("#cb_ketquaxuly_s").val(-1);
        $("#txt_nguoixuly_s").val('');
    } catch (e) {
        console.log(e);
    }
}

function LoadLoaiLoi_s() {
    try {
        var config = { namesql: "PKG_DANHMUCLOI.LoadLoaiLoi", callback: "result_loadloailoi_s", connstr: "Oracle_AmosiDefault" };
        var para = {};
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function result_loadloailoi_s(config, para, lst) {
    try {
        var data = lst.data;
        dataToCob("cb_loailoi_s", data, "maloai", "tenloai", "-1", "--Chọn loại lỗi--");
    } catch (e) {
        console.log(e);
    }
}

function loadlists_chitietloi(value) {
    try {
        var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_DANHMUCLOI.LoadChiTietLoi", callback: "result_loadlists_chitietloi" };
        var para = {
            v_LoaiLoi: value
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_loadlists_chitietloi(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_chitietloi_s", data, "matudien", "tentudien", "-1", "Chọn chi tiết lỗi");
    } catch (e) {
        console.log(e);
    }
}
function checkvalidate() {
    try{
        var p = getAllIdMod();
        if (!isValidDate(p.txt_ngayxuly_s)) {
            //$(this).val("");
            $('#txt_ngayxuly_s').focus();
            return "Định dạng sai ngày tháng.";
        }
        //if (p.txt_madiemdo_s == "") return " Mã điểm đo không được bỏ trống";
        //if (p.txt_maduan_s = "") return " Mã dự án không được bỏ trống";
        ////if (p.txt_ngayloi_s == "-1") return " Loại điểm đo không được bỏ trống";
        //if (p.cb_loailoi_s == "-1") return "Loại lỗi không được bỏ trống";
        //if (p.cb_chitietloi_s == "-1") return "Chi tiết lỗi không được bỏ trống";
        ////if (p.txt_ngayxuly_s == "") return " không được bỏ trống";
        //if (p.cb_trangthaixuly_s == "") return " Trạng thái xử lý không được bỏ trống";
        //if (p.cb_ketquaxuly_s == "") return " Kết quả xử lý không được bỏ trống";
        //if (p.cb_nguoixuly_s == "") return "Người xử lý không được bỏ trống";

        return "";
    } catch (e) {
        console.log(e);
    }
}

function capnhats_ldd() {
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_AmosiDefault", namesql: "PKG_DIEMDO.CAPNHATLOIDD", callback: "result_capnhats_ldd" };
        var para = {
            v_ID:dik,
            v_MADIEMDO: p.txt_madiemdo_s,
            v_MADUAN: p.txt_maduan_s,
            v_LOAILOI: p.cb_loailoi_s,
            v_CHITIETLOI: p.cb_chitietloi_s,
            v_NGAYLOI: p.txt_ngayloi_s,
            v_TRANGTHAIXULY: p.cb_trangthaixuly_s,
            v_NGAYXULY: p.txt_ngayxuly_s,
            //v_KETQUAXULY: p.cb_ketquaxuly == -1 ? '' : p.cb_ketquaxuly,
            v_KETQUAXULY: p.cb_ketquaxuly_s,
            v_NGUOIXULY: p.txt_nguoixuly_s,
            v_NGAYTAO: '',
            v_GHICHU: p.txt_ghichu_s,
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function result_capnhats_ldd(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
    
        if (row.indexOf("thành công") > 0) {
            isUpdate = true;
            messInfo("messinfo_skbkh", row, 'ok');
            //setTimeout(500);
        } else {
            messInfo("messinfo_skbkh", row, 'error');
        }

    } catch (e) {
        console.log(e);
    }
}

function isValidDate(str) {
    var parts = str.split('/');
    if (parts.length < 3)
        return false;
    else {
        var day = parseInt(parts[0]);
        var month = parseInt(parts[1]);
        var year = parseInt(parts[2]);
        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            return false;
        }
        if (!((day.toString().length == 1 || day.toString().length == 2) && (month.toString().length == 1 || month.toString().length == 2) && (year.toString().length == 4))) {
            return false;
        }
        var _str = day + "/" + month + "/" + year;
        var d = new Date(_str);
        if (isNaN(Date.parse(d))) {
            return false
        }
        return true;
    }
}





