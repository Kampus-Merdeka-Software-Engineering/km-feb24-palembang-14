// Chart.js
const cpc = document.getElementById("profitCategory");
let customers2;
let years;
let categories = {};
new Promise((resolve, reject) => {
  fetch("../data/profit_category.json")
    .then((resp) => resp.json())
    .then((items) => {
      customers2 = items;

      // Aggregate profits by year and category
      customers2.forEach((item) => {
        if (!categories[item.Category]) {
          categories[item.Category] = {};
        }
        if (!categories[item.Category][item.Year]) {
          categories[item.Category][item.Year] = 0;
        }
        categories[item.Category][item.Year] += parseFloat(item.Profit);
      });

      // Prepare data for the chart
      years = [...new Set(customers2.map((item) => item.Year))].sort();
      const datasets = Object.keys(categories).map((category) => {
        return {
          label: category,
          data: years.map((year) => categories[category][year] || 0),
          borderWidth: 1,
          fill: false,
        };
      });

      new Chart(cpc, {
        type: "bar",
        data: {
          labels: years,
          datasets: datasets.map((dataset, index) => {
            // Assign different colors to each dataset
            const colors = ["#FF9A00", "#FFBF00", "#FF4F00"];
            return {
              ...dataset,
              borderColor: colors[index % colors.length],
              backgroundColor: colors[index % colors.length],
            };
          }),
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Profit ($)',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Year',
              },
            },
          },
          plugins: {
            title: {
              display: true,
            },
          },
        },
      });
    })
    .catch((err) => {
      reject(err);
    });
});
