$(document).ready(function () {


    var $content, $modal, $apnData, $modalCon;

    $content = $(".min");


    //To fire modal
    $(".mdlFire").click(function (e) {

        e.preventDefault();

        var $id = $(this).attr("data-target");

        $($id).modal({ backdrop: false, keyboard: false });

    });


    $(".modalMinimize").on("click", function () {
        alert(2);

        $modalCon = $(this).closest(".mymodal").attr("id");

        $apnData = $(this).closest(".mymodal");

        $modal = "#" + $modalCon;

        $(".modal-backdrop").addClass("display-none");

        $($modal).toggleClass("min");

        if ($($modal).hasClass("min")) {

            $(".minmaxCon").append($apnData);

            $(this).find("i").toggleClass('fa-minus').toggleClass('fa-clone');

        }
        else {

            $(".container").append($apnData);

            $(this).find("i").toggleClass('fa-clone').toggleClass('fa-minus');

        };

    });

    $("button[data-dismiss='modal']").click(function () {

        $(this).closest(".mymodal").removeClass("min");

        $(".container").removeClass($apnData);

        $(this).next('.modalMinimize').find("i").removeClass('fa fa-clone').addClass('fa fa-minus');

    });

});
