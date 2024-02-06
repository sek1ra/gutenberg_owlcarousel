(function() {
    jQuery(".owl-carousel").each(function() {
        jQuery(this).owlCarousel({
            items: jQuery(this).attr('data-count'),
            autoWidth: false,
            nav: false,
            dots: false,
            lazyLoad: false,
            loop: true,
            responsive : {
                
            }
        });
    })
})();