//date picker start
function loadInitDate() {
    try {
            $('.default-date-picker').datepicker({
                format: 'dd/mm/yyyy',
                // onRender: function (date) {
                //    return 'disabled';
                //}
            });
            //$('.dpYears').datepicker();
            $('.dpMonths').datepicker();

    } catch (e) {
        console.log(e);
    }
}
