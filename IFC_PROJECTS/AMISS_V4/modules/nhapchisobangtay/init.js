
var NCSBT = {
    f_lay_du_lieu : function (page) {
        try {
            var dat = $("#date_ngay").val();
            var meterid = JSON.parse(localStorage.getItem("tree_node"))[0].meterid;
            var type = parseInt(JSON.parse(localStorage.getItem("tree_node"))[0].type);
            var config = {
                connstr: "ConnectOracle233",
                namesql: "AMISS_BAOCAO_NPC.TSVH_LISTKHANGHANG_MODIFY",
                callback: "NCSBT.f_lay_du_lieu_callback"
            };
            var para = {
                v_Value: meterid,
                v_Date: dat,
                v_pagenum: page,
                v_numrecs: 5
            };

            console.log(para);
            ExecuteServiceSyns(config, para);
            callLoad();
            //  

        } catch (e) {
            console.log(e);
        }
    },
    f_lay_du_lieu_callback : function (config, para, lst) {
        try {
            var data = lst.data;
            console.log(data);
            $("#tbl_ncsbt tbody").empty();
            if (!data || data.length == 0) {
                $(".sobanghi").html("<span tkey='khongcodulieu'></span>");
                stopLoad();
                return;
            }
        
            var tsbanghi = data[0].rowscount;
            $.each(data, function (i, val) {
                var tr = "";
                tr += '<tr class="tendiemdo"><td colspan="6">' + val.madiemdo + ' - ' + val.tendiemdo + '</td>'
                        + '<td><button class="btn btn-default btn-sm"><span class="glyphicon glyphicon-remove"></span>Xóa</button></td></tr>'
                        + '<tr data-madiemdo="' + val.madiemdo + '" class="tr-chiso"><td class="text-center">' + val.stt + '</td>' +
                        '<td class="text-center">' + $("#date_ngay").val() + ' ' + $("#cb_thoidiem").val() + '</td>' +
                        '<td>' + '<input type="text" class="form-control pha' + val.istype + '" name="pgiao1" />' + '</td>' +
                        '<td>' + '<input type="text" class="form-control pha' + val.istype + '" name="pgiao2" />' + '</td>' +
                        '<td>' + '<input type="text" class="form-control pha' + val.istype + '" name="pgiao3" />' + '</td>' +
                        '<td>' + '<input type="text" class="form-control pha' + val.istype + '" name="pgiaotong" />' + '</td>' +
                        '<td>' + '<input type="text" class="form-control pha' + val.istype + '" name="qgiaotong" />' + '</td>' +
                    '</tr>';
                $("#tbl_ncsbt tbody").append(tr);
            });

            $(".sobanghi").html("<span tkey='hienthi'></span>Số bản ghi: " + data.length + "/" + tsbanghi + "<span tkey='banghi'></span>");
            stopLoad();
            //LoadPhanTrang_("pageLst_ncsbt", "pageCurent_ncsbt", data, function () {
            //    NCSBT.f_lay_du_lieu($("#pagenumber").val() - 1);
            //});

            // validate number
            $("td input[type=text]").keydown(function (e) {
                // Allow: backspace, delete, tab, escape, enter, ctrl+A and .
                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                    // Allow: Ctrl+A
                    (e.keyCode == 65 && e.ctrlKey === true) ||
                    // Allow: home, end, left, right
                    (e.keyCode >= 35 && e.keyCode <= 39)) {
                    // let it happen, don't do anything
                    return;
                }
                var charValue = String.fromCharCode(e.keyCode)
                    , valid = /^[0-9]+$/.test(charValue);
                if (!valid) {
                    e.preventDefault();
                }
            });

            $("td button").click(function () {
                var confm = confirm("Bạn có chắc muốn xóa bỏ khách hàng này?");
                if (confm === true) {
                    $(this).closest('tr').next().remove();
                    $(this).closest('tr').remove();
                }
            });
        
        } catch (e) {
            console.log(e);
            stopLoad();
        }
    },
    f_thuc_hien: function () {
        try {
            callLoad();
            var dat = $("#date_ngay").val();
            var time = $("#cb_thoidiem").val();
            var userObj = JSON.parse(localStorage['userinfo']);
            $("tr.tr-chiso").each(function (key, val) {
                var config = {
                    connstr: "ConnectOracle233",
                    namesql: "AMISS_BAOCAO_NPC.TSVH_LISTKHANGHANG_MODIFY",
                    callback: "NCSBT.f_lay_du_lieu_callback"
                };
                var para = {
                    v_userId: userObj.userid,
                    v_Date: dat,
                    v_time: time,
                    v_pgiao1: $(this).find("input[name=pgiao1]").val(),
                    v_pgiao2: $(this).find("input[name=pgiao2]").val(),
                    v_pgiao3: $(this).find("input[name=pgiao3]").val(),
                    v_pgiaotong: $(this).find("input[name=pgiaotong]").val(),
                    v_qgiaotong: $(this).find("input[name=qgiaotong]").val(),
                    v_madiemdo: $(this).data('madiemdo')
                };

                console.log(para);
                ExecuteServiceSyns(config, para);
            });
        } catch (e) {
            console.log(e);
        }
    }
};


$(document).ready(function () {
    try {
        showhideTree();
        initformelement();
        loadContent();
        selectlang();
        if (localStorage.getItem("tree_node")) {
            var istype = JSON.parse(localStorage.getItem("tree_node"))[0].type;
            var socongto = JSON.parse(localStorage.getItem("tree_node"))[0].socongto;
            var tendiemdo = JSON.parse(localStorage.getItem("tree_node"))[0].tendiemdo;
            if (socongto != "0")
                $("#tendiemdo_span").html(tendiemdo + "(<span tkey='socongto'></span>: " + socongto + "- <span tkey='loaidiemdo'></span>: " + replacePha(istype) + ")");
            else if (istype == "4")
                $("#tendiemdo_span").html("<span tkey='soghi'></span>: " + tendiemdo);
            else if (socongto == "0" && istype != "4")
                $("#tendiemdo_span").html("<span tkey='donvi'></span>: " + tendiemdo);
            else if (istype >= "6")
                $("#tendiemdo_span").html("Trạm: " + tendiemdo);
            if (istype == "3" || istype == "31")
                $("#csc_thang").parent().hide();
            else
                $("#csc_thang").html("Chỉ số chốt ngày");

        }
        else {
            $("#tendiemdo_span").html("Vui lòng chọn điểm đo để xem dữ liệu");
            $("#tab_content").empty();
        }

        $('#cb_thoidiem').val('08:00');
        $("#date_ngay").val(gettimenow());

        //
        $("#cb_thoidiem").change(function () {
            NCSBT.f_lay_du_lieu(1);
        });

        //
        $("#btn_thuchien").click(function () {

        });

        //
        NCSBT.f_lay_du_lieu(1);

    } catch (e) {
        console.log(e.message);
    }
});


