class validacionesatomicas {

    constructor() {

    }

    static is_numeric(id) {
        return (!isNaN(document.getElementById(id).value))
    }

    static size_minimo(id, valorminimo) {
        if (document.getElementById(id).value.length < valorminimo) {
            return false;
        }
        else {
            return true;
        }
    }

    static size_maximo(id, valormaximo) {
        if (document.getElementById(id).value.length > valormaximo) {
            return false;
        }
        else {
            return true;
        }
    }

    static file_size_maximo(id, valormaximo) {
        if (document.getElementById(id).files?.[0].size > valormaximo) {
            return false;
        }
        else {
            return true;
        }
    }

    static date_formater(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${`0${month}`.slice(-2)}-${`0${day}`.slice(-2)}`
    }

    static fecha_mayor_hoy(id) {
        debugger;
        let fechaActual = this.date_formater(new Date());
        let fechaSeleccionada = document.getElementById(id).value;

        // Ajusta la hora de la fecha seleccionada a medianoche
        //fechaSeleccionada.setHours(0, 0, 0, 0);

        if (fechaSeleccionada > fechaActual.toString('yyyy-MM-dd')) {
            return false;
        }
        else {
            return true;
        }
    }

    static termina_con(id, sufijo) {
        if (document.getElementById(id).value.endsWith(sufijo)) {
            return true;
        }
        else {
            return false;
        }
    }

    static nombre_max(id, max) {
        if (document.getElementById(id).value.split(/(\\|\/)/g).pop().length < max) {
            return true;
        }
        else {
            return false;
        }
    }

    static nombre_min(id, min) {
        if (document.getElementById(id).value.split(/(\\|\/)/g).pop().length > min) {
            return true;
        }
        else {
            return false;
        }
    }
}