(function ($, Drupal) {
    'use strict';
    Drupal.behaviors.customPassword = {
        attach: function (context, settings) {
            $('[data-drupal-selector="edit-s-phone"]').mask('(000) 000-0000');
            $('[data-drupal-selector="edit-p-phone"]').mask('(000) 000-0000');

            $('[data-drupal-selector="edit-h-phone"]').mask('(000) 000-0000');
            $('[data-drupal-selector="edit-c-phone"]').mask('(000) 000-0000');
            $('[data-drupal-selector="edit-m-phone"]').mask('(000) 000-0000');
            $('[data-drupal-selector="edit-cell2"]').mask('(000) 000-0000');
            $('[data-drupal-selector="edit-textmessage"]').mask('(000) 000-0000');
            $('[data-drupal-selector="edit-work"]').mask('(000) 000-0000');
            $('[data-drupal-selector="edit-primary-pickup"]').mask('(000) 000-0000');

            $('input[readonly]').focus(function(){
                this.blur();
            });

            $(".accesibility-dropdown").on('click', function (event) {
                event.preventDefault();
                $(".accesibility-control-block").toggle();
                if ($('.accesibility-control-block').is(':visible')) {
                    $('.accesibility-dropdown > span').addClass('icon-chevron-up').removeClass('icon-chevron-down');
                    $('.accesibility-dropdown').attr('aria-label', 'Show Less');
                } else {
                    $('.accesibility-dropdown > span').addClass('icon-chevron-down').removeClass('icon-chevron-up');
                    $('.accesibility-dropdown').attr('aria-label', 'Show More');
                }
            });

            // For inquiry form we are using localstorage
            $('.inquiryform .color-option > a').each(function () {
                $(this).on('click', function (event) {
                    event.preventDefault();
                    var id = $(this).attr('id');
                    if (id === 'default-theme') {
                        localStorage.removeItem("colorTheme");
                        $('body').removeClass('blue-theme black-theme beige-theme');
                        $('[data-drupal-selector="edit-color-options"]').val('DEF');
                    }
                    if (id === 'blue-theme') {
                        localStorage.setItem('colorTheme', 'blue-theme');
                        $('body').addClass(localStorage.getItem("colorTheme")).removeClass('default-theme black-theme beige-theme');
                        $('[data-drupal-selector="edit-color-options"]').val('BLU');
                    }
                    if (id === 'black-theme') {
                        localStorage.setItem('colorTheme', 'black-theme');
                        $('body').addClass(localStorage.getItem("colorTheme")).removeClass('default-theme blue-theme beige-theme');
                        $('[data-drupal-selector="edit-color-options"]').val('BLK');
                    }
                    if (id === 'beige-theme') {
                        localStorage.setItem('colorTheme', 'beige-theme');
                        $('body').addClass(localStorage.getItem("colorTheme")).removeClass('default-theme black-theme blue-theme');
                        $('[data-drupal-selector="edit-color-options"]').val('BEI');
                    }
                });
            });

            // For myccount accessibility setting
            $('.myaccount .color-option > a').each(function () {
                $(this).on('click', function (event) {
                    event.preventDefault();
                    $('.myaccount .color-option > a').removeClass('active');
                    $(this).addClass('active');
                    var id = $(this).attr('id');
                    if (id === 'default-theme') {
                        $('body').removeClass('blue-theme black-theme beige-theme');
                        $('[data-drupal-selector="edit-color-options"]').val('DEF');
                    }
                    if (id === 'blue-theme') {
                        $('body').addClass('blue-theme').removeClass('default-theme black-theme beige-theme');
                        $('[data-drupal-selector="edit-color-options"]').val('BLU');
                    }
                    if (id === 'black-theme') {
                        $('body').addClass('black-theme').removeClass('default-theme blue-theme beige-theme');
                        $('[data-drupal-selector="edit-color-options"]').val('BLK');
                    }
                    if (id === 'beige-theme') {
                        $('body').addClass('beige-theme').removeClass('default-theme black-theme blue-theme');
                        $('[data-drupal-selector="edit-color-options"]').val('BEI');
                    }
                });
            });

            $("#reset").click(function (event) {
                event.preventDefault();
                localStorage.removeItem("textresize");
                localStorage.removeItem("lineheightsize");
                localStorage.setItem("textresize", "16px");
                $("body").animate({fontSize: localStorage.getItem("textresize")}, 100);
                $("body").removeClass(localStorage.getItem('lineHeight'));
                localStorage.removeItem('lineHeight');
                $('[data-drupal-selector="edit-text-resize"]').val('RG');
            });

            var currentFontSize = $("body").css('font-size');
            var myaccount_path = window.location.pathname;
            if (myaccount_path.indexOf("/myaccount/") >= 0){
              localStorage.setItem("textresize", currentFontSize);
            }
            var arr = {0: currentFontSize, 1: '19px', 2: '22px', 3: '24px'};
            var text_options = {0: 'RG', 1: 'LG', 2: 'XL', 3: 'XXL'};
            var currentkey = '';

            $("#small-text", context).on('click', function (event) {
                event.preventDefault();
                $.each(arr, function (key, value) {
                    if (value === localStorage.getItem("textresize")) {
                        currentkey = key;
                    }
                });
                if (currentkey && typeof (arr[parseInt(currentkey) - 1]) !== 'undefined') {
                    localStorage.setItem("textresize", arr[parseInt(currentkey) - 1]);
                    $('[data-drupal-selector="edit-text-resize"]').val(text_options[parseInt(currentkey) - 1]);
                    $("body").animate({fontSize: localStorage.getItem("textresize")}, 100);
                    if (localStorage.getItem("textresize") === '16px') {
                        $("body").removeClass(localStorage.getItem('lineHeight'));
                    } else {
                        $("body").addClass(localStorage.getItem('lineHeight'));
                    }
                }
            });

            $("#large-text", context).on('click', function (event) {
                event.preventDefault();
                localStorage.setItem('lineHeight', "text-resize line-height-normal");
                $.each(arr, function (key, value) {
                    if (value === localStorage.getItem("textresize")) {
                        currentkey = key;
                    }
                });
                if (currentkey && typeof (arr[parseInt(currentkey) + 1]) !== 'undefined') {
                    localStorage.setItem("textresize", arr[parseInt(currentkey) + 1]);
                    $('[data-drupal-selector="edit-text-resize"]').val(text_options[parseInt(currentkey) + 1]);
                    $("body").animate({fontSize: localStorage.getItem("textresize")}, 100);
                    $("body").addClass(localStorage.getItem('lineHeight'));
                }
            });
            // Text Resize functionality ENDs here.

            $('.trip-dropdown').on('click', function (event) {
                event.preventDefault();
                var status = $(this).parent('.trip-dashboard-title').next('.trip-dashboard-details');
                if ($(status).hasClass('hide')) {
                    $(status).removeClass('hide');
                    $(this).find('.icon').removeClass('icon-chevron-down').addClass('icon-chevron-up');
                } else {
                    $(status).addClass('hide');
                    $(this).find('.icon').removeClass('icon-chevron-up').addClass('icon-chevron-down');
                }
            });

            $('.popup-close').on('click', function (event) {
                event.preventDefault();
                $('#modalpopup').remove();
            });

            if($("#mapContainer").length > 0){
                var $window = $(window);
                var $sidebar = $("#mapContainer");
                var sidebarTop = $sidebar.offset().top;
                var $footer = $(".footer");
                var footerTop = $footer.offset().top - 70;

                $window.resize(function(){
                    if($window.width() >= 768 ){

                        var c_window = $('.main-container').width();
                        var right_width = (($window.width() - c_window)/2) - 10;
                        var leftbar_width = $('.subscription-details-block').width();

                        var scrollTop = $window.scrollTop();
                        var topPosition = Math.max(0, sidebarTop - scrollTop);

                        var resize_width = c_window - leftbar_width;

                        if(scrollTop >= sidebarTop){
                            // Ensure you are using the current sidebar height and not the initial height
                            topPosition = Math.min(topPosition, (footerTop - scrollTop) - $sidebar.height());

                            $sidebar.addClass('fixed');
                            $sidebar.css('top', topPosition);
                            $('#mapContainer').css({
                                'width': resize_width,
                                'right': right_width
                            });
                        } else {
                            $sidebar.removeClass('fixed');
                            $('#mapContainer').css({
                                'width': resize_width,
                                'right': 0
                            });
                        }
                    }else{
                        $sidebar.removeClass('fixed');
                        $('#mapContainer').css({
                            'width': '100%',
                            'right': 0,
                            'top':0
                        });
                    }
                });

                if($window.width() >= 768 ){
                    $window.scroll(function () {
                        if($window.width() >= 768 ){

                            var map_width = $sidebar.width() + 20;
                            var c_window = $('.main-container').width();
                            var right_width = (($window.width() - c_window)/2) - 10;

                            var scrollTop = $window.scrollTop();
                            var topPosition = Math.max(0, sidebarTop - scrollTop);
                            if(scrollTop >= sidebarTop){
                                // Ensure you are using the current sidebar height and not the initial height
                                topPosition = Math.min(topPosition, (footerTop - scrollTop) - $sidebar.height());

                                $sidebar.addClass('fixed');
                                $sidebar.css('top', topPosition);
                                $('#mapContainer').css({
                                    'width': map_width,
                                    'right': right_width
                                });
                            } else {
                                $sidebar.removeClass('fixed');
                                $('#mapContainer').css({
                                    'width': map_width,
                                    'right': 0
                                });
                            }
                        }
                    });
                } else {
                    $sidebar.removeClass('fixed');
                }
            }

            //$("#password-policy-status").insertAfter(".user-register-form .form-item-pass-pass1");
            $(".pass1-empty-error").insertAfter(".form-item-pass-pass1");
            $(".pass2-empty-error").insertAfter(".form-item-pass-pass2");
            $('.pass1-policy').insertAfter(".form-item-pass-pass1");

            //Tooltip display on focus of password field.
            $(".user-register-form .form-item-pass-pass1", context).focusin(function () {
                $('.password-tooltip').css("display", "block");
            });
            // Show password functionality
            $(".pwd-see :password").after("<span class='shwpd eye-close' area-label='show password'></span>");
            // To toggle the images.
            $(this).toggleClass("eye-close eye-open");
            $(".shwpd").on('click', function () {

                var pwd_clk_nme = $(this).prev(':password').attr('name');

                // If two password fields are there, then stop both from acting.
                if ($(this).prev(':password').attr('name') == pwd_clk_nme) {

                    // To toggle the images.
                    $(this).toggleClass("eye-close eye-open");

                    // Get the classnames of clicked element.
                    var classNames = $(this).attr("class").toString().split(' ');
                    $.each(classNames, function (i, className) {

                        if (className == 'eye-open') {
                            $('.eye-open').prev(':password').prop('type', 'text');
                            $(".current_pass", context).focusin(function () {
                                $('.password-field').prop('type', 'text');
                            });
                        } else if (className == 'eye-close') {
                            $('.eye-close').prev(':text').prop('type', 'password');
                            $(".current_pass", context).focusin(function () {
                                $('.password-field').prop('type', 'password');
                            });
                        }
                    });
                }
            });

            //Validate email on focusout of email on user register
            $('.user-register-form .form-type-email', context).focusout(function () {
                var user_email = $('.user-register-form .form-type-email input').val();
                if (focusout(user_email, 'email-custom-error') === false) {
                    $('.email-custom-error').prev('.form-item').addClass('error');
                    if (user_email === "") {
                        $('.email-empty-error').show();
                    } else {
                        $('.email-empty-error').hide();
                    }
                    return false;
                } else {
                    $('.email-custom-error').prev('.form-item').removeClass('error');
                    $('.email-custom-error,.email-empty-error').hide();
                    $('.form-item--error-message').hide();
                }
            });

            //Hide Tooltip and display password policy status
            $(".user-register-form .form-item-pass-pass1", context).focusout(function () {
                $('.password-tooltip').css('display', 'none');
                $('.pass1-empty-error').css('display', 'none');
                $(this).removeClass('error');
                var pass1 = $('.user-register-form .form-item-pass-pass1 input').val();
                if (pass1 !== "") {
                    if (!validatePassword(pass1)) {
                        $('.pass1-policy').css('display', 'block');
                        $('.form-type-password-confirm').addClass('error');
                        return false;
                    } else {
                        $('.pass1-policy').css('display', 'none');
                        $('.form-type-password-confirm').removeClass('error');
                    }
                }
            });

            //Checking password and confirm password
            $('.user-register-form .form-item-pass-pass2', context).focusout(function () {
                if ($('.password-confirm').val() !== "") {
                    if ($('.password-field').val() !== $('.password-confirm').val()) {
                        $('.custom-error').css('display', 'block');
                        $('.custom-error').prev('.form-item').addClass('error');
                        $('.pass2-empty-error').css('display', 'none');
                    } else {
                        $('.custom-error').css('display', 'none');
                        $('.pass2-empty-error').css('display', 'none');
                        $('.form-type-password-confirm,.form-item-pass-pass2').removeClass('error');
                    }
                }
            });

            $('.user-register-form .field--name-field-aar-id', context).focusout(function () {
                var aar_id = $.trim($('.user-register-form .field--name-field-aar-id input').val());
                if (aar_id === "") {
                    $('.user-register-form .form-item-field-aar-id-0-value').addClass('error');
                    $(this).find('.form-item--error-message').hide();
                    $('.arr-error').show();
                    return false;
                } else {
                    $('.user-register-form .form-item-field-aar-id-0-value').removeClass('error');
                    $(this).find('.form-item--error-message').hide();
                    $('.arr-error').hide();
                }
            });

            $('.user-register-form .field--name-field-first-name', context).focusout(function () {
                var first_name = $.trim($('.user-register-form .field--name-field-first-name input').val());
                if (first_name === "") {
                    $('.firstname-error').prev('.field--name-field-first-name').addClass('error');
                    $('.firstname-error').show();
                    return false;
                } else {
                    $('.firstname-error').prev('.field--name-field-first-name').removeClass('error');
                    $('.firstname-error').hide();
                }
            });

            $('.user-register-form .field--name-field-last-name', context).focusout(function () {
                var last_name = $.trim($('.user-register-form .field--name-field-last-name input').val());
                if (last_name === "") {
                    $('.lastname-error').prev('.field--name-field-last-name').addClass('error');
                    $('.lastname-error').show();
                    return false;
                } else {
                    $('.lastname-error').prev('.field--name-field-last-name').removeClass('error');
                    $('.lastname-error').hide();
                }
            });

            $('.user-register-form .field--name-field-date-of-birth', context).focusout(function () {
                var dob = $.trim($('.user-register-form .field--name-field-date-of-birth input').val());
                if (dob === "") {
                    $('.dateofbirth-error').prev('.field--name-field-date-of-birth').addClass('error');
                    $('.dateofbirth-error').show();
                    return false;
                } else {
                    $('.dateofbirth-error').prev('.field--name-field-date-of-birth').removeClass('error');
                    $('.dateofbirth-error').hide();
                }
            });

            //Validation for signup form
            $(".user-register-form").submit(function () {
                var email = $.trim($('.user-register-form .form-type-email input').val());
                var pass = $('.user-register-form .form-item-pass-pass1 input').val();
                var confirmpass = $('.user-register-form .form-item-pass-pass2 input').val();
                //var aarCheck = $(aar_checkbox).is(':checked');
                var aarid = $.trim($('.user-register-form .field--name-field-aar-id input').val());
                var firstname = $.trim($('.user-register-form .field--name-field-first-name input').val());
                var lastname = $.trim($('.user-register-form .field--name-field-last-name input').val());
                var dateofbirth = $('.user-register-form .field--name-field-date-of-birth input').val();

                if (email === "" || pass === "" || confirmpass === "" || aarid === "" || firstname === "" || lastname === "" || dateofbirth === "") {
                    if (email === "") {
                        $('.email-empty-error').css('display', 'block');
                        $('.user-register-form .form-type-email').addClass('error');
                        $('.user-register-form .form-type-email input').focus();
                    }
                    if (focusout(email, 'email-custom-error') === false) {
                        $('.user-register-form .form-type-email').addClass('error');
                        $('.form-item-mail .form-item--error-message').hide();
                    }
                    if (pass === "") {
                        $('.pass1-empty-error').css('display', 'block');
                        $('.form-item-pass-pass1').addClass('error');
                        $('.pass1-policy').css('display', 'none');
                    }
                    if (confirmpass === "") {
                        $('.pass2-empty-error').css('display', 'block');
                        $('.form-item-pass-pass2').addClass('error');
                        $('.custom-error').css('display', 'none');
                    }
                    if (aarid === "") {
                      $('.arr-error').css('display', 'block');
                      $('.user-register-form .form-item-field-aar-id-0-value').addClass('error');
                    }
                    if (firstname === "") {
                      $('.firstname-error').css('display', 'block');
                      $('.firstname-error').prev('.field--name-field-first-name').addClass('error');
                    }

                    if (lastname === "") {
                      $('.lastname-error').css('display', 'block');
                      $('.lastname-error').prev('.field--name-field-last-name').addClass('error');
                    }

                    if (dateofbirth === "") {
                      $('.dateofbirth-error').css('display', 'block');
                      $('.dateofbirth-error').prev('.field--name-field-date-of-birth').addClass('error');
                    }
                    return false;
                } else {
                    if (focusout(email, 'email-custom-error') === false) {
                        $('.user-register-form .form-type-email').addClass('error');
                        $('.form-item-mail .form-item--error-message').hide();
                        return false;
                    }
                    if (pass !== confirmpass) {
                        $('.custom-error').css('display', 'block');
                        $('.form-type-password-confirm').addClass('error');
                        $('.pass2-empty-error').css('display', 'none');
                        return false;
                    } else {
                        if (!validatePassword(pass)) {
                            $('.pass1-policy').css('display', 'block');
                            $('.form-type-password-confirm').addClass('error');
                            return false;
                        } else {
                            $('.custom-error').prev('.form-item').removeClass('error');
                            $('.custom-error').css('display', 'none');
                            $('.pass1-policy').css('display', 'none');
                        }
                    }
                }

            });

            $(".user-login-form .form-item-name", context).focusout(function () {
                var email_aar_id = $.trim($('.user-login-form .form-item-name input').val());
                if (email_aar_id !== "") {
                    $('.user-login-form .form-item-name').removeClass('error');
                    $('.user-login-form .email-empty-error').hide();
                    $('.form-item--error-message').hide();
                }
            });

            $(".user-login-form .form-item-pass", context).focusout(function () {
                var sigin_in_pass = $.trim($('.user-login-form .form-item-pass input').val());
                if (sigin_in_pass === "") {
                    $('.user-login-form .form-item-pass').addClass('error');
                    $('.user-login-form .pass1-empty-error').show();
                } else {
                    $('.user-login-form .form-item-pass').removeClass('error');
                    $('.user-login-form .pass1-empty-error').hide();
                }
            });

            $('.user-login-form').submit(function () {
                var s_email = $.trim($('.user-login-form .form-item-name input').val());
                var s_pass = $('.user-login-form .form-item-pass input').val();
                if (s_email === "" || s_pass === "") {
                    if (s_email === "") {
                        $('.user-login-form .form-item-name').addClass('error');
                        $('.user-login-form .form-item-name input').focus();
                        $('.user-login-form .email-empty-error').show();
                    }
                    if (s_pass === "") {
                        $('.user-login-form .form-item-pass').addClass('error');
                        $('.user-login-form .pass1-empty-error').show();
                    }
                    return false;
                } else {
                    $('.user-login-form .form-item-name').removeClass('error');
                    $('.user-login-form .form-item-pass').removeClass('error');
                    $('.user-login-form .email-empty-error').hide();
                    $('.user-login-form .pass1-empty-error').hide();
                }
            });


            //Validation for forgot password form
            $(".user-pass .form-type-textfield", context).focusout(function () {
                var email = $.trim($('.user-pass .form-type-textfield input').val());
                if (focusout(email, 'custom-error') === false) {
                    $('.custom-error').prev('.form-item').addClass('error');
                    $('.email-empty-error').hide();
                    $('.form-item--error-message').hide();
                    return false;
                } else {
                    $('.user-pass .form-type-textfield').removeClass('error');
                    $('.custom-error').hide();
                    $('.form-item--error-message').hide();
                    $('.email-empty-error').hide();
                }
            });

            $(".user-pass").submit(function () {
                var email = $.trim($('.user-pass .form-type-textfield input').val());
                if (email !== "") {
                    if (focusout(email, 'custom-error') === false) {
                        $('.custom-error').prev('.form-item').addClass('error');
                        $('.email-empty-error').hide();
                        $('.form-item--error-message').hide();
                        return false;
                    }
                } else {
                    $('.user-pass .form-type-textfield').addClass('error');
                    $('.user-pass .form-type-textfield input').focus();
                    $('.custom-error').hide();
                    $('.email-empty-error').show();
                    $('.form-item--error-message').hide();
                    return false;
                }
                $('.user-pass .form-type-textfield').removeClass('error');
                $('.custom-error').hide();
                $('.form-item--error-message').hide();
                $('.email-empty-error').hide();
            });

            //Tooltip display on focusin of password field of user reset form
            $(".user-pass-reset .form-item-pass-pass1", context).focusin(function () {
                $('.password-tooltip').css("display", "block");
            });

            //Tooltip display on focusout of password field of user reset form
            $(".user-pass-reset .form-item-pass-pass1", context).focusout(function () {
                $('.password-tooltip').css("display", "none");
                var reset_pass = $('.user-pass-reset .form-item-pass-pass1 input').val();
                if (reset_pass !== "") {
                    if (!validatePassword(reset_pass)) {
                        $('.user-pass-reset .form-item-pass-pass1').addClass('error');
                        $('.user-pass-reset .pass1-policy').show();
                        $(".user-pass-reset .pass1-empty-error").hide();
                    } else {
                        $('.user-pass-reset .pass1-policy').hide();
                        $('.user-pass-reset .form-item-pass-pass1').removeClass('error');
                        $(".user-pass-reset .pass1-empty-error").hide();
                    }
                } else {
                    $('.user-pass-reset .form-item-pass-pass1').addClass('error');
                    $(".user-pass-reset .pass1-empty-error").show();
                    $('.user-pass-reset .pass1-policy').hide();
                }
            });

            //Validation for password reset form
            $('.user-pass-reset .form-item-pass-pass2').focusout(function () {
                var reset_pass_val = $('[data-drupal-selector="edit-pass-pass1"]').val();
                var reset_confirm_pass_val = $('[data-drupal-selector="edit-pass-pass2"]').val();
                if (reset_confirm_pass_val !== "") {
                    if (reset_pass_val !== reset_confirm_pass_val) {
                        $('.user-pass-reset .form-item-pass-pass2').addClass('error');
                        $('.user-pass-reset .custom-error').css('display', 'block');
                        $(".user-pass-reset .pass2-empty-error").hide();
                        return false;
                    } else {
                        $(".user-pass-reset .pass2-empty-error").hide();
                        $('.user-pass-reset .custom-error').css('display', 'none');
                        $('.user-pass-reset .form-item-pass-pass2').removeClass('error');
                    }
                } else {
                    $('.user-pass-reset .form-item-pass-pass2').addClass('error');
                    $(".user-pass-reset .pass2-empty-error").show();
                    $('.user-pass-reset .custom-error').css('display', 'none');
                }
            });

            $('.user-pass-reset').submit(function () {
                var pass = $(".user-pass-reset .form-item-pass-pass1.password-parent > input").val();
                var confirm_pass = $(".user-pass-reset .form-item-pass-pass2 > input").val();
                if (pass !== "" && confirm_pass !== "") {
                    if (pass !== confirm_pass) {
                        $('.user-pass-reset .custom-error').css('display', 'block');
                        return false;
                    } else if (!validatePassword(pass)) {
                        $('.user-pass-reset .pass1-policy').show();
                        return false;
                    } else {
                        $('.user-pass-reset .form-item-pass-pass1').removeClass('error');
                        $('.user-pass-reset .form-item-pass-pass1').removeClass('error');
                        return true;
                    }
                } else {
                    if (pass === "" || confirm_pass === "") {
                        if (pass === "") {
                            $('.user-pass-reset .form-item-pass-pass1').addClass('error');
                            $(".user-pass-reset .pass1-empty-error").show();
                        }
                        if (confirm_pass === "") {
                            $('.user-pass-reset .form-item-pass-pass2').addClass('error');
                            $(".user-pass-reset .pass2-empty-error").show();
                        }
                        return false;
                    }
                }
            });

        }
    };

    // :Accessibility: Error message read functionality for screen readers
   /* $(".form-checkbox").focusin(function () {
        $(".form-checkbox").attr('aria-invalid', 'true');
        $(".form-checkbox").attr('role', 'alertdialog');
    }); */

    //Whole div clickable for Trip listing
    $('.trip-schedule-details').on('click', function () {
        var tripid = $(this).attr('data-trip-url');
        window.location.href = tripid;
    });

    var url = window.location.pathname;
    // Will only work if string in href matches with location
    $('.my-account ul.nav li a[href="' + url + '"]').parent('li').addClass('active');

    // Will also work for relative and absolute hrefs
    $('.my-account ul.nav li a').filter(function () {
        return this.href === url;
    }).parent('li').addClass('active');

    $('.myaccountlinks').on('click', function () {
        $('.myaccountlinks').parent('li').removeClass('active');
        $(this).parent('li').addClass('active');
    });

    $('ul .myaccountlinks').each(function () {
        if ($(this).attr('href') === url) {
            var text = $(this).text();
            $('.mobiletext').text(text);
        }
    });

    $('.search-icon').on('click', function () {
        $('.block-views-exposed-filter-blockacquia-search-page').toggle("slow");
    });

    $(window).on("load", function () {
        $(".user-login-form #edit-persistent-login").prop('checked', true);
        $(".user-pass-reset .form-item-pass-pass1 input").attr('data-original-title', '');

        if ($.trim($('.alert-dismissible .error-message').text()).length === 0) {
            $('.alert-dismissible').hide();
        } else {
            $('.alert-dismissible').show();
        }
        
        var is_safari = /^((?!chrome|android).)*(safari|msie|trident)/i.test(navigator.userAgent);
        if (is_safari){
          $('.aar-customer-info #edit-field-date-of-birth-0-value-date').mask("0000-00-00",{
              placeholder:Drupal.t('yyyy-mm-dd')
          });
        }
        else { $('.aar-customer-info #edit-field-date-of-birth-0-value-date').attr('placeholder', Drupal.t('mm/dd/yyyy')) }


        $('.myaccount .color-option > a').each(function () {
            var color_id = $(this).attr('id');
            if($('body').hasClass(color_id)){
                $(this).addClass('active');
            }
        });

        var path = window.location.pathname;
        if (path.indexOf("/mta_inquiry/") >= 0){
            // Text Resize functionality
            if (localStorage.getItem("textresize") || localStorage.getItem("lineHeight")) {
                $("body").css("font-size", localStorage.getItem("textresize"));
                $("body").addClass(localStorage.getItem('lineHeight'));
            }

            if (localStorage.getItem("textresize") === null) {
                localStorage.setItem("textresize", "16px");
            }

            if (localStorage.getItem("colorTheme")) {
                $("body").addClass(localStorage.getItem("colorTheme"));
            }
        }


    });

    function validateEmail(sEmail) {
        var filter = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (filter.test(sEmail)) {
            return true;
        } else {
            return false;
        }
    }

    function validatePassword(pass) {
        var pass_filter = /^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/i;
        var pass_num_filter = /^(?=.*?[0-9]).{8,}$/i;
        var pass_specail_filter = /^(?=.*?[#?!@$%^&*-]).{8,}$/i;
        var pass_space = /\s/;
        if (pass_filter.test(pass) && (pass_num_filter.test(pass) || pass_specail_filter.test(pass) || pass_space.test(pass))) {
            return true;
        } else {
            return false;
        }
    }

    function focusout(val, text) {
        if (val !== "") {
            if (validateEmail(val)) {
                $('.' + text).css('display', 'none');
                return true;
            } else {
                $('.' + text).css('display', 'block');
                return false;
            }
        } else {
            return false;
        }
    }

    function forgotPassword(email) {
        if (email !== "") {
            if (focusout(email, 'custom-error') === false) {
                $('.custom-error').prev('.form-item').addClass('error');
                $('.email-empty-error').hide();
                $('.form-item--error-message').hide();
                return false;
            }
        } else {
            $('.user-pass .form-type-textfield').addClass('error');
            $('.custom-error').hide();
            $('.email-empty-error').show();
            $('.form-item--error-message').hide();
            return false;
        }
        $('.user-pass .form-type-textfield').removeClass('error');
        $('.custom-error').hide();
        $('.form-item--error-message').hide();
        $('.email-empty-error').hide();
    }

    // Browser back button lock functionality.
    var logout_redirect_url = "/user/login";
    if (window.history.state !== "back") {
        if (window.history && window.history.pushState) {
            if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
                window.history.pushState('back', null, '');
            }
            else {
                window.history.pushState('', null, '');
            }

            window.addEventListener('popstate', function() {
                var aElement = $( "a:contains('Back')" );
                if (window.location.href.indexOf(logout_redirect_url) > -1) {
                    window.history.pushState('', null, '');
                }
                else if (aElement && aElement.length) {
                    //Do nothing
                }
                else {
                    history.back("-1");
                }
            });
        }
    }

    var url = window.location.pathname;
    //console.log(url);
    // :Accessibility: My Account page
    //$('.personal-info-email .use-ajax').on('load', function () {
    // Personal information Address
    if(url == '/myaccount') {
      $(document.body).on("focus", ' .personal-info-address .myaccount-address1', function () {
        $('.personal-info-address [data-drupal-selector="edit-submit"]').attr('tabindex', '11');
        $('.personal-info-address [data-drupal-selector="edit-cancel"]').attr('tabindex', '12');
      });
      // Personal information Email
      $(document.body).on("focus", ' .personal-info-email .form-email', function () {
        $('.personal-info-email [data-drupal-selector="edit-submit"]').attr('tabindex', '16');
        $('.personal-info-email [data-drupal-selector="edit-cancel"]').attr('tabindex', '17');
      });
      // Personal information Contact Numbers
      $(document.body).on("focus", '[data-drupal-selector="edit-h-phone"]', function () {
        $('.contact_details-wrapper [data-drupal-selector="edit-submit"]').attr('tabindex', '27');
        $('.contact_details-wrapper [data-drupal-selector="edit-cancel"]').attr('tabindex', '28');
      });
      // Personal information Emergency Contact
      $(document.body).on("focus", '[data-drupal-selector="edit-firstname"]', function () {
        $('.emergency-wrapper [data-drupal-selector="edit-submit"]').attr('tabindex', '38');
        $('.emergency-wrapper [data-drupal-selector="edit-cancel"]').attr('tabindex', '39');
      });
    }
      if(url == '/myaccount/change-password') {
        // Change Password
        $(document.body).on("focus", '[data-drupal-selector="edit-current-pass"]', function () {
          $('.password-change-wrapper [data-drupal-selector="edit-pass-pass1"]').attr('tabindex', '44');
          $('.password-change-wrapper [data-drupal-selector="edit-pass-pass1"]').attr('aria-label', 'New Password is mandatory field. Your password must be at least 8 characters long and contain the following:, At least 1 uppercase letter, At least 1 lowercase letter, At least 1 number or special character');
          $('.password-change-wrapper [data-drupal-selector="edit-pass-pass2"]').attr('tabindex', '45');
          $('.password-change-wrapper [data-drupal-selector="edit-submit"]').attr('tabindex', '46');
        });
      }
        if(url == '/myaccount/notification-preferences') {
          // Notification Preferences
          $(document.body).on("focus", '#ajax-myaccount-email-form [data-drupal-selector="edit-email"]', function () {
            $('#ajax-myaccount-email-form [data-drupal-selector="edit-submit"]').attr('tabindex', '52');
            $('#ajax-myaccount-email-form [data-drupal-selector="edit-cancel"]').attr('tabindex', '53');
          });
        }
    if(url == '/myaccount/accessibility-settings') {
      // Accessibility Settings

      $(document.body).on("focus", '.page-description', function () {
        $('.button-wrapper [data-drupal-selector="edit-submit"]').attr('tabindex', '81');
        $('.button-wrapper [data-drupal-selector="edit-cancel"]').attr('tabindex', '82');
      });

      $( document ).ready(function() {
        $('#modalpopup').focus();
        $('.primary-btn').on('keydown', function (e) {
          if ($("this:focus") && (e.which == 9)) {
            $('.subtitle').focus();
            e.preventDefault();
          }
        });
        $('.subtitle').on('keydown', function (e) {
          if ($("this:focus") && (e.which == 9)) {
            if (e.shiftKey) {
              $('.primary-btn').focus();
              e.preventDefault();
            }
          }
        });
        $('#modalpopup').on('keydown', function (e) {
          if ($("this:focus") && (e.which == 9)) {
            if (e.shiftKey) {
              $('.subtitle').focus();
              e.preventDefault();
            }
          }
        });
      });
     }

  Drupal.behaviors.customPopup = {
    attach: function (context, settings) {
      $('#modalpopup').focus();

      $('.dontcancelsubtrp').on('keydown', function (e) {
          if ($("this:focus") && (e.which == 9)) {
            $('.subtitle').focus();
            e.preventDefault();
            if (e.shiftKey) {
              $('.canceltrp').focus();
              e.preventDefault();
            }
          }
        });

      //:Accessibility FeedbackForm POP UP
      $('.thankyoutext').on('keydown', function (e) {
        if ($("this:focus") && (e.which == 9)) {
          $('.complaint').focus();
          e.preventDefault();
          if (e.shiftKey) {
            $('.feedback-cancel').focus();
            e.preventDefault();
          }
        }
      });
      $('.complaint').on('keydown', function (e) {
        if ($("this:focus") && (e.which == 9)) {
          $('.popup-heading').focus();
          e.preventDefault();
          if (e.shiftKey) {
            $('.thankyoutext').focus();
            e.preventDefault();
          }
        }
      });
      $('.popup-heading').on('keydown', function (e) {
        if ($("this:focus") && (e.which == 9)) {
          if (e.shiftKey) {
            $('.complaint').focus();
            e.preventDefault();
          }
        }
      });
      $('.feedback-cancel').on('keydown', function (e) {
        if ($("this:focus") && (e.which == 9)) {
          $('.thankyoutext').focus();
          e.preventDefault();
          if (e.shiftKey) {
            $('.feedback-submit').focus();
            e.preventDefault();
          }
        }
      });

      $('.statuswait').on('keydown', function (e) {
        if ($("this:focus") && (e.which == 9)) {
          $('#modalpopup').focus();
          e.preventDefault();
          $('#modalpopup').on('keydown', function (e) {
            if (e.shiftKey) {
              $('.statuswait').focus();
              e.preventDefault();
            }
          });
        }
      });

        $('.subtitle').on('keydown', function (e) {
        if ($("this:focus") && (e.which == 9)) {
         if (e.shiftKey) {
           $('.dontcancelsubtrp').focus();
          e.preventDefault();
        }
      }
      });

        $('.path-myaccount .primary-btn').on('keydown', function (e) {
        if ($(".primary-btn") && (e.which == 9)) {
          e.preventDefault();
          $('.subtitle').focus();
        }
      });
    }
  }

}(jQuery, Drupal));

function validateLandmark(location, id) {
  jQuery.ajax({
      dataType: "json",
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyBav2JUgcBk2qZ-zuVx6Gp1Bu5ltukupVo",
      data: {},
      success: function (data) {

        if (data.status === 'OK') {
          if(id == "edit-trip-origin") {
            jQuery(".form-item-trip-origin #add-custom-error").remove();
          }
          else {
            jQuery(".form-item-trip-destination #add-custom-error").remove();
          }
          //Checking if any one of two error message present then hide the submit button else display.
          if (jQuery("#add-custom-error").length === 0) {
            jQuery("#edit-submit").removeAttr("disabled");
          }

          let content = data['results'][0]['address_components'][0]['long_name'];
          let address_component = data['results'][0]['address_components'];
          let zip,city,state;
          for (let i = 0; i < address_component.length; i++) {
            let obj_types = address_component[i]['types'];
            for (let j = 0; j < obj_types.length; j++) {

                if (obj_types[j] == "postal_code") {
                    zip = address_component[i]['short_name'];

                } else if (obj_types[j] == "sublocality_level_1") {
                    city = address_component[i]['short_name'];

                } else if (obj_types[j] == "administrative_area_level_1") {
                    state = address_component[i]['short_name'];

                }
            }

          }
          if (zip == null || city == null || state == null) {

            if(jQuery("#"+id +"#add-custom-error").length === 0) {
              jQuery("#"+id).after('<span id="add-custom-error" class="error-background">Please select a valid address.</p>');
              jQuery("#edit-submit").attr("disabled", true);
              return false;
            }

          }
        }
        else {
          if(jQuery("#"+id +"#add-custom-error").length === 0) {
            jQuery("#"+id).after('<span id="add-custom-error" class="error-background">Please select a valid address.</p>');
            jQuery("#edit-submit").attr("disabled", true);
            return false;
          }
        }

      }

  });
}

(function ($, Drupal) {
  Drupal.behaviors.popupClose = {
    attach: function (context, settings) {
      jQuery(".dropdown-toggle, .menu-button").click(function () {
        jQuery(".menu-search-form").hide();
      });

      jQuery(".icon-search").click(function () {
        jQuery('#navbar-collapse').removeClass('in');
        jQuery('.menu-button').addClass('collapsed');
      });

      jQuery('ul.myaccount-header-link a.dropdown-toggle').click(function () {
        jQuery('#navbar-collapse').removeClass('in');
      });
    }
  };
})(jQuery, Drupal);
