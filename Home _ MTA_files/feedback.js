(function ($, Drupal) {
  'use strict';

  var $captcha = null;

  function verifyCaptcha () {
    $captcha.removeClass('error error-expired');
  }

  // Adding aria attributes for Google Captcha.
  function captchaAttributes () {
    window.setTimeout(function () {
      var textarea = [];
      textarea = document.getElementById('g-recaptcha-response');

      textarea.setAttribute('aria-hidden', 'true');
      textarea.setAttribute('aria-label', 'Captcha Textarea');
      textarea.setAttribute('aria-readonly', 'true');

      $captcha.attr('tabindex', '0');
      $captcha.attr('aria-label', 'Challenge response test to determine if you are a human.');
      $('#div-recaptcha iframe').attr({ 'aria-hidden': true } );
    }, 3000);
  }

  function bindEvents () {
    $('.modal-button').on('click', function () {
      var identification = $(this).attr('href');

      $(identification).attr('aria-hidden', false);
      $(identification).find('.modal-dialog').focus();
      $(identification).find('.close').attr('aria-hidden', false);
      $(identification).find('.form-submit').attr('aria-hidden', false);
    });
  }

  function expiredCaptcha () {
    setTimeout(function () {
      $captcha.addClass('error-expired');
    });
  }

  Drupal.behaviors.cleanFeedbackForm = {
    attach: function (context, settings) {
      window.verifyCaptcha = verifyCaptcha;
      window.expiredCaptcha = expiredCaptcha;
      $captcha = $('#div-recaptcha');

      $('#feedback-form-popup', context).on('show.bs.modal', function () {
        $(this).find('form')[0].reset();
        $(this).find('#div-recaptcha').removeClass('error error-expired');
        grecaptcha.reset();
        captchaAttributes();
      });

      if ($captcha.hasClass('error')){
        setTimeout(function(){
          $captcha.focus();
        });
      }

      bindEvents();
    }
  }

  Drupal.behaviors.thumbsFeedback = {
    attach: function (context, settings) {
      const infolocal = JSON.parse(localStorage.getItem('feedbackData')) || {};

      if (Object.keys(infolocal).length) {
        $.each(infolocal, function (key, value) {
          $('#' + value.id).addClass('sent').parents('.timeline-content').addClass('submitted');
        });
      }

      $('.feedback-button', context).click(function () {
        const $this = $(this);
        $this.parents('.timeline-content').find('.feedback-button.sent').removeClass('sent');
        localData($this.attr('id'), $this.data('key'), $this.find('.text').text());
        $this.addClass('sent').parents('.timeline-content').addClass('submitted');
      });
    }
  }

  function localData (id, key, value) {
    const feedbackData = JSON.parse(localStorage.getItem('feedbackData')) || {}
    delete feedbackData[key];

    feedbackData[key] = {
      id: id,
      value: value
    }

    localStorage.setItem('feedbackData', JSON.stringify(feedbackData));
  }

}(jQuery, Drupal));
