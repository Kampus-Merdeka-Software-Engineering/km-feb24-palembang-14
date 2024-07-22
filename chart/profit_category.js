const cpc = document.getElementById("profitCategory").getContext("2d");
var dataByRegion = {};

const categoryColors = {
  "Office Supplies": "#FF8225",
  "Technology": "#134B70",
  "Furniture": "#399918",
};

fetch("../data/profit_category.json")
  .then((resp) => resp.json())
  .then((items) => {
    items.forEach(item => {
      if (!dataByRegion[item.Region]) {
        dataByRegion[item.Region] = {};
      }
      if (!dataByRegion[item.Region][item.Category]) {
        dataByRegion[item.Region][item.Category] = 0;
      }
      dataByRegion[item.Region][item.Category] += item.TotalProfit;
    });

    const regions = Object.keys(dataByRegion);
    const categories = Array.from(new Set(items.map(item => item.Category)));

    const datasets = categories.map(category => ({
      label: category,
      data: regions.map(region => dataByRegion[region][category] || 0),
      borderWidth: 1,
      backgroundColor: categoryColors[category],
      borderColor: categoryColors[category]
    }));

    new Chart(cpc, {
      type: 'bar',
      data: {
        labels: regions,
        datasets: datasets,
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
    console.error(err);
  });