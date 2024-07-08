const lenis = new Lenis();

lenis.on("scroll", (e) => {});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.addEventListener("DOMContentLoaded", function (event) {
  var scrollpos = localStorage.getItem("scrollpos");
  if (scrollpos) window.scrollTo(0, scrollpos);
});

window.onbeforeunload = function (e) {
  localStorage.setItem("scrollpos", window.scrollY);
};

const swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const cart = document.querySelector(".cart");
const close = document.querySelector(".close");

const cartBox = document.querySelector(".cart-box");
cart.addEventListener("click", () => {
  gsap.to(".cart-box", {
    right: 0,
  });
});

close.addEventListener("click", () => {
  gsap.to(".cart-box", {
    right: "-65%",
  });
});
