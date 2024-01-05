class validacionesatomicas{

    constructor(){

    }

    static is_numeric(id){         
        return (!isNaN(document.getElementById(id).value))
    }

    static size_minimo(id, valorminimo){
        if (document.getElementById(id).value.length < valorminimo){
            return false;
        }
        else{
            return true;
        }
    }

    static size_maximo(id, valormaximo){
        if (document.getElementById(id).value.length > valormaximo){
            return false;
        }
        else{
            return true;
        }
    }

    static fecha_mayor_hoy(id)
    {
        debugger;
        let fechaActual = new Date();
        let fechaSeleccionada = document.getElementById(id).value;
         
        // Ajusta la hora de la fecha actual a medianoche
        fechaActual.setHours(0, 0, 0, 0);

        // Ajusta la hora de la fecha seleccionada a medianoche
        //fechaSeleccionada.setHours(0, 0, 0, 0);

        if (fechaSeleccionada > fechaActual){
            return false;
        }
        else{
            return true;
        }     
    }
    
}