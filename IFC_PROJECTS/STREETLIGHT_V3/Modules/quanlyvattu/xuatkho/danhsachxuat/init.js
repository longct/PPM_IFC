//var countpage = 10;
//$(document).ready(function () {
//    try {
        
//        loadConetent();
//        loadInitDate();
//        setValToTxt("txt_datefrom_danhsachxuat", gettimenowweek());
//        setValToTxt("txt_dateto_danhsachxuat", gettimenow());
//        // serachdatabase_danhsachnhap(p,1);
//        $("#btnThucHienDanhsach_danhsachxuat").click(function () {
//            var p = getAllIdMod();
//            serachdatabase_danhsachnhap(p, 1);
//        });
//        $("#btnThucHienDanhsach_danhsachxuat").click();


//    } catch (e) {
//        console.log(e);
//    }
//});

////============================================================ XY LY CAC CHUC NANG==========================================================


//function serachdatabase_danhsachnhap(p, page) {
//    try {

//        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
//        var config = { namesql: "TB_Export_DanhSachPhieuXuat", callback: "f_result_loadduserachdatabase_Danhsachnhap", connstr: "ConnectEMS" };
//        var para = {
//            DateFrom: p.txt_datefrom_danhsachxuat,
//            DateTo: p.txt_dateto_danhsachxuat,
//            VoiceCode: p.txtMaphieu_danhsachxuat,
//            TypeInOut: 2,
//            Userid:userInfo.userid,
//            v_page: page,
//            v_pagecount: countpage
//        };
//        ExecuteServiceSyns(config, para, false);

//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_result_loadduserachdatabase_Danhsachnhap(config, para, list) {
//    try {
//        var p = getAllIdMod();
//        var data = list.data;
//        if (data[0].kq0 == null || data[0].kq0 == "[]" || data[0].kq0 == "" || data[0].kq0.length == 0) {
//            try {
//                messInfo("messinfo_danhsachnhap", "Không có dữ liệu hiển thị từ " + p.txt_datefrom_danhsachxuat + " đến " + p.txt_dateto_danhsachxuat, "error");
//                clear_danhsachxuat();
//                return;
//            } catch (e) {
//                console.log(e);
//            }
//        }
//        messInfo("messinfo_danhsachnhap", "", "error");
//        loaddulieu_Danhsachnhap(data);

//    } catch (e) {
//        console.log(e);
//    }
//}


//function loaddulieu_Danhsachnhap(data) {
//    try {
//        $("#tblnhapkho_danhsachxuat").empty();
//        $.each(data[0].kq0, function (key, val) {
//            var row = "";
//            row += "<tr class='" + val.approve + "'><td>"
//                + val.rownum + "</td><td>"
//                + val.voicecode + "</td><td class='r'>"
//                + val.nguoigui + "</td><td class='r'>"
//                + val.nguoinhan + "</td><td class='r'>"
//                + val.tukho + "</td><td class='r'>"
//                + val.toikho + "</td><td class='r'>"
//                + val.countdivice + "</td><td class='r'>"
//                + val.trackingnumber + "</td><td class='r'>"
//                + val.inputdate + "</td><td class='r'>"
//                + val.note + "</td><td class='r'"

//            // + " <form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' href='#btn_xemchitiethoadon_danhsachxuat' value='" + val.voicecode + "' id='btn_xemchitiethoadon_danhsachxuat"+ val.voicecode +"'>Xem</a></div></form></td> </tr>";
//            + "class='linktomod' href='#modalXemChiTietPhieu_xuat' id='btn_xemchitiethoadon_danhsachxuat" + val.voicecode + "' data-toggle='modal'> Xem"
//            + "</td> </tr>";
//            $("#tblnhapkho_danhsachxuat").append(row);

//            $("#btn_xemchitiethoadon_danhsachxuat" + val.voicecode).click(function () {

//                loadxemchitietmaphieu_xuatxct(val.voicecode);
//                $("#xemchitiethoadon_danhsachxuat").slideDown("slow");

//            });


//        });
//        // tomausukien() ;
//        $("#txt_tongsobanghi_danhsachxuat").empty();
//        $.each(data[1].kq1, function (key, val) {
//            var row1 = "Tổng Số Bản Ghi " + val.allrow;
//            $("#txt_tongsobanghi_danhsachxuat").append(row1);
//        });
//        loadphantrang_Danhsachnhap(data);
//    } catch (e) {
//        console.log(e);
//    }
//}
//function loadphantrang_Danhsachnhap(data) {
//    try {
//        $("#pagecurent_danhsachxuat ul").empty();
//        $("#pagecurent_danhsachxuat ul").append('<li><a  >Trang đầu</a></li>');
//        $.each(data[2].kq2, function (key, val) {
//            var row2 = "";
//            row2 += '<li><a  >' + val.pape + '</a></li>';
//            $("#pagecurent_danhsachxuat ul").append(row2);
//        });
//        $("#pagecurent_danhsachxuat ul li a").click(function () {
//            var cuoi = $("#txt_tongsobanghi_danhsachxuat").html().split('/')[1].trim();
//            var page = $(this).html() == "Trang đầu" ? 1 : $(this).html() == "Trang cuối" ? cuoi : $(this).html();
//            $("#pagecurent_danhsachxuat ul li a").addClass("active");
//            var p = getAllIdMod();
//            serachdatabase_danhsachnhap(p, page);
//        });
//    } catch (e) {
//        console.log(e);
//    }
//}


////============================================================KET THUC XY LY CAC CHUC NANG==========================================================

//function clear_danhsachxuat() {
//    try {
//        $("#tblnhapkho_danhsachxuat").empty();
//        $("#txt_tongsobanghi_danhsachxuat").empty();
//        $("#pagecurent_danhsachxuat ul").empty();
//    } catch (e) {
//        console.log(e);
//    }
//}

//function checknull_danhsachnhap() {
//    try {
//        var p = getAllIdMod();
//        if (p.txtMaphieu_danhsachxuat == "") return "Mã phiếu không được để trống";
//        var compare = compareDates(timeyyyymmdd(p.txt_datefrom_danhsachxuat), timeyyyymmdd(p.txt_dateto_danhsachxuat));
//        if (compare.days < 0) return "Từ ngày phải nhở hơn ngày đến";
//        return "";
//    } catch (e) {
//        console.log(e);
//    }
//}

//function f_thongbaothanhcong_danhsachxuat(mess) {
//    messInfo("messinfo_danhsachnhap", mess, "ok");
//    $("#messinfo_danhsachnhap").show();

//}