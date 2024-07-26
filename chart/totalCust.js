// totalCust.js
const ctc = document.getElementById("totalCustomer");

fetch("../data/totalCust.json")
  .then((resp) => resp.json())
  .then((items) => {
    const segments = {};
    
    // Memproses data untuk mengelompokkan berdasarkan tahun dan segment
    items.forEach((item) => {
      const year = item.Year;
      const segment = item.Segment;
      const number = parseInt(item.Number_of_Purchase);
      
      if (!segments[segment]) {
        segments[segment] = [];
      }
      
      segments[segment].push({ year: year, number: number });
    });
    
    const segmentLabels = Object.keys(segments);
    const years = [...new Set(items.map((item) => item.Year))]; // Menggunakan Set untuk mendapatkan tahun unik
    
    const colors = ['#00215E', '#FFF455', '#F3FEB8', '#9C27B0', '#FF5722']; // Warna yang sudah ditentukan
    
    const datasets = segmentLabels.map((segment, index) => {
      const data = years.map((year) => {
        const found = segments[segment].find((item) => item.year === year);
        return found ? found.number : 0;
      });
      
      return {
        label: segment,
        data: data,
        backgroundColor: colors[index % colors.length], // Mengambil warna dari array colors
        borderColor: "#ffffff",
        borderWidth: 1,
      };
    });
    
    new Chart(ctc, {
      type: "bar",
      data: {
        labels: years,
        datasets: datasets,
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            stacked: true,
            title: {
              display: true,
              text: 'Number of Purchases'
            }
          },
          y: {
            stacked: true,
            title: {
              display: true,
              text: 'Years'
            }
          }
        }
      },
    });
  })
  .catch((err) => {
    console.error('Error fetching data:', err);
  });
