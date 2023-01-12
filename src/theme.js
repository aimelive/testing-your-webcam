const root = document.documentElement;
const btn = document.querySelector(".theme-string");
let theme = localStorage.getItem("theme");

if (!theme && theme !== "light" && theme !== "dark") {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    theme = "dark";
  } else {
    theme = "light";
  }
  localStorage.setItem("theme", theme);
}
if (theme === "light") {
  changeToLight();
} else {
  changeToDark();
}
btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (theme === "dark") {
    localStorage.setItem("theme", "light");
    changeToLight();
    theme = "light";
  } else {
    localStorage.setItem("theme", "dark");
    changeToDark();
    theme = "dark";
  }
});

function changeToDark() {
  root.style.setProperty("--black", "rgb(5, 3, 30)");
  root.style.setProperty("--white", "white");
  root.style.setProperty("--yellow-green", "yellowgreen");
  btn.innerHTML = "Light";
 
}

function changeToLight() {
  root.style.setProperty("--black", "white");
  root.style.setProperty("--white", "rgb(5, 3, 30)");
  root.style.setProperty("--yellow-green", "rgb(181, 245, 54)");
  btn.innerHTML = "Dark";
 
}
