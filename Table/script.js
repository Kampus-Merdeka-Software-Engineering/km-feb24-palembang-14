// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// Klik di luar elemen
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
});

$(document).ready(function() {
  // Mengambil data dari file JSON
  $.getJSON('../data/data.json', function(data) {
      // Menginisilaisasi data table
      $('#table').DataTable({
          data: data,
          columns: [
          { data: 'Row ID' },
          { data: 'Order ID' },
          { data: 'Order Date' },
          { data: 'Ship Date' },
          { data: 'Ship Mode' },
          { data: 'Customer ID' },
          { data: 'Customer Name' },
          { data: 'Segment' },
          { data: 'Country' },
          { data: 'City' },
          { data: 'State' },
          { data: 'Postal Code' },
          { data: 'Region' },
          { data: 'Product ID' },
          { data: 'Category' },
          { data: 'Sub-Category' },
          { data: 'Product Name' },
          { data: 'Sales' },
          { data: 'Quantity' },
          { data: 'Discount' },
          { data: 'Profit' }
          ],
          searching: true, //Mengaktifkan Fungsi Filtering / Pencarian
          responsive: true, //Mengaktifkan Fungsi Responsive
          scrollX: true, //Membuat tabel bisa digeser bukan dari layar tampilans
      });
  });
});