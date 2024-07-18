// Chart.js
const cpp = document.getElementById("profitProduct");
var customers3;
var product;
new Promise((resolve, reject) => {
  fetch("../data/profit_product.json")
    .then((resp) => resp.json())
    .then((items) => {
      customers3 = items;
      product = customers3.map((item) => item.Product_Name);
      console.log(product);
      new Chart(cpp, {
        data: {
          datasets: [
            {
              type: "bar",
              label: "# Profit",
              data: customers3.map((item) => item.TotalProfit),
              borderWidth: 1,
              backgroundColor: [
                '#FF0000',
                '#FFA27F',
                '#FFA27F',
                '#FFA27F',
                '#FFA27F',
              ],
              borderColor: [
                '#C80036',
                '#FF6969',
                '#FF6969',
                '#FF6969',
                '#FF6969',
              ],
            },
          ],
          labels: product,
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
