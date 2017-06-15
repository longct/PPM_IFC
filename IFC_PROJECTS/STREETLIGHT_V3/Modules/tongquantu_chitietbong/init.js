var idbongda;
$(document).ready(function () {

    try {
        loadchecklog_master();
        //$("table#league_tbl").css("font-size", w / 28);

        $(".chitiettu_home_1tu").click(function () {

            setTimeout(function () {
                var id = JSON.parse(localStorage.getItem("chitiettu")).id;
                f_loadChiTietBong_tqtctb(id, '');
            }, 500);

        });
        $("#btn_refresh").click(function () {
            f_loadChiTietBong_tqtctb(JSON.parse(localStorage.getItem("chitiettu")).id, '');
        })
        $(".tucthoi_tqtctb").click(function () {
            try {
                //var checkall = $(".checkAllBong_tqtctb").is(':checked');
                //if (checkall) {
                //    var lstId = [];
                //    var id = JSON.parse(localStorage.getItem("chitiettu")).id;
                //    var ID = { id: id, ten: "THIẾT LẬP DIM TOÀN BỘ BÓNG THUỘC TỦ" };
                //    lstId.push(ID);
                //    f_loadInfoOne_Dkdtt(lstId);
                //    var infoo = {
                //        loaidk: "DIM",
                //        loaithietbi: "TATCABONG",
                //        loaichedo: "TUCTHOI"
                //    };

                //    localStorage.setItem("infodk", JSON.stringify(infoo));
                //}
                //else {
                var lstId = [];
                $(".check1Bong_tqtctb").each(function () {

                    if ($(this).is(':checked')) {
                        if (($($(this).parents("tr")).css("display") != "none")) {
                            var ID = { id: $(this).attr("value"), ten: "THIẾT LẬP TỨC THỜI BÓNG" };
                            lstId.push(ID);
                        }
                    }
                });
                f_loadInfoOne_Dkdtt(lstId);
                var infoo = {
                    loaidk: "DIM",
                    loaithietbi: "BONG",
                    loaichedo: "TUCTHOI"
                };
                localStorage.setItem("infodk", JSON.stringify(infoo));
                //  }
            } catch (e) { console.log(e); }
        });

        $(".chedo_tqtctb").click(function () {
            try {
                //var checkall = $(".checkAllBong_tqtctb").is(':checked');
                //if (checkall) {
                //    var lstId = [];
                //    var id = JSON.parse(localStorage.getItem("chitiettu")).id;
                //    var ID = { id: id, ten: "THIẾT LẬP DIM TOÀN BỘ BÓNG THUỘC TỦ" };
                //    lstId.push(ID);
                //    f_loadInfoOne_Dktdtd(lstId);
                //    var infoo = {
                //        loaidk: "DIM",
                //        loaithietbi: "TATCABONG",
                //        loaichedo: "TUDONG"
                //    };

                //    localStorage.setItem("infodk", JSON.stringify(infoo));
                //}
                //else {
                var lstId = [];
                $(".check1Bong_tqtctb").each(function () {
                    if ($(this).is(':checked')) {
                        if (($($(this).parents("tr")).css("display") != "none")) {
                            var ID = { id: $(this).attr("value"), ten: "THIẾT LẬP CHẾ ĐỘ BÓNG" };
                            lstId.push(ID);
                        }
                    }
                });
                f_loadInfoOne_Dktdtd(lstId);
                var infoo = {
                    loaidk: "DIM",
                    loaithietbi: "BONG",
                    loaichedo: "TUDONG"
                }

                localStorage.setItem("infodk", JSON.stringify(infoo));
                //   }
            } catch (e) { console.log(e); }
        });


        $(".xoabong_tqtctb").click(function () {
            var lstIda = [];
            $(".check1Bong_tqtctb").each(function () {
                if ($(this).is(':checked')) {
                    var ID = { id: $(this).attr("value"), ten: "THIẾT LẬP CHẾ ĐỘ BÓNG" };
                    lstIda.push(ID);
                }
            });

            f_confimYesNo("Bạn chắc chắn muốn xóa bóng ?", "Bỏ qua", "Xác nhận", function () {
                xoa_ttbong_suatbongc(lstIda);
            });
        });
        $("#huychon_tqtctb").click(function () {
            $("input:checkbox").prop('checked', false);
            countcheck_tqtctb();
        });
        $(".checkAllBong_tqtctb").click(function () {
            var checkall = $(this).is(':checked');
            $(".check1Bong_tqtctb").each(function () {
                $(this).prop('checked', checkall);
            });
            countcheck_tqtctb();
        });


        //khi thay doi trang thai bóng
        //$("#trangthaibong_tqb").change(function () {
        //    loadthongtintrangthaibongserach();
        //});
        $("#locpha_tqtctb").change(function () {
            var p = getAllIdMod();
            if (p.locpha_tqtctb == "-1") {
                $(".phaN1").show();
                $(".phaN2").show();
                $(".phaN3").show();
            }

            if (p.locpha_tqtctb == "N1") {
                $(".phaN1").show();
                $(".phaN2").hide();
                $(".phaN3").hide();
            }

            if (p.locpha_tqtctb == "N2") {
                $(".phaN1").hide();
                $(".phaN2").show();
                $(".phaN3").hide();
            }

            if (p.locpha_tqtctb == "N3") {
                $(".phaN1").hide();
                $(".phaN2").hide();
                $(".phaN3").show();
            }
        });

        $(".truyvanbong_tqtctb").click(function () {
            try {
                var infoo = {
                    loaidk: "DIM",
                    loaithietbi: "TRUYVANBONG",
                    loaichedo: "TUDONG",
                    thoidiemchuyvan: getfulltimenow01()
                };

                localStorage.setItem("infodk", JSON.stringify(infoo));
                var id = JSON.parse(localStorage.getItem("chitiettu")).id;
                f_GuiLenhTruyVanBong(id);
            } catch (e) { console.log(e); }
        });
    }
    catch (e) { console.log(e); }
});

