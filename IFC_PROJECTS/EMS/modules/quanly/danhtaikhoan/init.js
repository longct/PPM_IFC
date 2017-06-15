var countpage = 10;
var tranghietai =1;
$(document).ready(function () {
    try {
        
        loadConetent();
        danhsachnhap_tkhoan(1);
        $("#btn_thuchien").click(function () {
            var p = getAllIdMod();
           danhsachnhap_tkhoan(1);
        });
        $("#txt_timkiem_ds").keyup(function (event) {
            if (event.keyCode == 13) {
                $("#txt_timkiem_ds").click();
                danhsachnhap_tkhoan(1);
                $("#txt_timkiem_ds").val('');
            }
        });
       


    } catch (e) {
        console.log(e);
    }
});

//============================================================ XY LY CAC CHUC NANG==========================================================

function danhsachnhap_tkhoan(page) {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_DANHSACHTAIKHOAN", callback: "f_result_danhsachnhap_tkhoan", connstr: "ConnectEMS" };
        var para = {
            timkiem:p.txt_timkiem_ds,
            userid: userInfo.userid,
            Code: userInfo.code,
            v_page: page,
            v_pagecount: countpage
        };
     
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_result_danhsachnhap_tkhoan(config, para, list) {
    try {
        var p = getAllIdMod();
        var data = list.data;
        if (data[0].kq0 == null || data[0].kq0 == "[]" || data[0].kq0 == "" || data[0].kq0.length == 0) {
            try {
                messInfo("messinfo_dstk", "Không có thông tin hiển thị ", "error");
                clear_ds_tk();
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_dstk", "", "error");
        loaddulieu_tkhoan(data);

    } catch (e) {
        console.log(e);
    }
}

function loaddulieu_tkhoan(data) {
    try {
        $("#tblnhapkho_dstk").empty();
        $.each(data[0].kq0, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.rownum + "</td><td>"
                + val.fullname + "</td><td >"
                + val.usercode + "</td><td class='r'>"
                + val.inserteddate + "</td><td class='r'>"
                + val.tenkho + "</td><td class='c'>"
                + " <form class='form-inline' role=''form'><div class='form-group classquyen_sua'><a class='btn btn-success btn-action' data-toggle='modal' href='#btn_suanv' value='" + val.userid + "' id='btn_sua_nv" + val.userid + "'>Sửa</a></div> <div class='form-group classquyen_xoa'><a class='btn btn-success btn-action' data-toggle='modal' href='#confimYesNoXoa' value='" + val.userid + "' id='btn_xoa_nv" + val.userid + "'>Xóa</a></div></form></td> </tr>";
            $("#tblnhapkho_dstk").append(row);

            $("#btn_sua_nv" + val.userid).click(function () {
                loadthong_tk(val.userid);
            });
            $("#btn_xoa_nv" + val.userid).click(function () {

               
                f_confimYesNoXoa("Bạn chắc chắn muốn xóa", "Bỏ qua", "Xác nhận", function () {
                    xoathongtin_tk(val.userid);
                });


                
            });

        });
        // tomausukien() ;
        $("#txt_tongsobanghi_dstk").empty();
        $.each(data[1].kq1, function (key, val) {
            var row1 = "Tổng Số Bản Ghi " + val.allrow;
            $("#txt_tongsobanghi_dstk").append(row1);
        });
        loadphantrang_dstk(data);
    } catch (e) {
        console.log(e);
    }
}
function loadphantrang_dstk(data) {
    try {
        $("#pagecurent_dstk ul").empty();
        $("#pagecurent_dstk ul").append('<li><a  >Trang đầu</a></li>');
        $.each(data[2].kq2, function (key, val) {
            var row2 = "";
            row2 += '<li><a  >' + val.pape + '</a></li>';
            $("#pagecurent_dstk ul").append(row2);
        });
        $("#pagecurent_dstk ul li a").click(function () {
            var cuoi = $("#txt_tongsobanghi_dstk").html().split('/')[1].trim();
            var page = $(this).html() == "Trang đầu" ? 1 : $(this).html() == "Trang cuối" ? cuoi : $(this).html();
            $("#pagecurent_dstk ul li a").addClass("active");
            tranghietai = page;
       
            var p = getAllIdMod();
            danhsachnhap_tkhoan(page);
        });
    } catch (e) {
        console.log(e);
    }
}

//============================================================KET THUC XY LY CAC CHUC NANG==========================================================
function clear_ds_tk() {
    try {
        $("#tblnhapkho_dstk").empty();
        $("#txt_tongsobanghi_dstk").empty();
        $("#pagecurent_dstk ul").empty();
    } catch (e) {
        console.log(e);
    }
}
function xoathongtin_tk(val) {
    try{
        var config = { namesql: "TB_XOATAIKHOAN", callback: "f_result_xoathongtin_tk", connstr: "ConnectEMS" };
        var para = {
            userid: val
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_xoathongtin_tk(config, para, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            messInfo("messinfo_dstk", row, 'ok');
           
            setTimeout(function () {
                messInfo("messinfo_dstk", '', 'ok');
                danhsachnhap_tkhoan(tranghietai);
            }, 2000);
             
        } else {
            messInfo("messinfo_dstk", row, 'error');
        }
    } catch (e) {
        console.log(e);
    }
}




