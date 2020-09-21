$(function () {
  'use strict'

  $(document).ready(function(){

    setTimeout(() => {
      $('.banner-container').removeClass('blur');

      initAnimation();
    }, 500);

    function initAnimation() {
      var startTimeline = anime.timeline();

      startTimeline.add({
        targets: '.map-1',
        keyframes: [
          { scale: 0, opacity: 0},
          { scale: 1, opacity: 1}
        ],
        duration: 3000,
        easing: 'easeInOutQuart'
      }, '-=1500')
      .add({
        targets: '.item',
        bottom: 15,
        opacity: 1,
        duration: 2000,
        easing: 'spring(1, 80, 10, 0)',
        delay: anime.stagger(300)
      }, '-=200')
      .add({
        targets: '.first-slide-text',
        keyframes: [
          { translateY: -20, opacity: 0},
          { translateY: 0, opacity: 1}
        ],
        duration: 1000,
        easing: 'cubicBezier(.5, .05, .1, .3)',
        complete: function (anim) {
          $(".item").addClass("can-drag");
          var itemCount= 0;
          
          $(".item").draggable({
            revert: "invalid",
            containment: ".banner-container",
            start: function () {
              $(this).addClass("item-dragging");
            },
            stop: function () {
              $(this).removeClass("item-dragging");
            },

          });

          $(".map-1").droppable({
            drop: function (event, ui) {
              const elem = ui.draggable[0];

              $(elem).css({"margin": 0, "bottom": "unset"})
              anime({
                targets: elem,
                keyframes: [
                  { translateY: 0, scale: 1, opacity: 1 },
                  { translateY: 5, scale:0, opacity: 0 },
                ],
                duration: 1000,
                easing: 'linear',
                delay: -500
              });
              if ($(".map-1").hasClass('dropped-item')) {
                $(".map-1").removeClass('dropped-item')
                setTimeout(function () {
                  $(".map-1").addClass('dropped-item');
                }, 100);
              }
              else {
                $(".map-1").addClass('dropped-item');
              }

              itemCount = itemCount + 1;

              if (itemCount === 4) {
                var endTimeline = anime.timeline();

                endTimeline.add({
                  targets: '.map-1',
                  keyframes: [
                    { scale: 1, opacity: 1 },
                    { scale: 0, opacity: 0 }
                  ],
                  duration: 2000,
                  easing: 'easeInOutQuart'
                })
                .add({
                  targets: '.first-slide-text',
                  translateY: -50,
                  opacity: 0,
                  duration: 1000,
                  easing: 'easeInOutQuart',
                }, '-=1000')
                .add({
                  targets: '.bg-1',
                  opacity: 0,
                  duration: 1000,
                  easing: 'easeInOutQuart',
                }, '-=600')
                .add({
                  targets: '.map-2',
                  keyframes: [
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1 }
                  ],
                  duration: 2000,
                  easing: 'easeInOutQuart'
                }, '-=1500')
                .add({
                  targets: '.second-slide-text',
                  keyframes: [
                    { scale: 2, opacity: 0 },
                    { scale: 1, opacity: 1 }
                  ],
                  duration: 3000,
                  easing: 'spring(1, 80, 10, 0)'
                }, '-=1200')
              }

            },
          });
        }
      }, '-=1600')
    }

  });
})