// Chart.js
const ctx = document.getElementById("myChart");
var customers;
var month;
new Promise((resolve, reject) => {
  fetch("../data/Chart.json")
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
              type: "bar",
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
