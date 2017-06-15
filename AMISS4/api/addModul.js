$(document).ready(function () {
    try {
        resize();
        var urlOld = sessionStorage.getItem("linkHtmlOld");
        if (urlOld != null && urlOld != undefined && urlOld != "") {
            loadModulesToMaster(urlOld + "/index.html", urlOld + "/init.css", urlOld + "/init.js", ".main-content-delete", true);
        }
        else
            loadContent();
        //initClickLink();



    } catch (e) { console.log(e); }
});
function menuClick(tag) {
    var linkHTML = "modules/" + tag;
    loadModulesToMaster_new(linkHTML + "/index.html", linkHTML + "/init.css", linkHTML + "/init.js", ".content", true);
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

            console.log("vào");
            var url = getLink(this);
            if (url != null && url != undefined && url != "") {
                sessionStorage.setItem("linkHtmlOld", url);
                loadModulesToMaster(url + "/index.html", url + "/init.css", url + "/init.js", ".content", true);
            }
        });

    } catch (e) { console.log(e); }
}

var lstJsOld = "";
function loadModulesToMaster(linkHtml, linkCss, linkJs, addTo, DeleteOld) {
    try {
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

function loadModulesToMaster_new(linkHtml, linkCss, linkJs, addTo, DeleteOld) {
    try {
        // Get the HTML
        $.get(linkHtml, function (html) {
            // Add HTML to page
            $(addTo).empty();
            $(addTo).append(html);
            // Get the CSS
            $.get(linkCss, function (css) {
                $(addTo).append("<style>" + css + "</style>");
            });
            $.getScript(linkJs, function (js) {
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
        console.log(url);
        if (url != null && url != undefined && url != "") {
            loadModulesToMaster(url + "/index.html", url + "/init.css", url + "/init.js", ".main-content-delete", true);
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
                loadModulesToMaster(url + "/index.html", url + "/init.css", url + "/init.js", ".main-content-delete", true);
            }
        });

    } catch (e) { console.log(e); }
}
