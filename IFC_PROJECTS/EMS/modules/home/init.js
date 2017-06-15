$(document).ready(function () {
    try {

        var bgc = $(".plkho.active").css("background-color");
        var c = $(".plkho.active").css("color");
        $(".loaitb").css("background-color", bgc);
        $(".loaitb").css("color", c);
        var vpW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        var vpH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        $("div.bhoechie-tab-menu>div.list-group>a").click(function (e) {
            e.preventDefault();
            $(this).siblings('a.active').removeClass("active");
            $(this).addClass("active");
            var index = $(this).index();
            $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
            $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
        });

        var height_details = vpH - 340 - 55 - 59 - 70;
        $("#tb_details").css("max-height", height_details);

        init_home();
       
        $(".khotong_khuvuc_home").click(function () {
            f_hienThietBi("khotong_thiebi_home", this, "KHOTONGIFC", "f_result_HienThietBi");
        });
        $(".dienluc_duan_home").click(function () {  
            f_hienThietBi("dienluc_duan_home", this, "DUAN", "f_result_DuanHienThietBi");
        });
        $(".dienluc_duankhac").click(function () {
            f_hienThietBi("dienluc_duan_khac", this, "DUANKHAC", "f_result_DuankhacHienThietBi");
        });
        

        $(".usersum_home").click(function () {
            $(".userlst_home").each(function () {
                f_hienThietBi("user_thietbi_home", this, "USER", "f_result_UserHienThietBi");
            });
        });
        $(".tongifc_home").click(function () {
            f_hienThietBi("tongifc_thietbi_home", this, "TOANBOIFC", "f_result_HienThietBi");
        });
       
     
    } catch (e) {
        console.log(e);
    }
});

