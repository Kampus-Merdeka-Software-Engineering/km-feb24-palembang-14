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

    // Datatable Filter
    var columns = table.settings().init().columns;
    columns.forEach((col, index) => {
      $('#columnFilter1').append(new Option(col.data, index));
      $('#columnFilter2').append(new Option(col.data, index));
    });

    // Function to apply filters based on both columns
    function applyFilters() {
      var columnIndex1 = $('#columnFilter1').val();
      var columnIndex2 = $('#columnFilter2').val();
      var selectedValue1 = $('#valueFilter1').val();
      var selectedValue2 = $('#valueFilter2').val();

      // Constructing regular expressions for both filters
      var regex1 = selectedValue1 ? '^' + selectedValue1 + '$' : '';
      var regex2 = selectedValue2 ? '^' + selectedValue2 + '$' : '';

      // Apply the filters
      table.column(columnIndex1).search(regex1, true, false);
      table.column(columnIndex2).search(regex2, true, false);
      table.draw();
    }

    // Get the value filter based on the selected column for both filters
    $('#columnFilter1, #columnFilter2').on('change', function() {
      var columnIndex = $(this).val();
      var columnData = table.column(columnIndex).data().unique().sort();
      
      // Determine which value filter is changed
      var valueFilterId = $(this).attr('id').replace('columnFilter', 'valueFilter');
      var valueFilterElement = $('#' + valueFilterId);

      // Populate the corresponding value filter
      valueFilterElement.empty().append(new Option("Select Value", ""));
      columnData.each(function(value) {
        valueFilterElement.append(new Option(value, value));
      });
      valueFilterElement.prop('disabled', columnIndex === "");

      // Apply filters if both value filters are not disabled
      if (!$('#valueFilter1').prop('disabled') && !$('#valueFilter2').prop('disabled')) {
        applyFilters();
      }
    });

    // Apply filters when values in either filter change
    $('#valueFilter1, #valueFilter2').on('change', function() {
      applyFilters();
    });
  });
});