function f_GuiLenhTruyVanBong(idTu) {
    try {
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_DIEUKHIEN.GUILENHKHACDENDCU",
            callback: "f_result_GuiLenhTruyVanBong"
        }
        var para = {
            V_METERID: idTu,
            V_THOIDIEMBATDAU: "-1",
            V_THOIDIEMKETTHUC: "-1",
            V_LENH: "-1",
            V_LOAIDIEUKHIEN: "DIM",
            V_LOAITHIETBI: "TRUYVANBONG",
            V_CHEDO: "TUDONG",
            V_THUTU: "0",
            V_USERID: userinfo.idnhanvien,
            V_MATHIETLAP: "TRUYVANBONG_" + f_random16SoImei(),
            V_TRANGTHAI: "UNKNOW",
        };
        ExecuteServiceSyns(config, para);

    } catch (e) { console.log(e); }

}

function f_result_GuiLenhTruyVanBong(config, para, lst) {
    try {
        //$('#GuiLenhDenDcu').modal('show');
        f_CheckKetQuaDtt_gldd();

    } catch (e) { console.log(e); }
}

function f_loadChiTietBong_tqtctb(id, tenbong) {
    var id = JSON.parse(localStorage.getItem("chitiettu")).id;
    f_layThongTinBong(id, tenbong);
    //setInterval(function () {
    //     id = JSON.parse(localStorage.getItem("chitiettu")).id;
    //    f_layThongTinBong(id, tenbong);
    //},2000);
}

function f_layThongTinBong(id, tenbong) {
    try {

        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_THONGTINBONG.DANHSACHBONG",
            callback: "f_result_loadChiTietBong_tqtctb"
        }
        var para = {
            V_IDTU: id,
            V_TENBONG: tenbong
        };
        ExecuteServiceSyns(config, para);

    } catch (e) { console.log(e); }
}
function f_result_loadChiTietBong_tqtctb(config, para, lst) {
    try {

        $("#table_chitietbong_tqtctb").empty();
        var lsttenbong = [];
        if (lst == null && lst == undefined && lst == "" && lst == "[]" && lst.data.length == 0)
            return;

        $.each(lst.data, function (key, val) {

            var str = f_htmlRow_tqtctb(val)
            $("#table_chitietbong_tqtctb").append(str);

            $("#xembong_tsvbong" + val.idrfbong).click(function () {

                idbongda = val.idrfbong;
                setTimeout(function () { load_tsvhbong(1); }, 1000);
            });

            lsttenbong.push(val.tenbong);
        });

        $('.check1Bong_tqtctb').click(function () {
            countcheck_tqtctb();
        });

        $("#table_chitietbong_tqtctb tr").dblclick(function () {
            $('#sua_thongtinbong').modal('show');
            var id = $(this).attr("value");
            loadthongtinidbong_suabong(id);
        });
        $("#search_txt_tu_tqb").keyup(function (event) {
            if (event.keyCode == 13) {
                loadSearch();
            }
        });
        //$("#search_txt_tu_tqb").autocomplete({
        //    minLength: 1,
        //    delay: 200,
        //    source: function (request, response) {
        //        var friendsArray = [];
        //        response(lsttenbong);
        //        return;
        //    },

        //    select: function (e, ui) {
        //        $("#search_txt_tu_tqb").val(ui.item.value);
        //        loadSearch();
        //        //f_loadChiTietBong_tqtctb(JSON.parse(localStorage.getItem("chitiettu")).id, ui.item.value);
        //    },
        //    change: function (e, ui) {
        //        $("#search_txt_tu_tqb").val(ui.item.value);
        //        loadSearch();
        //        //f_loadChiTietBong_tqtctb(JSON.parse(localStorage.getItem("chitiettu")).id, '');
        //    }
        //});

    } catch (e) { console.log(e); }
}

