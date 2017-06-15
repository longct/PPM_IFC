var countpage = 10;
$(document).ready(function () {
    try {
        loadchecklog_master();

        initformelement();
        setValToTxt("txt_ngay_tklog", gettimenow());
        setValToTxt("txt_denngay_tklog", gettimenow());
        thongke_log(1);
        $("#btn_thuchien_tklog").click(function () {
            var check = check_tklog();
            if (check != "") {
                messInfo("messinfo_tklog", check, 'error');
                return;
            }
            thongke_log(1);
        });

    } catch (e) {
        console.log(e);
    }

});
function thongke_log(page) {
    try{
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_THONGKEGUIMAIL.THONGKELOG", callback: "result_thongke_log" };
        var para = {
            v_tungay: p.txt_ngay_tklog,
            v_denngay: p.txt_denngay_tklog,
            v_pagenum: page,
            v_numrecs: countpage
        };
        ExecuteServiceSyns(config, para);
    }catch(e){
        console.log(e);
    }
}
function result_thongke_log(config, para, lst) {
    try{
        var data = lst.data;
        console.log(data);
     

        if (data.length == 0 || data == '' || data == null || data == undefined) {

            messInfo("messinfo_tklog", "Không có dữ liệu hiển thị", 'error');
            clecar_tklog();
            return;
        }
      
        messInfo("messinfo_tklog", "", 'error');
        $("#table_thongke_tklog").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td class='c'>"
                + val.stt + "</td><td>"
               // + setnull(val.procedures) + "</td><td>"
                + setnull(val.thongtin) + "</td><td class='c'>"
                + setnull(val.thoidiem) + "</td><td>"
                + setnull(val.loailog) + "</td><td>"
                + setnull(val.ten) + "</td></tr>";
            
            $("#table_thongke_tklog").append(row);
        });

        LoadPhanTrang("pageLst_tklog", "pageCurent_tklog", data, function () {
            thongke_log($("#pagenumber").val());
        });

    } catch (e) {
        console.log(e);
    }
}

function check_tklog() {
    try{
        var p = getAllIdMod();
        var ovderday = compareDates(new Date(), timeyyyymmdd(p.txt_ngay_tklog));
        if (ovderday.days > 0)
            return "Từ ngày không được chọn quá ngày hiện tại";
        var ovderday1 = compareDates(new Date(), timeyyyymmdd(p.txt_denngay_tklog));
        if (ovderday1.days > 0)
            return "Đến ngày không được chọn quá ngày hiện tại";
        var compare = compareDates(timeyyyymmdd(p.txt_ngay_tklog), timeyyyymmdd(p.txt_denngay_tklog));
        if (compare.days < 0)
            return "Từ ngày phải nhỏ hơn đến ngày";
      
        return "";

    } catch (e) {
        console.log(e);
    }
}
function clecar_tklog() {
    try{
        $("#table_thongke_tklog").empty();
        $("#pageCurent_tklog").empty();
        $("#pageLst_tklog").empty();
    }catch(e){
        console.log(e);
    }
}
