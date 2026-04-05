$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 10) {
        $(".ic-header").addClass("ic-fixed-header-bg");
    } else {
        $(".ic-header").removeClass("ic-fixed-header-bg");
    }
});