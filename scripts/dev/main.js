(function ($) {
    "use strict";
    var lastScrollTop = 0;
    var header = '[data-ref="sticky-header"]';
    var container = {
        right: '[data-ref="container-right"]',
        left: '[data-ref="container-left"]',
    };
    var cart = {
        counter: $('[data-ref="cart-counter"]')
    };
    var megaMenu = {
        dropdown: '[data-rel="dropdown-megamenu"]',
        wrapper: '[data-rel="megamenu-wrapper"]',
        inner: '[data-ref="dropdown-inner"]'
    };
    var search = {
        openButton: '[data-ref="search-open"]',
        closeButton: '[data-ref="search-close"]',
        wrapper: '[data-ref="search"]',
        sugession: '[data-ref="search-sugession"]',
        input: '[data-ref="search-input"]',
        clear: '[data-ref="search-clear"]'
    }
    var bannerSlider = {
        wrapper: '[data-ref="banner-slider-wrapper"]',
        slider: '[data-ref="banner-slider"]',
        prevArrow: '[data-ref="arrow-prev"]',
        nextArrow: '[data-ref="arrow-next"]'
    };
    var mobileMenu = {
        wrapper: '[data-ref="mobilemenu"]',
        close: '[data-ref="close-mobilemenu"]',
        open: '[data-ref="mobilemenu-toggler"]',
        main: '[data-ref="mobilemenu-main"]',
    }
    var categorySlider = {
        slider: '[data-ref="category-slider"]'
    }
    var collectionSlider = {
        wrapper: '[data-ref="collection-slider-wrapper"]',
        slider: '[data-ref="collection-slider"]',
        arrowLeft: '[data-ref="arrow-prev"]',
        arrowRight: '[data-ref="arrow-next"]',
    };

    var accordicon = {
        wrapper: '[data-ref="accordicon"]',
        title: '[data-ref="accordicon-title"]',
        icon: '[data-ref="accordicon-icon"]',
        content: '[data-ref="accordicon-content"]',
    }

    function accordiconFunction () {
        $(accordicon.title).on('click', function(){
            $(this).siblings(accordicon.content).slideToggle();
            $(this).find(accordicon.icon).toggleClass('rotate-180')
        })
    }

    function mobileMenuFunction() {
        $(mobileMenu.open).on('click', function () {
            $(mobileMenu.wrapper).css({ visibility: 'visible', opacity: 1 })
            $(mobileMenu.main).css({ transform: 'translateX(0)' })
        })
        $(mobileMenu.close).on('click', function () {
            $(mobileMenu.wrapper).removeAttr('style')
            $(mobileMenu.main).removeAttr('style')
        })
    }

    function overlay() {
        $('body').toggleClass('overlay');
    }

    function stickyHeader() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > lastScrollTop) $(header).addClass('-translate-y-full')
        else $(header).removeClass('-translate-y-full')
        lastScrollTop = scrollTop;
    }

    function toggleMegamenu() {
        function hideMenu(self) {
            $(self).removeClass('dropdown-active');
            $(self).children(megaMenu.wrapper).removeClass('opacity-100 visible');
        }
        function showMenu(self) {
            $(megaMenu.dropdown).removeClass('dropdown-active');
            $(megaMenu.wrapper).removeClass('opacity-100 visible');
            $(self).parent(megaMenu.dropdown).addClass('dropdown-active');
            $(self).siblings(megaMenu.wrapper).addClass('opacity-100 visible');
        }
        $(megaMenu.dropdown).children('a').on({
            mouseenter: function () { showMenu(this) }
        });
        $(megaMenu.inner).on('mouseleave', function () {
            if ($(megaMenu.dropdown + '>a:hover').length == 0) {
                hideMenu($(megaMenu.dropdown));
            }
        })
    }

    function toggleSearchFunction() {
        $(search.clear).on('click', function () {
            $(search.input).val('');
            $(search.sugession).fadeOut(0);
        })
        $(search.openButton).on('click', function () {
            $(search.wrapper).addClass('translate-y-0');
            overlay();
        })
        $(search.closeButton).on('click', function () {
            $(search.sugession).fadeOut(0);
            $(search.input).val('');
            $(search.wrapper).removeClass('translate-y-0');
            overlay();
        })
        $(document).click(function (event) {
            if (
                !$(event.target).is($(this).find(header)) &&
                !$(event.target).is($(this).find(`${header} *`)) &&
                !$(event.target).is($(this).find(search.sugession)) &&
                !$(event.target).is($(this).find(`${search.sugession} *`))
            ) {
                $(search.sugession).fadeOut(0);
                $(search.input).val('');
                $(search.wrapper).removeClass('translate-y-0');
                $('body').removeClass('overlay');
            }
        })
    }

    function searchFunction() {
        $(search.input).on('change keyup paste', function () {
            var value = $(this).val();
            if (value) {
                $(search.sugession).fadeIn();
            }
        })
    }

    function bannerSliderFunction() {
        var slider = $(bannerSlider.wrapper).find(bannerSlider.slider);
        if (slider.length) {
            slider.slick({
                dots: true,
                arrows: true,
                infinite: false,
                speed: 500,
                fade: false,
                cssEase: 'linear',
                prevArrow: $(bannerSlider.wrapper).find(bannerSlider.prevArrow),
                nextArrow: $(bannerSlider.wrapper).find(bannerSlider.nextArrow),
                responsive: [
                    {
                        breakpoint: 575,
                        settings: {
                            arrows: false,
                        }
                    }
                ]
            });
        }
    }

    function containerSize() {
        var windowWidth = $(window).innerWidth();
        var containerWidth = $('.container').innerWidth();
        var spaceSize = (windowWidth - containerWidth) / 2;

        if ($(container.left)) $(container.left).css({ marginLeft: spaceSize, overflowX: 'hidden' });
        if ($(container.right)) $(container.right).css({ marginLeft: spaceSize, overflowX: 'hidden' });

    }

    function categorySliderFunction() {
        var slider = $(categorySlider.slider);
        if (slider.length) {
            slider.css({ marginLeft: 'calc(-13% - 16px)' })
            slider.slick({
                dots: false,
                arrows: false,
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 2,
                centerMode: true,
                centerPadding: '13%',
                responsive: [
                    {
                        breakpoint: 575,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }
                ]
            });
        }
    }

    function collectionSliderFunction() {
        var slider = $(collectionSlider.slider);
        if (slider.length) {
            if($(window).innerWidth() < 575) slider.css({ marginLeft: 'calc(-5% - 10px)' })
            slider.slick({
                dots: false,
                arrows: true,
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 2,
                prevArrow: slider.parents(collectionSlider.wrapper).find(collectionSlider.arrowLeft),
                nextArrow: slider.parents(collectionSlider.wrapper).find(collectionSlider.arrowRight),
                responsive: [
                    {
                        breakpoint: 575,
                        settings: {
                            centerMode: true,
                            centerPadding: '5%',
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    }
                ]
            });
        }
    }

    // WHEN DOCUMENT LOADING
    $(window).on('load', function () {
        toggleMegamenu();
        toggleSearchFunction();
        searchFunction();
        bannerSliderFunction();
        containerSize();
        categorySliderFunction();
        collectionSliderFunction();
        mobileMenuFunction();
        accordiconFunction();
    });

    // WHEN WINDOW SCROLL
    $(window).scroll(function () {
        stickyHeader();
    });

    // WHEN WINDOW RESIZE
    $(window).on("resize", function () {
        collectionSliderFunction();
    });

})(window.jQuery);