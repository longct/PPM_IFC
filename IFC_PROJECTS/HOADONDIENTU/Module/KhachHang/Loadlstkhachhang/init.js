var countpage = 10;
var Idsua = "";
$(document).ready(function () {
    try {
        loadchecklog_master();

        loadConetent();
        lst_donvi_tk()
        lst_tram_tk();
        lst_soghi_tk();
        autoloadkhachnag_lstkh();
        $("#cb_dienluc_lstkh").change(function () {
            lst_tram_tk();
        });
        $("#cb_dienluc_lstkh").change(function () {
            lst_soghi_tk();
        });
        setTimeout(function () { timkiem_lstkh(1); }, 1000);
        $("#bt_tkiem_lstkh").click(function () {
            timkiem_lstkh(1);

           // setTimeout(function () { $("#txt_timkiem_lstkh").val(''); }, 300);
        });
      
        $("#txt_timkiem_lstkh").keypress(function (event) {
            if (event.which == 13) {
                $("#bt_tkiem_lstkh").click();
                return false;
            }
        });
      

    } catch (e) {
        console.log(e);
    }

});
function lst_donvi_tk() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_DONVI", callback: "result_lst_donvi_tk" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lst_donvi_tk(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_dienluc_lstkh", data, "id", "ten", "-1", "Tất cả");
    } catch (e) {
        console.log(e);
    }
}
function lst_tram_tk() {
    try {
        var p=getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_TRAMCHANGE", callback: "result_lst_tram_tk" };
        var para = { v_CODE: p.cb_dienluc_lstkh };
     
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lst_tram_tk(config, para, lst) {
    try {

        var data = lst.data;
     
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_matram_lstkh", data, "id", "ten", "-1", "Tất cả");
    } catch (e) {
        console.log(e);
    }
}
function lst_soghi_tk() {
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_SOGHI", callback: "result_lst_soghi_tk" };
        var para = { v_CODE: p.cb_matram_lstkh };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_lst_soghi_tk(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCob("cb_soghi_lstkh", data, "id", "ten", "-1", "Tất cả");
    } catch (e) {
        console.log(e);
    }
}
function checkchon_hi() {
    try {
        var p = getAllIdMod();
        var gia = "";
        if (p.cb_soghi_lstkh != '-1') {
            gia = p.cb_soghi_lstkh;
        } else if (p.cb_matram_lstkh != '-1') {
            gia = p.cb_matram_lstkh;
        } else   {
            gia = p.cb_dienluc_lstkh;
        }
        return gia;
    } catch (e) {
        console.log(e);
    }
}
function timkiem_lstkh(page) {
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOKHACHHANG.TIMKIEMDANHSACH", callback: "result_timkiem_lstkh" };
        var para = {
            v_CODE: checkchon_hi(),
            v_HOPDONG: p.cb_hopdong_lstkh,
            v_TIMKIEM: p.txt_timkiem_lstkh,
            v_pagenum:page,
            v_numrecs:countpage
        };
        console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_timkiem_lstkh(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {

            messInfo("messinfo_lstkh", "Không có dữ liệu hiển thị", 'error');
            clear_lskh();
            return;
        }
        messInfo("messinfo_lstkh", "", 'error');
        $("#table_loadlstkh").empty();
     
        $.each(data, function (key,val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + setnull(val.tenkhachhang) + "</td><td>"
                //+ setnull(val.makhachhang) + "</td><td>"
                + setnull(val.madiemdo) + "</td><td>"
                + setnull(val.socongto) + "</td><td class='c'>"
                + thanhtao(val.thanhlyhd, val.id) + "</td><td class='c'>"
                + loadhopdong(val.filepdf) + "</td><td class='c'>"
                + "<form class='form-inline' role='form'>"
                + "<div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_khachhang' value='" + val.id + "' id='btn_suakhh" + val.id + "'> <i class='fa fa-edit'></i> Sửa</a> &nbsp</div>"
                + "<div class='form-group' att-data='" + val.counttreothao + "' id='dtt"+val.id+"'><a class='btn btn-success btn-action' data-toggle='modal' href='#XemLichSuTreoThao' value='" + val.id + "' id='btn_Xemlstth" + val.id + "'> <i class='glyphicon glyphicon-list-alt'></i> Xem treo tháo</a> &nbsp</div>"
                + "</form></td> </tr>";
            $("#table_loadlstkh").append(row);


            $("#btn_taokh" + val.id).click(function () {
                window.location.href = "#Module/KhachHang/Khaibaohopdongkhachhang";
                setTimeout(function () { f_change(val.id); }, 500);
            });
            $("#btn_suakhh" + val.id).click(function () {
                Idsua = val.id;
                loadkhachhangsuaid(Idsua);

            });
            $("#btn_Xemlstth" + val.id).click(function () {
                loadlichsutreothaoid(val.id);
            });
            var countct=$("#dtt"+val.id).attr("att-data");
            if(countct>0) {
                $("#dtt" + val.id).attr("style", "display:inline-block");
            } else {
                $("#dtt" + val.id).attr("style", "display:none");
            }
        });

        LoadPhanTrang("pageLst_lsth", "pageCurent_lskh", data, function () {
            timkiem_lstkh($("#pagenumber").val());
        });


    } catch (e) {
        console.log(e);
    }
}


function loadhopdong(val) {
    try {
        if (val == "" || val == null) {
            return "-";
        }
        var filepdf = '<a href="' + urli + '/DownloadFileScan/' + val + '">Xem hơp đồng</a>';
        return filepdf;

    } catch (e) {
        console.log(e);
    }
}
function thanhtao(val, id) {
    try{
        if (val == "2" || val == null) {
            return "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action'  value='" + id + "' id='btn_taokh" + id + "'> <i class='fa fa-plus'></i> Tạo Hợp Đồng</a></div></form>";
        }
        return val;
    } catch (e) {
        console.log(e);
    }
}

function autoloadkhachnag_lstkh() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_KHAIBAOHDKH.LSTKHACHHANG", callback: "result_autoloadkhachnag_lstkh" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_autoloadkhachnag_lstkh(config, para, lst) {
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

        $("#txt_timkiem_lstkh").autocomplete({
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

function clear_lskh() {
    try{
        $("#table_loadlstkh").empty();
        $("#pageCurent_lskh").empty();
        $("#pageLst_lsth").empty();
    } catch (e) {
        console.log(e);
    }
}























