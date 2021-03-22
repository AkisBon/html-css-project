/**
 * @file
 * Extends the Drupal AJAX functionality to integrate the dialog API.
 */

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.slideShow = {
    attach: function (context, settings) {
      $('.paragraph-slideshow').slick({
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><span class="icon-chevron-left"></span></button>',
        nextArrow: '<button type="button" class="slick-next"><span class="icon-chevron-right"></span></button>',
      });
    }
  }
;
})(jQuery, Drupal);
