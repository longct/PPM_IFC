var an_cb = [];
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
            ismap: 0
        };

        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}

function f_result_f_get(config, para, lst) {
    try {
        var data = lst.data;
        //console.log(data);
        var md = 0;
        $('#count_warning').html(data.length)
        $('#log_canhbao_vanhanh_md').html('');
        $('#log_canhbao_vanhanh').html('');
        $.each(data, function (key, val) {
            var row = "";
            if (val.loai_cb == "CB_MATDIEN") {
                md++;
                if (val.loi == "0") {
                    row = '<span class="text-green2"><i class="fa fa-exclamation-triangle text-green2"></i>'
                        //+ setnull(val.ten) + ' : '
                        + setnull(val.noidung)
                        + '</span><br/>';
                    $('#log_canhbao_vanhanh_md').append(row);
                }
                else {
                    row = '<span class="text-danger" id="sp_' + val.id_auto + '"><i class="fa fa-exclamation-triangle text-orange"></i>'
                        //+ setnull(val.ten) + ' : '
                        + setnull(val.noidung)
                        + '</span><i class="del_cb text-danger glyphicon glyphicon-remove-circle" data-value="' + val.id_auto + '"></i><br id="br_' + val.id_auto + '"/>';
                    $('#log_canhbao_vanhanh_md').append(row);

                }
            } else {
                if (val.loi == "0") {
                    row = '<span class="text-green2"><i class="fa fa-exclamation-triangle text-green2"></i>'
                        //+ setnull(val.ten) + ' : '
                        + setnull(val.noidung)
                        + '</span><br/>';
                    $('#log_canhbao_vanhanh').append(row);
                }
                else {
                    row = '<span class="text-danger" id="sp_' + val.id_auto + '"><i class="fa fa-exclamation-triangle text-orange"></i>'
                        //+ setnull(val.ten) + ' : '
                        + setnull(val.noidung)
                        + '</span><i class="del_cb text-danger glyphicon glyphicon-remove-circle" data-value="' + val.id_auto + '"></i><br id="br_' + val.id_auto + '"/>';
                    $('#log_canhbao_vanhanh').append(row);

                }
            }
        });
        if (md == 0) $('#log_canhbao_vanhanh_md').hide();
        $('.del_cb').click(function () {
            $(this).hide();
            $('#sp_' + parseInt($(this).data("value"))).slideUp();
            $('#br_' + parseInt($(this).data("value"))).slideUp();
            an_canhbao(parseInt($(this).data("value")));
        })
    }
    catch (e) {
        console.log(e.message)
    }

}
function an_canhbao(id) {
    try {
        var config = { namesql: "PKG_CANHBAOVANHANH.TAT_CANHBAO", connstr: "ConnectOracleStreetLight" };
        var para = {
            v_id: id,
            v_user: JSON.parse(localStorage.getItem("userinfo")).manhanvien

        };

        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }

}