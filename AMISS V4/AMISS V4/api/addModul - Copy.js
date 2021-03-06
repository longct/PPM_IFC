﻿$(document).ready(function () {showhideTree();
    try {
        //resize();
        var urlOld = sessionStorage.getItem("linkHtmlOld");
        if (urlOld != null && urlOld != undefined && urlOld != "") {
            loadModulesToMaster(urlOld + "/index.html", urlOld + "/init.css", urlOld + "/init.js", ".content", true);
        }
        else
            loadContent();
        //initClickLink();



    } catch (e) { console.log(e); }
});
function initformelement() {
    resize();
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
        checkboxClass: 'icheckbox_flat-blue',
        radioClass: 'iradio_flat-blue'
    });
    $('.datepicker').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true

    });

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
}
function genarateMenu(content) {
    var mc = JSON.parse(content[0].menu_content);
    var firstLI = '<li class="header">QUẢN LÝ HỆ THỐNG</li>';
    var LI = "";
    for (var i = 0 ; i < mc.length; i++) {
        var subm = mc[i].sub;
        if (subm.length > 0) {
            LI += '<li class="treeview">' +
              '<a href="#">' +
              '<i class="fa fa-' + mc[i].icon + '"></i> <span>' + mc[i].mainmenu + '</span>' +
              '<span class="pull-right-container">' +
              '<i class="fa fa-angle-left pull-right"></i>' +
              '</span>' +
              '</a>' +
              '<ul class="treeview-menu">';
            for (var j = 0 ; j < subm.length; j++) {
                LI += '<li class=""><a href = "#" onclick="menuClick(\'' + subm[j].lk + '\',\'' + subm[j].pr + '\')"><i class="fa fa-circle-o"></i> ' + subm[j].tm + '</a></li>';
            }
            LI += '</ul></li>';
        }
        else {
            LI += '</ul>';
        }
    }
    $("ul.sidebar-menu").empty();
    $("ul.sidebar-menu").append(firstLI + LI);
}
function genarateMenuAmiss(content) {
    
    var mc = JSON.parse(content[0].menu_content);
    var firstLI = '<li class="header">QUẢN LÝ HỆ THỐNG</li>';
    var LI = "";
    for (var i = 0 ; i < mc.length; i++) {
        var subm = mc[i].sub;
        if (subm.length > 0) {
            LI += '<li class="treeview">' +
              '<a href="#">' +
              '<i class="fa fa-' + mc[i].icon + '"></i> <span>' + mc[i].mainmenu + '</span>' +
              '<span class="pull-right-container">' +
              '<i class="fa fa-angle-left pull-right"></i>' +
              '</span>' +
              '</a>' +
              '<ul class="treeview-menu">';
            for (var j = 0 ; j < subm.length; j++) {
                LI += '<li class=""><a href = "#" onclick="menuClickAmiss(\'' + subm[j].lk + '\')"><i class="fa fa-circle-o"></i> ' + subm[j].tm + '</a></li>';
            }
            LI += '</ul></li>';
        }
        else {
            LI += '</ul>';
        }
    }
    $("ul.sidebar-menu").empty();
    $("ul.sidebar-menu").append(firstLI + LI);
}
function menuClick(tag) {
    var linkHTML = "modules/" + tag;
    var br = localStorage.getItem("breadcumb");
    if (br != tag) {
        localStorage.setItem("tab", "");
    }

    br = tag;
    localStorage.setItem("breadcumb", br);
    loadModulesToMaster(linkHTML + "/index.html", linkHTML + "/init.css", linkHTML + "/init.js", ".content", true);
}
function menuClickAmiss(tag) {
    var linkHTML = "modulesAmiss/" + tag;
    loadModulesToMaster(linkHTML + "/index.html", linkHTML + "/init.css", linkHTML + "/init.js", ".content", true);
}
function resize() {
    var width = $(window).width();
    var height = $(window).height();

    //$(".content-wrapper").css("min-height", height);
    $(".content-wrapper").css("max-height", height -100);
    $(".wrapper").css("max-height", height);
    $(".wrapper").css("height", height);
    $(".content-tree").css("max-height", height - 100);
    $(".content-tree").css("height", "auto");
    $(".content").css("max-height", height - 100);
    $(".content").css("height", height - 90);
}
function getAllIdMod() {
    try {
        var oArr = {};
        $("*[id]").each(function () {
            try {
                var id = $(this).attr('id');
                var val = $(this).val() == null ? "" : $(this).val();
                // if (!oArr[id] && $(this)[0].className.indexOf("kitSelect") < 0)
                oArr[id] = val;
            } catch (e) {

            }
        });

        $("select option:selected").each(function () {
            try {
                var id1 = $(this).attr('id');
                var val1 = $(this).val() == null ? "" : $(this).val();
                oArr[id1] = val1;
            }
            catch (e) { }

        });

        return oArr;
    } catch (e) {
        ////console.log(e);
        return null;
    }
}
function f_ChuyenTrangLoadLichSuCot(macauthu) {
    var p = getAllIdMod();
    macot_lichsucot = macauthu;
    return macot_lichsucot;
}
function initClickLink() {
    try {
        $(".linktomod").click(function () {
            var url = getLink(this);
            if (url != null && url != undefined && url != "") {
                sessionStorage.setItem("linkHtmlOld", url);
                loadModulesToMaster(url + "/index.html", url + "/init.css", url + "/init.js", ".content", true);
            }
        });

    } catch (e) { console.log(e); }
}

