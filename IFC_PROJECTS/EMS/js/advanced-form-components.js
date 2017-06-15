//date picker start
function loadInitDate() {
    try {
            $('.default-date-picker').datepicker({
                format: 'dd/mm/yyyy',
                // onRender: function (date) {
                //    return 'disabled';
                //}
            });
            $('.dpYears').datepicker();
            $('.dpMonths').datepicker({
                format: 'mm/yyyy',
                onRender: function (date) {
                    return 'disabled';
                }
            });


    } catch (e) {
        console.log(e);
    }
}
