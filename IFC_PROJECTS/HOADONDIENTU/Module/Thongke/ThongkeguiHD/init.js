var countpage = 10;
$(document).ready(function () {
    try {
        loadchecklog_master();
        $('#txt_ngay_tkmaihd').datepicker({
            format: 'mm/yyyy',
            todayHighlight: true,
            minViewMode: "months",
            autoclose: true
        }).datepicker('setDate', new Date())
        thongkehd(1);
        $("#btn_searchHD").on("click", function () {
           
            $("#anhload").show();
            thongkehd(1);
        });
        $("#btn_sendmailhd").on("click", function () {
          
            f_confimYesNo("Bạn chắc chắn muốn gửi thông báo tới kha", "Bỏ qua", "Xác nhận", function () {
                $("#anhload").show();
                Capnhat_hd();
            });
           
        });
    } catch (e) {
        console.log(e);
    }

});

function thongkehd(page) {
    
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_THONGKEGUIMAIL.THONGTINKHACHHANGGUIMAIL", callback: "result_thongkeguimailhd" };
        var para = {
            v_ngaytbhd: "01/" + p.txt_ngay_tkmaihd,
            v_pagenum: page,
            v_numrecs: countpage
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
//function getLastDayOfYearAndMonth(year, month) {
//    return (new Date((new Date(year, month + 1, 1)) - 1)).getDate();
//}

function Capnhat_hd() {
    
    var p = getAllIdMod();
    var userinfo = JSON.parse(localStorage.getItem("userinfo"));
    var config = {
        connstr: "Oracle_HDDT", namesql: "HD_THONGKEGUIMAIL.CAPNHATTBHD",
        callback: "result_saveluulong"
    };
    var para = {
        v_userID: userinfo.userid,
        v_ngaytbhd: "01/" + p.txt_ngay_tkmaihd
    };
    console.log(para);
    ExecuteServiceSyns(config, para);
}
function result_saveluulong(config, para, lst) {
    
    $("#anhload").hide();
    try {
        var data = lst.data;
        var row = data[0].count;
        console.log(lst);
        if (row.indexOf("OK") > -1) {
            messInfo("messinfo_tkmaihd", "Cập nhật dữ liệu thành công", 'success');
        }
    } catch (e) {
        console.log(e);
    }
}
function result_thongkeguimailhd(config, para, lst) {
    try {
        
        $("#anhload").hide();
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            messInfo("messinfo_tkmaihd", "Không có dữ liệu hiển thị", 'error');
            clecar_tkmail();
            return;
        }

        messInfo("messinfo_tkmaihd", "", 'error');
        $("#table_thongke_tkmaihd").empty();
        $.each(data, function (key, val) {
            var row = "";
            
            // Thay thế user của KH bằng user đang đăng nhập web
            //var pattern = new RegExp("user:%22.*%22}&");
            //var long_user = pattern.exec(val.noidung);
            //var real_user = long_user.toString().replace("user:%22", "").replace("%22}&", "");
            var curr_user = JSON.parse(localStorage["userinfo"]).usercode;
            //var long_curr_user = "user:%22" + curr_user + "%22}&";
            //console.log(long_user, real_user, curr_user, long_curr_user);
            if(curr_user != '')
                val.noidung = val.noidung.toString().replace("id_user", curr_user);
            //console.log(val.noidung);
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + setnull(val.ten_khang) + "</td><td>"
                + setnull(val.madiemdo) + "</td><td>"
                + setnull(val.noidung_ngan) + "<a data-toggle='popover' data-placement='left'  data-content='" + val.noidung + "'>Xem thêm</a></td><td>"
                + setnull(val.ngayxuathoadon) + "</td></tr>";
            $("#table_thongke_tkmaihd").append(row);
            
        });
        $('[data-toggle="popover"]').popover({ html: true });
        LoadPhanTrang("pageLst_lsttbhd", "pageCurent_lsttkhd", data, function () {
            thongkehd($("#pagenumber").val());
        });

        // Click ra ngoài popover thì tắt popover 
        $('html').on('mouseup', function (e) {
            if (!$(e.target).closest('.popover').length) {
                $('.popover').each(function () {
                    $(this.previousSibling).popover('hide');
                });
            }
        });

    } catch (e) {
        console.log(e);
    }
}

function clecar_tkmail() {
    try {
        $("#table_thongke_tkmaihd").empty();
        $("#pageCurent_lsttkhd").empty();
        $("#pageLst_lsttbhd").empty();
    } catch (e) {
        console.log(e);
    }
}
