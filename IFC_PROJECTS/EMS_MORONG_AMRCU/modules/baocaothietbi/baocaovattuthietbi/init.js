var countpage = 10;
$(document).ready(function () {
    try {
       
        var p = getAllIdMod();
        loadConetent();
        loadInitDate();
        setValToTxt("txt_datefrom_baocaovattuthietbi", gettimenowweek());
        setValToTxt("txt_dateto_baocaovattuthietbi", gettimenow());
        
        loadLoaiThietBiSoLuongHayChiTiet_baocaothietbi();
        loaddatabase_baocaovattuthietbi(p, 1);
        $("#btnThucHienDanhsach_baocaovattuthietbi").click(function () {
            var p = getAllIdMod();
            var check = validate_baocaovattuthietbi();
            if (check != "") {
                messInfo("messinfo_baocaovattuthietbi", check, "error");
                clead_baocaovattuthietbi();
                return;
            }
            loaddatabase_baocaovattuthietbi(p, 1);
           
        });
        $("#btnExecl_baocaovattuthietbi").click(function () {
            Xuatexecl_baocaothietbi();
        });
    } catch (e) {
        console.log(e);
    }
});

//============================================================ XY LY CAC CHUC NANG==========================================================
function loaddatabase_baocaovattuthietbi(p,page) {
    try {
        var config = { namesql: "TB_BAOCAO_VTTBPhuOrHangHoa", callback: "f_result_loaddatabase_baocaovattuthietbi", connstr: "ConnectEMS" };
        var para = {
            FromDate: p.txt_datefrom_baocaovattuthietbi,
            ToDate: p.txt_dateto_baocaovattuthietbi,
            HangHoaOrTBPhu: 1,
            TypeDeviceId: p.cb_vattuthbi_baocaovattuthietbi,
            Search: p.txtloc_danhsachxuat,
            v_page:page,
            v_pagecount: countpage
        };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loaddatabase_baocaovattuthietbi(config, para, lst) {
    try {
        var data = lst.data;
        var p = getAllIdMod();
        if (data[0].kq0 == null || data[0].kq0 == "[]" || data[0].kq0 == "" || data[0].kq0.length == 0) {
            try {
                messInfo("messinfo_baocaovattuthietbi", "Không có dữ liệu hiển thị từ " + p.txt_datefrom_baocaovattuthietbi + " đến " + p.txt_dateto_baocaovattuthietbi, "error");
                clead_baocaovattuthietbi();
                return;
            } catch (e) {
                console.log(e);
            }
        }
        messInfo("messinfo_baocaovattuthietbi", "", "error");
        loaddulieu_baocaovattuthietbi(data);

    } catch (e) {
        console.log(e);
    }
}
function loaddulieu_baocaovattuthietbi(data) {
    try{
        $("#tblbaocao_baocaovattuthietbi").empty();
        $.each(data[0].kq0, function (key, val) {
            var row = "";
            row += "<tr><td class='c'>"
                + val.rownum + "</td><td class='c'>"
                + val.tenvattu + "</td><td class='c'>"
                + val.donvitinh + "</td><td class='c'>"
                + val.sltondauky + "</td><td class='c'>"
                + val.slnhap + "</td><td class='c'>"
                + val.tongtondauky + "</td><td class='c'>"
                + val.xuatsanxuat + "</td><td class='c'>"
                + val.xuatthunghiem + "</td><td class='c'>"
                + val.tongxuat + "</td><td class='c'>"
                + val.slton + "</td><td class='c'>"
                + val.ghichu + "</td></tr>";

            $("#tblbaocao_baocaovattuthietbi").append(row);
        });
        $("#txt_tongsobanghi_baocaovattuthietbi").empty();
        $.each(data[1].kq1, function (key, val) {
            var row1 = "Tổng" + val.allrow;
            $("#txt_tongsobanghi_baocaovattuthietbi").append(row1);
        });
        loadphantrang_baocaothietbi(data);

    }catch(e){
        console.log(e);
    }
}
function loadphantrang_baocaothietbi(data) {
    try{
        $("#pagecurent_baocaovattuthietbi ul").empty();
        $("#pagecurent_baocaovattuthietbi ul").append('<li><a  >Trang đầu</a></li>');
        $.each(data[2].kq2, function (key, val) {
            var row2 = "";
            row2 += '<li><a  >' + val.pape + '</a></li>';
            $("#pagecurent_baocaovattuthietbi ul").append(row2);
        });
        $("#pagecurent_baocaovattuthietbi ul li a").click(function () {
            var cuoi = $("#txt_tongsobanghi_baocaovattuthietbi").html().split('/')[1].trim();
            var page = $(this).html() == "Trang đầu" ? 1 : $(this).html() == "Trang cuối" ? cuoi : $(this).html();
            $("#pagecurent_baocaovattuthietbi ul li a").addClass("active");
            var p = getAllIdMod();
            loaddatabase_baocaovattuthietbi(p, page);
        });
    } catch (e) {
        console.log(e);
    }
}
// hiển thị thêm vat tư 16/5/2016
function loadLoaiThietBiSoLuongHayChiTiet_baocaothietbi() {
    try {

        var userInfo = localStorage.getItem("userinfo");
        var parseUser = JSON.parse(userInfo);
        var config = { namesql: "TB_Import_LstLoadByCode", callback: "f_result_loadLoaiThietBiSoLuongHayChiTiet_baocaothietbi", connstr: "ConnectEMS" };
        var para = { IsType: 'LoaiThietBiTheoHangHoa', Code: '1' };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function f_result_loadLoaiThietBiSoLuongHayChiTiet_baocaothietbi(config, para, lst) {
    try {
        dataToCob("cb_vattuthbi_baocaovattuthietbi", lst.data, "code", "typedevicename", "-1", "--Tất cả--");
    } catch (e) {
        console.log(e);
    }
}
function Xuatexecl_baocaothietbi() {
    try {
        var p = getAllIdMod();
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = {
            namesql: "TB_BAOCAO_VTTBPhuOrHangHoa",
            namefile: "Bao_Cao_baocaothietbi",
            connstr: "ConnectEMS",
            userid: userInfo.userid
        };
        var para = {
            FromDate: p.txt_datefrom_baocaovattuthietbi,
            ToDate: p.txt_dateto_baocaovattuthietbi,
            HangHoaOrTBPhu: 1,
            TypeDeviceId: p.cb_vattuthbi_baocaovattuthietbi,
            Search: p.txtloc_danhsachxuat,
            v_page: -1,
            v_pagecount: 10
        };
        var colum = {
            kq: [{ field: "rownum", name: "Stt", type: "TextAndBoldCenter" },
               { field: "tenvattu", name: "Tên vật tư", type: "TextAndBoldCenter" },
               { field: "donvitinh", name: "ĐVT", type: "TextAndBoldCenter" },
               { field: "sltondauky", name: "Số tồn đầu ký", type: "TextAndBoldCenter" },
               { field: "slnhap", name: "Số lượng nhập", type: "TextAndBoldCenter" },
               { field: "tongtondauky", name: "Tổng tồn đầu kỳ", type: "TextAndBoldCenter" },
               { field: "xuatsanxuat", name: "Xuất sản xuất", type: "TextAndBoldCenter" },
               { field: "xuatthunghiem", name: "Xuất thử nghiệm", type: "TextAndBoldCenter" },
               { field: "tongxuat", name: "Tổng xuất", type: "TextAndBoldCenter" },
               { field: "slton", name: "Số lượng tồn", type: "TextAndBoldCenter" },
               { field: "ghichu", name: "Ghi chú", type: "TextAndBoldCenter" }]
        };
        excuteExcel(config, para, colum, true);
    } catch (e) {
        console.log(e);
    }
}
//============================================================KET THUC XY LY CAC CHUC NANG==========================================================
function clead_baocaovattuthietbi() {
    try{
        $("#tblbaocao_baocaovattuthietbi").empty();
        $("#txt_tongsobanghi_baocaovattuthietbi").empty();
        $("#pagecurent_baocaovattuthietbi ul").empty();
    } catch (e) {
        console.log(e);
    }
}
function validate_baocaovattuthietbi() {
    try {
        var p = getAllIdMod();
        var compare = compareDates(timeyyyymmdd(p.txt_datefrom_baocaovattuthietbi), timeyyyymmdd(p.txt_dateto_baocaovattuthietbi));
        if (compare.days < 0) return "Từ ngày phải nhở hơn ngày đến";
        return "";
    } catch (e) {
        console.log(e);
    }
}