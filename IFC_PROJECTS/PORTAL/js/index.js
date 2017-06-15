var G_connect = "ConnectOracle233";
var G_LOG = "PKG_DANGNHAP.DANGNHAP";
var G_LISTUSER = "AMISS_DATLAIMATKHAU.DANHSACHTAIKHOAN";
var G_MOTAIKHOAN = "AMISS_DATLAIMATKHAU.MOTAIKHOAN"
var G_THAYTAIKHOAN = "AMISS_DATLAIMATKHAU.THAYMATKHAU";
var meter_ = [];
var data_tree = [];

$(document).ready(function () {
    showhideTree();
    try {
        selectlang();
       
        if (localStorage.getItem("userinfo")) {
            var u = JSON.parse(localStorage.getItem("userinfo"));
            $(".tennhanvien").html(u.usercode);
        } else {
            //window.location.href = "login.html";
            return;
        }
        getMenuUser();
        $(".content").scroll(function () {
            if ($(this).scrollTop() > 300) {
                $(".movetotop").fadeIn();
            } else if ($(this).scrollTop() <= 300) {
                $(".movetotop").fadeOut();
            }
        });
        //loadchecklog_master();
        $("body").fadeTo("slow", 1, function () {
            // Animation complete.
        });
        $(".main-content").fadeTo("slow", 1, function () {
            // Animation complete.
        });

        $("#btn_taikhoan").click(function () {
            Thongtintaikhoan();
        });

        $("#btn_dangxuat").click(function () {
            localStorage.clear();
            loadchecklog_master();
        });
        if (localStorage.getItem("breadcumb") != "") {
            var per = localStorage.getItem("per");
            ////console.log(per);
            menuClick(localStorage.getItem("breadcumb"), per);
        }
        $(".movetotop").click(function () {
            $(".content").animate({ scrollTop: 0 }, "slow");
        })
        loadContent();
        initformelement();

        //$(".control-sidebar-bg").mouseout(function () {
        //    $('.sidebar-toggle').click();
        //});
        $(".content ").click(function () {
            if ($("#menu_slidebar").hasClass("control-sidebar-open")) {
                $('.sidebar-toggle').click();
            }

        });

        

    } catch (e) {
        console.log(e);
    }
});
function callLoad() {
    //$("#loading_over").show();
    $(".huyload").click(function () {
        stopLoad();
    })
}
function stopLoad() {
    $("#loading_over").fadeOut();
}
function selectlang() {
    var langCode = localStorage.getItem("lang");
    var langJS = null;
    var translate = function (jsdata) {
        $("[tkey]").each(function (index) {
            var strTr = jsdata[$(this).attr('tkey')];
            $(this).html(strTr);
        });
    }

    $.getJSON('lang/' + langCode + '.json', translate);

}

function loadchecklog_master() {
    try {
        var userinfo = localStorage.getItem('userinfo');
        if (userinfo == null || userinfo == [] || userinfo == undefined) {
            $(location).attr('href', 'login.html');
            return;
        }
        var user = JSON.parse(localStorage.getItem("userinfo"));
        if (user.manhanvien == null || user.manhanvien == [] || user.manhanvien == undefined) {
            $(location).attr('href', 'login.html');
            return;
        }
    } catch (e) {
        console.log(e);
    }
}


