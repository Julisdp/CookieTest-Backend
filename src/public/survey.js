document.getElementById('surveyForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;
    const rtaAfectivo = document.getElementById('rtaAfectivo').value;
    const rtaSuabidad = document.getElementById('rtaSuabidad').value;
    const rtaHumedad = document.getElementById('rtaHumedad').value;
    const rtaEsponjosidad = document.getElementById('rtaEsponjosidad').value;
    const rtaFragilidad = document.getElementById('rtaFragilidad').value;
    const rtaGrasoso = document.getElementById('rtaGrasoso').value;
    const rtaCrocante = document.getElementById('rtaCrocante').value;
    const rtaDureza = document.getElementById('rtaDureza').value;

    try {
        // Enviar el usuario
        const userResponse = await fetch('http://localhost:2000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ gender, age })
        });

        if (!userResponse.ok) {
            const userError = await userResponse.json();
            throw new Error(`Error al crear el usuario: ${userError.message}`);
        }

        const userData = await userResponse.json();

        // Enviar la encuesta
        const pollResponse = await fetch('http://localhost:2000/api/agregarEncuesta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rtaAfectivo,
                rtaSuabidad,
                rtaHumedad,
                rtaEsponjosidad,
                rtaFragilidad,
                rtaGrasoso,
                rtaCrocante,
                rtaDureza,
                user: userData._id
            })
        });

        if (!pollResponse.ok) {
            const pollError = await pollResponse.json();
            throw new Error(`Error al enviar la encuesta: ${pollError.message}`);
        }

        const pollData = await pollResponse.json();
        alert('Encuesta enviada exitosamente');
    } catch (error) {
        console.error('Error:', error);
        alert(`Hubo un problema al enviar la encuesta: ${error.message}`);
    }
});
