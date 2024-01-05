class Gestion_libros extends GestionEntidad{

    
    //-----------------------------------------------------------------------------
    // formularios

    static async createForm_ADD(){
    
        // resetear el formulario
        // hemos hecho una modificación de manera que cargamos el contenido del formulario desde su html cada vez que lo preparamos para una accion
        // obviamente es dependiente de la entidad y por lo tanto no esta en la superclase
        this.recargarform();
        
        // rellenar titulo formulario
        // usamos className mientras no tenemos que utilizar clases de css puesto que borra todos los class del elemento
        document.querySelector(".class_contenido_titulo_form").className = "class_contenido_titulo_form titulo_form_ADD_libro"; 

        // se rellena el action del formulario
        document.getElementById('IU_form').action = 'javascript:Gestion_libros.ADD();';
        document.getElementById('IU_form').setAttribute('onsubmit', 'return Gestion_libros.comprobar_submit();');
        
        // se coloca el onblur del autor y se pone a vacio el valor (o podriamos hacerlo en el resetearformusuario())
        document.getElementById('AutoresL').setAttribute('onblur', 'Gestion_libros.comprobar_autor_libro()');
        
        // se coloca el onblur del nombre y se pone a vacio el valor (o podriamos hacerlo en el resetearformusuario())
        document.getElementById('TituloL').setAttribute('onblur', 'Gestion_libros.comprobar_titulo_libro()');
                
        document.getElementById('ISBN').setAttribute('onblur', 'Gestion_libros.comprobar_ISBN_libro()');

        document.getElementById('PagIniL').setAttribute('onblur','Gestion_libros.comprobar_PagIniL_libro()');

        document.getElementById('PagFinL').setAttribute('onblur','Gestion_libros.comprobar_PagFinL_libro()');

        document.getElementById('VolumenL').setAttribute('onblur','Gestion_libros.comprobar_VolumenL_libro()');

        document.getElementById('FechaPublicacionL').setAttribute('onblur','Gestion_libros.comprobar_FechaPublicacionL_libro()');

        document.getElementById('EditorialL').setAttribute('onblur','Gestion_libros.comprobar_EditorialL_libro()');

        document.getElementById('EditorL').setAttribute('onblur','Gestion_libros.comprobar_EditorL_libro()');

        document.getElementById('PaisEdicionL').setAttribute('onblur','Gestion_libros.comprobar_PaisEdicionL_libro()');       
        
        //toDO    
        
        let botonadd = document.createElement('button');
        botonadd.type = 'submit';
        let imgadd = document.createElement('img');
        imgadd.src = './iconos/ADD.png';
        botonadd.append(imgadd);

        const form = document.getElementById('IU_form')

        /*
        form.addEventListener("submit", function(e) {
            //e.preventDefault();
            let data = new FormData(form);
            for (let [name,value] of data) {
              value = "aaaaaaa"
                //console.log(name, ":", value)
            }
          })
        */

        document.getElementById('IU_form').append(botonadd);        

        // para actualizar idioma despues de incluir la imagen
        setLang();

        // se muestra el formulario
        document.getElementById('div_IU_form').style.display = 'block';

    }

    static createForm_EDIT(datostupla){
        debugger;
        //todo poner los onblur
        // resetear el formulario
        this.recargarform_search();       

        // rellenar titulo formulario
        document.querySelector(".class_contenido_titulo_form").className = "class_contenido_titulo_form titulo_form_DELETE_libro";

        // se rellena el action del formulario
        document.getElementById('IU_form').action = 'javascript:Gestion_libros.DELETE();';
        
        document.getElementById('CodigoL').value = datostupla.CodigoL;

        document.getElementById('AutoresL').value = datostupla.AutoresL;
        
        document.getElementById('TituloL').value = datostupla.TituloL;

        document.getElementById('ISBN').value = datostupla.ISBN;

        document.getElementById('PagIniL').value = datostupla.PagIniL;

        document.getElementById('PagFinL').value = datostupla.PagFinL;

        document.getElementById('VolumenL').value = datostupla.VolumenL;

        document.getElementById('EditorialL').value = datostupla.EditorialL;

        document.getElementById('FechaPublicacionL').value = datostupla.CFechaPublicacionLodigoL;
        
        document.getElementById('EditorL').value = datostupla.EditorL;

        document.getElementById('FechaPublicacionL').value = datostupla.FechaPublicacionL;

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

    static createForm_DELETE(datostupla){
        debugger;
        // resetear el formulario
        this.recargarform_search();

        // rellenar titulo formulario
        document.querySelector(".class_contenido_titulo_form").className = "class_contenido_titulo_form titulo_form_DELETE_libro";

        // se rellena el action del formulario
        document.getElementById('IU_form').action = 'javascript:Gestion_libros.DELETE();';
        
        document.getElementById('CodigoL').value = datostupla.CodigoL;
        document.getElementById('CodigoL').setAttribute('readonly',true); 

        document.getElementById('AutoresL').value = datostupla.AutoresL;
        document.getElementById('AutoresL').setAttribute('readonly',true);
                
        document.getElementById('TituloL').value = datostupla.TituloL;
        document.getElementById('TituloL').setAttribute('readonly',true); 

        document.getElementById('ISBN').value = datostupla.ISBN;
        document.getElementById('ISBN').setAttribute('readonly',true); 

        document.getElementById('PagIniL').value = datostupla.PagIniL;
        document.getElementById('PagIniL').setAttribute('readonly',true); 

        document.getElementById('PagFinL').value = datostupla.PagFinL;
        document.getElementById('PagFinL').setAttribute('readonly',true); 

        document.getElementById('VolumenL').value = datostupla.VolumenL;
        document.getElementById('VolumenL').setAttribute('readonly',true); 

        document.getElementById('EditorialL').value = datostupla.EditorialL;
        document.getElementById('EditorialL').setAttribute('readonly',true); 

        document.getElementById('FechaPublicacionL').value = datostupla.CFechaPublicacionLodigoL;
        document.getElementById('FechaPublicacionL').setAttribute('readonly',true); 
        
        document.getElementById('EditorL').value = datostupla.EditorL;
        document.getElementById('EditorL').setAttribute('readonly',true); 

        document.getElementById('FechaPublicacionL').value = datostupla.FechaPublicacionL;
        document.getElementById('FechaPublicacionL').setAttribute('readonly',true); 

        /*
        document.getElementById('archivopdfL').value = datostupla.archivopdfL;
        document.getElementById('archivopdfL').setAttribute('readonly',true); 
        */

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

    static createForm_SHOWCURRENT(datostupla){
        debugger;
        // reutilizo la creación del delete porque me implica pocas modificaciones
        this.createForm_DELETE(datostupla);
        
        // eliminar boton delete del form DELETE
        document.getElementById('botondelete').remove();
        
        // se rellena el action del formulario
        let imgshowcurrent = document.createElement('img');
        imgshowcurrent.src = './iconos/SHOWCURRENT.png';
        imgshowcurrent.setAttribute("onclick","DOM_class.cerrar_div_formulario();")
        document.getElementById('IU_form').append(imgshowcurrent);

        // para actualizar el idioma
        setLang();


    }

    static createForm_SEARCH(){
        // se rellena el action del formulario
        document.getElementById('IU_form').action = 'javascript:Gestion_libros.SEARCH();';
        // resetear el formulario
        this.recargarform_search();
        
        // rellenar titulo formulario
        document.querySelector(".class_contenido_titulo_form").className = "class_contenido_titulo_form titulo_form_SEARCH_libro";

        // se coloca el onblur del nombre y se pone a vacio el valor (o podriamos hacerlo en el resetearformusuario())
        document.getElementById('CodigoL').setAttribute('onblur', 'Gestion_libros.comprobar_CodigoL_libro_search()');

        // se coloca el onblur del nombre y se pone a vacio el valor (o podriamos hacerlo en el resetearformusuario())
        document.getElementById('TituloL').setAttribute('onblur', 'Gestion_libros.comprobar_titulo_libro_search()');
                
        // se coloca el onblur del autor y se pone a vacio el valor (o podriamos hacerlo en el resetearformusuario())
        document.getElementById('AutoresL').setAttribute('onblur', 'Gestion_libros.comprobar_autor_libro_search()');

        document.getElementById('ISBN').setAttribute('onblur', 'Gestion_libros.comprobar_ISBN_libro_search()');

        document.getElementById('PagIniL').setAttribute('onblur','Gestion_libros.comprobar_PagIniL_libro()');

        document.getElementById('PagFinL').setAttribute('onblur','Gestion_libros.comprobar_PagFinL_libro_search()');

        document.getElementById('VolumenL').setAttribute('onblur','Gestion_libros.comprobar_VolumenL_libro_search()');

        document.getElementById('EditorialL').setAttribute('onblur','Gestion_libros.comprobar_EditorialL_libro_search()');

        document.getElementById('FechaPublicacionL').setAttribute('onblur','Gestion_libros.comprobar_FechaPublicacionL_libro_search()');

        document.getElementById('EditorL').setAttribute('onblur','Gestion_libros.comprobar_EditorL_libro_search()');

        document.getElementById('PaisEdicionL').setAttribute('onblur','Gestion_libros.comprobar_PaisEdicionL_libro_search()');       

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

    static comprobar_submit(){                
        let valor1 = this.comprobar_autor_libro();
        let valor2 = this.comprobar_titulo_libro();
        let valor3 = this.comprobar_ISBN_libro();
        
        let valor4 = this.comprobar_PagIniL_libro();
        let valor5 = this.comprobar_PagFinL_libro();
        let valor6 = this.comprobar_VolumenL_libro();
        let valor7 = this.comprobar_EditorialL_libro();
        let valor8 = this.comprobar_FechaPublicacionL_libro();
        let valor9 = this.comprobar_EditorL_libro();
        let valor10 = this.comprobar_PaisEdicionL_libro();
        //todo
        //let valor11 = this.comprobar_archivo_pdf_persona();

        let resultado = (
            valor1 &&
            valor2 &&
            valor3 &&
            valor4 &&
            valor5 &&
            valor6 &&
            valor7 &&
            valor8 && 
            valor9 &&
            valor10 
            //valor11
        );                
        
        return resultado;
        
    }

    static comprobar_submit_SEARCH(){
        debugger;        
        let valor = this.comprobar_autor_libro_SEARCH();
        let valor1 = this.comprobar_titulo_libro_SEARCH();
        let valor2 = this.comprobar_comprobar_ISBN_libro_SEARCH();
        let valor3 = this.comprobar_PagIniL_libro_SEARCH();
        let valor4 = this.comprobar_PagFinL_libro_SEARCH();
        let valor5 = this.comprobar_VolumenL_libro_SEARCH();
        let valor6 = this.comprobar_EditorialL_libro_SEARCH();
        let valor7 = this.comprobar_FechaPublicacionL_libro_SEARCH();
        let valor8 = this.comprobar_EditorL_libro_SEARCH();
        let valor9 = this.comprobar_PaisEdicionL_libro_SEARCH();
        
        
        let resultado = (
            valor &&
            valor1 &&
            valor2 &&
            valor3 &&
            valor4 &&
            valor5 &&
            valor6 &&
            valor7 &&
            valor8 &&
            valor9
        );
                
        return resultado;
    }

    //-----------------------------------------------------------------------------
    // acciones a back

    static async ADD(){
        await this.peticionBackGeneral('IU_form', 'libro', 'ADD')
        .then((respuesta) => {
            if (respuesta['ok']){
                this.recargarform();
                this.SEARCH();
            }
            else{
                DOM_class.mostrardivmensajes(respuesta['code']);
            }
        });
    }

    static async EDIT(){
        await this.peticionBackGeneral('IU_form', 'libro', 'EDIT')
        .then((respuesta) => {
            if (respuesta['ok']){
                this.recargarform();
                this.SEARCH();
            }
            else{
                DOM_class.mostrardivmensajes(respuesta['code']);
            }
        });
    }

    static async DELETE(){
        await this.peticionBackGeneral('IU_form', 'libro', 'DELETE')
        .then((respuesta) => {
            if (respuesta['ok']){
                this.recargarform();
                this.SEARCH();
            }
            else{
                DOM_class.mostrardivmensajes(respuesta['code']);
            }
        });
    }

    static async SEARCH(){
        debugger;
        await this.peticionBackGeneral('IU_form', 'libro', 'SEARCH')
        .then((respuesta) => {
            this.recargarform();
            let libro = new Gestion_libros('libros',respuesta['resource'],Array('CodigoL','AutoresL','TituloL')); libro.mostrartabla();
            if (respuesta['code'] == 'RECORDSET_VACIO'){
                document.getElementById('muestradatostabla').innerHTML = 'no hay datos coincidentes con la busqueda';
            }
        });
    }

    //-----------------------------------------------------------------------------
    //validaciones campos

    static comprobar_CodigoL_libro_search(){                 
         DOM_class.mostrarexitovalor('CodigoL');
         return true; 
     }

     static comprobar_autor_libro_search(){
        debugger;
         if (validacionesatomicas.size_maximo('AutoresL',200)){
         }
         else{
             //modificacion parametros texto error
             DOM_class.mostrardivmensajeserrordebajo('AutoresL','KO_autor_libro_tam_max');
             //salir ejecucion con false
             return false;
         }
 
         DOM_class.mostrarexitovalor('AutoresL');
         return true;
 
     }

     static comprobar_titulo_libro_search(){
       
         if (validacionesatomicas.size_maximo('TituloL',100)){
         }
         else{
             //modificacion parametros texto error
             DOM_class.mostrardivmensajeserrordebajo('TituloL','KO_titulo_libro_tam_max');
             //salir ejecucion con false
             return false;
         }
 
         DOM_class.mostrarexitovalor('TituloL');
         return true;
 
     }

     static comprobar_ISBN_libro_search(){        
         if (validacionesatomicas.size_maximo('ISBN',13)){
         }
         else{
             //modificacion parametros texto error
             DOM_class.mostrardivmensajeserrordebajo('ISBN','KO_ISBN_tam_max');
             //salir ejecucion con false
             return false;
         }
 
         DOM_class.mostrarexitovalor('ISBN');
         return true;
 
     }

     static comprobar_PagIniL_libro_search(){
        if (validacionesatomicas.size_maximo('PagIniL',4)){
        }
        else{
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('ISBN','KO_PagIniL_tam_max');
            //salir ejecucion con false
            return false;
        }

        if (!validacionesatomicas.is_numeric('PagIniL'))
        {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('PagIniL','KO_PagIniL_numeric');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('PagIniL');
        return true;
    }

    static comprobar_PagFinL_libro_search(){
        if (validacionesatomicas.size_maximo('PagFinL',4)){
        }
        else{
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('PagFinL','KO_PagFinL_tam_max');
            //salir ejecucion con false
            return false;
        }

        if (!validacionesatomicas.is_numeric('PagFinL'))
        {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('PagFinL','KO_PagFinL_numeric');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('PagFinL');
        return true;
    }

    static comprobar_VolumenL_libro_search(){
        if (validacionesatomicas.is_numeric('VolumenL'))
        {}
        else{
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('VolumenL','KO_VolumenL_numeric');
            //salir ejecucion con false
            return false;
        }   
        
         if (validacionesatomicas.size_maximo('VolumenL',4)){
         }
         else{
             //modificacion parametros texto error
             DOM_class.mostrardivmensajeserrordebajo('VolumenL','KO_VolumenL_tam_max');
             //salir ejecucion con false
             return false;
         }
 
         DOM_class.mostrarexitovalor('VolumenL');
         return true;
 
     }

     static comprobar_EditorialL_libro_search(){        
 
        if (validacionesatomicas.size_maximo('EditorialL',100)){
        }
        else{
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('EditorialL','KO_EditorialL_tam_max');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('EditorialL');
        return true;

    }

    static comprobar_EditorL_libro_search(){        
 
        if (validacionesatomicas.size_maximo('EditorL',100)){
        }
        else{
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('EditorL','KO_EditorL_tam_max');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('EditorL');
        return true;

    }

    static comprobar_FechaPublicacionL_libro(){                 
        if (validacionesatomicas.size_minimo('FechaPublicacionL',10)){
        }
        else{
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('FechaPublicacionL','KO_FechaPublicacionL_tam_min');
            //salir ejecucion con false
            return false;
        }

        if (validacionesatomicas.fecha_mayor_hoy('FechaPublicacionL')){
        }
        else{
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('FechaPublicacionL','KO_FechaPublicacionL_mayor_hoy');
            //salir ejecucion con false
            return false;
        }


        DOM_class.mostrarexitovalor('FechaPublicacionL');
        return true;
    }

    static comprobar_EditorL_libro_seacrh(){
         
        if (validacionesatomicas.size_maximo('EditorL',100)){
        }
        else{
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('EditorL','KO_EditorL_tam_max');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('EditorL');
        return true;

    }

    static comprobar_PaisEdicionL_libro_search(){
         if (validacionesatomicas.size_maximo('PaisEdicionL',20)){
         }
         else{
             //modificacion parametros texto error
             DOM_class.mostrardivmensajeserrordebajo('PaisEdicionL','KO_PaisEdicionL_tam_max');
             //salir ejecucion con false
             return false;
         }
 
         DOM_class.mostrarexitovalor('PaisEdicionL');
         return true;
 
     }

    static comprobar_autor_libro(){

       if (validacionesatomicas.size_minimo('AutoresL',6)){
        }
        else{
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('AutoresL','KO_autor_libro_tam_min');
            //salir ejecucion con false
            return false;
        }

        if (validacionesatomicas.size_maximo('AutoresL',200)){
        }
        else{
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('AutoresL','KO_autor_libro_tam_max');
            //salir ejecucion con false
            return false;
        }

        DOM_class.mostrarexitovalor('AutoresL');
        return true;

    }

    static comprobar_titulo_libro(){

        if (validacionesatomicas.size_minimo('TituloL',10)){
         }
         else{
             //modificacion parametros texto error
             DOM_class.mostrardivmensajeserrordebajo('TituloL','KO_titulo_libro_tam_min');
             //salir ejecucion con false
             return false;
         }
 
         if (validacionesatomicas.size_maximo('TituloL',100)){
         }
         else{
             //modificacion parametros texto error
             DOM_class.mostrardivmensajeserrordebajo('TituloL','KO_titulo_libro_tam_max');
             //salir ejecucion con false
             return false;
         }
 
         DOM_class.mostrarexitovalor('TituloL');
         return true;
 
     }

     static comprobar_ISBN_libro(){
        if (!validacionesatomicas.is_numeric('ISBN'))
        {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('ISBN','KO_ISBN_numeric');
            //salir ejecucion con false
            return false;
        }

        if (validacionesatomicas.size_minimo('ISBN',13)){
         }
         else{
             //modificacion parametros texto error
             DOM_class.mostrardivmensajeserrordebajo('ISBN','KO_ISBN_tam_min');
             //salir ejecucion con false
             return false;
         }
 
         if (validacionesatomicas.size_maximo('ISBN',13)){
         }
         else{
             //modificacion parametros texto error
             DOM_class.mostrardivmensajeserrordebajo('ISBN','KO_ISBN_tam_max');
             //salir ejecucion con false
             return false;
         }
 
         DOM_class.mostrarexitovalor('ISBN');
         return true;
 
     }

     static comprobar_PagIniL_libro(){
 
         if (!validacionesatomicas.size_maximo('PagIniL',4))
         {
             //modificacion parametros texto error
             DOM_class.mostrardivmensajeserrordebajo('PagIniL','KO_PagIniL_tam_max');
             //salir ejecucion con false
             return false;
         }

         if (!validacionesatomicas.is_numeric('PagIniL'))
         {
             //modificacion parametros texto error
             DOM_class.mostrardivmensajeserrordebajo('PagIniL','KO_PagIniL_numeric');
             //salir ejecucion con false
             return false;
         }

         DOM_class.mostrarexitovalor('PagIniL');
         return true;
 
     }

     static comprobar_PagFinL_libro(){         
         if (!validacionesatomicas.size_maximo('PagFinL',4))
         {
             //modificacion parametros texto error
             DOM_class.mostrardivmensajeserrordebajo('PagFinL','KO_PagFinL_tam_max');
             //salir ejecucion con false
             return false;
         }

         if (!validacionesatomicas.is_numeric('PagFinL'))
         {
             //modificacion parametros texto error
             DOM_class.mostrardivmensajeserrordebajo('PagFinL','KO_PagFinL_numeric');
             //salir ejecucion con false
             return false;
         }
 
         DOM_class.mostrarexitovalor('PagFinL');
         return true; 
     }

     static comprobar_VolumenL_libro(){
        if (!validacionesatomicas.is_numeric('VolumenL'))
        {
            //modificacion parametros texto error
            DOM_class.mostrardivmensajeserrordebajo('VolumenL','KO_VolumenL_numeric');
            //salir ejecucion con false
            return false;
        }   
        
         if (!validacionesatomicas.size_maximo('VolumenL',4))
         {
             //modificacion parametros texto error
             DOM_class.mostrardivmensajeserrordebajo('VolumenL','KO_VolumenL_tam_max');
             //salir ejecucion con false
             return false;
         }
 
         DOM_class.mostrarexitovalor('VolumenL');
         return true;
 
     }

     static comprobar_EditorialL_libro(){        
 
         if (validacionesatomicas.size_maximo('EditorialL',100)){
         }
         else{
             //modificacion parametros texto error
             DOM_class.mostrardivmensajeserrordebajo('EditorialL','KO_EditorialL_tam_max');
             //salir ejecucion con false
             return false;
         }
 
         DOM_class.mostrarexitovalor('EditorialL');
         return true;
 
     }
     
    static comprobar_FechaPublicacionL_libro_search(){
        DOM_class.mostrarexitovalor('FechaPublicacionL');
        return true;                 
    }

     static comprobar_EditorL_libro(){
         
         if (validacionesatomicas.size_maximo('EditorL',100)){
         }
         else{
             //modificacion parametros texto error
             DOM_class.mostrardivmensajeserrordebajo('EditorL','KO_EditorL_tam_max');
             //salir ejecucion con false
             return false;
         }
 
         DOM_class.mostrarexitovalor('EditorL');
         return true;
 
     }

     static comprobar_PaisEdicionL_libro(){

        if (validacionesatomicas.size_minimo('PaisEdicionL',5)){
         }
         else{
             //modificacion parametros texto error
             DOM_class.mostrardivmensajeserrordebajo('PaisEdicionL','KO_PaisEdicionL_tam_min');
             //salir ejecucion con false
             return false;
         }
 
         if (validacionesatomicas.size_maximo('PaisEdicionL',20)){
         }
         else{
             //modificacion parametros texto error
             DOM_class.mostrardivmensajeserrordebajo('PaisEdicionL','KO_PaisEdicionL_tam_max');
             //salir ejecucion con false
             return false;
         }
 
         DOM_class.mostrarexitovalor('PaisEdicionL');
         return true;
 
     }    
        
    static recargarform(){

        document.getElementById("IU_form").innerHTML= '';

        document.getElementById("IU_form").innerHTML=`        
        
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
        for (let i=0;i<campos.length;i++) {
            if (eval(document.getElementById('div_error_'+campos[i].id))){
                document.getElementById('div_error_'+campos[i].id).style.display = 'none';
            }
        }

        setLang();

       
    }

    static recargarform_search(){

        document.getElementById("IU_form").innerHTML= '';

        document.getElementById("IU_form").innerHTML=`        
        
        <label class="label_CodigoL">CodigoL</label>
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
        for (let i=0;i<campos.length;i++) {
            if (eval(document.getElementById('div_error_'+campos[i].id))){
                document.getElementById('div_error_'+campos[i].id).style.display = 'none';
            }
        }

        setLang();

       
    }
}