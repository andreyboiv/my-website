/*jQuery Slide Elements

We have also created an animation
effect which will slide in elements on scroll.
 If you want to use it, just add the .slideanim class
  to the element you want to slide in, and add the
  following to your CSS and jQuery (feel free to modify
  the duration, opacity, where to start, when to slide in,
  and so on):
==================================================-->*/
    $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
  });
});
/*jQuery Slide Elements
==================================================-->*/
