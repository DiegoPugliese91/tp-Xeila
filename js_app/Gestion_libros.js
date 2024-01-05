class Gestion_libros extends GestionEntidad {

    static ClavePrimaria = 'CodigoL';
    static validaciones = {
        CodigoL: [{ f: validacionesatomicas.is_required }, { f: validacionesatomicas.is_numeric }, { f: validacionesatomicas.valor_minimo, v: 1 }],
        AutoresL: [{ f: validacionesatomicas.is_required }, { f: validacionesatomicas.size_maximo, v: 200 }, { f: validacionesatomicas.size_minimo, v: 6 }],
        TituloL: [{ f: validacionesatomicas.is_required }, { f: validacionesatomicas.size_maximo, v: 100 }],
        ISBN: [{ f: validacionesatomicas.is_required }, { f: validacionesatomicas.size_maximo, v: 13 }],
        PagIniL: [{ f: validacionesatomicas.is_numeric }, { f: validacionesatomicas.valor_minimo, v: 1 }, { f: validacionesatomicas.menor_que, v: 'PagFinL' }, { f: validacionesatomicas.size_maximo, v: 4 }],
        PagFinL: [{ f: validacionesatomicas.is_numeric }, { f: validacionesatomicas.valor_minimo, v: 1 }, { f: validacionesatomicas.mayor_que, v: 'PagIniL' }, { f: validacionesatomicas.size_maximo, v: 4 }],
        VolumenL: [{ f: validacionesatomicas.is_numeric }, { f: validacionesatomicas.valor_minimo, v: 1 }],
        EditorialL: [{ f: validacionesatomicas.size_maximo, v: 100 }],
        FechaPublicacionL: [{ f: validacionesatomicas.is_required }],
        EditorL: [{ f: validacionesatomicas.size_maximo, v: 100 }],
        PaisEdicionL: [{ f: validacionesatomicas.is_required }, { f: validacionesatomicas.size_maximo, v: 20 }],
        archivopdfL: [{ f: validacionesatomicas.is_required }, , { f: validacionesatomicas.size_maximo, v: 20 }],
    }

    static modos = {
        Crear: 'ADD',
        Editar: 'EDIT',
        Eliminar: 'DELETE',
        Visualizar: 'SHOWCURRENT',
        Buscar: 'SEARCH'
    }

    /**
     * @param {*} campo Ej: 'AutoresL', 'TituloL'
     * @param {*} modo 'ADD', 'EDIT', 'DELETE', 'SHOWCURRENT', 'SEARCH'
     * @returns 
     */
    static comprobar_campo(campo, modo) {
        let esValido = true;

        // En el form añadir la clave primaria no la elijo yo
        if (modo == this.modos.Crear && campo == this.ClavePrimaria) return;

        for (let i = 0; i < this.validaciones[campo].length; i++) {
            const { f, v } = this.validaciones[campo][i];

            //si es consulta ignoro que sea un campo requerido o longitud mínima
            if (modo == this.modos.Buscar && (f.name == 'size_minimo' || f.name == 'is_required')) continue;

            //reviso si las validaciones se cumplen
            if (!(v === undefined ? f(campo) : f(campo, v))) {
                //modificacion parametros texto error
                DOM_class.mostrardivmensajeserrordebajo(campo, campo + " KO_" + f.name);
                esValido = false;
            }

            //si compara contra otro campo, debo comprobarlo de nuevo también
            if (f.name.endsWith("_que")) {
                const validacionesCampo = [...this.validaciones[campo]];
                this.validaciones[campo] = [];
                setTimeout(() => {

                    this.comprobar_campo(v)
                    this.validaciones[campo] = validacionesCampo;
                }, 0.02)
            }

            if (!esValido) return false;
        };

        DOM_class.mostrarexitovalor(campo);
        return true;
    }

    //-----------------------------------------------------------------------------
    // formularios
    static asignarValidaciones(modo) {
        const comprobar = (campo) => { return `Gestion_libros.comprobar_campo("${campo}","${modo}")` };
        document.getElementById('AutoresL').setAttribute('onblur', comprobar("AutoresL"));
        document.getElementById('TituloL').setAttribute('onblur', comprobar("TituloL"));
        document.getElementById('ISBN').setAttribute('onblur', comprobar("ISBN"));
        document.getElementById('PagIniL').setAttribute('onblur', comprobar("PagIniL"));
        document.getElementById('PagFinL').setAttribute('onblur', comprobar("PagFinL"));
        document.getElementById('VolumenL').setAttribute('onblur', comprobar("VolumenL"));
        document.getElementById('FechaPublicacionL').setAttribute('onblur', comprobar("FechaPublicacionL"));
        document.getElementById('EditorialL').setAttribute('onblur', comprobar("EditorialL"));
        document.getElementById('EditorL').setAttribute('onblur', comprobar("EditorL"));
        document.getElementById('PaisEdicionL').setAttribute('onblur', comprobar("PaisEdicionL"));
    }

    static async createForm_ADD() {

        // resetear el formulario
        // hemos hecho una modificación de manera que cargamos el contenido del formulario desde su html cada vez que lo preparamos para una accion
        // obviamente es dependiente de la entidad y por lo tanto no esta en la superclase
        this.recargarform();

        // rellenar titulo formulario
        // usamos className mientras no tenemos que utilizar clases de css puesto que borra todos los class del elemento
        document.querySelector(".class_contenido_titulo_form").className = "class_contenido_titulo_form titulo_form_ADD_libro";

        // se rellena el action del formulario
        document.getElementById('IU_form').action = 'javascript:Gestion_libros.ADD();';

        this.asignarValidaciones(this.modos.Crear);

        let botonadd = document.createElement('button');
        botonadd.type = 'submit';
        let imgadd = document.createElement('img');
        imgadd.src = './iconos/ADD.png';
        botonadd.append(imgadd);

        const form = document.getElementById('IU_form')

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            let data = new FormData(form);
            console.log('form', data);
        });

        document.getElementById('IU_form').append(botonadd);

        // para actualizar idioma despues de incluir la imagen
        setLang();

        // se muestra el formulario
        document.getElementById('div_IU_form').style.display = 'block';

    }

    static createForm_EDIT(datostupla) {
        document.querySelector(".class_contenido_titulo_form").className = "class_contenido_titulo_form titulo_form_EDIT_libro";
        // resetear el formulario
        this.recargarform();
        this.asignarValidaciones(this.modos.Editar);

        let botonedit = document.createElement('button');
        botonedit.type = 'submit';
        let imgedit = document.createElement('img');
        imgedit.src = './iconos/EDIT.png';
        botonedit.append(imgedit);
        document.getElementById('IU_form').append(botonedit);

        // para actualizar idioma despues de incluir la imagen
        setLang();

        // se muestra el formulario
        document.getElementById('div_IU_form').style.display = 'block';
    }

    static createForm_DELETE(datostupla) {
        // resetear el formulario
        this.recargarform_search();
        // rellenar titulo formulario
        document.querySelector(".class_contenido_titulo_form").className = "class_contenido_titulo_form titulo_form_DELETE_libro";

        // se rellena el action del formulario
        document.getElementById('IU_form').action = 'javascript:Gestion_libros.DELETE();';

        document.getElementById('CodigoL').value = datostupla.CodigoL;
        document.getElementById('CodigoL').setAttribute('readonly', true);


        let botondelete = document.createElement('button');
        botondelete.id = 'botondelete';
        botondelete.type = 'submit';
        let imgdelete = document.createElement('img');
        imgdelete.src = './iconos/DELETE.png';
        botondelete.append(imgdelete);
        document.getElementById('IU_form').append(botondelete);

        // para actualizar idioma 
        setLang();

        // se muestra el formulario
        document.getElementById('div_IU_form').style.display = 'block';
    }

    static createForm_SHOWCURRENT(datostupla) {
        // reutilizo la creación del delete porque me implica pocas modificaciones
        this.createForm_DELETE(datostupla);
        document.querySelector(".class_contenido_titulo_form").className = "class_contenido_titulo_form titulo_form_SHOWCURRENT_libro";

        // eliminar boton delete del form DELETE
        document.getElementById('botondelete').remove();

        // se rellena el action del formulario
        let imgshowcurrent = document.createElement('img');
        imgshowcurrent.src = './iconos/SHOWCURRENT.png';
        imgshowcurrent.setAttribute("onclick", "DOM_class.cerrar_div_formulario();")
        document.getElementById('IU_form').append(imgshowcurrent);

        // para actualizar el idioma
        setLang();


    }

    static createForm_SEARCH() {
        // se rellena el action del formulario
        document.getElementById('IU_form').action = 'javascript:Gestion_libros.SEARCH();';

        // resetear el formulario
        this.recargarform_search();
        // rellenar titulo formulario
        document.querySelector(".class_contenido_titulo_form").className = "class_contenido_titulo_form titulo_form_SEARCH_libro";
        this.asignarValidaciones(this.modos.Buscar);

        let botonsearch = document.createElement('button');
        botonsearch.type = 'submit';
        let imgsearch = document.createElement('img');
        imgsearch.src = './iconos/SEARCH.png';
        botonsearch.append(imgsearch);
        document.getElementById('IU_form').append(botonsearch);

        // para actualizar idioma
        setLang();

        // se muestra el formulario
        document.getElementById('div_IU_form').style.display = 'block';

    }

    //-----------------------------------------------------------------------------
    // submits

    static comprobar_submit(modo) {
        let esValido = true;
        if (modo == this.modos.Eliminar) {
            esValido = this.comprobar_campo(this.ClavePrimaria);
        } else {
            esValido = Object.keys(this.validaciones).map(campo => this.comprobar_campo(campo, modo)).every();
        }

        return esValido;
    }

    //-----------------------------------------------------------------------------
    // acciones a back

    static async ADD() {
        if(!this.comprobar_submit(this.modos.Crear)){
            DOM_class.mostrardivmensajes('KO_form_errors');
            return;
        }
        await this.peticionBackGeneral('IU_form', 'libro', 'ADD')
            .then((respuesta) => {
                if (respuesta['ok']) {
                    this.vaciarForm();
                    this.SEARCH();
                }
                else {
                    DOM_class.mostrardivmensajes(respuesta['code']);
                }
            });
    }

    static async EDIT() {
        if(!this.comprobar_submit(this.modos.Editar)){
            DOM_class.mostrardivmensajes('KO_form_errors');
            return;
        }
        await this.peticionBackGeneral('IU_form', 'libro', 'EDIT')
            .then((respuesta) => {
                if (respuesta['ok']) {
                    this.vaciarForm();
                    this.SEARCH();
                }
                else {
                    DOM_class.mostrardivmensajes(respuesta['code']);
                }
            });
    }

    static async DELETE() {
        if(!this.comprobar_submit(this.modos.Eliminar)){
            DOM_class.mostrardivmensajes('KO_form_errors');
            return;
        }
        await this.peticionBackGeneral('IU_form', 'libro', 'DELETE')
            .then((respuesta) => {
                if (respuesta['ok']) {
                    this.vaciarForm();
                    this.SEARCH();
                }
                else {
                    DOM_class.mostrardivmensajes(respuesta['code']);
                }
            });
    }

    static async SEARCH() {
        if (document.querySelectorAll('#IU_form input').length && !this.comprobar_submit(this.modos.Buscar)) {
            DOM_class.mostrardivmensajes('KO_form_errors');
            return;
        }
        await this.peticionBackGeneral('IU_form', 'libro', 'SEARCH')
            .then((respuesta) => {
                this.vaciarForm();
                let libro = new Gestion_libros('libros', respuesta['resource'], Array('CodigoL', 'AutoresL', 'TituloL')); libro.mostrartabla();
                if (respuesta['code'] == 'RECORDSET_VACIO') {
                    document.getElementById('muestradatostabla').innerHTML = 'no hay datos coincidentes con la busqueda';
                }
            });
    }

    //-----------------------------------------------------------------------------
    //validaciones campos

    static comprobar_CodigoL_libro_search() {
        DOM_class.mostrarexitovalor('CodigoL');
        return true;
    }

    static comprobar_AutoresL_libro_search() {

        if (validacionesatomicas.size_maximo('AutoresL', 200)) {
        }
        else {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('AutoresL', 'KO_AutoresL_max');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('AutoresL');
        return true;

    }

    static comprobar_TituloL_libro_search() {

        if (validacionesatomicas.size_maximo('TituloL', 100)) {
        }
        else {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('TituloL', 'KO_TituloL_max');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('TituloL');
        return true;

    }

    static comprobar_ISBN_libro_search() {
        if (validacionesatomicas.size_maximo('ISBN', 13)) {
        }
        else {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('ISBN', 'KO_ISBN_max');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('ISBN');
        return true;

    }

    static comprobar_PagIniL_libro_search() {
        if (!validacionesatomicas.is_numeric('PagIniL')) {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('PagIniL', 'KO_PagIniL_numeric');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('PagIniL');
        return true;
    }

    static comprobar_PagFinL_libro_search() {
        if (!validacionesatomicas.is_numeric('PagFinL')) {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('PagFinL', 'KO_PagFinL_numeric');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('PagFinL');
        return true;
    }

    static comprobar_VolumenL_libro_search() {
        if (validacionesatomicas.is_numeric('VolumenL')) { }
        else {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('VolumenL', 'KO_VolumenL_numeric');
            //salir ejecucion con false
            return false;
        }

        if (validacionesatomicas.size_maximo('VolumenL', 4)) {
        }
        else {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('VolumenL', 'KO_VolumenL_max');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('VolumenL');
        return true;

    }

    static comprobar_EditorialL_libro_search() {

        if (validacionesatomicas.size_maximo('EditorialL', 100)) {
        }
        else {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('EditorialL', 'KO_EditorialL_max');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('EditorialL');
        return true;

    }

    static comprobar_EditorL_libro_search() {

        if (validacionesatomicas.size_maximo('EditorL', 100)) {
        }
        else {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('EditorL', 'KO_EditorL_max');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('EditorL');
        return true;

    }

    static comprobar_FechaPublicacionL_libro() {
        if (validacionesatomicas.size_minimo('FechaPublicacionL', 10)) {
        }
        else {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('FechaPublicacionL', 'KO_FechaPublicacionL_min');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('FechaPublicacionL');
        return true;
    }

    static comprobar_EditorL_libro_seacrh() {

        if (validacionesatomicas.size_maximo('EditorL', 100)) {
        }
        else {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('EditorL', 'KO_EditorL_max');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('EditorL');
        return true;

    }

    static comprobar_PaisEdicionL_libro_search() {
        if (validacionesatomicas.size_maximo('PaisEdicionL', 20)) {
        }
        else {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('PaisEdicionL', 'KO_PaisEdicionL_max');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('PaisEdicionL');
        return true;

    }

    static comprobar_AutoresL_libro() {

        if (validacionesatomicas.size_minimo('AutoresL', 6)) {
        }
        else {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('AutoresL', 'KO_AutoresL_min');
            //salir ejecucion con false
            return false;
        }

        if (validacionesatomicas.size_maximo('AutoresL', 200)) {
        }
        else {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('AutoresL', 'KO_AutoresL_max');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('AutoresL');
        return true;

    }

    static comprobar_TituloL_libro() {

        if (validacionesatomicas.size_minimo('TituloL', 10)) {
        }
        else {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('TituloL', 'KO_TituloL_min');
            //salir ejecucion con false
            return false;
        }

        if (validacionesatomicas.size_maximo('TituloL', 100)) {
        }
        else {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('TituloL', 'KO_TituloL_max');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('TituloL');
        return true;

    }

    static comprobar_ISBN_libro() {
        if (validacionesatomicas.size_minimo('ISBN', 13)) {
        }
        else {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('ISBN', 'KO_ISBN_min');
            //salir ejecucion con false
            return false;
        }

        if (validacionesatomicas.size_maximo('ISBN', 13)) {
        }
        else {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('ISBN', 'KO_ISBN_max');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('ISBN');
        return true;

    }

    static comprobar_PagIniL_libro() {

        if (!validacionesatomicas.size_maximo('PagIniL', 4)) {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('PagIniL', 'KO_PagIniL_max');
            //salir ejecucion con false
            return false;
        }

        if (!validacionesatomicas.is_numeric('PagIniL')) {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('PagIniL', 'KO_PagIniL_numeric');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('PagIniL');
        return true;

    }

    static comprobar_PagFinL_libro() {
        if (!validacionesatomicas.size_maximo('PagFinL', 4)) {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('PagFinL', 'KO_PagFinL_max');
            //salir ejecucion con false
            return false;
        }

        if (!validacionesatomicas.is_numeric('PagFinL')) {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('PagFinL', 'KO_PagFinL_numeric');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('PagFinL');
        return true;
    }

    static comprobar_VolumenL_libro() {
        if (!validacionesatomicas.is_numeric('VolumenL')) {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('VolumenL', 'KO_VolumenL_numeric');
            //salir ejecucion con false
            return false;
        }

        if (!validacionesatomicas.size_maximo('VolumenL', 4)) {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('VolumenL', 'KO_VolumenL_max');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('VolumenL');
        return true;

    }

    static comprobar_EditorialL_libro() {

        if (validacionesatomicas.size_maximo('EditorialL', 100)) {
        }
        else {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('EditorialL', 'KO_EditorialL_max');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('EditorialL');
        return true;

    }

    static comprobar_FechaPublicacionL_libro_search() {
        DOM_class.mostrarexitovalor('FechaPublicacionL');
        return true;
    }

    static comprobar_EditorL_libro() {

        if (validacionesatomicas.size_maximo('EditorL', 100)) {
        }
        else {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('EditorL', 'KO_EditorL_max');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('EditorL');
        return true;

    }

    static comprobar_PaisEdicionL_libro() {

        if (validacionesatomicas.size_minimo('PaisEdicionL', 5)) {
        }
        else {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('PaisEdicionL', 'KO_PaisEdicionL_min');
            //salir ejecucion con false
            return false;
        }

        if (validacionesatomicas.size_maximo('PaisEdicionL', 20)) {
        }
        else {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('PaisEdicionL', 'KO_PaisEdicionL_max');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('PaisEdicionL');
        return true;

    }

    static vaciarForm(){
        document.getElementById("IU_form").innerHTML = '';
    }

    static recargarform() {
        document.getElementById("IU_form").innerHTML = `        
        
        <label class="label_autor_libro">Autor</label>
        <input type='text' id='AutoresL' name='AutoresL'></input>
        <div id="div_error_AutoresL" class="errorcampo"><a id="error_AutoresL"></a></div>
        <br>
        
        <label class="label_titulo_libro">títulooo</label>
        <input type='text' id='TituloL' name='TituloL'></input>
        <div id="div_error_TituloL" class="errorcampo"><a id="error_TituloL"></a></div>
        <br>
        
        <label class="label_ISBN_libro">ISBN</label>
        <input type='text' id='ISBN' name='ISBN'></input>
        <div id="div_error_ISBN" class="errorcampo"><a id="error_ISBN"></a></div>
        <br>    
        
        <label class="label_PagIniL_libro"></label>
        <input type='text' id='PagIniL' name='PagIniL'></input>
        <div id="div_error_PagIniL" class="errorcampo"><a id="error_PagIniL"></a></div>
        <br>

        <label class="label_PagFinL_libro"></label>
        <input type='text' id='PagFinL' name='PagFinL'></input>
        <div id="div_error_PagFinL" class="errorcampo"><a id="error_PagFinL"></a></div>
        
        <br>
        <label class="label_volumen_libro"></label>
        <input type='text' id='VolumenL' name='VolumenL'></input>
        <div id="div_error_VolumenL" class="errorcampo"><a id="error_VolumenL"></a></div>                
        <br>

        <label class="label_editorialL_libro"></label>
        <input type='text' id='EditorialL' name='EditorialL'></input>
        <div id="div_error_EditorialL" class="errorcampo"><a id="error_EditorialL"></a></div>                
        
        <br>

        <label class="label_fecha_libro"></label>
        <input type='date' id='FechaPublicacionL' name='FechaPublicacionL'></input>
        <div id="div_error_FechaPublicacionL" class="errorcampo"><a id="error_FechaPublicacionL"></a></div>
        <br>

        <label class="label_editor_libro"></label>
        <input type='text' id='EditorL' name='EditorL'></input>
        <div id="div_error_EditorL" class="errorcampo"><a id="error_EditorL"></a></div>
        <br>

        <label class="label_pais_edicion_libro"></label>
        <input type='text' id='PaisEdicionL' name='PaisEdicionL'></input>
        <div id="div_error_PaisEdicionL" class="errorcampo"><a id="error_PaisEdicionL"></a></div>        

        <br>        
        <a id="link_foto_persona" href="http://193.147.87.202/ET2/filesuploaded/files_foto_persona/"><img src="./iconos/FILE.png" /></a>
        <label id="label_nuevo_foto_persona" class="label_nuevo_foto_persona">Nueva Foto Persona</label>
        <input type='file' id='archivopdfL' name='archivopdfL'></input>
        <div id="div_error_foto_persona" class="errorcampo"><a id="error_nuevo_foto_persona"></a></div>
        <br>
        
        `;

        //obtener campos del formulario
        let campos = document.forms['IU_form'].elements;
        //recorrer todos los campos
        for (let i = 0; i < campos.length; i++) {
            if (eval(document.getElementById('div_error_' + campos[i].id))) {
                document.getElementById('div_error_' + campos[i].id).style.display = 'none';
            }
        }

        setLang();


    }

    static recargarform_search() {

        document.getElementById("IU_form").innerHTML = '';

        document.getElementById("IU_form").innerHTML = `        
        
        <label class="label_codigo">CodigoL</label>
        <input type='text' id='CodigoL' name='CodigoL'></input>
        <div id="div_error_CodigoL" class="errorcampo"><a id="error_CodigoL"></a></div>
        <br>

        <label class="label_autor_libro">Autor</label>
        <input type='text' id='AutoresL' name='AutoresL'></input>
        <div id="div_error_AutoresL" class="errorcampo"><a id="error_AutoresL"></a></div>
        <br>
        
        <label class="label_titulo_libro">títulooo</label>
        <input type='text' id='TituloL' name='TituloL'></input>
        <div id="div_error_TituloL" class="errorcampo"><a id="error_TituloL"></a></div>
        <br>
        
        <label class="label_ISBN_libro">ISBN</label>
        <input type='text' id='ISBN' name='ISBN'></input>
        <div id="div_error_ISBN" class="errorcampo"><a id="error_ISBN"></a></div>
        <br>    
        
        <label class="label_PagIniL_libro"></label>
        <input type='text' id='PagIniL' name='PagIniL'></input>
        <div id="div_error_PagIniL" class="errorcampo"><a id="error_PagIniL"></a></div>
        <br>

        <label class="label_PagFinL_libro"></label>
        <input type='text' id='PagFinL' name='PagFinL'></input>
        <div id="div_error_PagFinL" class="errorcampo"><a id="error_PagFinL"></a></div>
        
        <br>
        <label class="label_volumen_libro"></label>
        <input type='text' id='VolumenL' name='VolumenL'></input>
        <div id="div_error_VolumenL" class="errorcampo"><a id="error_VolumenL"></a></div>                
        <br>

        <label class="label_editorialL_libro"></label>
        <input type='text' id='EditorialL' name='EditorialL'></input>
        <div id="div_error_EditorialL" class="errorcampo"><a id="error_EditorialL"></a></div>                
        
        <br>

        <label class="label_fecha_libro"></label>
        <input type='date' id='FechaPublicacionL' name='FechaPublicacionL'></input>
        <div id="" class="errorcampo"><a id="error_FechaPublicacionL"></a></div>

        <label class="label_editor_libro"></label>
        <input type='text' id='EditorL' name='EditorL'></input>
        <div id="div_error_EditorL" class="errorcampo"><a id="error_EditorL"></a></div>
        <br>

        <label class="label_pais_edicion_libro"></label>
        <input type='text' id='PaisEdicionL' name='PaisEdicionL'></input>
        <div id="div_error_PaisEdicionL" class="errorcampo"><a id="error_PaisEdicionL"></a></div>        

        
        
        `;

        //obtener campos del formulario
        let campos = document.forms['IU_form'].elements;
        //recorrer todos los campos
        for (let i = 0; i < campos.length; i++) {
            if (eval(document.getElementById('div_error_' + campos[i].id))) {
                document.getElementById('div_error_' + campos[i].id).style.display = 'none';
            }
        }

        setLang();


    }
}