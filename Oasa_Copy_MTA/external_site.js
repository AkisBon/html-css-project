(function ($, Drupal) {
  'use strict';

  var defaults = {
    screenWidth: $(window).width(),
    breakpoints: {
      mobile: 767,
      tablet: 959
    }
  };

  function bindEvents() {
    loadResponsiveImage();
    loadSubmenus();
    translate();
    loadConfirmation();
  }

  function loadResponsiveImage() {
    if (navigator.userAgent.search("MSIE") >= 0 ||
          (!(window.ActiveXObject) && "ActiveXObject" in window) ||
          navigator.userAgent.indexOf("Edge") >= 0 ||
          (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) ||
            navigator.userAgent.search("Opera") >= 0) {
      //code goes here
      var arrayPictures = $('body').find('picture');
      changeImage(arrayPictures);

      $(window).resize(function() {
        defaults.screenWidth = $(window).width();
        changeImage(arrayPictures);
      });
    }

    function changeImage(arrayPictures) {
      if (defaults.screenWidth <= defaults.breakpoints.mobile) {
        loadNewImage(arrayPictures, 'imgMobile');

      } else if (defaults.screenWidth <= defaults.breakpoints.tablet) {
        loadNewImage(arrayPictures, 'imgTablet');

      } else {
        loadNewImage(arrayPictures, 'imgDesktop');
      }
    }

    function loadNewImage(arrayPictures, target) {
      $.each(arrayPictures, function() {
        var imgBox = $(this).find('img');

        imgBox.attr('src', imgBox.data(target));
      });
    }
  }

  function loadSubmenus() {
    $('.wrapper-menu .dropdown').on('click', function() {
      if (defaults.screenWidth > defaults.breakpoints.tablet) {
        $(this).find('.bg-submenu').css('height', $(this).find('.dropdown-menu').css('height'));
      } else {
        $('.bg-submenu-mobile').css('height', $('.menu.nav').css('height'));
      }
    });
  }

  function translate() {
    $('body').on('DOMSubtreeModified', '#google_translate_element2', function(){
      if($('#goog-gt-tt').length > 0) {
        $('#goog-gt-tt').remove();
      }
    });
  }

  function loadConfirmation() {
    // Process the call to modal.
    var confirmationModal = '',
        $lastActiveElement = '';

    $('a.mta-external-site').once().on('show.bs.confirmation', function () {
      $('body').append('<div class="popover-backdrop"></div>');
    });

    $('a.mta-external-site').on('hidden.bs.confirmation', function () {
      $('.popover-backdrop').remove();
    });

    $('a.mta-external-site').attr('target','_blank').confirmation({
      btnCancelClass: 'secondary-light-button cancel',
      btnCancelLabel: 'Cancel',
      btnOkClass: 'primary-dark-button ok',
      btnOkLabel: 'Proceed',
      container: 'body',
      content: 'You are now being redirected to our old site. Would you like to proceed?',
      title: 'Back to our old site',
      placement: function(context, source) {
        var topValue = $(document).scrollTop() + 130;
        confirmationModal = context.id;

        window.setTimeout(function () {
          $(context).css('top', topValue + 'px');
        }, 0);
      },
    }).on('shown.bs.confirmation', function() {
      var $modal = $('#' + confirmationModal);

      $lastActiveElement = document.activeElement;
      $modal.find('.arrow').remove();
      $modal.find('.confirmation-content').attr('id', 'confirmation-content');
      $modal.find('.popover-title').attr('id', 'popover-title');
      $modal.attr('tabindex', 0).attr('aria-describedby', 'confirmation-content')
              .attr('aria-labelledby', 'popover-title').attr('role', 'dialog').focus();
      $modal.find('.ok').attr('aria-label', 'Click to Confirm.').attr('aria-hidden', false);
      $modal.find('.cancel').attr('aria-label', 'Click to Cancel.').attr('aria-hidden', false).on('click', function() {
        $lastActiveElement.focus();
      });

      $(document).keyup(function(event) {
        if (event.which==27) {
          $lastActiveElement.focus();
        }
      });
    });
  }

  Drupal.behaviors.mtaExternalSite = {
    attach: function(context, settings) {
      var externalLinks = $('a.mta-external-site'),
          textExternal = '';

      $.each(externalLinks, function() {
        var $this = $(this);

        if ($this.find('.link-title').length > 0) {
          textExternal = $this.find('.link-title').text();
        } else {
          textExternal = $this.text();
        }

        $this.attr('aria-label', 'Click to open a confirmation modal to open link ' + textExternal + ' in a new tab').attr('aria-hidden', false).attr('role', 'button');
      });

      bindEvents();
    }
  }

}(jQuery, Drupal));
