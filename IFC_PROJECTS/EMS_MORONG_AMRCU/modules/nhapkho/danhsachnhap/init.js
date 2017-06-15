var countpage = 10;
$(document).ready(function () {
    try {
        
        var p = getAllIdMod();
        loadConetent();
        loadInitDate();
        setValToTxt("txt_datefrom_nkdanhsach", gettimenowweek());
        setValToTxt("txt_dateto_nkdanhsach", gettimenow());
        serachdatabase_danhsachnhap(p, 1);
        $("#btnThucHienDanhsach_nkdanhsach").click(function () {
            var p = getAllIdMod();

            serachdatabase_danhsachnhap(p, 1);
        });
        $("#btnThucHienDanhsach_nkdanhsach").click();


    } catch (e) {
        console.log(e);
    }
});

//============================================================ XY LY CAC CHUC NANG==========================================================


function serachdatabase_danhsachnhap(p, page) {
    try {

        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Import_DanhSachPhieuNhap", callback: "f_result_loadduserachdatabase_Danhsachnhap", connstr: "ConnectEMS" };
        var para = {
            DateFrom: p.txt_datefrom_nkdanhsach,
            DateTo: p.txt_dateto_nkdanhsach,
            VoiceCode: p.txtMaphieu_nkdanhsach,
            TypeInOut: 1,
            Userid:userInfo.userid,
            v_page: page,
            v_pagecount: countpage
        };
        ExecuteServiceSyns(config, para, false);

    } catch (e) {
        console.log(e);
    }
}
function f_result_loadduserachdatabase_Danhsachnhap(config, para, list) {
    try {
        var p = getAllIdMod();
        var data = list.data;
        if (data[0].kq0 == null || data[0].kq0 == "[]" || data[0].kq0 == "" || data[0].kq0.length == 0) {
            try {
                messInfo("messinfo_danhsachnhap", "Không có dữ liệu hiển thị từ " + p.txt_datefrom_nkdanhsach + " đến " + p.txt_dateto_nkdanhsach, "error");
                clear_nkdanhsachnhap();
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_danhsachnhap", "", "error");
        loaddulieu_Danhsachnhap(data);

    } catch (e) {
        console.log(e);
    }
}


function loaddulieu_Danhsachnhap(data) {
    try {
        $("#tblnhapkho_nkdanhsachnhap").empty();
        $.each(data[0].kq0, function (key, val) {
            var row = "";
            row += "<tr class='" + val.approve + "'><td>"
                + val.rownum + "</td><td>"
                + val.voicecode + "</td><td class='r'>"
                + val.nguoigui + "</td><td class='r'>"
                + val.nguoinhan + "</td><td class='r'>"
                + val.tukho + "</td><td class='r'>"
                + val.toikho + "</td><td class='r'>"
                + val.countdivice + "</td><td class='r'>"
                + val.trackingnumber + "</td><td class='r'>"
                + val.inputdate + "</td><td class='r'>"
                + val.note + "</td><td class='r'"

            // + " <form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' href='#btn_xemchitiethoadon_nkdanhsachnhap' value='" + val.voicecode + "' id='btn_xemchitiethoadon_nkdanhsachnhap"+ val.voicecode +"'>Xem</a></div></form></td> </tr>";
            + "class='linktomod' href='#modalXemChiTietPhieu' id='btn_xemchitiethoadon_nkdanhsachnhap" + val.voicecode + "' data-toggle='modal' class='viewphieu'> Xem"
            + "</td> </tr>";
            $("#tblnhapkho_nkdanhsachnhap").append(row);

            $("#btn_xemchitiethoadon_nkdanhsachnhap" + val.voicecode).click(function () {

                loadxemchitietmaphieu_nhapxct(val.voicecode);
                $("#xemchitiethoadon_nkdanhsachnhap").slideDown("slow");

            });


        });
        // tomausukien() ;
        $("#txt_tongsobanghi_nkdanhsachnhap").empty();
        $.each(data[1].kq1, function (key, val) {
            var row1 = "Tổng Số Bản Ghi " + val.allrow;
            $("#txt_tongsobanghi_nkdanhsachnhap").append(row1);
        });
        loadphantrang_Danhsachnhap(data);
    } catch (e) {
        console.log(e);
    }
}
function loadphantrang_Danhsachnhap(data) {
    try {
        $("#pagecurent_nkdanhsachnhap ul").empty();
        $("#pagecurent_nkdanhsachnhap ul").append('<li><a  >Trang đầu</a></li>');
        $.each(data[2].kq2, function (key, val) {
            var row2 = "";
            row2 += '<li><a  >' + val.pape + '</a></li>';
            $("#pagecurent_nkdanhsachnhap ul").append(row2);
        });
        $("#pagecurent_nkdanhsachnhap ul li a").click(function () {
            var cuoi = $("#txt_tongsobanghi_nkdanhsachnhap").html().split('/')[1].trim();
            var page = $(this).html() == "Trang đầu" ? 1 : $(this).html() == "Trang cuối" ? cuoi : $(this).html();
            $("#pagecurent_nkdanhsachnhap ul li a").addClass("active");
            var p = getAllIdMod();
            serachdatabase_danhsachnhap(p, page);
        });
    } catch (e) {
        console.log(e);
    }
}


//============================================================KET THUC XY LY CAC CHUC NANG==========================================================

function clear_nkdanhsachnhap() {
    try {
        $("#tblnhapkho_nkdanhsachnhap").empty();
        $("#txt_tongsobanghi_nkdanhsachnhap").empty();
        $("#pagecurent_nkdanhsachnhap ul").empty();
    } catch (e) {
        console.log(e);
    }
}

function checknull_danhsachnhap() {
    try {
        var p = getAllIdMod();
        if (p.txtMaphieu_nkdanhsach == "") return "Mã phiếu không được để trống";
        var compare = compareDates(timeyyyymmdd(p.txt_datefrom_nkdanhsach), timeyyyymmdd(p.txt_dateto_nkdanhsach));
        if (compare.days < 0) return "Từ ngày phải nhở hơn ngày đến";
        return "";
    } catch (e) {
        console.log(e);
    }
}

function f_thongbaothanhcong_danhsachnhap(mess) {
    messInfo("messinfo_danhsachnhap", mess, "ok");
    $("#messinfo_danhsachnhap").show();

}