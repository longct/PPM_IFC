
var dskh = [];
$(document).ready(function () {
    try {
        loadConetent();
        $('#txt_thang_apgia').datepicker({
            format: 'mm/yyyy',
            todayHighlight: true,
            minViewMode: "months",
            autoclose: true
        });
        $('#txt_thang_apgia').datepicker('setDate', new Date());
        laydanhsachkh_data();

        
        $("#txt_khachhang_apgia").on("keydown", function () {
            if (event.which == 13) {
                var id = $("#txt_khachhang_apgia").val();
                Loaddanhsachdiem(id);

                return false;
            }
        });

        $("#btn_capnhat_apgia").click(function () {
            capnhatapgia();
        });

    } catch (e) {
        console.log(e);
    }
});
function apgia_cmissKH() {
    try {
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_APGIA", callback: "result_apgia_cmissKH" };
        var para = [];
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_apgia_cmissKH(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        dataToCobClass("cbchitiet_apgia", data, "id", "ten", "-1", "Vui lòng áp giá");
    } catch (e) {
        console.log(e);
    }
}
function laydanhsachkh_data() {
    try {
        
        var config = { namesql: "HD_KHACHHANG_PKG.DanhSachKhachHang", callback: "f_result_laydanhsachkh_data", connstr: "Oracle_HDDT" };
        var para = { v_Makh: '' };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_laydanhsachkh_data(config, para, data) {
    try {
        dskh = data.data;
        var nameArr = [];
        nameArr.length = 0;
        $.each(dskh, function (key, val) {
            nameArr.push({
                label: val.tenkhachhang + ' - ' + val.makhachhang + ' - ' + val.socongto,
                value: val.makhachhang,
                id: val.madiemdo,
            });
        });
        $("#txt_khachhang_apgia").autocomplete({
            minLength: 1,
            delay: 200,
            source: nameArr,
            select: function (event, ui) {
                setTimeout(function () {
                  
                    Loaddanhsachdiem(ui.item.id);
                }, 300);
            }
        });
    } catch (e) {
        console.log(e);
    }
}
function Loaddanhsachdiem(id) {
    try {
        $("#txt_khachhang_apgia").val('');
        var config = { namesql: "HD_APKHACHHANGTHAY.APKHACHHANG", callback: "f_result_Loaddanhsachdiem", connstr: "Oracle_HDDT" };
        var para = { v_ID: id };
     
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e)
    }
}
function f_result_Loaddanhsachdiem(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {

           // messInfo("messinfo_apgiakh", "Không có dữ liệu hiển thị", 'error');
            showToast("Không có dữ liệu hiển thị", 'error');
            $("#table_apgiatkh").empty();
            return;
        }
        //$("#messinfo_apgiakh").hide();
        $("#table_apgiatkh").empty();
     
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr getid='"+ val.id+"'><td>"
                + (key + 1) + "</td><td>"
                + val.madiemdo + "</td><td>"
                + val.tenkhachhang + "</td><td>"
                + val.socongto + "</td><td>"
                + val.diachi + "</td><td>"
                + "<select class='form-control input-sm m-bot15 cbchitiet_apgia " + val.apgiakhach + "' value='" + val.apgiakhach + "'> </select>" + "</td> </tr>";

            $("#table_apgiatkh").append(row);
        });
        apgia_cmissKH();
        setTimeout(function () {
            $('.cbchitiet_apgia').each(function () {
                $(".cbchitiet_apgia." + $(this).attr("value") + " ").val($(this).attr("value"));
            });
        }, 300);

    } catch (e) {
        console.log(e);
    }
}
function capnhatapgia() {
    try{
        var p = getAllIdMod();
        var ky = p.cb_kychot_apgia;
        var thang = p.txt_thang_apgia.split("/");
        var paraa = [];
        $('#table_apgiatkh tr').each(function () {
            var info = { id: $(this).attr("getid"), giatri: $(this).find('.cbchitiet_apgia').first().val()};
            paraa.push(info);
        });
        if (paraa.length == 0 ) {
            //messInfo("messinfo_apgiakh", "Không có thông tin điêm đo", 'error');
            showToast("Không có thông tin điểm đo", 'error');
            return
        }
        for (var i = 0; i < paraa.length; i++) {
           
            if (paraa[i].id == undefined || paraa[i].id == null) {
              //  messInfo("messinfo_apgiakh", "Không tồn tại thông tin điểm đo", 'error');
                showToast("Không tồn tại thông tin điểm đo", 'error');
                return
            }
            if (paraa[i].giatri == '-1') {
              //  messInfo("messinfo_apgiakh", "Vui lòng chọn áp giá khách hàng", 'error');
                showToast("Vui lòng chọn áp giá khách hàng", 'error');
                return
            }
        }
       
        var userinfo = JSON.parse(localStorage.getItem("userinfo"));
        for (var i = 0; i < paraa.length; i++) {
            var config = { namesql: "HD_APKHACHHANGTHAY.APGIALAIKH", callback: "f_result_capnapgiakh", connstr: "Oracle_HDDT" };

            var para = {
                v_ID: paraa[i].id,
                v_KY: ky,
                v_THANG: thang[0],
                v_NAM: thang[1],
                v_APGIA :paraa[i].giatri,
                v_USERID: userinfo.userid
            };
            ExecuteServiceSyns(config, para);
        }

    } catch (e) {
        console.log(e);
    }
}
function f_result_capnapgiakh(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
           // messInfo("messinfo_apgiakh", row, "ok");
            showToast(row, 'success');
        } else {
          //  messInfo("messinfo_apgiakh", row, "error");
            showToast(row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}

