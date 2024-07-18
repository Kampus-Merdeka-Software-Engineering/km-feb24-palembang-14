// Chart.js
const cpci = document.getElementById("profitCity");
var customers5;
var city;
new Promise((resolve, reject) => {
  fetch("../data/profit_city.json")
    .then((resp) => resp.json())
    .then((items) => {
      customers5 = items;
      city = customers5.map((item) => item.City);
      console.log(city);
      new Chart(cpci, {
        type: "bar",
        data: {
          datasets: [
            {
              label: "# Profit",
              data: customers5.map((item) => item.TotalProfit),
              backgroundColor: [
                '#399918',    // Merah
                '#80AF81',
                '#80AF81',
              ],
              borderColor: [
                '#729762',     // Merah
                '#F5F7F8', 
                '#F5F7F8', 
              ],
              borderWidth: 1,
            },
          ],
          labels: city,
        },
        options: {
          indexAxis: 'y',
        },
      });
    })
    .catch((err) => {
      reject(err);
    });
});