function menuClick(tag_, per_) {
    ////console.log(per_);
    ////console.log(tag_);
    getPer(tag_);
    localStorage.setItem("per", per_);
    var linkHTML = "modules/" + tag_;
    var br = localStorage.getItem("breadcumb");
    var mod = JSON.parse(localStorage.getItem("mod"));
    var item = { tag: tag_, per: per_ };
    if (mod.length == 0) { mod.push(item); }
    if (br != tag_) {
        localStorage.setItem("tab", "");
    }
    br = tag_;
    //$.each(mod, function (key, val) {
    //    //console.log(val);
    //    if (tag_ != val.tag) {
    //        mod.push(item);
    //    } else {
    //        var index = mod.indexOf(item);
    //        if (index >= 0) {
    //            mod.splice(index, 1);
    //        }
    //        mod.push(item);
    //    }
    //})
    var index = $.map(mod, function (obj, index) {
        if (obj.tag == tag_) {
            return index;
        }
    })
    if (index == -1) {
        mod.push(item);
    } else {

        ////console.log(index.length);
        if (index.length > 0) {
            $.each(index, function (key, val) {
                mod.splice(val, 1);
            })
        }
        mod.push(item);
    }
    if (mod.length == 10) {
        mod.shift();
    }
    createTagHome(mod);
    localStorage.setItem("mod", JSON.stringify(mod));
    localStorage.setItem("breadcumb", br);
    loadModulesToMaster(linkHTML + "/index.html", linkHTML + "/init.css", linkHTML + "/init.js", ".content", true);
    //if ($('.control-sidebar').hasClass("control-sidebar-open")) {
    //    $('.control-sidebar').removeClass("control-sidebar-open");
    //    $('.control-sidebar-bg').css("height",0);
    //} else {
    //    $('.control-sidebar-bg').css("height", "auto");
    //}
}
function createTagHome(mod) {
    $("#curentPage").empty();
    var br = localStorage.getItem("breadcumb");
    var per = localStorage.getItem("per");
    var tag = "";
    $.each(mod, function (key, val) {
        if (key < mod.length) {
            if (key == mod.length - 1) {
                tag += '<a href = "#" class = "active" onClick="menuClick(\'' + val.tag + '\',\'' + val.per + '\')"><span tkey="' + val.tag + '"></span></a>';
            } else {
                tag += '<a href = "#" onClick="menuClick(\'' + val.tag + '\',\'' + val.per + '\')"><span tkey="' + val.tag + '"></span></a>';
            }

        }
    })

    $("#curentPage").append(tag);
}
function replaceTag(tag) {
    switch (tag) {
        case "tsvh_tab":
            return "TSVH";
            break;
        case "thongketrangthai_tab":
            return "Trạng thái kết nối";
            break;
        case "thongtindiemdo_tab":
            return "Thông tin điểm đo";
            break;
        case "danhsachsoghi":
            return "DS Sổ ghi";
            break;
        case "danhsachnguoidung":
            return "DS Người dùng";
            break;
        case "quanlymenu":
            return "QL Menu";
            break;
        case "phanquyen":
            return "Phân quyền";
            break;
        case "quanlynguoidung":
            return "QL Người dùng";
            break;
        case "thongkelapdat":
            return "Thống kê lắp đặt";
            break;
        case "xuatthongtindiemdo":
            return "Xuất thông tin điểm đo";
            break;
        case "tk_chitietdangnhap":
            return "Chi tiết đăng nhập";
            break;
        case "tk_dangnhap":
            return "Thống kê đăng nhập";
            break;
        case "tk_lognguoidung":
            return "Thống kê đăng nhập";
            break;
        case "nhatkyvanhanh":
            return "Nhật ký vận hành";
            break;
        case "canhbaovanhanh_tab":
            return "Cảnh báo vận hành";
            break;
        case "sukiencongto_tab":
            return "Sự kiện công tơ";
            break;
        case "thietlap_cb_tab":
            return "Thiết lập cảnh báo";
            break;
        case "quanlydanhmuc_tab":
            return "QL danh mục";
            break;
        case "cs_xemchisodinhky":
            return "Chỉ số định kỳ";
            break;
        case "home":
            return "Trang chủ";
            break;
        case "tkdn_tab":
            return "Thống kê đăng nhập";
            break;
        case "baocaovanhanh":
            return "Báo cáo vận hành";
            break;
        case "baocaotruyensolieu_tab":
            return "Báo cáo truyền số liệu";
            break;
        case "thongkesanluong":
            return "Thống kê sản lượng";
            break;
        case "baocaodiemdothanhly":
            return "Báo cáo thanh lý";
            break;
        case "thongkelapdat":
            return "Thống kê lắp đặt";
            break;


    }
}
function menuClickTab(tag, para) {
    localStorage.setItem("tab", tag);
    localStorage.setItem("para", para);
    set_active();
    //var linkHTML = "modules/" + tag;
    //loadModulesToMaster(linkHTML + "/index.html", linkHTML + "/init.css", linkHTML + "/init.js", ".content", true);
    //return para;
}
function Thongtintaikhoan() {
    try {
        var id = JSON.parse(localStorage.getItem("userinfo")).userid;
        var config = { namesql: "PKG_DANGNHAP.LSTTHONGTINTAIKHOAN", callback: "f_result_loadthongtin", connstr: "ConnectOracle233" };
        var para = {
            v_ID: id
        };
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}

function f_result_loadthongtin(config, para, lst) {
    try {
        var data = lst.data;
        //////console.log(data);
        if (data == '' || data.length == 0 || data == '[]' || data == undefined) {
            return;
        }

        $("#txt_tennguoidung").html(setnull(data[0].ten));
        $("#txt_email").html(setnull(data[0].mail));
        $("#txt_sodienthoai").html(setnull(data[0].sodienthoai));


    } catch (e) {
        console.log(e);
    }
}

function getMenuUser() {
    try {
        var uname = JSON.parse(localStorage.getItem("userinfo")).usercode;
        var config = { namesql: "PKG_PHANQUYEN.GET_MENU", callback: "f_result_menuuser", connstr: "ConnectOracle233" };
        var para = {
            v_tendangnhap: uname
        };
        ExecuteServiceSyns(config, para);
        //callLoad();
    } catch (e) {
        console.log(e);
    }
}
function f_result_menuuser(config, para, lst) {
    try {
        var m = lst.data;
        console.log(m);
        if (m.length == 0) {
            menuClick('quanlymenu', '11111');
            $(".content-tree.hidetree").hide();
            //stopLoad();
        } else {
            genarateMenu(m);
        }

    } catch (e) {
        console.log(e);
    }
}


function replace0_0(val) {
    if (val == "0.00" || val == null || val == "") {
        return " - ";
    } else {
        return val;
    }
}

(function (old) {
    $.fn.attr = function () {
        if (arguments.length === 0) {
            if (this.length === 0) {
                return null;
            }

            var obj = {};
            $.each(this[0].attributes, function () {
                if (this.specified) {
                    obj[this.name] = this.value;
                }
            });
            return obj;
        }

        return old.apply(this, arguments);
    };
})($.fn.attr);

function getPer(link) {
    try {
        var uname = JSON.parse(localStorage.getItem("userinfo")).usercode;
        var config = { namesql: "PKG_PHANQUYEN.GET_PER", callback: "f_result_getPer", connstr: "ConnectOracle233" };
        var para = {
            v_userid: 1,
            v_link: link
        };
        ExecuteServiceSyns(config, para);
        callLoad();
    } catch (e) {
        console.log(e);
    }
}
function f_result_getPer(config, para, lst) {
    try {
        var data = lst.data;
        if (data.length == 0) {
            stopLoad();
        } else {
            ////console.log(data);
            var q = data[0].chitietquyen;
            localStorage.setItem("per", q);
            stopLoad();
            return q;
        }

    } catch (e) {
        console.log(e);
    }
}

function messInfo(id, noidung, type) {
    try {
        $("#" + id).removeClass();
        $("#" + id).empty();

        if (type.toLowerCase() == "error") {
            $("#" + id).addClass("alert alert-block alert-danger fade in");
            //$("#" + id).fadeOut(5000);

            //   $('#' + id).stop().fadeIn(400).delay(2000).fadeOut(400);
        } else {
            $("#" + id).addClass("alert alert-success alert-block fade in");
            $("#" + id).fadeOut(5000);
        }

        if (noidung.length > 0) {
            $("#" + id).show();
            $("#" + id).append('<button data-dismiss="alert" class="close close-sm" type="button"></button>' + noidung);
        } else {
            $("#" + id).hide();
            $("#" + id).empty();
        }
    } catch (e) {
        //console.log(e);
    }


}

function initformelement() {
    resize();
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
        checkboxClass: 'icheckbox_flat-blue',
        radioClass: 'iradio_flat-blue'
    });
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').on('ifChanged', function (event) {
        //return ($(this)[0].checked);
    });

    $('.datepicker').each(function () {
        var date_picker_option = {
            todayHighlight: true,
            autoclose: true,
            format: 'dd/mm/yyyy'
        };

        var datepicker_op = $(this).attr('datepicker_op');
        if (typeof datepicker_op !== typeof undefined && datepicker_op !== false) {
            var str = $(this).attr("datepicker_op");
            var obj = JSON.parse(str.replace(/'/g, '"'))
            $.each(obj, function (key, data) {
                date_picker_option[key] = data;
            });
        }
        $(this).datepicker(date_picker_option);

    });
    //if ($('.datepicker').hasClass("months")) {
    //    $('.datepicker.months').datepicker({
    //        format: "mm/yyyy",
    //        startView: "year",
    //        minViewMode: "months"

    //    });
    //} else {
    //    $('.datepicker').datepicker({
    //        todayHighlight: true,
    //        autoclose: true,
    //        format: 'dd/mm/yyyy'
    //    });
    //}
    $(".select2").select2();

    $(".timepicker").timepicker({
        showInputs: false
    });


    //$(function () {
    //    CKEDITOR.replace('editor1');
    //});
    $('.filterable .btn-filter').click(function () {
        var $panel = $(this).parents('.filterable'),
        $filters = $panel.find('.filters input'),
        $tbody = $panel.find('.table tbody');
        if ($filters.prop('disabled') == true) {
            $filters.prop('disabled', false);
            $filters.first().focus();
        } else {
            $filters.val('').prop('disabled', true);
            $tbody.find('.no-result').remove();
            $tbody.find('tr').show();
        }
    });

    $('.filterable .filters input').keyup(function (e) {
        var code = e.keyCode || e.which;
        if (code == '9') return;
        var $input = $(this),
        inputContent = $input.val().toLowerCase(),
        $panel = $input.parents('.filterable'),
        column = $panel.find('.filters th').index($input.parents('th')),
        $table = $panel.find('.table'),
        $rows = $table.find('tbody tr');
        var $filteredRows = $rows.filter(function () {
            var value = $(this).find('td').eq(column).text().toLowerCase();
            return value.indexOf(inputContent) === -1;
        });
        $table.find('tbody .no-result').remove();
        $rows.show();
        $filteredRows.hide();
        if ($filteredRows.length === $rows.length) {
            $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="' + $table.find('.filters th').length + '">Không có kết quả</td></tr>'));
        }
    });
    $('.multi_select').multiselect({
        includeSelectAllOption: true,
        selectAllValue: 0,
        enableFiltering: true,
        filterBehavior: 'both'
    });
}
function replacePha(pha) {
    if (pha == "1")
        return "1 <span tkey='pha'></span>";
    else if (pha == "3")
        return "3 <span tkey='pha-s'></span>";
    else if (pha == "31")
        return "3 <span tkey='pha-s'></span> 1 <span tkey='bieugia'></span>";
    else {
        return;
    }
}
function genarateMenu(content) {
    //console.log(content);
    var mc = JSON.parse(content[0].menu_content);
    var firstLI = '<li class="header" tkey="Chức năng hệ thống"></li>';
    var LI = "";
    for (var i = 0 ; i < mc.length; i++) {
        var subm = mc[i].sub;
        //console.log(subm)
        if (subm.length > 0) {
            LI += '<li class="treeview">' +
              '<a href="#">' +
              '<i class="fa fa-' + mc[i].icon + '"></i> <span tkey="' + mc[i].mainmenu + '">' + mc[i].mainmenu + '</span>' +
              '<span class="pull-right-container">' +
              '<i class="fa fa-angle-left pull-right"></i>' +
              '</span>' +
              '</a>' +
              '<ul class="treeview-menu">';
            for (var j = 0 ; j < subm.length; j++) {
                //var perm = getPer(subm[j].link);
                ////console.log(perm);
                LI += '<li class=""><a href = "#" onclick="menuClick(\'' + subm[j].lk + '\',\'' + subm[j].pr + '\')"><i class="fa fa-circle-o"></i> <span tkey="' + subm[j].lk + '">' + subm[j].tm + '</span></a></li>';
            }
            LI += '</ul></li>';
        }
        else {
            LI += '</ul>';
        }
    }
    $("ul.sidebar-menu").empty();
    $("ul.sidebar-menu").append(firstLI + LI);
    var secomdLI = $("ul.sidebar-menu li").get(1);
    $(secomdLI).addClass("active");
    //if ($(".sidebar-menu").size() > 1) {
    //    var items = $('ul.sidebar-menu li');
    //    var first_menu = items.filter('li:gt(1)');
    //    first_menu.addClass('active');
    //}

    selectlang();
    stopLoad();
}

function showhideTree() {
    var modhidetree = ["home", "chiso/nhapkhachhangtucmiss",
        "chiso/dongbocmissdinhky",
        "quanlydanhmuc_tab",
        "baocaohoatdongnguoidung",
        "quanlymenu",
        "quanly_capnhatsttcongto",
        "cmis_xuatnhaphhu",
        "thanhlydiemdo",
        "thaycongtocmis",
        "bando_repeater_dcu",
        "cs_thietlapngaychotnhieutram",
        "datlaimatkhau_ds",
        "test",
        "chiso/docdulieu_hhu",
        "home_new"
    ];
    var mod = localStorage.getItem("breadcumb");
    //alert($.inArray(mod, modhidetree));
    if ($.inArray(mod, modhidetree) < 0) {
        //show tree
        $(".content").removeClass("hidetree");
        $(".content").addClass("showtree");
        $(".content-tree").addClass("hidetree");
        $(".content-tree").removeClass("showtree");
        $(".colslape_tree").addClass("showtree");
        $(".colslape_tree").removeClass("hidetree");
        $(".filter_main").show();
        $(".colslape_tree").show();
    }
    else {
        //alert($.inArray(mod, modhidetree));
        $(".content").removeClass("showtree");
        $(".content").addClass("hidetree");
        $(".content-tree").addClass("showtree");
        $(".content-tree").removeClass("hidetree");
        $(".colslape_tree").addClass("hidetree");
        $(".colslape_tree").removeClass("showtree");
        $(".filter_main").hide();
        $(".colslape_tree").hide();

    }
}
function resize() {
    var width = $(window).width();
    var height = $(window).height();
    $(".content-wrapper").css("max-height", height);
    $(".wrapper").css("max-height", height);
    $(".wrapper").css("height", height);
    $(".content-tree").css("max-height", height - 100);
    $(".content-tree").css("height", "auto");
    $(".content").css("max-height", height - 100);
    $(".content").css("height", height - 90);
}

function dec(a) { return $.base64.atob(a, !0) } function enc(a) { return $.base64.btoa(a) }

