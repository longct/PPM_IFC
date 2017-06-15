var countpage = 15;
$(document).ready(function () {
    try {
        loadchecklog_master();
        loadInitDate();
        var p = getAllIdMod();
        $("#txt_ngayfrom_viewtl").val(gettimenow());
        $("#txt_ngayto_viewtl").val(gettimenow());
        loaddanh_sukien();
        //loaddanhsach_viewtl(1);
        $("#btn_checkluu_viewtl").click(function () {
            console.log("thuchien");
            loaddanhsach_viewtl(1);
        });



    } catch (e) {
        console.log(e);
    }

});

function loaddanh_sukien() {
    try {
        var config = { namesql: "PKG_CANHBAOVANHANH.LSTSUKIEN", callback: "f_result_loaddanh_sukien", connstr: "ConnectOracleStreetLight" };
        var para = [];
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddanh_sukien(config, para, lst) {
    try {
        var data = lst.data;
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }
        var option1 = "";
        var option2 = "";
        var i = 0;
        var i1 = 0;
        $.each(data, function (index, val) {
            if (val.id == "CB_ROLE_CONTACTER" || val.id == "NOTCONNECT" || val.id == "CB_MATDIEN") {
                i++;
                if (i == 1) {
                    option1 += "<option value='1' style='background-color: #eee;color: #2196F3;'>Cảnh báo sự cố bất thường</option>";
                }
                option1 += "<option value='" + val.id + "'>&nbsp;&nbsp;&nbsp;" + val.ten + "</option>";
            }
            else {
                i1++;
                if (i1 == 1) {
                    option2 += "<option value='2' style='background-color:#eee;color: #2196F3;'>Cảnh báo vận hành</option>";
                }
                option2 += "<option value='" + val.id + "'>&nbsp;&nbsp;&nbsp;" + val.ten + "</option>";
            }
                
        });
        $("#cbdonvi_viewtl").append(option1).append(option2);
    } catch (e) {
        console.log(e);
    }
}
function loaddanhsach_viewtl(page) {
    try {
  
        //if (localStorage.getItem("tuSelected")) {
        //    var lstTu = JSON.parse(localStorage.getItem("tuSelected"));
        //    var quan = JSON.parse(localStorage.getItem("quan"));
        //    if (localStorage.getItem("datat_b")){
        //        var lstTu = JSON.parse(localStorage.getItem("datat_b"));
        //        var idtu = lstTu;
        //        var lstId = "";
        //        $.each(idtu, function (key, val) {
        //            lstId += val.id + ",";
        //        });
        //    } else {
        //        messInfo("messinfo_cbvh", 'Vui lòng chọn tủ hoặc quận để xem cảnh báo', "error");
        //        return;
        //    }
        //}
        //else {
            
        //    messInfo("messinfo_cbvh", 'Vui lòng chọn tủ hoặc quận để xem cảnh báo', "error");
        //    return;
        //}

        $("#messinfo_cbvh").hide();

        var p = getAllIdMod(); 
      


        var config = { namesql: "PKG_CANHBAOVANHANH.LOAD_CANHBAOA", callback: "f_result_loaddanhsach_viewtl", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_fdate: $("#txt_ngayfrom_viewtl").val(),
            v_tdate: p.txt_ngayto_viewtl,
            v_loai: 'TD',
            v_id: "",
            v_CANHBAO: p.cbdonvi_viewtl,
            v_pagenum: page,
            v_numrecs: countpage
        };
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddanhsach_viewtl(config, para, lst) {
    try {
        var data = lst.data;
        if (data == null || data == '[]' || data == undefined || data.length == 0) {
            messInfo("messinfo_viewtl", "Không có dữ liệu hiển thị", "error");
            clearnull_viewtl();
            return;
        }
        messInfo("messinfo_viewtl", "", "ok");
        hienthi_viewtl(data);
    } catch (e) {
        console.log(e);
    }
}
function hienthi_viewtl(data) {
    try {
        $("#table_viewtl").empty();

        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + setnull(val.chitiet_cb) + "</td><td>"
                + setnull(val.loai_cb) + "</td><td class= 'a" + val.dang_cb + "'>"
                + setnull(val.canhbao) + "</td><td>"
                + setnull(val.thoigian_cb) + "</td></tr>";
            $("#table_viewtl").append(row);
        });

        LoadPhanTrang("pageLst_viewtl", "pageCurent_viewtl", data, function () {
            loaddanhsach_viewtl($("#pagenumber").val());
        });

    } catch (e) {
        console.log(e);
    }

}

function clearnull_viewtl() {
    try {
        $("#table_viewtl").empty();
        $("#pageCurent_viewtl").empty();
        $("#pageLst_viewtl").empty();

    } catch (e) {
        console.log(e);
    }
}
