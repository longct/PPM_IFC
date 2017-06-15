$(document).ready(function () {
    $(".option_home").click(function () {
        if ($('.menu_option_home').hasClass("hide")) {
            $('.menu_option_home').removeClass("hide");
            $('.menu_option_home').addClass("show");
        } else {
            $('.menu_option_home').removeClass("show");
            $('.menu_option_home').addClass("hide");
        }
    })

    $(".color_change").click(function () {
        if ($('.color_option_home').hasClass("hide")) {
            loadColor();
            $('.color_option_home').removeClass("hide");
            $('.color_option_home').addClass("show");
        } else {
            $('.color_option_home').removeClass("show");
            $('.color_option_home').addClass("hide");
        }
    })

    $(".color_change_p").click(function () {
        console.log($(this).data("value"));
    })

    $(".content").click(function () {
        if ($('.menu_option_home').hasClass("show")) {
            $('.menu_option_home').removeClass("show");
            $('.menu_option_home').addClass("hide");
        }
    })
    get_data_search();

});
function loadTreeByCode(ui) {
    if ($(".menu_option_home").hasClass("hide")) {
        $(".option_home").click();
    }
    selectChange(ui.item.id);
}
function loadColor() {
    $('.color_change_p').each(function (k, v) {
        $(v).css("background", $(v).data("value"));
    })

}

function search_main(str) {
    alert(str);
}

function get_data_search() {
    try {
        var code = JSON.parse(localStorage.getItem("userinfo")).code;
        //var code = "0101";
        console.log(code);
        var config = { connstr: "ConnectOracle_Amiss4", namesql: "PKG_TREE.GET_ALL_FOLDER", callback: "result_GetFolders" };
        var para = {
            V_CODE: code        
        }

        // console.log(para);
        ExecuteServiceSyns(config, para);

    } catch (e) {
        console.log(e);
    }
}
function result_GetFolders(config, para, lst) {
    console.log(lst);
    var data = lst.data;
    var lst_dl = [];
    $.each(data, function (k, v) {
        var item = { label: val.name, value: val.name, id: val.code };
        lst_dl.push(item);
    })

    console.log(lst_dl);
    $("#txt-search").autocomplete({
        minLength: 1,
        delay: 200,
        source: lst_dl,
        select: function (event, ui) {
            loadTreeByCode(ui);
        },
    });
}


