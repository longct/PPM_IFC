$(document).ready(function () {
    try {
        loadchecklog_master();
        loadlsthoadon();
      
        $("#bt_load").click(function () {
            giatrihoadon_adhd();
        });
        $("#checkAllmdo").click(function () {
            $("input:checkbox").prop('checked', $(this).prop("checked"));
        });

    } catch (e) {
        console.log(e);
    }
    
});

function giatrihoadon_adhd() {
    try {
        var lstObj = [];
        $(".checkone_ckbmd").each(function () {
            var id = $(this).attr("value");
            if ($("#btn_click" + id).prop("checked") == true) {
                var value = id;
                lstObj.push(value);
            }
        });
        setValToTxt("txt_dsachhd_adhd", lstObj);
    } catch (e) {
        console.log(e);
    }
}
function loadlsthoadon() {
    try {
        var p = getAllIdMod();
        var config = { connstr: "Oracle_HDDT", namesql: "HD_LSTCOMBOX.LST_LOAIHOADON", callback: "result_loadlsthoadon" };
        var para = [];
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_loadlsthoadon(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0 || data == '' || data == null || data == undefined) {
            return;
        }
        $("#txt_table_adhd").empty();
        $.each(data, function (key, val) {
            var row = "";
            row += "<tr class='checkone_ckbmd' value=" + val.kyhieu + "><td><input type='checkbox' id='btn_click" + val.kyhieu + "'/></td><td>"
                + setnull(val.tenloaihoadon) + "</td></tr>";
            $("#txt_table_adhd").append(row);
        });


    } catch (e) {
        console.log(e);
    }
}


function kiemtra() {
    try{
        var p = getAllIdMod();
        var giatri = p.txt_dsachhd_adhd;
        var ten = giatri.split(',');
        for (var i = 0; i < ten.length; i++) {
            $("#btn_click" + ten[i]).prop('checked', true);
        }
    } catch (e) {
        console.log(e);
    }

}