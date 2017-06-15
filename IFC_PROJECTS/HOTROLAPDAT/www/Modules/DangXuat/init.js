$(document).ready(function () {
    try {
        localStorage.removeItem("userinfo");
        loadchecklog_master();

    } catch (e) {
        console.log(e);

    }
});
