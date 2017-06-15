
$(document).ready(function () {
    try {
        $(".wrapper").fadeTo("slow", 1, function () {
            // Animation complete.
        });
        if (window.history && window.history.pushState) {
            $(window).on('popstate', function () {
                f_initModul();
            });
        }
        f_initModul();
    } catch (e) { console.log(e); }
});

function f_initModul() {
    try {
        var urlOld = f_loadUrl();
        //  var urlOld = uri != "" ? uri : sessionStorage.getItem("linkHtmlOld");
        if (urlOld != "") {
            loadModulesToMaster(urlOld + "/index.html", urlOld + "/init.css", urlOld + "/init.js", ".main-content-delete", true);
        }
        else
            loadConetent();
    } catch (e) { console.log(e); }
}

function f_loadUrl() {
    var urlfull = window.location.href;
    var start = urlfull.indexOf("#");
    var end = urlfull.length;
    if (start != -1) {
        var str = urlfull.substring(start, urlfull.length);
        return str.replace("#", "");
    }
    else
        return "";
}



function loadModulesToMaster(linkHtml, linkCss, linkJs, addTo, DeleteOld) {
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
                    f_activeTab();
                });
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

function loadConetent() {
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

function f_activeTab() {
    var url = f_loadUrl();

    var str = "";
    $('li .active').each(function () {
        console.log("remove nhe");
        $(this).removeClass("active");
    });
    $('a').each(function () {
        var value = $(this).attr('href');
        if (value != null && value != undefined) {
            str = value.replace("#", "");
            if (str == url) {
                $(this).parent().removeClass("active");
                $(this).parent('li').addClass('active')
            }
        }
    });

}