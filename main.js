(function () {
  'use strict';

  function Modal(element) {
    this.initialize(element);
  }

  Modal.prototype = {
    initialize: function (element) {
      this.$element = element;
      this.$container = $('#modal');
      this.$contents = $('#modal-contents');
      this.$overlay = $('#modal-overlay');
      this.$parents = this.$element.parents('ul');
      this.$window = $(window);
      this.handleEvents();
    },
    handleEvents: function () {
      var self = this;
      this.$parents.on('click', 'a', function (event) {
        self.show(event);
        return false;
      });

      this.$container.on('click', '#modal-close', function () {
        self.hide();
        return false;
      });

      this.$overlay.on('click', function () {
        self.hide();
        return false;
      });

      this.$container.on('click', '#modal-next', function (event) {
        self.next(event);
        return false;
      });

      this.$container.on('click', '#modal-prev', function (event) {
        self.prev(event);
        return false;
      });

      this.$window.on('load resize', function () {
        self.resize();
      });
    },
    show: function (event) {
      var $target = $(event.currentTarget),
        src = $target.attr('href');
      this.$contents.html('<img src="' + src + '" />');
      this.$container.fadeIn();
      this.$overlay.fadeIn();

      var index = $target.data('index');
      this.countChange = this.createCount(index, this.$element.length);
      return false;
    },
    hide: function () {
      this.$container.fadeOut();
      this.$overlay.fadeOut();
    },
    slide: function (index) {
      this.$contents.find('img').fadeOut({
        complete: function () {
          var src = $('[data-index="' + index + '"]').find('img').attr('src');
          $(this).attr('src', src).fadeIn();
        }
      });
    },
    createCount: function (index, len) {
      return function (num) {
        return index = (index + num + len) % len;
      };
    },
    next: function () {
      this.slide(this.countChange(1));
    },
    prev: function () {
      this.slide(this.countChange(-1));
    },
    resize: function () {
      var width = this.$window.width();
      if (width < 640) {
        this.$container.css({'width': '320', 'height': '213'});
      } else {
        this.$container.css({'width': '750', 'height': '500'});
      }
    }
  };

  var modal = new Modal($('#modal-thumb a'));

  $('#more-btn').on('click', function () {
    var html = '<li>\
      <a href="./images/photo-04.JPG" data-index="3">\
      <img alt="" src="images/photo-04.JPG">\
      </a>\
      </li>';
    $(html).appendTo($('#modal-thumb')).hide().fadeIn();
    $(this).fadeOut();
    modal.$element = $('#modal-thumb a');
  });
}());
