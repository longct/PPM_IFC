$(document).ready(function () {
    showhideTree();
    try {
        if (localStorage.getItem("tree_node")) {
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            if (socongto != "0") {
                $("#tendiemdo_span").html("Vui lòng chọn Đơn vị để xem dữ liệu");
                return;
            }
            else if (istype == "4")
                $("#tendiemdo_span").html("<span tkey='soghi'></span>: " + tendiemdo);
            else if (socongto == "0" && istype != "4")
                $("#tendiemdo_span").html("<span tkey='donvi'></span>: " + tendiemdo);
            else if (istype >= "6")
                $("#tendiemdo_span").html("Trạm: " + tendiemdo);
            $("#btn_thuchien").removeAttr("disabled");
        }
        else {
            $("#tendiemdo_span").html("Vui lòng chọn Đơn vị để xem dữ liệu");
            $("#tab_content").empty();
            return;
        }
        initformelement();
        selectlang();
        //loadInitDate();
        setValToTxt("txt_tungay_ctdn", gettimenow());
        setValToTxt("txt_denngay_ctdn", gettimenow());
        loadchitietdangnhap();
        $("#btn_thuchien").click(function () {
            var check = checkvalidate_ctdn();
            if (check != "") {
                showToast(check, "error");
                return
            }

            loadchitietdangnhap();
        })
    } catch (e) {
        console.log(e);
    }

});

function checkvalidate_ctdn() {
    try {
        var p = getAllIdMod();
        var compare = compareDates(timeyyyymmdd(p.txt_tungay_ctdn), timeyyyymmdd(p.txt_denngay_ctdn));
        if (compare.days < 0)
            return "Từ ngày phải nhỏ hơn đến ngày"
        var ovderday2 = compareDates(new Date(), timeyyyymmdd(p.txt_tungay_ctdn));
        if (ovderday2.days > 0)
            return "Ngày không được chọn quá ngày hiện tại";
        var ovderday = compareDates(new Date(), timeyyyymmdd(p.txt_denngay_ctdn));
        if (ovderday.days > 0)
            return "Từ ngày không được chọn quá ngày hiện tại";
        return "";
    } catch (e) {
        console.log(e);
    }
}

function loadchitietdangnhap() {
    try {
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var tree = JSON.parse(localStorage.getItem("tree_node"));
        var config = { connstr: "ConnectOracle233", namesql: "AMISS_QUANLYNGUOIDUNG.CHITIETDANGNHAP", callback: "result_loadchitietdangnhap" };
        var p = getAllIdMod();
        var para = {
            v_tungay: p.txt_tungay_ctdn,
            v_denngay: p.txt_denngay_ctdn,
            v_Code: tree[0].id
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);

    }
}

function result_loadchitietdangnhap(para, config, lst) {
    try {
        var data = lst.data;

        $("#tKdangnhap_tk").empty();
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            showToast('Không có dữ liệu hiển thị', "error");
            return;
        }

        $.each(data, function (key, val) {
            var row = "";
            row += "<tr><td class='a_c'>"
                + val.stt + "</td><td>"
                + val.username + "</td><td class='a_c'>"
                + val.lastlogin + "</td><td class='a_c'>"
                + val.startlogin + "</td><td class='a_c'>"
                + val.countlogin + "</td><td class='a_c'>"
                + val.name + "</td></tr>";
            $("#tKdangnhap_tk").append(row);
        });
    } catch (e) {
        console.log(e);
    }
}