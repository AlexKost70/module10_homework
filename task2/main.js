const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
    alert(`Your screen resolution is ${window.screen.width}x${window.screen.height}`);
});