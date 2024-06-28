const dets = document.querySelectorAll(".dets");
console.log(dets);
dets.forEach((det, index) => {
  det.addEventListener("click", () => {
    if (index === 0) {
      gsap.to(det, {
        height: "5vh",
      });
      gsap.to(dets[1], {
        height: "2.5vh",
      });
      gsap.to(dets[2], {
        height: "2.5vh",
      });
    } else if (index === 1) {
      gsap.to(det, {
        height: "5vh",
      });
      gsap.to(dets[0], {
        height: "2.5vh",
      });
      gsap.to(dets[2], {
        height: "2.5vh",
      });
    } else {
      gsap.to(det, {
        height: "5vh",
      });
      gsap.to(dets[0], {
        height: "2.5vh",
      });
      gsap.to(dets[1], {
        height: "2.5vh",
      });
    }
  });
});
