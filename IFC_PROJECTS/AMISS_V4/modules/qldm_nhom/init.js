$(document).ready(function () {
    showhideTree();
    initformelement();
    $("input[name$='sl_rad']").click(function () {
        //console.log("OK");
        if ($('#r1').is(':checked')) {
            $(".sltb").slideDown();
            $(".slthang").slideUp();
        } else {
            $(".sltb").slideUp();
            $(".slthang").slideDown();
        }
    });
    var tr = "";
    var tr2 = "";
    for (var i = 0; i < 40; i++) {
        tr += '<tr>' +
              '<td>' + eval(199850 + i) + '</td>' +
              '<td>Công tơ ' + eval(100 + i) + '</td>' +
              '<td>PP01000' + eval(111000 + i) + '</td>' +
              '<td>353196048542</td>' +
              '<td>' + eval(201607000000 + i) + '</td>' +
              '</tr>';
        tr2 += '<tr>' +
      '<td>' + eval(199850 + i) + '</td>' +
      '<td>Công tơ ' + eval(100 + i) + '</td>' +
      '<td>' + eval(201607000000 + i) + '</td>' +
      '</tr>';
    }
    $("#tbl_dsdiemdo_nhan tbody").empty();
    $("#tbl_dsdiemdo_nhan tbody").append(tr);
    $("#tbl_dsdiemdo tbody").empty();
    $("#tbl_dsdiemdo tbody").append(tr2);
});
function checkRad() {
    if ($('#r1').is(':checked')) {
        $(".sltb").slideDown();
        $(".slthang").slideUp();
    } else {
        $(".sltb").slideUp();
        $(".slthang").slideDown();
    }
}
