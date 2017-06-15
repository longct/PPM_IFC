//var countpage = 10;
//$(document).ready(function () {
//    try {
        
//        var p = getAllIdMod();
//        loadConetent();
//        loadInitDate();
//        setValToTxt("txt_datefrom_baocaohangmua", gettimenow());
//        setValToTxt("txt_dateto_baocaohangmua", gettimenow());
//        loaddatabase_baocaohangmua(p, 1);
//        $("#btnThucHienDanhsach_baocaohangmua").click(function () {
//            var p = getAllIdMod();
//            var check = validate_baocaohangmua();
//            if (check != "") {
//                messInfo("messinfo_baocaohangmua", check, "error");
//                clead_baocaohangmua();
//                return;
//            }
//            loaddatabase_baocaohangmua(p, 1);
           
//        });

//    } catch (e) {
//        console.log(e);
//    }
//});

////============================================================ XY LY CAC CHUC NANG==========================================================
//function loaddatabase_baocaohangmua(p, page) {
//    try {
        
//        var config = { namesql: "TB_BAOCAO_VTTBPhuOrHangHoa", callback: "f_result_loaddatabase_baocaohangmua", connstr: "ConnectEMS" };
//        var para = {
//            FromDate: p.txt_datefrom_baocaohangmua,
//            ToDate: p.txt_dateto_baocaohangmua,
//            HangHoaOrTBPhu: 1,
//            v_page:page,
//            v_pagecount: countpage
//        };
//        console.log(para);
//        ExecuteServiceSyns(config, para, false);
//    } catch (e) {
//        console.log(e);
//    }
//}
//function f_result_loaddatabase_baocaohangmua(config, para, lst) {
//    try {
//        var data = lst.data;
//        var p = getAllIdMod();
//        if (data[0].kq0 == null || data[0].kq0 == "[]" || data[0].kq0 == "" || data[0].kq0.length == 0) {
//            try {
//                messInfo("messinfo_baocaohangmua", "Không có dữ liệu hiển thị từ " + p.txt_datefrom_baocaohangmua + " đến " + p.txt_dateto_baocaohangmua, "error");
//                clead_baocaohangmua();
//                return;
//            } catch (e) {
//                console.log(e);
//            }
//        }
//        messInfo("messinfo_baocaohangmua", "", "error");
//        loaddulieu_baocaohangmua(data);

//    } catch (e) {
//        console.log(e);
//    }
//}
//function loaddulieu_baocaohangmua(data) {
//    try{
//        $("#tblbaocao_baocaohangmua").empty();
//        $.each(data[0].kq0, function (key, val) {
//            var row = "";
//            row += "<tr><td class='c'>"
//                + val.rownum + "</td><td class='c'>"
//                + val.tenvattu + "</td><td class='c'>"
//                + val.donvitinh + "</td><td class='c'>"
//                + val.sltondauky + "</td><td class='c'>"
//                + val.slnhap + "</td><td class='c'>"
//                + val.tongtondauky + "</td><td class='c'>"
//                + val.xuatsanxuat + "</td><td class='c'>"
//                + val.xuatthunghiem + "</td><td class='c'>"
//                + val.tongxuat + "</td><td class='c'>"
//                + val.slton + "</td><td class='c'>"
//                + val.ghichu + "</td></tr>";

//            $("#tblbaocao_baocaohangmua").append(row);
//        });
//        $("#txt_tongsobanghi_baocaohangmua").empty();
//        $.each(data[1].kq1, function (key, val) {
//            var row1 = "Tổng" + val.allrow;
//            $("#txt_tongsobanghi_baocaohangmua").append(row1);
//        });
//        loadphantrang_baocaohangmua(data);

//    }catch(e){
//        console.log(e);
//    }
//}
//function loadphantrang_baocaohangmua(data) {
//    try{
//        $("#pagecurent_baocaohangmua ul").empty();
//        $("#pagecurent_baocaohangmua ul").append('<li><a  >Trang đầu</a></li>');
//        $.each(data[2].kq2, function (key, val) {
//            var row2 = "";
//            row2 += '<li><a  >' + val.pape + '</a></li>';
//            $("#pagecurent_baocaohangmua ul").append(row2);
//        });
//        $("#pagecurent_baocaohangmua ul li a").click(function () {
//            var cuoi = $("#txt_tongsobanghi_baocaohangmua").html().split('/')[1].trim();
//            var page = $(this).html() == "Trang đầu" ? 1 : $(this).html() == "Trang cuối" ? cuoi : $(this).html();
//            $("#pagecurent_baocaohangmua ul li a").addClass("active");
//            var p = getAllIdMod();
//            loaddatabase_baocaohangmua(p, page);
//        });
//    } catch (e) {
//        console.log(e);
//    }
//}


////============================================================KET THUC XY LY CAC CHUC NANG==========================================================
//function clead_baocaohangmua() {
//    try{
//        $("#tblbaocao_baocaohangmua").empty();
//        $("#txt_tongsobanghi_baocaohangmua").empty();
//        $("#pagecurent_baocaohangmua ul").empty();
//    } catch (e) {
//        console.log(e);
//    }
//}
//function validate_baocaohangmua() {
//    try {
//        var p = getAllIdMod();
//        var compare = compareDates(timeyyyymmdd(p.txt_datefrom_baocaohangmua), timeyyyymmdd(p.txt_dateto_baocaohangmua));
//        if (compare.days < 0) return "Từ ngày phải nhở hơn ngày đến";
//        return "";
//    } catch (e) {
//        console.log(e);
//    }
//}