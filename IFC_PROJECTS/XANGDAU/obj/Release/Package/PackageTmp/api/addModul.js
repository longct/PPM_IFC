
$(document).ready(function () {
    try {
        var urlOld = sessionStorage.getItem("linkHtmlOld");
        if (urlOld != null && urlOld != undefined && urlOld != "") {
            loadModulesToMaster(urlOld + "/index.html", urlOld + "/init.css", urlOld + "/init.js", ".main-content-delete", true);
        }
        else
            loadConetent();
        initClickLink();

    } catch (e) { console.log(e); }
});

function initClickLink() {
    try {
        $(".linktomod").click(function () {
            var url = getLink(this);
            if (url != null && url != undefined && url != "") {
                sessionStorage.setItem("linkHtmlOld", url);
                loadModulesToMaster(url + "/index.html", url + "/init.css", url + "/init.js", ".main-content-delete", true);
            }
        });

    } catch (e) { console.log(e); }
}


function loadModulesToMaster(linkHtml, linkCss, linkJs, addTo, DeleteOld) {
    try {
        if (DeleteOld) {
            $(addTo).empty();
            $('head style').remove();
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

// click tab

function initClickTab() {
    $(".menutab .linktomod").click(function () {
        var url = getLink(this);

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