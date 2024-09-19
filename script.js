document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const generateButton = document.getElementById('generate-button');
    const passwordButton = document.getElementById('password-button');
    const homeButton = document.getElementById('home-button');
    const alertBox = document.getElementById('alert-box');
    const copyMessage = document.getElementById('copyMessage'); // Mensaje de contraseña copiada
    const scoresList = document.getElementById('scores-list');
    const securityInfo = document.getElementById('security-info'); // Mensaje de seguridad

    let generatedPassword = '';
    let alertTimeout; // Variable para el temporizador de alerta

    // Evento para mostrar la página generadora
    startButton.addEventListener('click', () => {
        document.querySelector('.page-initial').style.display = 'none';
        document.querySelector('.page-generator').style.display = 'block';
        securityInfo.style.display = 'none'; // Ocultar mensaje de seguridad al ir a la página generadora
        hideAlerts(); // Ocultar alertas al mostrar la página generadora
    });

    // Evento para generar la contraseña
    generateButton.addEventListener('click', () => {
        generatedPassword = generatePasswordFunc(); // Genera la contraseña
        passwordButton.textContent = "Dar click para copiar"; // Mensaje inicial
        passwordButton.style.display = 'inline-block'; // Asegurarse que el botón se muestre

        showAlert(alertBox); // Mostrar el cuadro de alerta
        addScore(); // Muestra la fuerza de la contraseña
    });

    // Evento para copiar la contraseña al hacer clic en el botón
    passwordButton.addEventListener('click', () => {
        if (generatedPassword) {
            navigator.clipboard.writeText(generatedPassword)
                .then(() => showCopyMessage()) // Mostrar mensaje de "Contraseña copiada"
                .catch(err => console.error('Error al copiar la contraseña:', err));
        } else {
            alert('Primero genera una contraseña');
        }
    });

    // Evento para volver a la página inicial
    homeButton.addEventListener('click', () => {
        document.querySelector('.page-initial').style.display = 'block';
        document.querySelector('.page-generator').style.display = 'none';
        securityInfo.style.display = 'block'; // Mostrar mensaje de seguridad al volver al menú principal
        hideAlerts(); // Ocultar alertas al volver al menú principal
    });

    // Función para generar la contraseña
    function generatePasswordFunc() {
        const length = 12;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }

    // Función para mostrar la alerta
    function showAlert(alertElement) {
        hideAlerts(); // Ocultar todas las alertas
        alertElement.style.display = 'flex'; // Muestra la alerta específica

        // Configurar un temporizador para que la alerta se oculte si se abre otra
        clearTimeout(alertTimeout);
        alertTimeout = setTimeout(() => {
            alertElement.style.display = 'none'; // Oculta la alerta después de 1 segundo
        }, 1000);
    }

    // Función para ocultar todas las alertas
    function hideAlerts() {
        alertBox.style.display = 'none'; // Oculta el cuadro de alerta
        copyMessage.style.display = 'none'; // Oculta el mensaje de copia
    }

    // Función para añadir la puntuación de seguridad
    function addScore() {
        // Crear un nuevo elemento de lista para la puntuación
        const scoreItem = document.createElement('li');
        const score = 'Fuerte'; // Asume que siempre será fuerte para este ejemplo
        scoreItem.textContent = `Fuerza: ${score}`;

        // Verificar si ya existe un elemento de puntuación
        const existingScoreItem = scoresList.querySelector('li');
        if (existingScoreItem) {
            // Si existe, actualizar el texto
            existingScoreItem.textContent = `Fuerza: ${score}`;
        } else {
            // Si no existe, agregar el nuevo elemento
            scoresList.appendChild(scoreItem);
        }
    }

    // Mostrar mensaje de "Contraseña copiada"
    function showCopyMessage() {
        showAlert(copyMessage); // Mostrar el mensaje de copia
        setTimeout(() => {
            copyMessage.style.display = 'none'; // Oculta el mensaje después de 1 segundo
        }, 1000);
    }
});

