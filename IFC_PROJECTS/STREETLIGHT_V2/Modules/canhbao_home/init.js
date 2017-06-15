$(document).ready(function () {
    try {

        f_get();
        $("#boxcanhbao .panel-refresh").on("click", function () {
            var panel = $(this).parents(".panel");
            panel_refresh(panel, "shown", f_get);

            setTimeout(function () {
                panel_refresh(panel);
            }, 2000);

            $(this).parents(".dropdown").removeClass("open");
            return false;
        });
        $("#boxcanhbao .panel-list").on("click", function () {
            $("#canhbao_vanhanh").modal("show");
            return false;
        });
        $('#canhbao_vanhanh').on('shown.bs.modal', function () {
            //$('#canhbao_vanhanh_content').show();
            //$('#messinfo_cbvh').hide();
            loaddanhsach_viewtl(1, 'ALL');
        })
        //var t = gettimenow();

    } catch (e) {
        console.log(e);
    }

});

function getLastWeek() {
    try {
        var today = new Date();
        var t = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

        var d = t.getDate().toString().length == 1 ? "0" + t.getDate() : t.getDate();
        var m = (t.getMonth() + 1).toString().length == 1 ? "0" + (t.getMonth() + 1) : (t.getMonth() + 1);
        var y = t.getFullYear().toString().length == 1 ? "0" + t.getFullYear() : t.getFullYear();
        var tt = d + "/" + m + "/" + y;
        return tt;
    } catch (e) {
        console.log(e);
    }

}

function f_get() {
    try {
        var config = { namesql: "PKG_CANHBAOVANHANH.LOGVANHANH", callback: "f_result_f_get", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_tungay: getLastWeek(),
            v_denngay: gettimenow(),
        };
        //console.log(para);
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}

function f_result_f_get(config, para, lst) {
    try {
        var data = lst.data;
        $('#count_warning').html(data.length)
        $('#log_canhbao_vanhanh').html('');
        $.each(data, function (key, val) {
            var row = "";
            if (val.loi=="0") {
                row = '<span class="text-green2"><i class="fa fa-exclamation-triangle text-green2"></i>'
                    //+ setnull(val.ten) + ' : '
                    + setnull(val.noidung)
                    + '</span><span class="text-primary"> ('
                    + setnull(val.thoidiem) + ')</span><br/>';
                $('#log_canhbao_vanhanh').append(row);
            }
            else {
                row = '<span class="text-danger"><i class="fa fa-exclamation-triangle text-orange"></i>'
                    //+ setnull(val.ten) + ' : '
                    + setnull(val.noidung)
                    + '</span><span class="text-primary"> ('
                    + setnull(val.thoidiem) + ')</span><br/>';
                $('#log_canhbao_vanhanh').append(row);
            }

        });
    }
    catch (e) {
        console.log(e.message)
    }

}