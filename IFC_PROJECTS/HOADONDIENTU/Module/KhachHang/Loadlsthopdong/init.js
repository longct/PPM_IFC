var countpage = 10;

$(document).ready(function () {
    try {
        loadchecklog_master();

        loadConetent();
        lst_donvihd_tk()
        lst_tramhd_tk();
        lst_soghihd_tk();
        autoloadhdong_lstkh();
        $("#cb_dienluchd_lstkh").change(function () {
            
            lst_soghihd_tk();
        });
        //$("#cb_matramhd_lstkh").change(function () {
        //    lst_soghihd_tk();
        //});
        setTimeout(function () { timkiem_hd_lstkh(1); }, 1000);
        $("#bt_tkiemhd_lstkh").click(function () {
            timkiem_hd_lstkh(1);
            setTimeout(function () { $("#txt_timkiemhd_lstkh").val(''); }, 300);
        });

       
        $("#txt_timkiemhd_lstkh").on("keydown", function () {
            if (event.which == 13) {
                $("#bt_tkiemhd_lstkh").click();
                return false;
            }
        });

    } catch (e) {
        console.log(e);
    }

});
function lst_donvihd_tk() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_DONVI", callback: "result_lst_donvihd_tk" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lst_donvihd_tk(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_dienluchd_lstkh", data, "id", "ten", "-1", "Tất cả");
    } catch (e) {
        console.log(e);
    }
}
function lst_tramhd_tk() {
    try {
        var p=getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_TRAMCHANGE", callback: "result_lst_tramhd_tk" };
        var para = { v_CODE: p.cb_dienluchd_lstkh };
     
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lst_tramhd_tk(config, para, lst) {
    try {

        var data = lst.data;
     
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_matramhd_lstkh", data, "id", "ten", "-1", "Tất cả");
    } catch (e) {
        console.log(e);
    }
}
function lst_soghihd_tk() {
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_SOGHI", callback: "result_lst_soghihd_tk" };
        var para = { v_CODE: p.cb_matramhd_lstkh };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lst_soghihd_tk(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_soghihd_lstkh", data, "id", "ten", "-1", "Tất cả");
    } catch (e) {
        console.log(e);
    }
}
function checkchon_hd() {
    try {
        var p = getAllIdMod();
        var gia = "";
        if (p.cb_soghihd_lstkh != '-1') {
            gia = p.cb_soghihd_lstkh;
        //} else if (p.cb_matramhd_lstkh != '-1') {
        //    gia = p.cb_matramhd_lstkh;
        } else   {
            gia = p.cb_dienluchd_lstkh;
        }
        return gia;
    } catch (e) {
        console.log(e);
    }
}
function autoloadhdong_lstkh() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOHDKH.LSTKHACHHANG", callback: "result_autoloadhdong_lstkh" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_autoloadhdong_lstkh(config, para, lst) {
    try {
        var data = lst.data;
        if (data == [] || data == null || data == undefined || data.length == 0) return;
        var nameArr = [];
        nameArr.length = 0;

        $.each(data, function (key, val) {
            nameArr.push({
                label: val.tenkhachhang + ' - ' + val.makhachhang + '-' + val.socongto + ' - ' + setnull(val.madiemdo)
                , value: val.tenkhachhang
                
            });
        });

        $("#txt_timkiemhd_lstkh").autocomplete({
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

function clear_hdlskh() {
    try{
        $("#tb_table_hopdong").empty();
        $("#pageCurent_lskh_hd").empty();
        $("#pageLst_lsth_hd").empty();
    } catch (e) {
        console.log(e);
    }
}
function timkiem_hd_lstkh(page) {
    try{

        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_THANKLYHOPDONG.DANHSACHHOPDONG", callback: "result_timkiem_hd_lstkh" };
        var para = {
            v_CODE:checkchon_hd(),
            v_THANHLY:p.cb_hopdonghd_lstkh,
            v_TIMKIEM:p.txt_timkiemhd_lstkh,
            v_pagenum:page,
            v_numrecs: countpage
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_timkiem_hd_lstkh(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            messInfo("messinfo_hd_lst", "Không có dữ liệu hiển thị", 'error');
            clear_hdlskh();
            return;
        }
        messInfo("messinfo_hd_lst", "", 'error');
        $("#tb_table_hopdong").empty();
        $.each(data, function (key, val) {
            var row = "";
            var filepdf = '<a href="' + urli + '/DownloadFileScan/' + val.filepdf + '">Xem hơp đồng</a>';
            if (val.filepdf == null || val.filepdf == undefined) filepdf = '-';
            row += "<tr><td>"
                + setnull(val.stt) + "</td><td>"
                + setnull(val.tenkhachhang) + "</td><td>"
                + setnull(val.makhachhang) + "</td><td>"
                + setnull(val.socongto) + "</td><td class='c'>"
                + setnull(val.ten) + "</td><td class='c'>"
                + setnull(val.ngaytao) + "</td><td class='c'>"
                //+ mauhd(val.tenfilehd, val.id) + "</td><td class='c'>"
                + filepdf + "</td><td class='c'>"
                + thanhlyhd(val.thanhlyhd, val.id) + "</td></tr>";

            $("#tb_table_hopdong").append(row);

            $("#btn_idkhl_taohd" + val.id).click(function () {
                window.location.href = "#Module/KhachHang/Khaibaohopdongkhachhang";
                setTimeout(function () { f_change(val.id); }, 300);
            });
            $("#btn_idkh_thanhlyhd" + val.id).click(function () {
                f_confimYesNo("Bạn chắc chắn muốn thanh lý hợp đồng", "Bỏ qua", "Xác nhận", function () {
                    capnhat_thanhly(val.id);
                });
            });

        });
        LoadPhanTrang("pageLst_lsth_hd", "pageCurent_lskh_hd", data, function () {
            timkiem_hd_lstkh($("#pagenumber").val());
        });
    } catch (e) {
        console.log(e);
    }
}
function mauhd(file, id) {
    try {
            if (file == "" || file == null) {
                return "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action'  value='" + id + "' id='btn_idkhl_taohd" + id + "'><i class='fa fa-plus'></i> Tạo Hợp đồng</a></div></form>";
            }
            var link = urli + "/home/DownloadFileSaveOnServer/" + file;
            return '<a href="' + link + '">Tải hợp đồng</a>';

    } catch (e) {
        console.log(e);
    }
}
function thanhlyhd(val, id) {
    try{
        if (val == 0) {
            return "Hợp đồng đã thanh lý";
        } else if (val == "2") {
            return "Chưa có hợp đồng";
        } else {
            return "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action'  value='" + id + "' id='btn_idkh_thanhlyhd" + id + "'>Thanh lý</a></div></form></td></tr>";
        }

    } catch (e) {
        console.log(e);
    }
}
function capnhat_thanhly(id) {
    try {
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { connstr: "Oracle_HDDT", namesql: "HD_THANKLYHOPDONG.THANHLYHD", callback: "result_capnhat_thanhly" };
        var para = {
            v_ID: id,
            v_USERID: userinfo.userid
        };
         ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_capnhat_thanhly(config, para, lst) {
    try{
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_hd_lst", row, 'ok');
            setTimeout(function () { timkiem_hd_lstkh($("#pagenumber").val()); }, 1000);
        } else {
            messInfo("messinfo_hd_lst", row, 'error');
        }

    } catch (e) {
        console.log(e);
    }

}























