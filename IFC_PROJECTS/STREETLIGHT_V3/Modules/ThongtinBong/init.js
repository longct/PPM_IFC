var Countpage = 10
$(document).ready(function () {
    try {
        loadConetent();
        loadtu_ttbong();
        loadchecklog_master();
        $("#cbtu_ttbong").change(function () {
            loadthongtinbong(1,'');
        });
      
    } catch (e) {
        console.log(e);
    }
});

function loadtu_ttbong() {
    try{
        var config = { namesql: "PKG_QUANLYBONG.DANHSACHTU", callback: "f_result_loadtu_ttbong", connstr: "ConnectOracleStreetLight" };
        var para = [];
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadtu_ttbong(config,para,lst){
    try{
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        dataToCob("cbtu_ttbong", data, "id", "tenkhachhang", "-1", "Vui lòng chọn tủ");
    }catch(e){
        console.log(e);
    }
}


function loadthongtinbong(page,tenbong) {
    try {
        var p = getAllIdMod();
        var config = { namesql: "PKG_QUANLYBONG.DANHSACHBONG", callback: "f_result_loadthongtinbong", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_ID: p.cbtu_ttbong,
            V_TENBONG: tenbong,
            v_pagenum: page,
            v_numrecs: Countpage
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadthongtinbong(config, para, lst) {
    try{
       
        var data = lst.data;
        if (data == "[]" || data == null || data == undefined || data.length == 0) {
            messInfo("messinfo_ttbong", "Không có dữ liệu hiển thị", "error");
            clearnull_ttbong();
            return;
        }
        messInfo("messinfo_ttbong", "", "ok");
        hienthi_ttbong(data);

    } catch (e) {
        console.log(e);
    }
}
function hienthi_ttbong(data) {
    try{

        $("#table_ttbong").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + val.tenbong + "</td><td>"
                + val.idrfbong + "</td><td>"
                + val.trangthai + "</td><td>"
                + " <form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_thongtinbong' value='" + val.idbong + "' id='btn_ttbong" + val.idbong + "'>Sửa</a></div> <div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#confimYesNoXoa' value='" + val.idbong + "' id='btn_xoattbong" + val.idbong + "'>Xóa</a></div> </form></td></tr>";

            $("#table_ttbong").append(row);
            $("#btn_ttbong" + val.idbong).click(function () {
                messInfo("messinfo_suabong", "", "ok");
                loadthongtinidbong_suabong(val.idbong);
            });
            $("#btn_xoattbong" + val.idbong).click(function () {
                f_confimYesNoXoa("Bạn chắc chắn muốn xóa bỏ bóng này ", "Bỏ qua", "Xác nhận", function () {
                    xoa_ttbong(val.idbong);
                });
            })

        });

        LoadPhanTrang("pageLst_ttbong", "pageCurent_ttbong", data, function () {
            loadthongtinbong($("#pagenumber").val(),'');
        });
    } catch (e) {
        console.log(e);
    }
}

function clearnull_ttbong() {
    try {
        $("#table_ttbong").empty();
        $("#pageCurent_ttbong").empty();
        $("#pageLst_ttbong").empty();
    } catch (e) {
        console.log(e);
    }
}


function xoa_ttbong(val) {
    try {
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "PKG_QUANLYBONG.XOATHONGTINBONG", callback: "f_result_xoa_ttbong", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_userid: userinfo.idnhanvien,
            v_idbong: val
        };
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_result_xoa_ttbong(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_ttbong", row, "ok");
            loadthongtinbong(1,'');
        } else {
            messInfo("messinfo_ttbong", row, "error");
        }

    } catch (e) {
        console.log(e);
    }
}












