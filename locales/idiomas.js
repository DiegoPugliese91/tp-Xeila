
function setLang(lang = '') {

    let traduccion = textos_ES;

    const mensaje = document.getElementById('texto_mensaje')
    if (mensaje && traduccion[mensaje]) mensaje.innerHTML == traduccion[mensaje];

    const form = document.querySelector('.class_titulo_form spam');
    if (form){
        const list = form.classList;
        for (let i = 0; i < list.length; i++) {
            const clave = list[i];
            if (traduccion[clave]) {
                form.innerHTML = traduccion[clave];
            }
        }
    }

    const cabecerasTabla = document.getElementsByTagName('th');
    for (let i = 0; i < cabecerasTabla.length; i++) {
        if (traduccion[cabecerasTabla[i].className]) {
            cabecerasTabla[i].innerHTML = traduccion[cabecerasTabla[i].className];
        }
    }

    const etiquetas = document.getElementsByTagName('label');
    for (let i = 0; i < etiquetas.length; i++) {
        if (traduccion[etiquetas[i].htmlFor]) {
            etiquetas[i].innerHTML = traduccion[etiquetas[i].htmlFor];
        }
        if(traduccion[etiquetas[i].className]) {
            etiquetas[i].innerHTML = traduccion[etiquetas[i].className];
        }
    }

    const errores = document.querySelectorAll('.errorcampo a');
    for (let i = 0; i < errores.length; i++) {
        const clases = errores[i].classList;
        let text = '';
        clases?.forEach(clave => text += traduccion[clave] + ' ')
        errores[i].innerHTML = text.trim();
    }

    const inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        const list = inputs[i].classList;
        for (let j = 0; j < list.length; j++) {
            const clave = list[j];
            if (traduccion[clave]) {
                inputs[i].placeholder = traduccion[clave];
                inputs[i].title = traduccion[clave];
            }
        }
    }

    const options = document.getElementsByTagName('option');
    for (let i = 0; i < options.length; i++) {
        if (traduccion[options[i].className]) {
            options[i].label = traduccion[options[i].className];
        }
    }

    const imgs = document.getElementsByTagName('img');
    for (let i = 0; i < imgs.length; i++) {
        const list = imgs[i].classList;
        for (let j = 0; j < list.length; j++) {
            const clave = list[j]
            if (traduccion[clave]) {
                imgs[i].alt = traduccion[clave]; // texto alternativo si no se ve la imagen
                imgs[i].title = traduccion[clave]; // texto superpuesto a la imagen al pasar sobre ella
            }
        }
    }
}