//============================================================ XY LY CAC CHUC NANG==========================================================
function f_hienThietBi(classcangan, thiss, loaikho, callback) {
    try {
   
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var p = getAllIdMod();

        var config = { namesql: "TB_HOME_LOAI_TRANGTHAI_TB", callback: callback, connstr: "ConnectEMS", classcangan: classcangan, thiss: thiss };
        var para = {
            loaithietbi: p.cbLoaiThietBi_home,
            userid: userInfo.userid,
            loaikho: loaikho,
            kho: $(thiss).attr("kho"),
            khokhuvuc: $(thiss).attr("khokhuvuc")
        };
        console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}
function f_result_HienThietBi(config, para, lst) {
    try {
        console.log("hien thi thiet bi");
        console.log(lst);
        // ve tra loai thiet bi
        if (para.loaikho != "KHUVUC") {
            f_loaiThietBi_home(config.thiss, lst.data, config.classcangan, para.kho, para.loaithietbi, para.userid, para.loaikho, para.khokhuvuc);
        }
        // ve tra trang thai
        //f_veTrangThai_home(lst.data[1].kq1, "trangthaisum_vt_home")

        // NEU KHU VUC VE THEM DON VI CON

        if (para.loaikho == "KHUVUC") {
            f_loaiThietBi_home(config.thiss, lst.data[0].kq0, config.classcangan, para.kho, para.loaithietbi, para.userid, para.loaikho, para.khokhuvuc);
            $(".dienluc_nho_home").empty();
            $.each(lst.data[1].kq1, function (key, val) {
                str = ' <div class="bg-green dienluc_ col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding dienluccon_nho_home" kho="' + val.projectid + '" banmien="" khokhuvuc="' + val.code + '">' +
                '' + val.name + '</div>';
                $(".dienluc_nho_home").append(str);

            });

            $(".dienluccon_nho_home").click(function () {                
                f_hienThietBi("dienluc_thietbi_home", this, "DIENLUC", "f_result_HienThietBi");
            });

            $(".dienluc_").click(function () {
                $(".dienluc_").removeClass("active");
                $(this).addClass("active");
            });

        }
        f_hienChiTietNho();
    } catch (e) {
        console.log(e);
    }
}

function f_loaiThietBi_home(thiss,data, classcangan,  kho, loaithietbi, userid, loaikho,khokhuvuc)
{
    try
    {
        $("." + classcangan).empty();
        if (data == null || data == undefined || data.length==0)
        {
            $("." + classcangan).append(' <div class="padding-right-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">' +
                            '<div class="loaitb bg-info data-toggle="popover">' +
                                '<span class="tentb">Không có số liệu</span><br />' +
                                '<span class="soluongtb">0</span>' +
                            '</div>' +
                        '</div>');
        }
        var str = '';
       
        $.each(data, function (key, val) {
            str = ' <div class="padding-right-5 col-lg-5 col-md-5 col-sm-5 col-xs-5">' +
                            '<div class="loaitb bg-info data-toggle="popover" title="' + val.typedevicename + '"'+
                                'kho="' + kho + '"' +
                                'loaithietbi="' + val.typedeviceid + '"' +
                                'userid="' + userid + '"' +
                                'loaikho="' + loaikho + '"' +
                                'khokhuvuc="' + khokhuvuc+'">' +
                                '<span class="tentb">' + val.typedevicename + '</span><br />' +
                                '<span class="soluongtb">' + val.soluong + '</span>' +
                            '</div>' +
                        '</div>';
            $("." + classcangan).append(str);
        });

        // thay doi mau sac
        $(".plkho").removeClass("active");
        $(thiss).addClass("active");
        var bgc = $(".plkho.active").css("background-color");
        var c = $(".plkho.active").css("color");
        $(".loaitb").css("background-color", bgc);
        $(".loaitb").css("color", c);
       
    } catch (e) { console.log(e);}
}

function f_veTrangThai_home(data,classcangan)
{
    try
    {

        $("." + classcangan).empty();
        $.each(data, function (key, val) {
            str = '<div class="trangthai_vt">' +
                '<div class="' + val.statusdivice + '">' +
                    '<span data-toggle="tooltip" data-placement="bottom" title="' + val.titlestatus + '">' + val.soluong + '</span>' +
                '</div>' +
            '</div>';
            $("." + classcangan).append(str);

        });
    } catch (e) { console.log(e);}
}

function f_result_UserHienThietBi(config,para,lst)
{
    try
    {
        if (lst == null || lst == undefined || lst == "" || lst == "[]" || lst.data == null || lst.data == undefined || lst.data == "" || lst.data == "[]" || lst.data.length == 0)
            return;
        var p = getAllIdMod();
        $(config.thiss).empty();
        var str = "";
        $.each(lst.data, function (key, val) {
          
            str = '<div class="dienluc_ col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding usercon_home" userid="' + val.userid + '" KHO="'+val.code+'">' +
                '' + val.usercode + '</div>';
            $(config.thiss).append(str);
        });
        $(".usercon_home").click(function () {
            var p = getAllIdMod();
            var config = { namesql: "TB_HOME_LOAI_TRANGTHAI_TB", callback: "f_result_userLoaiThietBi", connstr: "ConnectEMS", thiss: this };
            var para = {
                kho: $(this).attr("kho"),
                loaithietbi: p.cbLoaiThietBi_home,
                userid: $(this).attr("userid"),
                loaikho: "USERTHIETBI",
                khokhuvuc:""
            };
            console.log(para);
            ExecuteServiceSyns(config, para);
            $(".usercon_home").removeClass("active");
            $(this).addClass("active");
        });

    } catch (e) { console.log(e);}
   
}

function f_result_userLoaiThietBi(config,para,lst)
{
    try
    {
        
        f_loaiThietBi_home(config.thiss, lst.data, "user_thietbi_home", para.kho, para.loaithietbi, para.userid, para.loaikho,para.khokhuvuc);

        // ve tra trang thai
       
       // f_veTrangThai_home(lst.data[1].kq1, "trangthaisum_vt_home");
        f_hienChiTietNho();

    } catch (e) { console.log(e); }
}
//load dự án điện lực
function f_result_DuanHienThietBi(config, para, lst) {
    try {
        console.log(lst);
        if (lst == null || lst == undefined || lst == "[]") return;
        var datamb = lst.data[0].kq0;
        var datamt = lst.data[1].kq1;
        var datamn = lst.data[2].kq2;
        $(".dienluc_duanmb_home").html();
        $(".dienluc_duanmt_home").html();
        $(".dienluc_duanmn_home").html();
        $.each(datamb, function (key, val) {
            str = '<div class="bg-puple  plkho col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding padding-left-5 dienluc_khuvucdl_home" ' +
                                'title="' + val.projectname + '"' +
                                'kho="' + val.projectid + '"' +
                                'khokhuvuc="' + val.code + '">' +
                                '<img src="img/dl.png" /><br />' +
                                  val.tenviettat +
                  '</div>';
            $(".dienluc_duanmb_home").append(str);
        });
        $.each(datamt, function (key, val) {
            str = ' <div class="bg-primary  plkho col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding padding-left-5 dienluc_khuvucdl_home"' +
                                'title="' + val.projectname + '"' +
                                'kho="' + val.projectid + '"' +
                                'khokhuvuc="' + val.code + '">' +
                                '<img src="img/dl.png" /><br />' +
                                 val.tenviettat + '</span>'
                  '</div>';
                  $(".dienluc_duanmt_home").append(str);
        });
        $.each(datamn, function (key, val) {
            str = '<div class="bg-orange  plkho col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding padding-left-5 dienluc_khuvucdl_home"' +
                                 'title="' + val.projectname + '"' +
                                'kho="' + val.projectid + '"' +
                                'khokhuvuc="' + val.code + '">' +
                                '<img src="img/dl.png" /><br />' +
                                 val.tenviettat + '</span>'
                  '</div>';
                  $(".dienluc_duanmn_home").append(str);
        });
        $(".dienluc_khuvucdl_home").click(function () {
            f_hienThietBi("dienluc_thietbi_home", this, "KHUVUC", "f_result_HienThietBi");
        });
    } catch (e) {
        console.log(e);
    }
}
function f_result_DuankhacHienThietBi(config, para, lst) {
    if (lst == null || lst == undefined || lst == "[]") return;
    var datambkhac = lst.data[0].kq0;
    var datamtkhac = lst.data[1].kq1;
    var datamnkhac = lst.data[2].kq2;
    $(".dienluc_duanmb_home").html();
    $(".dienluc_duanmt_home").html();
    $(".dienluc_duanmn_home").html();
    if (datambkhac.length > 0) {
        $.each(datambkhac, function (key, val) {
            str = '<div class="bg-puple  plkho col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding padding-left-5 duankhac_khuvuc_home" ' +
                                'title="' + val.projectname + '"' +
                                'kho="' + val.projectid + '"' +
                                'khokhuvuc="' + val.code + '">' +
                                '<img src="img/dl.png" /><br />' +
                                  val.tenviettat +
                  '</div>';
            $(".dienluc_duanmb_khac").append(str);
        });
    } else {
        $(".dienluc_duanmb_khac").hide();
    }
    if (datamtkhac.length > 0) {
        $.each(datamtkhac, function (key, val) {
            str = ' <div class="bg-primary  plkho col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding padding-left-5 duankhac_khuvuc_home"' +
                                'title="' + val.projectname + '"' +
                               'kho="' + val.projectid + '"' +
                                'khokhuvuc="' + val.code + '">' +
                                '<img src="img/dl.png" /><br />' +
                                 val.tenviettat + '</span>'
            '</div>';
            $(".dienluc_duanmt_khac").append(str);
        });
     
    } else {
        $(".dienluc_duanmt_khac").hide();
    }
    if (datamnkhac.length > 0) {
        $.each(datamnkhac, function (key, val) {
            str = '<div class="bg-orange  plkho col-lg-12 col-md-12 col-sm-12 col-xs-12 no-padding padding-left-5 duankhac_khuvuc_home"' +
                                 'title="' + val.projectname + '"' +
                                'kho="' + val.projectid + '"' +
                                'khokhuvuc="' + val.code + '">' +
                                '<img src="img/dl.png" /><br />' +
                                 val.tenviettat + '</span>'
            '</div>';
            $(".dienluc_duanmn_khac").append(str);
        });
    } else {
        $(".dienluc_duanmn_khac").hide();
    }
    $(".duankhac_khuvuc_home").click(function () {
        f_hienThietBi("duankhac_thietbi_home", this, "DUANKHACCHITIET", "f_result_HienThietBi");
    });
}
function get_data_home(id) {
    try {
        //return 'Hàm lấy dữ liệu'
        var table = '<table class="table table-bordered">' +
                    '<tr>' +
                    '<td>' + id + '</td>' +
                    '<td>Số lượng</td>' +
                    '</tr>' +
                    '<button class="btn btn-success">Xuất Excel</button>';
        return table;
      
    } catch (e) {
        console.log(e);
    }
}

function init_home() {
    try {
        var userInfo = JSON.parse(localStorage.getItem("userinfo"));
        var config = { namesql: "TB_Export_LstLoadBanDau", callback: "init_result_home", connstr: "ConnectEMS" };
        var para = { Type: 'Basic', UserId: userInfo.userid };
        ExecuteServiceSyns(config, para, false);
    } catch (e) {
        console.log(e);
    }
}
function init_result_home(config, para, lst) {
    try {
        console.log(lst);
        if (lst != null && lst != undefined && lst != "" && lst != "[]" && lst.data != null && lst.data != "" && lst.data != "[]" && lst.data.length > 0)

            dataToCob("cbLoaiThietBi_home", lst.data[6].kq6, "code", "name", '-1', 'Toàn bộ hệ thống');

            f_hienThietBi("tongifc_thietbi_home", $(".tongifc_home"), "TOANBOIFC", "f_result_HienThietBi");

    } catch (e) {
        console.log(e);
    }
}

function f_hienChiTietNho() {
    try {
        
        $(".loaitb").popover({
            trigger: 'click',
            placement: function (context, source) {
                $(".popover").removeClass("in");
                var position = $(source).parent().position();
                //console.log(position);
                if (position.top < 75 && position.left > 171) {
                    return "bottom";
                }
                if (position.left > 328) {
                    return "left";
                }
                return "right";
            },
            html: 'true',
            content: '<div class="show-content"></div>',
            template: '<div class="popover"><div class="arrow"></div>' +
                      '<h3 class="popover-title"></h3><div class="closeover"><a href="#" onclick="closeover()">X</a></div><div class="popover-content">' +
                      '</div>'
        })
        .on('show.bs.popover', function () {              
            f_loadChiTietTungLoaiNho(this);
              
        });
    } catch (e) {
        console.log(e);
    }
}
function closeover() {
    $(".popover").hide();
}
function f_loadChiTietTungLoaiNho(thiss) {
    try {
        var config = { namesql: "TB_HOME_LOAITHIETBI_CHITIET", callback: "f_result_loadChiTietTungLoaiNho", connstr: "ConnectEMS", thiss: thiss };
        var para = {
            kho: $(thiss).attr("kho"),
            loaithietbi: $(thiss).attr("loaithietbi"),
            userid: $(thiss).attr("userid"),
            loaikho: $(thiss).attr("loaikho"),
            loaixuly: "TONGQUAN",
            khokhuvuc: $(thiss).attr("khokhuvuc")
        };
        console.log("chi tiet tung loai thiet bi");
        console.log(para);
        ExecuteServiceSyns(config, para);
    } catch (e) {
        console.log(e);
    }
}

function f_result_loadChiTietTungLoaiNho(config, para, lst) {
    try {
        if (lst == null || lst == undefined || lst == "" || lst == "[]" || lst.data == null || lst.data == "" || lst.data == "[]" || lst.data.length == 0)
            return;
        
        var str = "";
        $.each(lst.data, function (key, val) {
            str += '<div>' + val.tenvattu + ':<span class="soluong_popover"> '+val.soluong+'</span></div>'
        });
        str += '<div><a class="xuatexcel_tbhome">Xuất excel</a></div>';
        var $this = $(config.thiss);
        $(".show-content").html(str);
       
       
        $(".xuatexcel_tbhome").click(function () {
            f_xuatexcel_home(config,para);
        });
       
    } catch (e) {
        console.log(e);
    }
}

function f_xuatexcel_home(config,para)
{
    try {
        var config = { namesql: "TB_HOME_LOAITHIETBI_CHITIET", callback: "f_result_xuatexcel_home", connstr: "ConnectEMS" ,userid:para.userid};
        var para = {
            kho: para.kho,
            khotongmien: para.khotongmien,
            loaithietbi: para.loaithietbi,
            userid: para.userid,
            loaikho: para.loaikho,
            loaixuly: "XUATEXCEL",
            khokhuvuc:para.khokhuvuc
        };
        
        var colum = {
            kq: [{ field: "rownum", name: "Stt", type: "TextAndBoldCenter" },
               { field: "vattuthietbi", name: "Vật tư thiết bị", type: "Text" },
               { field: "tenvattu", name: "loại thiết bị", type: "Text" },
               { field: "soluong", name: "Số lượng", type: "TextCenter" },
               { field: "seriesdivice", name: "Series", type: "TextCenter" },
               { field: "kho", name: "Kho hiện tại", type: "Text" },
               { field: "nguoiquanly", name: "Người quản lý", type: "Text" },
            ]
        };
        console.log(para);
        excuteExcel(config, para, colum, true);


    } catch (e) {
        console.log(e);
    }

}