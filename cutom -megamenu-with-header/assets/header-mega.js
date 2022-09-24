// custom header
$('.toggle-menu').click(function () {
    $('.sidebar').addClass('active');
    $('.close-sidebar').addClass('active');
    $('body').addClass('overflow');
  })
  $('.close-sidebar').click(function () {
    $('.sidebar').removeClass('active');
    $(this).removeClass('active');
    $('body').removeClass('overflow');
  })
  $(document).keyup(function(e) {
    $('.sidebar').removeClass('active');
    $('.close-sidebar').removeClass('active');
    $('body').removeClass('overflow');
  });
  
  // megamenu js
  
  $('.site-nav-dropdown').prev().css( "pointer-events", "none" );
  $('.site-nav-dropdown').parent().css( "cursor", "pointer" );
  
  
  $( ".megamenu-a .site-nav-dropdown .container-fluid" ).removeClass('active');
  
  $(document).on( 'click', '.megamenu-a .site-nav .dropdown', function() {
    $( ".megamenu-a .site-nav-dropdown .container-fluid" ).toggleClass( 'active' );
  });