const btn = document.querySelector(".btn");
const icon1 = document.querySelector("#svg1");
const icon2 = document.querySelector("#svg2");

changeIcon = () => {
    icon1.classList.toggle("hidden");
    icon2.classList.toggle("hidden");
}

btn.addEventListener("click", changeIcon);
