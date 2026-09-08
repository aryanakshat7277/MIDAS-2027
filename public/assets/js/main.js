jQuery(document).ready(function($) {
    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 120) {
            $('.back-to-top').fadeIn('fast');
        } else {
            $('.back-to-top').fadeOut('fast');
        }
    });
    $('.back-to-top').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 800, 'easeInOutExpo');
        return false;
    });

    // Sticky header wrapper height sync
    if ($.fn.sticky) {
        $("#header").sticky({
            topSpacing: 0,
            zIndex: '1100'
        });
    }

    // Intro Carousel
    if ($.fn.owlCarousel && $("#intro-carousel").length) {
        $("#intro-carousel").owlCarousel({
            autoplay: true,
            dots: false,
            loop: true,
            animateOut: 'fadeOut',
            items: 1
        });
    }

    // WOW animations
    if (typeof WOW === 'function') {
        new WOW().init();
    }

    // Desktop menu Superfish
    if ($.fn.superfish) {
        $('.nav-menu').superfish({
            animation: {
                opacity: 'show'
            },
            speed: 250,
            delay: 200
        });
    }

    // Mobile Navigation Drawer Setup
    if ($('#nav-menu-container').length && !$('#mobile-nav').length) {
        var $mobile_nav = $('#nav-menu-container').clone().prop({
            id: 'mobile-nav'
        });
        $mobile_nav.find('> ul').attr({
            'class': '',
            'id': ''
        });
        $('body').append($mobile_nav);

        // Place mobile nav toggle cleanly in header container beside logo-right
        if (!$('#mobile-nav-toggle').length) {
            if ($('#logo-right').length) {
                $('#logo-right').after('<button type="button" id="mobile-nav-toggle" aria-label="Toggle Navigation"><i class="fa fa-bars"></i></button>');
            } else {
                $('#header .container').append('<button type="button" id="mobile-nav-toggle" aria-label="Toggle Navigation"><i class="fa fa-bars"></i></button>');
            }
        }

        if (!$('#mobile-body-overly').length) {
            $('body').append('<div id="mobile-body-overly"></div>');
        }
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

        $(document).on('click', '.menu-has-children i', function(e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').eq(0).slideToggle(200);
            $(this).toggleClass("fa-chevron-up fa-chevron-down");
        });

        $(document).on('click', '#mobile-nav .menu-has-children > a[href="#"]', function(e) {
            e.preventDefault();
            $(this).prev('i').trigger('click');
        });

        $(document).on('click', '#mobile-nav-toggle', function(e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').fadeToggle(200);
        });

        $(document).click(function(e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').removeClass('fa-times').addClass('fa-bars');
                    $('#mobile-body-overly').fadeOut(200);
                }
            }
        });
    }

    // Smooth Scroll for in-page anchors
    $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function(e) {
        if (this.hash && location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                e.preventDefault();
                var top_space = 0;
                if ($('#header').length) {
                    top_space = $('#header').outerHeight();
                }
                $('html, body').animate({
                    scrollTop: target.offset().top - top_space
                }, 800, 'easeInOutExpo');
                if ($(this).parents('.nav-menu').length) {
                    $('.nav-menu .menu-active').removeClass('menu-active');
                    $(this).closest('li').addClass('menu-active');
                }
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').removeClass('fa-times').addClass('fa-bars');
                    $('#mobile-body-overly').fadeOut(200);
                }
                return false;
            }
        }
    });

    // Magnific Popup
    if ($.fn.magnificPopup && $('.portfolio-popup').length) {
        $('.portfolio-popup').magnificPopup({
            type: 'image',
            removalDelay: 300,
            mainClass: 'mfp-fade',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out',
                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
    }

    // Testimonials Carousel
    if ($.fn.owlCarousel && $(".testimonials-carousel").length) {
        $(".testimonials-carousel").owlCarousel({
            autoplay: true,
            dots: true,
            loop: true,
            responsive: {
                0: { items: 1 },
                768: { items: 2 },
                992: { items: 3 }
            }
        });
    }
});
