class validacionesatomicas {

    constructor() {

    }

    static is_numeric(id) {
        return (!isNaN(document.getElementById(id).value))
    }

    static size_minimo(id, valorminimo) {
        return !(document.getElementById(id).value.length < valorminimo);
    }

    static size_maximo(id, valormaximo) {
        return !(document.getElementById(id).value.length > valormaximo);
    }

    static is_required(id) {
        return !!(document.getElementById(id).value);
    }

    static valor_minimo(id, valorminimo) {
        const valor = +document.getElementById(id).value ?? Number.MIN_SAFE_INTEGER;
        if(valor == undefined) return;
        return !(valor < valorminimo);
    }

    static valor_maximo(id, valormaximo) {
        const valor = document.getElementById(id).value ?? Number.MAX_SAFE_INTEGER;
        if(valor == undefined) return;
        return !(valor > valormaximo);
    }

    static mayor_que(id, otroId) {
        return !(+document.getElementById(id).value < +document.getElementById(otroId).value);
    }

    static menor_que(id, otroId){
        return !(+document.getElementById(id).value > +document.getElementById(otroId).value);
    }

    static positivo(id){
        const value = document.getElementById(id).value ?? 0;
        return !(value > 0)
    }

}