function loadSearch() {
    f_loadChiTietBong_tqtctb(JSON.parse(localStorage.getItem("chitiettu")).id, $("#search_txt_tu_tqb").val());
}

function f_htmlRow_tqtctb(val) {
    try {

        // check xem vua roi co nhan nut chuy van hay khong . neu chuy van thi hien dien ap
        var infodk = JSON.parse(localStorage.getItem("infodk"));
        var chuyvanbong = false;
        if (infodk != null && infodk != undefined && infodk.thoidiemchuyvan != null && infodk.thoidiemchuyvan != undefined) {
            var comparTime = compareDates01(formartDateTime(infodk.thoidiemchuyvan), formartDateTime(getfulltimenow01()));
            // sau may phut khong doc duoc thi gui lai nhung con loi
            if (comparTime.minutes < 2) {
                chuyvanbong = true;
            }
        }

        var str = '<tr value ="' + val.idbong + '" class="pha' + val.thuocpha + '" >' +
                '<td><input type="checkbox" class="check1Bong_tqtctb"  value ="' + val.idbong + '" /></td>' +
                '<td>' + setnull(val.tenbong) + '</td>' +
                '<td class="c">' + (setnull(val.chedo) + setnull(val.thoigiandim)) + '</td>' +
                '<td class="c">' + setnull(val.mucdim) + '</td>' +
                '<td class="c">' + setnull(val.mucdimtaithoidiem) + '</td>' +
                //'<td class="c">' + (chuyvanbong == false ? "-" : setnull(val.dienap)) + '</td>' +
                //'<td class="c">' + (chuyvanbong == false ? "-" : setnull(val.dong)) + '</td>' +
                //'<td class="c">' + (chuyvanbong == false ? "-" : setnull(val.congsuat)) + '</td>' +
                '<td class="c">' + setnull(val.thuocphaa) + '</td>' +
                '<td class="c"><img src="img/' + setnull(val.trangthaibong) + '.png" title="' + val.hienthitrangthai + '"></img></td>' +
                  //'<td><a class="btn btn-success btn-action"  data-toggle="modal" href="#baocao_tsvhbong"  id="xembong_tsvbong' + val.idrfbong + '" >Xem</a> </td>' +
            '</tr>';



        return str;
    } catch (e) { console.log(e); }
}


function countcheck_tqtctb() {
    try {
        var count = 0;
        $(".check1Bong_tqtctb").each(function () {
            if ($(this).is(':checked')) {
                count++;
            }
        });
        $(".soluong").text(count);
        if (count > 0) {
            $("#act_chitietbong").slideDown();
            var row = $("#table_chitietbong_tqtctb tr").length;
            if (count >= row)
                $(".checkAllBong_tqtctb").prop('checked', true);
        } else {
            $("#act_chitietbong").hide();
            $(".checkAllBong_tqtctb").prop('checked', false);
        }
    } catch (e) { console.log(e); }
}
function xoa_ttbong_suatbongc(val) {
    try {
        var userinfo = JSON.parse(localStorage.getItem('userinfo'));
        var config = { namesql: "PKG_QUANLYBONG.XOATHONGTINBONG", callback: "f_result_xoa_ttbong_suatbongc", connstr: "ConnectOracleStreetLight" };

        for (var i = 0; i < val.length; i++) {
            var para = {
                v_userid: userinfo.idnhanvien,
                v_idbong: val[i].id
            };
            ExecuteServiceSyns(config, para, false);
        }
    } catch (e) {
        console.log(e);
    }
}
function f_result_xoa_ttbong_suatbongc(para, config, lst) {
    try {
        var data = lst.data;
        var row = data[0].count;
        if (row.indexOf("thành công") > 0) {
            setTimeout(function () {
                f_loadChiTietBong_tqtctb(JSON.parse(localStorage.getItem("chitiettu")).id, $("#search_txt_tu_tqb").val());
                $('#act_chitietbong').hide();

            }, 1000);
        }

    } catch (e) {
        console.log(e);
    }
}


function loadthongtintrangthaibongserach() {
    try {
        var id = JSON.parse(localStorage.getItem("chitiettu")).id;
        var p = getAllIdMod();
        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_THONGTINBONG.DANHSACHBONGSERACH",
            callback: "f_result_loadChiTietBong_tqtctb"
        };
        var trangthai = '-1';
        if (trangthai == 'BÓNG CHƯA XÁC ĐỊNH') {
            trangthai = '';
        } else {
            trangthai;
        }
        var para = {
            V_IDTU: id,
            V_TENBONG: p.search_txt_tu_tqb,
            V_TRANGTHAI: trangthai,
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}