function loadModulesToMaster(linkHtml, linkCss, linkJs, addTo, DeleteOld) {
    try {
      //  //console.log(linkHtml + "====" + linkCss + "========" + linkJs + "======" + addTo);
        if (DeleteOld) {
            $(addTo).html("");
            $('head style').remove();
        }
        // Get the HTML
        $.get(linkHtml, function (html) {
            // Add HTML to page
            $(addTo).append(html);
            // Get the CSS
            $.get(linkCss, function (css) {
                // Get the JavaScript
                $.getScript(linkJs, function (js) {
                    // All is ready now, so...
                    // Add CSS to page
                    $("<style />").html(css).appendTo("head");
                });

            });
            if (html.indexOf("menutab") >= 0)
                initClickTab();

        });


    } catch (e) { console.log(e); }
}


function getLink(thiss) {
    try {

        var url = "";
        var links = $(thiss).attr("href");
        if (links != null && links != undefined) {
            uri = links.split("#");
            url = uri.length > 1 ? uri[1] : "";
        }
        return url;
    } catch (e) { console.log(e); }
}

function loadContent() {
    try {

        $.each($("[data-include]"), function (idx, val) {
            var url = $(val).attr("data-include");
            if (url != null && url != "") {
                loadModulesToMaster(url + "/index.html", url + "/init.css", url + "/init.js", $(this).parent(), false);
            }
            $(val).remove();

        });


    } catch (e) {
        console.log(e);
    }
}

// click tab

function initClickTab() {
    $(".menutab .linktomod").click(function () {
        var url = getLink(this);
        //console.log(url);
        if (url != null && url != undefined && url != "") {
            loadModulesToMaster(url + "/index.html", url + "/init.css", url + "/init.js", ".content", true);
            $(this).addClass("active");
            initChangeTapActice();
        }
    });
    initChangeTapActice();
}
function initChangeTapActice() {
    try {
        var url = $(location).attr("href");
        var uri = url.split('#');
        var urlTab = url.length > 1 ? uri[1] : "";

        if (urlTab != null && urlTab != undefined && urlTab != "") {
            $('.menutab li').each(function (i, obj) {
                $(obj).removeClass("active");
            });

            $('.menutab a[href="#' + urlTab + '"]').parent("li").addClass("active");
        }
    } catch (e) { console.log(e); }
}


// click vao menu con cua master
function initClickLinkChilden() {
    try {
        $(".linktomodchilden").click(function () {
            var url = getLink(this);
            if (url != null && url != undefined && url != "") {
                sessionStorage.setItem("linkHtmlOld", url);
                loadModulesToMaster(url + "/index.html", url + "/init.css", url + "/init.js", ".content", true);
            }
        });

    } catch (e) { console.log(e); }
}
