document.addEventListener("DOMContentLoaded", () => {
 const images = document.querySelectorAll(".slider-track img");

  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0,0,0,0.9)";
  overlay.style.display = "none";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "9999";

  const bigImg = document.createElement("img");
  bigImg.style.maxWidth = "90%";
  bigImg.style.maxHeight = "90%";
  bigImg.style.borderRadius = "12px";

  overlay.appendChild(bigImg);
  document.body.appendChild(overlay);

  images.forEach(img => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      bigImg.src = img.src;
      overlay.style.display = "flex";
    });
  });

  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
  });
});
