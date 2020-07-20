let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");

navBarToggle.addEventListener("click", function() {
  mainNav.classList.toggle("active");
});



function myFunction() {
   var element = document.getElementById("menu");
   element.classList.toggle("clicked");
   var element = document.getElementById("menu1");
   element.classList.toggle("clicked");
   var element = document.getElementById("menu2");
   element.classList.toggle("clicked");
}


AOS.init({
  duration: 300,
  delay: 0,
  once: true,
})

$(window).scroll(function(){
	var scroll = $(window).scrollTop();
	if (scroll >= 50) {
		$(".navbar").addClass("header-active");
	}
	else {
		$(".navbar").removeClass("header-active");
	}
    $(".scroll-btn").css("opacity", 1 - scroll / 50);
  });

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

  $(function() {

    // Get the form.
    var form = $('#ajax-contact');
  
    // Get the messages div.
    var formMessages = $('#form-messages');
  
    // Set up an event listener for the contact form.
    $(form).submit(function(e) {
      // Stop the browser from submitting the form.
      e.preventDefault();
  
      // Serialize the form data.
      var formData = $(form).serialize();
  
      // Submit the form using AJAX.
      $.ajax({
        type: 'POST',
        url: $(form).attr('action'),
        data: formData
      })
      .done(function(response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass('error');
        $(formMessages).addClass('success');
  
        // Set the message text.
        $(formMessages).text(response);
  
        // Clear the form.
        $('#name').val('');
        $('#email').val('');
        $('#message').val('');
      })
      .fail(function(data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass('success');
        $(formMessages).addClass('error');
  
        // Set the message text.
        if (data.responseText !== '') {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text('Oops! An error occured and your message could not be sent.');
        }
      });
  
    });
  
  });
  