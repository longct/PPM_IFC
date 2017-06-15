var countpage = 10;
$(document).ready(function () {
    try {
        loadchecklog_master();

        loadConetent();
        loaddstaikhoan(1);


    } catch (e) {
        console.log(e);
    }
});
function loaddstaikhoan(page) {
    try{
        var config = { connstr: "Oracle_HDDT", namesql: "HD_DANGNHAP.LOADTHONGTIN", callback: "resut_loaddstaikhoan" };
        var para = {
        v_CODE:'',
        v_pagenum: page,
        v_numrecs :countpage
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function resut_loaddstaikhoan(config, para, lst) {
    try {
        var data = lst.data;
        if (data == "" || data == null || data == undefined || data == "[]") {
            messInfo("messinfo_dstk", "Không có dữ liệu hiển thị từ", "error");
            clear_null();
            return;
        }
        $("#table_dstk").empty();
        messInfo("messinfo_dstk", "", "error");
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td>"
                + val.stt + "</td><td>"
                + setnull(val.usercode) + "</td><td>"
                + setnull(val.ten) + "</td><td>"
                + setnull(val.mail) + "</td><td>"
                + setnull(val.inserteddate) + "</td><td class ='c'>"
                + "<form class='form-inline' role=''form'><div class='form-group'><a class='btn btn-success btn-action' data-toggle='modal' href='#sua_Taikhoan' value='" + val.id + "' id='btn_suatk" + val.id + "'><i class='fa fa-edit'></i> Sửa</a> &nbsp</div></form></td> </tr>";

            $("#table_dstk").append(row);

            $("#btn_suatk" + val.id).click(function () {
                loadthongtinid(val.id);
            });

        });

        LoadPhanTrang("pageLst_dstk", "pageCurent_dstk", data, function () {
            loaddstaikhoan($("#pagenumber").val());
        });



    } catch (e) {
        console.log(e);
    }
}
function clear_null() {
    try {
        $("#table_dstk").empty();
        $("#pageCurent_dstk").empty();
        $("#pageLst_dstk").empty();
    } catch (e) {
        console.log(e);
    }
}






