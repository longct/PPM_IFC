$(document).ready(function () {
    showhideTree();
    try {
        selectlang();
        $("#cb_project").change(function () {
            var prj = $("#cb_project option:selected").val();
            switch (prj) {
                case "amiss":
                    $("#type_phaamiss").slideDown();
                    return;
                case "streetlight":
                    $("#type_phaamiss").slideUp();
                    return;
                default:
                    $("#type_phaamiss").slideUp();
                    return;

            }
        })
        $("input[type=checkbox]").switchButton({
            width: 80,
            height: 30,
            button_width: 50,
            on_label: '1 Pha',
            off_label: '3 Pha'
        });
    }
    catch (e) {
        console.log(e);
    }
})