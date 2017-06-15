
$(document).ready(function () {
    try {
        if (window.history && window.history.pushState) {
            $(window).on('popstate', function () {
                f_initModul();
            });
        }
        $(".content-wrapper").click(function () {
            if ($(".control-sidebar").hasClass("control-sidebar-open")) {
                $(".sidebar-toggle").click();
            }
        })
    } catch (e) { console.log(e); }
});

function f_initModul() {
    try {
        var urlOld = f_loadUrl();
        //console.log(urlOld);
        //  var urlOld = uri != "" ? uri : sessionStorage.getItem("linkHtmlOld");
        if (urlOld != "") {
            loadModulesToMaster(urlOld + "/index.html", urlOld + "/init.css", urlOld + "/init.js",urlOld+"/lang.json", ".main-content-delete", true);
        }
        else
            loadContent();
    } catch (e) { console.log(e); }
}

function f_loadUrl() {
    var urlfull = window.location.href;
    //console.log(urlfull);
    var start = urlfull.indexOf("#");
    var end = urlfull.length;
    if (start != -1) {
        var str = urlfull.substring(start, urlfull.length);
        return str.replace("#", "");
    }
    else
        return "";
}



function loadModulesToMaster(linkHtml, linkCss, linkJs,linkLang, addTo, DeleteOld) {
    try {

        if (DeleteOld) {
            $(addTo).empty();
            // $('head style').remove();
        }
        // Get the HTML
        $.get(linkHtml, function (html) {
            // Add HTML to page
            $(addTo).append(html);
            // Get the CSS
            $.get(linkCss, function (css) {
                // Get the JavaScript
                $.getScript(linkJs, function () {
                    // All is ready now, so...
                    // Add CSS to page
                    $("<style />").html(css).appendTo(addTo);
                });
                f_langInit(linkLang);
            });

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
                loadModulesToMaster(url + "/index.html", url + "/init.css", url + "/init.js", url + "/lang.json", $(this).parent(), false);
            }
            $(val).remove();
        });
    } catch (e) {
        console.log(e);
    }
}


// them ngon ngu
var apiLstLang = [];
function f_langInit(url) {
    try {
        //$.getJSON(url, function (data) {
        //    console.log(data);
        //    var lang = JSON.parse(localStorage.getItem("lang"));
        //    console.log(lang);
        //    var lst = data[lang];
        //    console.log(lst);
        //    $.each(lst, function (key, val) {
        //        $("." + key).html(val);
        //        var info = "{\"" + key + "\":\"" + val + "\"}";
        //        apiLstLang = JSON.parse(info);
        //    });

        //});

    } catch (e) { console.log(e); }
}