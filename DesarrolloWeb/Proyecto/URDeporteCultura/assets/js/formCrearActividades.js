document.getElementById('imagenActividad').addEventListener('change', function (event) {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
    const preview = document.getElementById('preview'); // Contenedor para la vista previa
    const label = document.getElementById('customUploadText'); // Label para mostrar el nombre del archivo

    if (file) {
        const reader = new FileReader(); // Crea un FileReader para leer el archivo
        
        // Evento que se ejecuta cuando la imagen se carga en memoria
        reader.onload = function (e) {
            preview.style.backgroundImage = `url('${e.target.result}')`; // Aplica la imagen como fondo
        };
        
        reader.readAsDataURL(file); // Lee el archivo como una URL de datos

        // Actualiza el texto del label con el nombre del archivo
        label.querySelector('p').textContent = file.name;
    } else {
        // Si no hay archivo, elimina cualquier imagen previa y restablece el texto del label
        preview.style.backgroundImage = 'none';
        label.querySelector('p').textContent = 'Elegir imagen';
    }
});
