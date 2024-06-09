// frontend-script.js
document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:2000/api/pollAndUser/obtenerDatos')
        .then(response => response.json())
        .then(data => {
            // Construir el gráfico de araña con los datos obtenidos
            const labels = ['rtaAfectivo', 'rtaSuavidad', 'rtaHumedad', 'rtaEsponjosidad', 'rtaFragilidad', 'rtaGrasoso', 'rtaCrocante', 'rtaDureza'];
            const datasets = data.map((item, index) => ({
                label: `Encuesta ${index + 1}`,
                data: [item.rtaAfectivo, item.rtaSuavidad, item.rtaHumedad, item.rtaEsponjosidad, item.rtaFragilidad, item.rtaGrasoso, item.rtaCrocante, item.rtaDureza],
                fill: true,
                backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
                borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
                pointBackgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`
            }));

            // Configuración del gráfico de radar
            const ctx = document.getElementById('radarChart').getContext('2d');
            new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    scales: {
                        r: {
                            angleLines: {
                                display: true
                            },
                            suggestedMin: 0,
                            suggestedMax: 5
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
