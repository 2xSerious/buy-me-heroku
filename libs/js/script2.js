var currentImage = document.querySelector(".img-current");
var thumnails = document.querySelectorAll(".thumb-img");
var countImages = thumnails.length;
var colors = document.querySelectorAll(".product-color div");
var selectSize = document.getElementById("select-size");
var selectColor = document.querySelector(".product-color");
var btn = document.getElementById("add");
var currentSize = "S";

var basket = document.querySelector(".basket");
var notificationCount = 0;

console.log(currentImage);
console.log(thumnails);
console.log(colors);

basket.addEventListener("click", function () {
  const dropdown = document.querySelector(".dropdown");

  if (dropdown.style.display === "none") {
    dropdown.style.display = "flex";
  } else {
    dropdown.style.display = "none";
  }
});

selectSize.addEventListener(
  "change",
  function () {
    currentSize = this.value;
    availability(currentSize);
    let status = document.querySelector(".product-availability p").innerHTML;
    if (status === "Not available") {
      btn.setAttribute("disabled", "");
    } else {
      btn.removeAttribute("disabled");
    }
  },
  false
);
selectColor.addEventListener(
  "click",
  function () {
    availability(currentSize);
    let status = document.querySelector(".product-availability p").innerHTML;
    if (status === "Not available") {
      btn.setAttribute("disabled", "");
    } else {
      btn.removeAttribute("disabled");
    }
  },
  false
);

function availability(value) {
  switch (value) {
    case "S":
      const selector = document.querySelector(".product-availability p");
      if (currentImage.src.includes("white")) {
        selector.innerHTML = "Low stock";
        selector.style.color = "orange";
      } else if (currentImage.src.includes("black")) {
        selector.innerHTML = "Not available";
        selector.style.color = "red";
      } else {
        selector.innerHTML = "Available";
        selector.style.color = "green";
      }
      break;
    case "M":
      {
        const selector = document.querySelector(".product-availability p");
        if (currentImage.src.includes("white")) {
          selector.innerHTML = "Low stock";
          selector.style.color = "orange";
        } else {
          selector.innerHTML = "Available";
          selector.style.color = "green";
        }
      }
      break;
    case "L": {
      const selector = document.querySelector(".product-availability p");
      if (currentImage.src.includes("red")) {
        selector.innerHTML = "Not available";
        selector.style.color = "red";
      } else {
        selector.innerHTML = "Available";
        selector.style.color = "green";
      }
      break;
    }
  }
}

// SELECT Thumnail onload;
for (let i = 0; i < thumnails.length; i++) {
  if (thumnails[i].src === currentImage.src) {
    thumnails[i].classList.add("selected");
  }
}

// Handle Thumnail click-select
function handleSelect(e) {
  const attr = e.src;
  for (let i = 0; i < thumnails.length; i++) {
    if (thumnails[i].src !== attr) {
      thumnails[i].classList.remove("selected");
    }
  }
  currentImage.src = attr;
  e.classList.add("selected");
}

//Handle colors
function handleColors(e) {
  const cl = e.className;
  for (let i = 0; i < colors.length; i++) {
    if (colors[i].className === cl) {
      colors[i].classList.add("select-color");
    } else if (colors[i].className.includes("select-color")) {
      colors[i].classList.remove("select-color");
    }
  }
  switch (cl) {
    case "white":
      for (let i = 0; i < thumnails.length; i++) {
        thumnails[i].src = `./libs/images/gallery/t-shirt-${i + 1}-white.jpeg`;
      }
      currentImage.src = `./libs/images/gallery/t-shirt-1-white.jpeg`;
      document.querySelector(".product-name h3").innerHTML = "T-Shirt White";
      break;
    case "black":
      for (let i = 0; i < thumnails.length; i++) {
        thumnails[i].src = `./libs/images/gallery/t-shirt-${i + 1}-black.jpeg`;
      }
      currentImage.src = `./libs/images/gallery/t-shirt-1-black.jpeg`;
      document.querySelector(".product-name h3").innerHTML = "T-Shirt Black";
      break;
    case "red":
      for (let i = 0; i < thumnails.length; i++) {
        thumnails[i].src = `./libs/images/gallery/t-shirt-${i + 1}-red.jpeg`;
      }
      currentImage.src = `./libs/images/gallery/t-shirt-1-red.jpeg`;
      document.querySelector(".product-name h3").innerHTML = "T-Shirt Red";

      break;
  }
}

function handleArrows(e) {
  const direction = e.className;
  const attr = currentImage.src;
  const ind = attr.search("shirt-");
  const sub = parseInt(attr.substring(ind + 6, ind + 7));
  const colorInd = attr.search(`${sub}-`);
  const subColor = attr.substring(colorInd + 2);

  if (direction === "next") {
    let next = sub + 1;
    if (next < 4) {
      currentImage.src = `./libs/images/gallery/t-shirt-${next}-${subColor}`;
      thumbnailArrowsNext(currentImage.src);
    } else {
      currentImage.src = `./libs/images/gallery/t-shirt-1-${subColor}`;
      thumbnailArrowsNext(currentImage.src);
    }
  }
  if (direction === "prev") {
    let prev = sub - 1;
    if (prev > 0) {
      currentImage.src = `./libs/images/gallery/t-shirt-${prev}-${subColor}`;
      thumbnailArrowsPrev(currentImage.src);
    } else {
      currentImage.src = `./libs/images/gallery/t-shirt-3-${subColor}`;
      thumbnailArrowsPrev(currentImage.src);
    }
  }
}

function thumbnailArrowsNext(src) {
  for (let i = 0; i < thumnails.length; i++) {
    if (thumnails[i].src === src) {
      thumnails[i].classList.add("selected");
      if (i === 0) {
        console.log("third");
        thumnails[2].classList.remove("selected");
      } else {
        thumnails[i - 1].classList.remove("selected");
      }
    }
  }
}

function thumbnailArrowsPrev(src) {
  for (let i = 0; i < thumnails.length; i++) {
    if (thumnails[i].src === src) {
      thumnails[i].classList.add("selected");
      if (i === 2) {
        console.log("third");
        thumnails[0].classList.remove("selected");
      } else {
        thumnails[i + 1].classList.remove("selected");
      }
    }
  }
}

function addToCart() {
  const getName = document.querySelector(".product-name h3").innerHTML;
  const getPrice = document.querySelector(".cost").innerHTML;
  const basket = document.querySelector(".dropdown");
  let div = document.createElement("div");
  let span = document.createElement("span");

  span.classList.add("close-icon");
  span.innerHTML = "&times";
  span.setAttribute("onclick", "removeFromCart(this)");
  div.classList.add("dropdown-content");
  div.innerHTML = `${getName} ${currentSize} ${getPrice}`;
  div.appendChild(span);
  basket.appendChild(div);
  notificationCount++;
  document.querySelector(".notification").style.display = "block";
  document.querySelector(".notification").innerHTML = notificationCount;
}

function removeFromCart(el) {
  const dropdown = document.querySelector(".dropdown");
  dropdown.removeChild(el.parentNode);
  notificationCount--;
  if (notificationCount <= 0) {
    document.querySelector(".notification").style.display = "none";
  } else {
    document.querySelector(".notification").innerHTML = notificationCount;
  }
}
