
var timer_tqtctb_next = null;
var timer_tqtctb_countOld = 0;
var infodoctranthaibong_tqtctb = null;
var doccongsuat_tqtctb = false;
$(document).ready(function () {
    try {
        $('.timer_tqtctb').timer('remove');
    }
    catch (e) { }
    try {
        doccongsuat_tqtctb = false;
        loadchecklog_master();
        //$("table#league_tbl").css("font-size", w / 28);
        var id = JSON.parse(localStorage.getItem("chitiettu")).id;
        f_loadChiTietBong_tqtctb(id,'');

    
        $(".tucthoi_tqtctb").click(function () {
            try {
                $('.timer_tqtctb').timer('remove');
            }
            catch (e) { }
            try
            {
                var checkall = $(".checkAllBong_tqtctb").is(':checked');
                if (checkall) {
                    var lstId = [];
                    var id = JSON.parse(localStorage.getItem("chitiettu")).id;
                    var ID = { id: id, ten: "THIẾT LẬP DIM TOÀN BỘ BÓNG THUỘC TỦ" };
                    lstId.push(ID);
                    f_loadInfoOne_Dkdtt(lstId);
                    var infoo = {
                        loaidk: "DIM",
                        loaithietbi: "TU",
                        loaichedo: "TUCTHOI"
                    };

                    localStorage.setItem("infodk", JSON.stringify(infoo));
                }
                else {
                    var lstId = [];
                    $(".check1Bong_tqtctb").each(function () {
                        if ($(this).is(':checked')) {
                            var ID = { id: $(this).attr("value"), ten: "THIẾT LẬP TỨC THỜI BÓNG" };
                            lstId.push(ID);
                        }
                    });
                    f_loadInfoOne_Dkdtt(lstId);
                    var infoo = {
                        loaidk: "DIM",
                        loaithietbi: "BONG",
                        loaichedo: "TUCTHOI"
                    };
                    localStorage.setItem("infodk", JSON.stringify(infoo));
                }
            } catch (e) { console.log(e);}
        });

        $(".chedo_tqtctb").click(function () {
            try {
                $('.timer_tqtctb').timer('remove');
            }
            catch (e) { }
            try
            {
                var checkall = $(".checkAllBong_tqtctb").is(':checked');
                if (checkall) {
                    var lstId = [];
                    var id = JSON.parse(localStorage.getItem("chitiettu")).id;
                    var ID = { id: id, ten: "THIẾT LẬP DIM TOÀN BỘ BÓNG THUỘC TỦ" };
                    lstId.push(ID);
                    f_loadInfoOne_Dktdtd(lstId);
                    var infoo = {
                        loaidk: "DIM",
                        loaithietbi: "TU",
                        loaichedo: "TUDONG"
                    };

                    localStorage.setItem("infodk", JSON.stringify(infoo));
                }
                else {
                    var lstId = [];
                    $(".check1Bong_tqtctb").each(function () {
                        if ($(this).is(':checked')) {
                            var ID = { id: $(this).attr("value"), ten: "THIẾT LẬP CHẾ ĐỘ BÓNG" };
                            lstId.push(ID);
                        }
                    });
                    f_loadInfoOne_Dktdtd(lstId);
                    var infoo = {
                        loaidk: "DIM",
                        loaithietbi: "BONG",
                        loaichedo: "TUDONG"
                    }

                    localStorage.setItem("infodk", JSON.stringify(infoo));
                }
            } catch (e) { console.log(e);}
        });

   
        $(".xoabong_tqtctb").click(function () {
            try {
                $('.timer_tqtctb').timer('remove');
            }
            catch (e) { }
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
            try {
                $('.timer_tqtctb').timer('remove');
            }
            catch (e) { }
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
   
        $("#btn_doccongsuat_tqtctb").click(function () {
            doccongsuat_tqtctb = true;
            var id = JSON.parse(localStorage.getItem("chitiettu")).id;
            f_loadChiTietBong_tqtctb(id, '');
        });
        //khi thay doi trang thai bóng
        $("#trangthaibong_tqb").change(function () {
            loadthongtintrangthaibongserach();
        });
    }
    catch (e) { console.log(e);}
});

function f_loadChiTietBong_tqtctb(id,tenbong)
{
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
function f_result_loadChiTietBong_tqtctb(config, para, lst)
{
    try
    {
        $("#table_chitietbong_tqtctb").empty();
        var lsttenbong = [];
        if (lst == null && lst == undefined && lst == "" && lst == "[]" && lst.data.length == 0)
            return;
        $.each(lst.data, function (key, val) {

            var str = f_htmlRow_tqtctb(val.idbong, val.tenbong, val.mucdim, val.trangthai, val.chedo, val.thoigiandim, val.hienthitrangthai)
            $("#table_chitietbong_tqtctb").append(str);
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
        $("#search_txt_tu_tqb").autocomplete({
            minLength: 1,
            delay: 200,
            source: function (request, response) {
                var friendsArray = [];
                response(lsttenbong);
                return;
            },

            select: function (e, ui) {
                $("#search_txt_tu_tqb").val(ui.item.value);
                loadSearch();
                //f_loadChiTietBong_tqtctb(JSON.parse(localStorage.getItem("chitiettu")).id, ui.item.value);
            },
            change: function (e, ui) {
                $("#search_txt_tu_tqb").val(ui.item.value);
                loadSearch();
                //f_loadChiTietBong_tqtctb(JSON.parse(localStorage.getItem("chitiettu")).id, '');
            }
        });
        
        if (doccongsuat_tqtctb)
        {
          
            f_init_doccongsuatbonghientai_tqtctb();
        }

    } catch (e) { console.log(e);}
}

function loadSearch() {
    f_loadChiTietBong_tqtctb(JSON.parse(localStorage.getItem("chitiettu")).id, $("#search_txt_tu_tqb").val());
}

function f_htmlRow_tqtctb(idbong, tenbong, mucdim, trangthai, chedo, thoigiandim, hienthitrangthai)
{
    try {
     
        var str = '<tr value ="'+idbong+'" class="'+trangthai+'">' +
                '<td><input type="checkbox" class="check1Bong_tqtctb"  value ="' + idbong + '" /></td>' +
                '<td>' + setnull(tenbong) + '</td>' +
                '<td>' + (setnull(chedo) + setnull(thoigiandim)) + '</td>' +
                '<td>' + setnull(mucdim) + '</td>' +
                '<td id="thaymuccongsuat_tqtctb' + idbong + '" class="thaythewaid">-</td>' +
                 '<td id="thaytrangthai_tqtctb' + idbong + '"><img src="img/trangthai' + setnull(trangthai) + '.png" title="' + hienthitrangthai + '"></img></td>' +
            '</tr>';
    
        return str;
    } catch (e) { console.log(e);}
}

function f_rewait_tqtctb()
{
    try{
        $(".thaythewaid").each(function () {
            $(this).removeClass("readwait");
            $(this).addClass("readwait");
        });
    } catch (e) { console.log(e);}
}

function countcheck_tqtctb() {
    try{
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
            if(count>= row)
                $(".checkAllBong_tqtctb").prop('checked', true);
        } else {
            $("#act_chitietbong").hide();
            $(".checkAllBong_tqtctb").prop('checked', false);
        }
    } catch (e) { console.log(e);}
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

function f_init_doccongsuatbonghientai_tqtctb()
{
    try {
        $('.timer_tqtctb').timer('remove');
        //     var id = JSON.parse(localStorage.getItem("chitiettu")).id;
        //  f_loadChiTietBong_tqtctb(id, '');
    }
    catch (e) { }
    var lstId = [];
    var id = JSON.parse(localStorage.getItem("chitiettu")).id;

    try {
        var info = {
            V_ID: id,
            V_LOAITHIETBI: "TU",
            V_FULLTIME: getfulltimenow01()
        }
        infodoctranthaibong_tqtctb = info;
        timer_tqtctb_countOld = 0;
        f_rewait_tqtctb();
        f_startTimerDtt_tqtctb();

        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_DCU.FORMARTLENH_DOCTRANGTHAIBONG"
        }
        var para = {
            V_ID: id,
            V_LOAITHIETBI: "TU"
        };

        ExecuteServiceSyns(config, para);

    } catch (e) { console.log(e); }
}
function f_startTimerDtt_tqtctb() {
    try {
        $('.timer_tqtctb').timer('remove');
    }
    catch (e) { }
   
    timer_tqtctb_next = getfulltimenow();
    try {        
        $(".load_tqtctb").css('width', '0%');
        $('.timer_tqtctb').timer({
            editable: true,
            duration: '3s',
            repeat: true,
            callback: function () {
                try {
                    f_updateResultDtt_tqtctb();
                } catch (ex) { console.log(ex); }
            },
        });
    } catch (e) { console.log(e); }

}


function f_updateResultDtt_tqtctb() {
    try {
        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_KETQUA.CHECK_DOCTRANGTHAIBONG_TUCTHOI",
            callback: "f_result_updateResultDtt_tqtctb"
        }

        if (infodoctranthaibong_tqtctb == null || infodoctranthaibong_tqtctb == undefined)
            return;
        ExecuteServiceSyns(config, infodoctranthaibong_tqtctb);
    } catch (e) { console.log(e); }
}

function f_result_updateResultDtt_tqtctb(config, para, lst) {
    try {

        $.each(lst.data, function (key, val) {
           // if (parseInt(val.muccongsuat) > 0) {
            $("#thaymuccongsuat_tqtctb" + val.idbong).html((val.muccongsuat == "0" ? "-" : val.muccongsuat));
                $("#thaymuccongsuat_tqtctb" + val.idbong).removeClass("readwait");
                $("#thaytrangthai_tqtctb" + val.idbong).html('<img src="img/trangthai' + setnull(val.trangthai) + '.png" title="' + val.hienthitrangthai + '"></img>');
           // }
        });
        checkFinish_tqtctb();
    } catch (e) { console.log(e); }
}

function checkFinish_tqtctb() {
    try {
        var error = $('.readwait').length;
        var sum = $("#table_chitietbong_tqtctb tr").length;
        var ok = sum - error;

        $(".loadtext_tqtctb").text(ok + ' / ' + sum);
        statusProsessBar_tqtctb();
        if ((ok) != timer_tqtctb_countOld) {
            timer_tqtctb_countOld = ok;
            timer_tqtctb_next = getfulltimenow();
        }

        var comparTime = compareDates(timer_tqtctb_next, getfulltimenow());
        if (comparTime.minutes >= 3) {
            f_stopTimerDtt_tqtctb();
        }

        if (ok  >= sum)
            f_stopTimerDtt_tqtctb();
    } catch (e) { console.log(e); }
}
function f_stopTimerDtt_tqtctb() {
    try {
        try {
            $(".readwait").each(function (val) {
                $(this).removeAttr("class");
               $(this).html("-");
            });
        } catch (ev) { }
        $('.timer_tqtctb').timer('pause');

    } catch (e) { console.log(e); }
}


function statusProsessBar_tqtctb() {
    try {
        var error = $('.readwait').length;
        var sum = $("#table_chitietbong_tqtctb tr").length;
        var ok = sum - error;
        var phantram = Math.round((ok * 100) / sum, 1);
        $(".load_tqtctb").css('width', phantram + '%');
        //$(".progress-bar-dtt").removeClass('noload');
        $(".load_tqtctb").addClass('load');
        $(".loadtext_tqtctb").text(ok + ' / ' + sum);


        if (phantram == 100) {
            $('.progress-bar-dtt').hide(3000);
        }
    } catch (e) { console.log(e); }
}

function loadthongtintrangthaibongserach() {
    try{
        var id = JSON.parse(localStorage.getItem("chitiettu")).id;
        var p =getAllIdMod();
        var config = {
            connstr: "ConnectOracleStreetLight",
            namesql: "PKG_THONGTINBONG.DANHSACHBONGSERACH",
            callback: "f_result_loadChiTietBong_tqtctb"
        };
        var trangthai = p.trangthaibong_tqb;
        if (trangthai == 'BÓNG CHƯA XÁC ĐỊNH') {
            trangthai = '';
        } else {
            trangthai;
        }
        var para = {
            V_IDTU:id,
            V_TENBONG:p.search_txt_tu_tqb,
            V_TRANGTHAI: trangthai,
        };
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}


