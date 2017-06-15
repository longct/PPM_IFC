$(document).ready(function () {
    showhideTree();
    try{
        if (JSON.parse(localStorage.getItem("tree_node"))[0].socongto != "0") {
            $(".sobanghi").html("<span tkey='chonthumuc'></span>");
            //selectlang();
        } else {
            get_tkdn();
        }
    } catch (e) {
        console.log(e);
    }





});

function get_tkdn() {
    //try {
    var code = JSON.parse(localStorage.getItem("tree_node"))[0].id;
    var config = { connstr: "ConnectOracle233", namesql: "AMISS_USER.ThongKeThanhVienDangNhap", callback: "result_tkdn" };
    var para = {
        v_Code: code
    };

    ExecuteServiceSyns(config, para);

    //  

    //} catch (e) {
    //    console.log(e);
    //}
}
function result_tkdn(config, para, lst) {
    try {

        var data = lst.data;
        console.log(data);
        if (data.length == 0) {
            $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
            selectlang();
            return;
        }
        var dt = new Date();
        dt.setDate(dt.getDate());
        var th0 = getFormattedDate(dt);
        $('.th_ngay0').html(th0);


        dt.setDate(dt.getDate() - 1);
        var th1 = getFormattedDate(dt);
        $('.th_ngay1').html(th1);

        dt.setDate(dt.getDate() - 1);
        var th2 = getFormattedDate(dt);
        $('.th_ngay2').html(th2);

        dt.setDate(dt.getDate() - 1);
        var th3 = getFormattedDate(dt);
        $('.th_ngay3').html(th3);

        dt.setDate(dt.getDate() - 1);
        var th4 = getFormattedDate(dt);
        $('.th_ngay4').html(th4);


        var tr = "";
        var tsbanghi;
        $.each(data, function (i, val) {
            tr += '<tr>' +
                    '<td class="td_phaa a_r">' + val.stt + '</td>' +
                    '<td class="td_phaa a_r">' + val.name + '</td>' +
                    '<td class="td_phaa a_r">' + val.ngay0 + '</td>' +
                    '<td class="td_phaa a_r">' + val.ngay1 + '</td>' +
                    '<td class="td_phaa a_r">' + val.ngay2 + '</td>' +
                    '<td class="td_phaa a_r">' + val.ngay3 + '</td>' +
                    '<td class="td_phaa a_r">' + val.ngay4 + '</td>' +
                '</tr>';
        });

        $("#tbl_tkdn_data tbody").empty();
        $("#tbl_tkdn_data tbody").append(tr);
        $(".sobanghi").html(data.length + "<span tkey='banghi'></span>");
        selectlang();
    } catch (e) {
        console.log(e);
    }
}

function getFormattedDate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return day + '/' + month + '/' + year;
}