var countpage = 10;
$(document).ready(function () {
    try {
       
        var p = getAllIdMod();
        loadConetent();
        loadInitDate();
        setValToTxt("txt_datefrom_bangvttb", gettimenow());
        setValToTxt("txt_dateto_bangvttb", gettimenow());
        loaddanhsachduan_bangvttb();
        loaddatabase_bangvttb(p, 1);
        
        $("#btnThucHienDanhsach_bangvttb").click(function () {
            var p = getAllIdMod();
            var check = validate_bangvttb();
            if (check != "") {
                messInfo("messinfo_bangvttb", check, "error");
                clead_bangvttb();
                return;
            }
            loaddatabase_bangvttb(p, 1);

        });
        $("#btnExecl_bangvttb").click(function () {
            Xuatexecl_bangvttb();
        });

    } catch (e) {
        console.log(e);
    }
});

//============================================================ XY LY CAC CHUC NANG==========================================================
function loaddatabase_bangvttb(p, page) {
    try {
        var p = getAllIdMod();
        var config = { namesql: "TB_BAOCAO_XUATDUANTOINGAY", callback: "f_result_loaddatabase_bangvttb", connstr: "ConnectEMS" };
        var para = {
            FromDate: p.txt_datefrom_bangvttb,
            ToDate: p.txt_dateto_bangvttb,
            ProjectId: p.cbduan_bangvttb,
            v_page: page,
            v_pagecount: countpage
        };
      
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddatabase_bangvttb(config, para, lst) {
    try {
        var data = lst.data;
        var p = getAllIdMod();
        if (data[0].kq0 == null || data[0].kq0 == "[]" || data[0].kq0 == "" || data[0].kq0.length == 0) {
            try {
                messInfo("messinfo_bangvttb", "Không có dữ liệu hiển thị từ " + p.txt_datefrom_bangvttb + " đến " + p.txt_dateto_bangvttb, "error");
                clead_bangvttb();
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_bangvttb", "", "error");
        loaddulieu_bangvttb(data);

    } catch (e) {
        console.log(e);
    }
}
function loaddulieu_bangvttb(data) {
    try {
        var p = getAllIdMod();
        $("#txt_soluong_bangvttb").empty();
        $("#txt_phatsinh_bangvttb").empty();
        $("#txt_soluong_bangvttb").append(p.txt_datefrom_bangvttb);
        $("#txt_phatsinh_bangvttb").append(p.txt_dateto_bangvttb);
        $("#tblbaocao_bangvttb").empty();
        $.each(data[0].kq0, function (key, val) {
            var row = "";
            row += "<tr><td class='c'>"
                + val.rownum + "</td><td class='c'>"
                + val.tenvattu + "</td><td class='c'>"
                + val.mavattu + "</td><td class='c'>"
                + val.sldaxuatdenngay + "</td><td class='c'>"
                + val.slnhapthuhoi + "</td><td class='c'>"
                + val.slxuatduan + "</td><td class='c'>"
                + val.cong + "</td></tr>";

            $("#tblbaocao_bangvttb").append(row);
        });
        $("#txt_tongsobanghi_bangvttb").empty();
        $.each(data[1].kq1, function (key, val) {
            var row1 = "Tổng" + val.allrow;
            $("#txt_tongsobanghi_bangvttb").append(row1);
        });
        loadphantrang_bangvttb(data);

    } catch (e) {
        console.log(e);
    }
}
function loadphantrang_bangvttb(data) {
    try {
        $("#pagecurent_bangvttb ul").empty();
        $("#pagecurent_bangvttb ul").append('<li><a  >Trang đầu</a></li>');
        $.each(data[2].kq2, function (key, val) {
            var row2 = "";
            row2 += '<li><a  >' + val.pape + '</a></li>';
            $("#pagecurent_bangvttb ul").append(row2);
        });
        $("#pagecurent_bangvttb ul li a").click(function () {
            var cuoi = $("#txt_tongsobanghi_bangvttb").html().split('/')[1].trim();
            var page = $(this).html() == "Trang đầu" ? 1 : $(this).html() == "Trang cuối" ? cuoi : $(this).html();
            $("#pagecurent_bangvttb ul li a").addClass("active");
            var p = getAllIdMod();
            loaddatabase_bangvttb(p, page);
        });
    } catch (e) {
        console.log(e);
    }
}
//load danh sach du an
function loaddanhsachduan_bangvttb() {
    try{
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadByCode", callback: "f_result_loaddanhsachduan_bangvttb", connstr: "ConnectEMS" };
        var para = {
            IsType: 'LoadDuAn',
            Code: userInfo.code
        };
       
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddanhsachduan_bangvttb(config,para,lst) {
    try {
        data = lst.data;
        dataToCob("cbduan_bangvttb", lst.data, "code", "name", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
function Xuatexecl_bangvttb() {
    try {
        p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_XUATDUANTOINGAY",
            namefile: "Bao_Cao_vat_tu_thiet_bi",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            FromDate: p.txt_datefrom_bangvttb,
            ToDate: p.txt_dateto_bangvttb,
            ProjectId: p.cbduan_bangvttb,
            v_page: -1,
            v_pagecount: countpage
        };
        var colum = {
            kq: [{ field: "rownum", name: "Stt", type: "TextAndBoldCenter" },
               { field: "tenvattu", name: "Tên vật tư", type: "TextAndBoldCenter" },
               { field: "mavattu", name: "Mã vật tư", type: "TextAndBoldCenter" },
               { field: "sldaxuatdenngay", name: "Số lượng đã xuất", type: "TextAndBoldCenter" },
               { field: "slnhapthuhoi", name: "Nhập thu hồi", type: "TextAndBoldCenter" },
               { field: "slxuatduan", name: "Xuất dự án ", type: "TextAndBoldCenter" },
               { field: "cong", name: "Cổng", type: "TextAndBoldCenter" }]
        };
        excuteExcel(config, para, colum, true);


    }catch(e){
        console.log(e);
    }
}

//============================================================KET THUC XY LY CAC CHUC NANG==========================================================
function clead_bangvttb() {
    try {
        $("#tblbaocao_bangvttb").empty();
        $("#txt_tongsobanghi_bangvttb").empty();
        $("#pagecurent_bangvttb ul").empty();
        $("#txt_soluong_bangvttb").empty();
        $("#txt_phatsinh_bangvttb").empty();
    } catch (e) {
        console.log(e);
    }
}
function validate_bangvttb() {
    try {
        var p = getAllIdMod();
        var compare = compareDates(timeyyyymmdd(p.txt_datefrom_bangvttb), timeyyyymmdd(p.txt_dateto_bangvttb));
        if (compare.days < 0) return "Từ ngày phải nhở hơn ngày đến";
        return "";
    } catch (e) {
        console.log(e);
    }
}