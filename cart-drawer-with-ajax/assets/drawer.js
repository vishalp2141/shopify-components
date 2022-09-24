//drawer js

var drawer = function () {
  if (!Element.prototype.closest) {
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    Element.prototype.closest = function (s) {
      var el = this;
      var ancestor = this;
      if (!document.documentElement.contains(el)) return null;
      do {
        if (ancestor.matches(s)) return ancestor;
        ancestor = ancestor.parentElement;
      } while (ancestor !== null);
      return null;
    };
  }
  var settings = {
    speedOpen: 50,
    speedClose: 350,
    activeClass: 'is-active',
    visibleClass: 'is-visible',
    selectorTarget: '[data-drawer-target]',
    selectorTrigger: '[data-drawer-trigger]',
    selectorClose: '[data-drawer-close]',

  };


  var toggleccessibility = function (event) {
    if (event.getAttribute('aria-expanded') === 'true') {
      event.setAttribute('aria-expanded', false);
    } else {
      event.setAttribute('aria-expanded', true);
    }
  };


  var openDrawer = function (trigger) {
    var target = document.getElementById(trigger.getAttribute('aria-controls'));
    target.classList.add(settings.activeClass);
    document.documentElement.style.overflow = 'hidden';
    toggleccessibility(trigger);


    setTimeout(function () {
      target.classList.add(settings.visibleClass);
    }, settings.speedOpen);
  };

  var closeDrawer = function (event) {
    var closestParent = event.closest(settings.selectorTarget),
        childrenTrigger = document.querySelector('[aria-controls="' + closestParent.id + '"');
    closestParent.classList.remove(settings.visibleClass);
    document.documentElement.style.overflow = '';
    toggleccessibility(childrenTrigger);
    setTimeout(function () {
      closestParent.classList.remove(settings.activeClass);
    }, settings.speedClose);
  };
  var clickHandler = function (event) {
    var toggle = event.target,
        open = toggle.closest(settings.selectorTrigger),
        close = toggle.closest(settings.selectorClose);


    if (open) { openDrawer(open); }
    if (close) { closeDrawer(close); }
    if (open || close) { event.preventDefault(); }
  };


  var keydownHandler = function (event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
      var drawers = document.querySelectorAll(settings.selectorTarget),
          i;
      for (i = 0; i < drawers.length; ++i) {
        if (drawers[i].classList.contains(settings.activeClass)) {
          closeDrawer(drawers[i]);
        }
      }
    }
  };

  document.addEventListener('click', clickHandler, false);
  document.addEventListener('keydown', keydownHandler, false);
};

drawer();

$(document).on( 'click', '.cust-remove-item', function() {
  var id = $(this).attr('data-id');
  var thisClick = $( this );
  change_cart( id, thisClick );
  setTimeout(function(){ cartRefresh() }, 1000);;
} );

function change_cart( variant_id, thisClick ) {

  var quantity = 0;
  

  var params = {
    type: "POST",
    url: "/cart/change.js",
    data: "quantity=" + quantity + "&id=" + variant_id,
    dataType: "json",
    success: function(XMLHttpRequest) {
    },
    error: function(XMLHttpRequest, textStatus) {
    }
  };
  $.ajax(params);
}



function cartRefresh() {


  $.getJSON("/cart.js", function(cart) {
    console.log(cart);
    
    
    if( cart.items.length > 0 ) { 
    	
      $('.cart-count-bubble span:first-child').html( cart.item_count );

      var cart_items = [];
      var cart_item;
      var i = 1;
      $.each( cart.items, function( index, item ) {

        cart_item = '<div id="CartItem-'+i+'" class="cart__drawer_items">'+
          '<div class="cart__drawer_items-img">'+
          '<img class="cart-item__image" src="'+item.image+'" alt="" loading="lazy" style="width:100%">'+
          '</div>'+
          '<div class="cart__drawer_items-text">'+
          '<div class="cart__drawer_items-text-name">'+
          '<p class="cart-all__text">'+item.product_title+'</p>'+
          '</div>'+
          '<div class="cart__drawer_items-price-quantity">'+
          '<p> Price :'+(cart.currency)+' '+(item.price/100)+''+'.00'+
          ' x'+
          '<input class="quantity__input" type="number" name="updates[]" value="'+item.quantity+'" min="1" aria-label="Quantity for '+item.product_title+'" id="Quantity-'+item.id+'" data-index="'+i+'" readonly="">'+
          '</p>'+

          '</div>'+

          '</div>'+

          '<div class="sidebar-remove-product-button" id="removeproduct">'+
          '<a href="javascript:void(0)" class="cust-remove-item" data-id="'+item.id+'" rel="'+item.id+'">'+
          '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'+
          '</a>'+

          '</div>'+
          '</div>';

        i++;
        cart_items.push( cart_item );
      } );
      
      

      $('#cart__drawer').html( cart_items );

      $('.cart-drawer__subtotals').html( ( cart.currency ) +' ' + ( cart.total_price / 100 )+'.'+'00' );

    } else {
      	
      	$('.cart-count-bubble').remove();
    
    	$('#cart__drawer').html( '<h2 class="cart__empty-text">Your cart is empty</h2>' );
      	$('.cart-drawer__subtotals').html( ( cart.currency ) +' ' +( cart.total_price ) );
    }
  });

}


$( '.product-form__submit' ).on( 'click', function() {
  setTimeout(function(){ cartRefresh() }, 1000);
} );

