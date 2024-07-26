// Chart.js
const cpr = document.getElementById("profitRegion");
var customers;
new Promise((resolve, reject) => {
  fetch("../data/profit_region.json")
    .then((resp) => resp.json())
    .then((items) => {
      customers = items;
      new Chart(cpr, {
        type: 'pie',
        data: {
          labels: customers.map((item) => item.Region),
          datasets: [{
            label: 'Profit',
            data: customers.map((item) => item.Profit),
            backgroundColor: [
              '#0F67B1',
              '#E9C46A',
              '#E6B9A6',
              '#EEEDEB'
            ],
            borderColor: [
              '#0F67B1',
              '#E9C46A',
              '#E6B9A6',
              '#EEEDEB'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Profit per Region'
          }
        }
      });
    })
    .catch((err) => {
      reject(err);
    });
});