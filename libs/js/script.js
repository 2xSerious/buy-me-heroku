/**
 * @file /script.js
 * @author Teodor Krushkov
 * @description File that contains all functions and event listeners for the front-end.
 */

/** Array of product sizes
 * @type {Array}
 */
var current_sizes = [];
/** Array of product objects
 * @type {Array}
 */
var basket = [];
/** Default color value
 * @type {string}
 */
var color = "white";

//Document ready
$(function () {
  getColor("white"); // Callback function on load
  getItems(); // HTTP request to server, update HTML basket

  /** Toggle shopping cart container
   * @type {EventListener}
   */
  $(".header__basket--logo").on("click", function () {
    $(".cart__dropdown").toggleClass("display");
  });
  /** Add item to the basket and to the server session
   * @type {EventListener}
   */
  $("#add").on("click", function () {
    /** @constant <string> */
    const name = "T-Shirt";
    /** @constant <string> */
    const color = $(".product__color--text").text();
    /** @constant <string> */
    const size = $(".form-select").val();
    /** @constant <string> */
    const id = $(".product__id span").text();

    /** @constant <object> */
    const data = [{ name: name, id: id, color: color, size: size, price: 40 }];

    // If size not selected, will not continue and not fire basker animation
    if (!data[0].size) {
      return;
    }
    // Trigger basket animation
    $(".header__basket--logo").addClass("animate");
    setTimeout(function () {
      $(".header__basket--logo").removeClass("animate");
    }, 2000);

    // if data array is not empty will call addToCart
    if (data.length > 0) {
      addToCart(data);
    }
  });

  /** Event lister that trigger product color change
   * @type {EventListener}
   */
  $(".product__color").on("click", "*", function () {
    if (this.className !== undefined) {
      color = this.className; // sets global variable color to clicked element color class ex: "white, black, red"
    }
    getColor(color);
  });

  /** Shows the selected image
   * @type {EventListener}
   */
  $(".tumbnails").on("click", "*", function () {
    $(".img-current").attr("src", $(this).attr("src"));
    $(".thumb-img").removeClass("selected");
    $(this).addClass("selected");
  });

  /** Changes image, when arrows are used
   * @type {EventListener}
   */
  $(".prev, .next").on("click", function () {
    console.log("test");
    if ($(this).hasClass("prev")) {
      const prev = $(".selected").prev();
      if (prev.length < 1) {
        $(".thumb-img").removeClass("selected");
        $(".thumb-img").last().addClass("selected");
        $(".img-current").attr("src", $(".thumb-img").last().attr("src"));
      } else {
        $(".thumb-img").removeClass("selected");
        prev.addClass("selected");
        $(".img-current").attr("src", prev.attr("src"));
      }
    } else {
      console.log();
      const next = $(".selected").next();
      if (next.length < 1) {
        $(".thumb-img").removeClass("selected");
        $(".thumb-img").first().addClass("selected");
        $(".img-current").attr("src", $(".thumb-img").first().attr("src"));
      } else {
        $(".thumb-img").removeClass("selected");
        next.addClass("selected");
        $(".img-current").attr("src", next.attr("src"));
      }
    }
  });
  /** Checking quantity based on selected size and informs the user.
   * @type {EventListener}
   */
  $(".form-select").on("change", function () {
    const size = $(this).val();
    const current = current_sizes.find((e) => e.name === size);
    console.log(current_sizes);
    if (current.qty > 0 && current.qty < 5) {
      $(".product__availability")
        .children()
        .text(`low Only ${current.qty} left!`);
      $("#add").attr("disabled", false);
    } else if (current.qty < 1) {
      $(".product__availability").children().text(`Not Available`);
      $("#add").attr("disabled", true);
    } else {
      $(".product__availability").children().text(`Available`);
      $("#add").attr("disabled", false);
    }
  });
});
/**
 * Updates the product images and content.
 * @param {String} color - name of the color
 */
function getColor(color) {
  const current_img = $(".product__color--text").text();
  $.get(`/${color}`, function (data) {
    console.log(data);
    $(".form-select").val("");
    $(".product__availability p").text("");
    $(".product__color").children().removeClass("selected-color");
    $(".product__color--text").text(data.color);
    $(".product__id span").text(data.id);
    $(`.${data.color.toLowerCase()}`).addClass("selected-color");
    current_sizes = data.sizes;
    if (current_img !== data.color) {
      $(".img-current, .thumb-img").each(function () {
        let src = $(this).attr("src");
        let newsrc = src.replace(current_img, data.color);
        $(this).attr("src", newsrc);
      });
    }
  });
}
/**
 *
 * @param {*} item - add item in basket
 */
function addToCart(item) {
  if (item) {
    $.ajax({
      url: "/cart",
      type: "POST",
      cache: false,
      data: { item },
      success: function (res) {
        basket = res;
        if (basket.length > 0) {
          $(".notification").addClass("show");
          $(".notification").text(basket.length);
        }
        updateBasket(res);
      },
    });
  }
}
/**Updates basket and the items from the basket
 * @async
 * @function
 */
function getItems() {
  $.ajax({
    url: "/cart/items",
    type: "GET",
    dataType: "json",
    success: function (res) {
      basket = res;
      if (basket.length > 0) {
        $(".notification").addClass("show");
        $(".notification").text(basket.length);
      }
      updateBasket(res);
    },
  });
}

/**
 * Update the HTML basket.
 * @param {Array} items - array of items
 *
 */
function updateBasket(items) {
  $(".cart__dropdown").empty();
  if (items.length > 0) {
    $(".cart__dropdown").empty();
    items.forEach((element) => {
      $(".cart__dropdown").append(`
            <div class="cart__item d-flex gap-2 p-2 align-items-center" data-id="${
              element.color
            }-${element.size}">
                <img class="cart__item--img" src="/libs/images/gallery/t-shirt-1-${element.color.toLowerCase()}.jpeg" />
                <div>${element.name}</div>
                <div>${element.color}</div>
                <div>${element.size}</div>
                <div>$${element.price}</div>
                <div class="cart__item--delete" onclick="removeItem(this)"></div>
            </div>
            `);
    });
  } else {
    $(".cart__dropdown").append(`
        <div class="cart__dropdown--item d-flex gap-2 p-2 ">
            <div>The Cart is empty!</div>
            
        </div>
        `);
  }
}

/**
 * Remove item from basket
 * @param {Element} e - dom element
 */

function removeItem(e) {
  console.log(basket);
  console.log($(e).parent());
  let str = $(e).parent().attr("data-id");
  let index = str.indexOf("-");
  let color = str.substring(0, index).toLowerCase();
  let size = str.substring(index + 1);
  let filtered = basket.filter((el) => el.color !== color && el.size !== size);
  updateSession(filtered);
}

/**
 * Updates basket stored in session
 * @async
 * @param {Array} item - array of items
 */

function updateSession(item) {
  if (item) {
    $.ajax({
      url: "/cart",
      type: "PUT",
      data: { item },
      success: function (res) {
        basket = res;
        if (basket.length > 0) {
          $(".notification").text(basket.length);
        } else {
          $(".notification").removeClass("show");
        }
        updateBasket(res);
      },
    });
  }
}
