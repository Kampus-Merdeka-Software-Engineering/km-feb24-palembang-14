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

// Chart.js
const ctx = document.getElementById("myChart");
var customers;
var month;
new Promise((resolve, reject) => {
  fetch("./data/Chart.json")
    .then((resp) => resp.json())
    .then((items) => {
      customers = items;
      month = customers.map((item) => item.Month);
      console.log(month);
      new Chart(ctx, {
        data: {
          datasets: [
            {
              type: "bar",
              label: "# Monthly Sales",
              data: customers.map((item) => item.TotalSales),
              borderWidth: 1,
              borderColor: "#FF9A00",
              backgroundColor: "#FFBF00",
            },
            {
              type: "line",
              label: "# Monthly Sales",
              data: customers.map((item) => item.TotalSales),
              borderWidth: 1,
              borderColor: "#FF9A00",
              backgroundColor: "#FFBF00",
            },
            {
              type: "bar",
              label: "# Monthly Profit",
              data: customers.map((item) => item.TotalProfit),
              borderWidth: 1,
              borderColor: "#7E8EF1",
              backgroundColor: "#615EFC",
            },
            {
              type: "line",
              label: "# Monthly Profit",
              data: customers.map((item) => item.TotalProfit),
              borderWidth: 1,
              borderColor: "#7E8EF1",
              backgroundColor: "#615EFC",
            },
          ],
          labels: month,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })
    .catch((err) => {
      reject(err);
    });
});

// Popup Function
let popup = document.getElementById("popup");
  
function openPopup() {
  popup.classList.add("openPopup");
}
  
function closePopup() {
  popup.classList.remove("openPopup");
}
  
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Mencegah form dari submit secara default
  openPopup(); // Menampilkan popup
});
