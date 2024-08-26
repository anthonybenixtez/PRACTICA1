const citasOriginales = [
    { cita: '"los programas"', autor: 'Harold 1' },
    { cita: '"los programas 1"', autor: 'Harold 2' },
    { cita: '"los programas 2"', autor: 'Harold 3' },
    { cita: '"los programas 3"', autor: 'Harold 4' },
    { cita: '"los programas 4"', autor: 'Harold 5' },
];

const { createApp, ref } = Vue;

const app = createApp({
    setup() {
        const citas = ref(citasOriginales);
        const nuevaCita = ref('');
        const nuevoAutor = ref('');
        const mostrarEditarModal = ref(false);
        const citaEditada = ref({ cita: '', autor: '' });
        let indiceEdicion = null;

        const agregarCita = () => {
            if (nuevaCita.value && nuevoAutor.value) {
                citas.value.push({ cita: nuevaCita.value, autor: nuevoAutor.value });
                nuevaCita.value = '';
                nuevoAutor.value = '';
            }
        };

        const borrarCita = (index) => {
            citas.value.splice(index, 1);
        };

        const abrirEditarModal = (index) => {
            mostrarEditarModal.value = true;
            indiceEdicion = index;
            // Aquí se asignan los valores actuales a editar
            citaEditada.value = { 
                cita: citas.value[index].cita, 
                autor: citas.value[index].autor 
            };
        };

        const cerrarEditarModal = () => {
            mostrarEditarModal.value = false;
            indiceEdicion = null;
        };

        const actualizarCita = () => {
            if (citaEditada.value.cita && citaEditada.value.autor) {
                citas.value.splice(indiceEdicion, 1, { cita: citaEditada.value.cita, autor: citaEditada.value.autor });
                cerrarEditarModal();
            }
        };

        return {
            citas,
            nuevaCita,
            nuevoAutor,
            mostrarEditarModal,
            citaEditada,
            agregarCita,
            borrarCita,
            abrirEditarModal,
            cerrarEditarModal,
            actualizarCita,
        };
    }
});

app.mount('#appCitas');
