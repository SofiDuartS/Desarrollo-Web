$(document).ready(function () {
    var table = $('#tablaActividades').DataTable({
        paging: true, // Habilitar paginación
        searching: true, // Habilitar búsqueda
        info: false, // Ocultar información del estado
        pageLength: 10, // Número de elementos por página
        lengthChange: false, // Ocultar selector de "mostrar x registros"
        dom: '<"top"f>rt<"bottom"lp><"clear">', // Personaliza el DOM de DataTables
        language: {
            search: "Buscar:",
            paginate: {
                next: "Siguiente",
                previous: "Anterior"
            },
            emptyTable: "No hay actividades disponibles",
            zeroRecords: "No se encontraron resultados",
        },
        autoWidth: false, // Evitar estilos automáticos de ancho
        columnDefs: [
            { targets: [0], orderable: false } // Deshabilitar ordenamiento para los cards
        ]
    });
});