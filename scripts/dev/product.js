(function ($) {
    "use strict";
    var customSelect = '[data-ref="custom-select"]';
    var rangeSlider = {
        wraper: '[data-ref="range-slider-wrapper"]',
        slider: '[data-ref="range-slider"]',
        minRange: '[data-ref="range-min"]',
        maxRange: '[data-ref="range-max"]',
    }


    function rangeSliderFunc() {
        $(rangeSlider.slider).slider({
            range: true,
            min: 0,
            max: 500,
            values: [75, 300],
            slide: function (event, ui) {
                $(rangeSlider.minRange).val(ui.values[0]);
                $(rangeSlider.maxRange).val(ui.values[1]);
            }
        });
        //   $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
        //     " - $" + $( "#slider-range" ).slider( "values", 1 ) );
    }

    function customSelectFunc() {
        $(customSelect).selectmenu();
    }

    /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
    $(window).on('load', function () {
        rangeSliderFunc();
        customSelectFunc();
    });

    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).scroll(function () {
        //
    });

    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function () {
        //
    });

})(window.jQuery);