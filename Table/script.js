// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");

// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Klik di luar elemen
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Table Function
$(document).ready(function() {
  // Fetch data from JSON
  $.getJSON('../data/data.json', function(data) {
    // Initialize DataTable
    var table = $('#table').DataTable({
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
      searching: true,
      responsive: true,
      scrollX: true,
    });

    // Populate column filter
    var columns = table.settings().init().columns; // retrieves the column settings from the DataTable.
    columns.forEach((col, index) => {
      $('#columnFilter').append(new Option(col.data, index));
    });

    // Get the value filter based on the selected column
    $('#columnFilter').on('change', function() {
      var columnIndex = $(this).val();
      var columnData = table.column(columnIndex).data().unique().sort();
      
      // Disabling the value filter if the column is not being selected
      $('#valueFilter').empty().append(new Option("Select Value", ""));
      columnData.each(function(value) {
        $('#valueFilter').append(new Option(value, value));
      });
      $('#valueFilter').prop('disabled', columnIndex === "");
    });

    // Apply the second filter value based from the column name
    $('#valueFilter').on('change', function() {
      var columnIndex = $('#columnFilter').val();
      var selectedValue = this.value;

      if (selectedValue) {
        table.column(columnIndex).search('^' + selectedValue + '$', true, false).draw();
      } else {
        table.column(columnIndex).search('').draw();
      }
    });
  });
});