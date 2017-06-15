var arrPhanQuyen;
$(document).ready(function () {
    try {
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

function f_loadUrl()
{
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
                    api_phanquyenModule();
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

function f_activeTab()
{
    var url = f_loadUrl();
    
    var str = "";
    $('li .active').each(function () {
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

function initformelement() {

    resize();
    //$('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
    //    checkboxClass: 'icheckbox_flat-blue',
    //    radioClass: 'iradio_flat-blue'
    //});
    $('.datepicker').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true
    }).on('changeDate', function (ev) {
        $('.datepicker').datepicker('hide');
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

//classquyen_them  classquyen_sua  classquyen_xoa  classquyen_download   classquyen_in  classquyen_xem       
function api_phanquyenModule() {
    try {
      
        if(arrPhanQuyen !=null && arrPhanQuyen != undefined && arrPhanQuyen.length>0)
            $.each(arrPhanQuyen, function (key, val) {
           
            if (val.xem == 0)
                $("." + val.classform).html('Không có quyền xem trang này');
            if (val.them == 0)
                $("." + val.classform + " .classquyen_them").empty();
            if (val.sua == 0)
                $("." + val.classform + " .classquyen_sua").empty();
            if (val.xoa == 0)
                $("." + val.classform + " .classquyen_xoa").empty();
            if (val.download == 0)
                $("." + val.classform + " .classquyen_download").empty();
            if (val.ins == 0)
                $("." + val.classform + " .classquyen_in").empty();
        });
    } catch (e) {
        console.log(e);
    }

}