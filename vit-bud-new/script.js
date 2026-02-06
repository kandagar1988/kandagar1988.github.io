1 function openImg(src) {
2   const modal = document.getElementById("imgModal");
3   const img = document.getElementById("imgBig");
4
5   img.src = src;
6   modal.classList.add("active");
7   document.body.style.overflow = "hidden";
8 }
9
10 function closeImg() {
11   const modal = document.getElementById("imgModal");
12   modal.classList.remove("active");
13   document.body.style.overflow = "";
14 }
