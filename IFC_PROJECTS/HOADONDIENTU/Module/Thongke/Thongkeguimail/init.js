var countpage = 10;
$(document).ready(function () {
    try {
        loadchecklog_master();

        $('#txt_ngay_tkmai').datepicker({
            format: 'mm/yyyy',
            todayHighlight: true,
            minViewMode: "months",
            autoclose: true
        }).datepicker('setDate', new Date())
        thongke(1);
        $("#btn_search_tkmai").on("click",function () {
          
            thongke(1);
        });

    } catch (e) {
        console.log(e);
    }

});
function thongke(page) {
    try {
        var p = getAllIdMod();
        var config = {
            connstr: "Oracle_HDDT", namesql: "HD_THONGKEGUIMAIL.LICHSUKHACHHANGGUIMAIL",
            callback: "result_thongke"
        };
        var para = {
            v_ngaytbhd: "01/" + p.txt_ngay_tkmai,
            v_trangthai: p.cb_trangthaiHD,
            v_pagenum: page,
            v_numrecs: countpage
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function result_thongke(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {

            messInfo("messinfo_tkmai", "Không có dữ liệu hiển thị", 'error');
            clecar_tkmail();
            return;
        }
        var curr_user = JSON.parse(localStorage["userinfo"]).usercode;
        messInfo("messinfo_tkmai", "", 'error');
        $("#table_thongke_tkmai").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td td class='w150'>"
                + setnull(val.tenkhachhang) + "</td><td class='w150'>"
                + setnull(val.email) + "</td><td class='w100 c'>"
                + setnull(val.dienthoai) + "</td><td>"
                + setnull(val.chude) + "</td><td>"
                + setnull(val.noidung_ngan) + "<a data-toggle='popover' data-placement='left'  data-content='" + val.noidung.toString().replace("id_user", curr_user) + "'>Xem thêm</a></td><td class='c'>"
                + setnull(val.thoidiem) + "</td><td class='c'>"
                + setnull(val.tenuser) + "</td><td class='c'>"
                + setnull(val.trangthaihientai) + "</td><td>"
                + setnull(val.kh_taifile) + "</td><td>"
                + setnull(val.ngay_kh_taifile) + "</td></tr>";
            $("#table_thongke_tkmai").append(row);
        });

        $('[data-toggle="popover"]').popover({ html: true });

        // Click ra ngoài popover thì tắt popover 
        $('html').on('mouseup', function (e) {
            if (!$(e.target).closest('.popover').length) {
                $('.popover').each(function () {
                    $(this.previousSibling).popover('hide');
                });
            }
        });

        LoadPhanTrang("pageLst_lstkmai", "pageCurent_lstkmai", data, function () {
            thongke($("#pagenumber").val());
        });

    } catch (e) {
        console.log(e);
    }
}


function clecar_tkmail() {
    try {
        $("#table_thongke_tkmai").empty();
        $("#pageCurent_tkmai").empty();
        $("#pageLst_tkmai").empty();
    } catch (e) {
        console.log(e);
    }
}
