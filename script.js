// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Klik di luar elemen
const hm = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Popup Function
let popup = document.getElementById("popup");
let errorPopup = document.getElementById("error-popup");
let submitBtn = document.getElementById("submit-btn");

function openPopup() {
    popup.classList.add("openPopup");
}

function closePopup() {
    popup.classList.remove("openPopup");
}

function openErrorPopup() {
    errorPopup.classList.add("openPopup");
}

function closeErrorPopup() {
    errorPopup.classList.remove("openPopup");
}

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form dari submit secara default

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let message = document.getElementById("message").value;

    if (name && email && phone && message) {
        openPopup(); // Menampilkan popup
    } else {
        openErrorPopup(); // Menampilkan error popup
    }
});