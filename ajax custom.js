function easy_add_to_cart(t, a) {
    var r = {
        type: "POST",
        url: "/cart/add.js",
        data: "quantity=" + a + "&id=" + t,
        dataType: "json",
        success: function (t) {
            cart_count_add(a), header_price_change(), cart_quantity(a);
        },
        error: function (t, a) {
            alert(t.responseJSON.description);
        },
    };
    $.ajax(r);
}
function cart_count_add(t) {
    if ($(document).find(".badge-custom").length > 0) {
        var a = $(".badge-custom").html();
        $(".badge-custom").html(parseFloat(parseFloat(a) + parseFloat(t)));
    } else $(".custom-cart-before").after('<div class="cart-count-bubble">' + '<span aria-hidden="true" class="badge-custom">' + t + "</span>" + '<span class="visually-hidden"></span>' + "</div>");
}
function header_price_change() {
    var t = $(".cart-custom-form").find(".custom-product-qty").val();
    var a = $(".cart-custom-form").find(".price-custom").attr("data-price").replace(",", "")();
    var r = parseFloat(t) * parseFloat(a);
    var c = $(".custom-cart-value").attr("data-custom-cart").replace(",", "");
    var e = (parseFloat(c) + parseFloat(r)).toFixed(2);
    $(".custom-cart-value").attr("data-custom-cart", e), $(".custom-cart-value").html("$" + e), alert(e);
}
$(document).ready(function () {
    jQuery(".product__slider").slick({ autoplay: !1, autoplaySpeed: 1e3, speed: 600, draggable: !0, infinite: !0, slidesToShow: 1, slidesToScroll: 1, arrows: !1, dots: !1, asNavFor: ".nav__slider" }),
        jQuery(".nav__slider").slick({ slidesToShow: 3, slidesToScroll: 1, asNavFor: ".product__slider", dots: !1, centerMode: !0, focusOnSelect: !0 });
}),
    $(document).ready(function () {
        $("#custom-add-to-cart").on("click", function () {
            var t = $(".quantity__input").val();
            var a = $(".price-custom").attr("data-price").replace(",", "");
            var r = parseFloat(t) * parseFloat(a);
            var c = $(".custom-cart-value").attr("data-custom-cart").replace(",", "");
            var e = (parseFloat(c) + parseFloat(r)).toFixed(2);
            $(".custom-cart-value").attr("data-custom-cart", e), $(".custom-cart-value").html("$" + e);
        });
    }),
    $(document).on("click", ".item-remove-class", function () {
        var t = $(this).attr("data-item-price").replace(",", "");
        var a = $(".custom-cart-value").attr("data-custom-cart").replace(",", "");
        var r = (parseFloat(a) - parseFloat(t)).toFixed(2);
        $(".custom-cart-value").attr("data-custom-cart", r), $(".custom-cart-value").html("$" + r);
    }),
    $(document).on("click", ".custom-btn-minus", function () {
        var t = $(this).closest("tr").attr("data-single-price").replace(",", "");
        var a = $(".custom-cart-value").attr("data-custom-cart").replace(",", "");
        var r = (parseFloat(a) - parseFloat(t)).toFixed(2);
        $(".custom-cart-value").attr("data-custom-cart", r), $(".custom-cart-value").html("$" + r);
    }),
    $(document).on("click", ".custom-btn-plus", function () {
        var t = $(this).closest("tr").attr("data-single-price").replace(",", "");
        var a = $(".custom-cart-value").attr("data-custom-cart").replace(",", "");
        var r = (parseFloat(a) + parseFloat(t)).toFixed(2);
        $(".custom-cart-value").attr("data-custom-cart", r), $(".custom-cart-value").html("$" + r);
    }),
    $(document).on("click", ".add-to-ct", function (t) {
        var a;
        var r;
        t.preventDefault(), easy_add_to_cart($(this).parent(".cart-custom-form").find(".custom-product-id").val(), $(this).parent(".cart-custom-form").find(".custom-product-qty").val());
    });
//# sourceMappingURL=/s/files/1/0584/1112/2854/t/3/assets/custom.js.map?v=16033372095859872746
