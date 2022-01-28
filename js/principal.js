"use strict";
/*
##################
########  FUNCTION
#####
*/
/*
/////////
////  OCULTATION FORM
//////
*/
function gestionFormularios(oEvento){
    let oE = oEvento || window.event;
    
    
    radioReset();
    inicializarSelects();
    
    let idEvento = oE.target.id;
    
    // oculta todo a no ser de que seleccione el desplegable
    if(idEvento != 'navbarDropdown'){
        ocultarFormularios();
        ocultarListados();
    }
    
    let div;

    switch(idEvento){
        case 'mnuAltaPersona':
            div = document.querySelector('#divAltaPersona');
            div.style.display = "block";
        break; 
        case 'mnuAltaReserva':
            div = document.querySelector('#divAltaReserva');
            div.style.display = "block";
        break;
        case 'mnuModificarReservas':
            div = document.querySelector('#divModificarReservas');
            div.style.display = "block";
            
        break;
        case 'mnuAltaServicio':
            div = document.querySelector('#divAltaServicio');
            div.style.display = "block";
        break;
        case 'mnuAltaHabitacion':
            div = document.querySelector('#divAltaHabitacion');
            div.style.display = "block";
        break;
        case 'mnuListadoPorHabitacion':
            div = document.querySelector('#divListarReservasHabitacion');
            div.style.display = "block";
        break;
        case 'mnuListadoPorFecha':
            div = document.querySelector('#divListarEntreDosFechas');
            div.style.display = "block";
        break;
        }

        //mostrar listados básicos
        let idListados = ['mnuListadoTrabajador', 'mnuListadoCliente', 'mnuListadoReservas', 'mnuListadoServicios', 'mnuListadoHabitaciones'];
        
        for (const idListado of idListados) {
            if(idListado == idEvento){
                div = document.querySelector('#divListados');
                div.style.display = "block";
            }
        }

}

function inicializarSelects(){
    limpiarSelects();

    inicializarSelectsHabitaciones();
    inicializarSelectsCliente();
    inicializarSelectServicio();
    inicializarSelectReserva();
}

function limpiarSelects(){
    let selects=document.querySelectorAll('select');

    for (const select of selects) {
        while (select.firstChild) {
            select.firstChild.remove();
        }
    
        let opcion1 = document.createElement('option');
        opcion1.setAttribute('value', '');
        opcion1.textContent = 'Seleccione una opción';
        select.appendChild(opcion1);
    }
}

function inicializarSelectsHabitaciones()
{
    let selectsHabitacion=document.querySelectorAll('.selectHabitacion');
    
    for (const select of selectsHabitacion) {        
        let option=hotel.cargarOptionHabitacion();
        for (const i of option) {
            select.add(i);
        }
    } 
}

function inicializarSelectsCliente()
{
    let selectsCliente=document.querySelectorAll('.selectCliente');
    for (const select of selectsCliente) {
        let options=hotel.cargarOptionsClientes();
        for (const option of options) {
            select.add(option);
        }
    }
}

function inicializarSelectServicio()
{
    let selectsServicio=document.querySelectorAll('.selectServicio');
    for (const select of selectsServicio) {
        let options=hotel.cargarOptionsServicios();
        for (const option of options) {
            select.add(option);
        }
    }
}

function inicializarSelectReserva()
{
    let selectReserva = document.querySelector('#selectModificarReserva');
    let option=hotel.cargarOptionsReserva();
    for (const i of option) {
        selectReserva.add(i);
    }
    
}

function radioReset()
{
    document.querySelector('#PerSocialSecurity').style.display='none';
    document.querySelector('#PerSalary').style.display='none';
    document.querySelector('#PerPosion').style.display='none';
    document.querySelector('#PerCreditCard').style.display='none';
    document.querySelector("#trabajador").checked = false;
    document.querySelector("#cliente").checked = false;
    document.querySelector("#camaMatrimonio").checked = false;
    document.querySelector("#camaIndividual").checked = false;
    document.querySelector('#divNumCamaIndividual').style.display='none';
    document.querySelector('#divNumCamaMatrimonio').style.display='none';

}



function ocultarFormularios(){
    let idDivs = ['#divAltaPersona', '#divAltaReserva', '#divModificarReservas', '#divAltaServicio', '#divAltaHabitacion', '#divListarReservasHabitacion', '#divListarEntreDosFechas'];

    for (const id of idDivs) {
        document.querySelector(id).style.display='none';
    }
}

function ocultarListados(){
    let listado = document.querySelector('#divListados');
    listado.style.display = 'none';
}

function cambiarRadioPersona(oEvento){

    let oE = oEvento || window.event;

    // Todos los campos a none
    document.querySelector('#PerSocialSecurity').style.display='none';
    document.querySelector('#PerSalary').style.display='none';
    document.querySelector('#PerPosion').style.display='none';
    document.querySelector('#PerCreditCard').style.display='none';

    switch(oE.target.value){
        case 'trabajador':
            document.querySelector('#PerSocialSecurity').style.display='block';
            document.querySelector('#PerSalary').style.display='block';
            document.querySelector('#PerPosion').style.display='block';
            break; 
        case 'cliente':
            document.querySelector('#PerCreditCard').style.display='block';         
            break;
    }
}



function cambiarCheckHabitacion(oEvento){

    let oE = oEvento || window.event;

    switch(oE.target.value){
        case 'individual':
                if(oE.target.checked){
                    document.querySelector('#divNumCamaIndividual').style.display='block';
                }
                else{
                    document.querySelector('#divNumCamaIndividual').style.display='none';
                }
            break; 
        case 'matrimonio':
                if(oE.target.checked){
                    document.querySelector('#divNumCamaMatrimonio').style.display='block';
                }
                else{
                    document.querySelector('#divNumCamaMatrimonio').style.display='none';
                }     
            break;
    }
}
/*
/////////
////  VALIDATION FORM
//////
*/
function validarAltaPersona(oEvento)
{
    let oE=oEvento || window.event;
    oE.preventDefault();

    let sNombre=frmAltaPersona.nombre.value;
    let sDNI=frmAltaPersona.dni.value.trim();
    let sDireccion=frmAltaPersona.direccion.value;
    let fechaNacimiento=frmAltaPersona.fechaNacimiento.value;
    let sEmail=frmAltaPersona.email.value.trim();
    let sTelefono=frmAltaPersona.telefono.value.trim();
    let radioPersona = frmAltaPersona.radioTipoPersona.value;
    let sSs=frmAltaPersona.ss.value.trim();
    let dbSueldo=frmAltaPersona.sueldo.value.trim();
    let sPuesto=frmAltaPersona.puesto.value.trim();
    let sTarjetaCredito=frmAltaPersona.tarjetaCredito.value;

    
    let bValidoNombre=validarNombre(sNombre);
    let bValidoDNI=validarDNI(sDNI);
    let bValidoDireccion=validarDireccion(sDireccion);
    let bValidoFecha=validarFechaNacimiento(fechaNacimiento);
    let bValidoEmail=validarEmail(sEmail);
    let bValidoTelefono=validarTelefono(sTelefono);
    let bValidoRadio=validarRadio(radioPersona);

    
    
    
    if(!bValidoRadio)
    {
        oE.preventDefault();
        alert('elija un tipo de persona');
        
    }
    else
    {
        if(radioPersona=='trabajador')
        {
            let bValidoSS=validarSS(sSs);
            let bValidoSueldo=validarSueldo(dbSueldo);
            let bValidoPuesto=validarPuesto(sPuesto);

            if( !bValidoNombre || !bValidoDNI || !bValidoDireccion || !bValidoFecha || !bValidoEmail || !bValidoTelefono || !bValidoSS || !bValidoSueldo || !bValidoPuesto)
            {        
                oE.preventDefault();
            }

            else
            {       
                let oPersona;  
                let id=hotel.generarId('Persona');
                let idTrabajador=hotel.generarId('Trabajador');
                oPersona = new Trabajador(id, sNombre, sDNI, sDireccion, fechaNacimiento, sEmail, sTelefono, idTrabajador, sSs, dbSueldo,sPuesto);
                let mensaje=hotel.anadirPersona(oPersona);
                mensajeModal("Persona añadida",mensaje);
                frmAltaPersona.reset();
                let valido=document.querySelectorAll('#frmAltaPersona div.valid-feedback');
                
                for (const cosa of valido) {
                    cosa.style.display="none";
                }
            }
    
        }     

        else if(radioPersona == 'cliente')
        {
            let bValidoTarjeta=validarTarjetaCredito(sTarjetaCredito);

            if( !bValidoNombre || !bValidoDNI || !bValidoDireccion || !bValidoFecha || !bValidoEmail || !bValidoTelefono || !bValidoTarjeta)
            {        
                oE.preventDefault();
            }

            else
            {       
                let oPersona;  
                let id=hotel.generarId('Persona');
                let idCliente = hotel.generarId('Cliente');
                oPersona = new Cliente(id, sNombre, sDNI, sDireccion, fechaNacimiento, sEmail, sTelefono, idCliente, sTarjetaCredito);
                let mensaje=hotel.anadirPersona(oPersona);
                mensajeModal("Persona añadida",mensaje);
                frmAltaPersona.reset();
                let valido=document.querySelectorAll('#frmAltaPersona div.valid-feedback');
                
                for (const cosa of valido) {
                    cosa.style.display="none";
                }
            }

            
        }       

    }





}

////validar formulario de servicio
function validarAltaServicio(oEvento)
{
    let oE= oEvento || window.event;
    let sNombre=frmAltaServicio.nombreServicio.value;
    let dbPrecio=frmAltaServicio.precio.value.trim();   
    let bValidoNombre=validarNombreServicio(sNombre);
    let bValidoPrecio=validarPrecio(dbPrecio);

    if(!bValidoNombre || !bValidoPrecio)
    {
        oE.preventDefault();
    }
    else
    {
        oE.preventDefault();
        let id=hotel.generarId('Servicio');
        let oServicio = new Servicio(id, sNombre, dbPrecio);
        let mensaje=hotel.anadirServicio(oServicio);
        mensajeModal("Servicio :", mensaje);
        frmAltaServicio.reset();
        let valido=document.querySelectorAll('#frmAltaServicio div.valid-feedback'); 
              
                for (const cosa of valido) {
                    cosa.style.display="none";
                }
    }
}

function validarNombre(sNombre)
{
    let regexNombre=/[A-Za-z\sáéíóúÁÉÍÓÚñÑüÜçÇ]{6,30}/;
    let bValido=true;

    if(!regexNombre.test(sNombre))
    {
        document.querySelector("#NombreCorrecto").style = "display:none";
        document.querySelector("#NombreIncorrecto").style = "display:block";
        document.getElementById('nombre').focus();
        bValido=false;
    }
    else
    {
        document.querySelector("#NombreIncorrecto").style = "display:none";
        document.querySelector("#NombreCorrecto").style = "display:block";
        bValido=true;
       
    }

    return bValido;
}

function validarDNI(sDNI)
{
    let regexDNI=/(([x-z]|[X-Z]{1})([-]?)(\d{7})([-]?)([a-z]|[A-Z]{1}))|((\d{8})([-]?)([a-z]|[A-Z]{1}))/;
    let bValido=true;

    if(!regexDNI.test(sDNI))
    {
        document.querySelector("#DNICorrecto").style = "display:none";
        document.querySelector("#DNIIncorrecto").style = "display:block";
        document.getElementById('dni').focus();
        bValido=false;
    }
    else
    {
        document.querySelector("#DNIIncorrecto").style = "display:none";
        document.querySelector("#DNICorrecto").style = "display:block";
        bValido=true;
        
    }

    return bValido;

}

function validarDireccion(sDireccion)
{
    let regexDireccion=/[A-Z/?|.?|A-Za-z0-9\sáéíóúÁÉÍÓÚñÑüÜçÇ]{6,50}/;
    let bValido=true;

    if(!regexDireccion.test(sDireccion))
    {
        document.querySelector("#DireccionCorrecto").style = "display:none";
        document.querySelector("#DireccionIncorrecto").style = "display:block";
        document.getElementById('direccion').focus();
        bValido=false;
    }
    else
    {
        document.querySelector("#DireccionIncorrecto").style = "display:none";
        document.querySelector("#DireccionCorrecto").style = "display:block";
        bValido=true;
        
    }

    return bValido;
}

function validarFechaNacimiento(fechaNacimiento)
{
    let regexFechaNac=/(\d{4})-(\d{2})-(\d{2})/;
    let bValido=true;

    if(!regexFechaNac.test(fechaNacimiento))
    {
        document.querySelector("#FechaCorrecto").style = "display:none";
        document.querySelector("#FechaIncorrecto").style = "display:block";
        document.getElementById('fechaNacimiento').focus();
        bValido=false;
    }
    else
    {
        document.querySelector("#FechaIncorrecto").style = "display:none";
        document.querySelector("#FechaCorrecto").style = "display:block";
        bValido=true;
        
    }
    return bValido;
}

function validarEmail(sEmail)
{
    let regexEmail=/[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    let bValido=true;

    if(!regexEmail.test(sEmail))
    {
        document.querySelector("#EmailCorrecto").style = "display:none";
        document.querySelector("#EmailIncorrecto").style = "display:block";
        document.getElementById('email').focus();
        bValido=false;
    }
    else
    {
        document.querySelector("#EmailIncorrecto").style = "display:none";
        document.querySelector("#EmailCorrecto").style = "display:block";
        bValido=true;
        
    }
    return bValido;

}

function validarTelefono(sTelefono)
{
    let regexTelefono=/^[\d]{9}$/;
    let bValido=true;
    if(!regexTelefono.test(sTelefono))
    {
        document.querySelector("#TelefonoCorrecto").style = "display:none";
        document.querySelector("#TelefonoIncorrecto").style = "display:block";
        document.getElementById('telefono').focus();
        bValido=false;
    }
    else
    {
        document.querySelector("#TelefonoIncorrecto").style = "display:none";
        document.querySelector("#TelefonoCorrecto").style = "display:block";
        bValido=true;
        
    }
    return bValido;
}

function validarRadio(radioPersona)
{
    let bValido=true;
    if(radioPersona=='')
    {
        document.querySelector("#TipoCorrecto").style = "display:none";
        document.querySelector("#TipoIncorrecto").style = "display:block";
        document.getElementById('telefono').focus();
        bValido=false;
    }
    else
    {
        document.querySelector("#TipoIncorrecto").style = "display:none";
        document.querySelector("#TipoCorrecto").style = "display:block";
        bValido=true;
    }
    return bValido;
}

function validarSS(sSs)
{
    let regexSS=/[\d]{12}/;
    let bValido=true;
    if( !regexSS.test(sSs))
    {
        document.querySelector("#SSCorrecto").style = "display:none";
        document.querySelector("#SSIncorrecto").style = "display:block";
        document.getElementById('ss').focus();
        bValido=false;
    }
    else
    {
        document.querySelector("#SSIncorrecto").style = "display:none";
        document.querySelector("#SSCorrecto").style = "display:block";
        bValido=true;
        
    }
    return bValido;
}

function validarSueldo(dbSueldo)
{
   
    let regexSueldo=/(\d{4,6}).?(\d{2})/;
    let bValido=true;
    if( !regexSueldo.test(dbSueldo))
    {
        document.querySelector("#SueldoCorrecto").style = "display:none";
        document.querySelector("#SueldoIncorrecto").style = "display:block";
        document.getElementById('sueldo').focus();
        bValido=false;
    }
    else
    {
        document.querySelector("#SueldoIncorrecto").style = "display:none";
        document.querySelector("#SueldoCorrecto").style = "display:block";
        bValido=true;
        
    }
    return bValido;
}

function validarPuesto(sPuesto)
{
    let regexPuesto=/^[a-zA-Z\sáéíóúÁÉÍÓÚñÑüÜçÇ]{7,20}$/;
    let bValido=true;
    if( !regexPuesto.test(sPuesto))
    {
        document.querySelector("#PuestoCorrecto").style = "display:none";
        document.querySelector("#PuestoIncorrecto").style = "display:block";
        document.getElementById('puesto').focus();
        bValido=false;
    }
    else
    {
        document.querySelector("#PuestoIncorrecto").style = "display:none";
        document.querySelector("#PuestoCorrecto").style = "display:block";
        bValido=true;
        
    }
    return bValido;
}

function validarTarjetaCredito(sTarjetaCredito)
{
    let regexTarjetaCredito=/(\d{4})\s(\d{4})\s(\d{4})\s(\d{4})/;
    let bValido=true;
    if(!regexTarjetaCredito.test(sTarjetaCredito))
    {
        document.querySelector("#TarjetaCorrecto").style = "display:none";
        document.querySelector("#TarjetaIncorrecto").style = "display:block";
        document.getElementById('tarjetaCredito').focus();
        bValido=false;
    }
    else
    {
        document.querySelector("#TarjetaIncorrecto").style = "display:none";
        document.querySelector("#TarjetaCorrecto").style = "display:block";
        bValido=true;
        
    }
    return bValido;
}

function validarPrecio(dbPrecio)
{
    let regexPrecio=/(\d{2,6}).?(\d{2})/;
    let bValido=true;
    if(!regexPrecio.test(dbPrecio))
    {
        document.querySelector("#PrecioCorrecto").style = "display:none";
        document.querySelector("#PrecioIncorrecto").style = "display:block";
        document.getElementById('precio').focus();
        bValido=false;
    }
    else
    {
        document.querySelector("#PrecioIncorrecto").style = "display:none";
        document.querySelector("#PrecioCorrecto").style = "display:block";
        bValido=true;
    }
    return bValido;
}

function validarNombreServicio(sNombre)
{
    let regexNombre=/[A-Za-z\sáéíóúÁÉÍÓÚñÑüÜçÇ]{6,30}/;
    let bValido=true;

    if(!regexNombre.test(sNombre))
    {
        document.querySelector("#NombreServicioCorrecto").style = "display:none";
        document.querySelector("#NombreServicioIncorrecto").style = "display:block";
        document.getElementById('nombreServicio').focus();
        bValido=false;
    }
    else
    {
        document.querySelector("#NombreServicioIncorrecto").style = "display:none";
        document.querySelector("#NombreServicioCorrecto").style = "display:block";
        bValido=true;
       
    }

    return bValido;
}

// Validar Reservas
function validarReserva(oEvento)
{
   
    let oE=oEvento || window.event;

    let todoCorrecto = true;
    let selectAll = document.querySelectorAll("#frmAltaReserva select");
    let dateAll= document.querySelectorAll("#frmAltaReserva input[type='date']");

    for(const select of selectAll){
        if(select.selectedIndex==0){
            select.nextElementSibling.style.display = "none";
            select.nextElementSibling.nextElementSibling.style.display = "block";
            todoCorrecto = false;
        }
        else{
            select.nextElementSibling.nextElementSibling.style.display = "none";
            select.nextElementSibling.style.display = "block";
        }
    }

    for(const date of dateAll){
        if(date.value == ""){
            date.nextElementSibling.style.display = "none";
            date.nextElementSibling.nextElementSibling.style.display = "block";
            todoCorrecto = false;
        }
        else{
            date.nextElementSibling.nextElementSibling.style.display = "none";
            date.nextElementSibling.style.display = "block";
        }
    }

    if(dateAll[0].value >= dateAll[1].value){
        dateAll[0].nextElementSibling.style.display = "none";
        dateAll[0].nextElementSibling.nextElementSibling.style.display = "block";
        dateAll[1].nextElementSibling.style.display = "none";
        dateAll[1].nextElementSibling.nextElementSibling.style.display = "block";
        todoCorrecto = false;
    }
    else{
        dateAll[0].nextElementSibling.style.display = "block";
        dateAll[0].nextElementSibling.nextElementSibling.style.display = "none";
        dateAll[1].nextElementSibling.style.display = "block";
        dateAll[1].nextElementSibling.nextElementSibling.style.display = "none";
    }

    if(!todoCorrecto){
        oE.preventDefault();
    }
    else{
        let id=hotel.generarId('Reserva');
        let oHabitacion=hotel.buscarPorId(selectAll[0].value, 'Habitacion');
        let oCliente=hotel.buscarPorId(selectAll[1].value, 'Persona');

        let oServicio=hotel.buscarPorId(selectAll[2].selectedIndex, 'Servicio'); //el select de servicios deberia de ser multiple y por lo tanto devolver un array.

        let fechaInicio=dateAll[0].value; //fecha inicio
        let fechaFin=dateAll[1].value; //fecha Fin
        //selectAll[0].textContent;// habitacion
        let precioTotal = document.querySelector("#frmAltaReserva input[type='text']");
        // console.log(precioTotal.value);
        
        let oReserva = new Reserva(id,oHabitacion ,oCliente, fechaInicio, fechaFin, oServicio, precioTotal.value); //el tema del precio hay que mirarlo
        
        let mensaje=hotel.anadirReserva(oReserva);
        mensajeModal("Reserva Añadida", mensaje);
        frmAltaReserva.reset();
        let valido=document.querySelectorAll('#frmAltaReserva div.valid-feedback');
                
                for (const cosa of valido) {
                    cosa.style.display="none";
                }

    }

}

let camaIndividual;
let camaMatrimonio;
// Validar Habitación
function validarHabitacion(oEvento)
{
   
    let oE=oEvento || window.event;
    oE.preventDefault();
    let inputAll = document.querySelectorAll("#frmAltaHabitacion input[type='text']");
    let todoCorrecto = true;
    camaIndividual = document.querySelector("#camaIndividual");
    camaMatrimonio = document.querySelector("#camaMatrimonio");
    let tipoDeCamaSeleccionada = false;
    
    

    for(const input of inputAll){
        switch(input.id){
            case 'nombre':
                let regexNombre=/(([1-9]{1}(º{1})[A-Za-z]{1})|([a-zA-ZáéíóúÁÉÍÓÚñÑüÜçÇ\s]{4,20}))/;

                if(input.value != "" && input.value.match(regexNombre)){
                    input.nextElementSibling.style.display = "block";
                    input.nextElementSibling.nextElementSibling.style.display = "none";
                }
                else{
                    input.nextElementSibling.nextElementSibling.style.display = "block";
                    input.nextElementSibling.style.display = "none";
                    todoCorrecto = false;
                }
                break; 
            case 'numCamaMatrimonio':
                let regexNumCamaMatrimonio=/[1-9]{1}/;
                if(camaMatrimonio.checked){
                    if(input.value != "" && input.value.match(regexNumCamaMatrimonio)){
                        input.nextElementSibling.style.display = "block";
                        input.nextElementSibling.nextElementSibling.style.display = "none";
                    }
                    else{
                        input.nextElementSibling.nextElementSibling.style.display = "block";
                        input.nextElementSibling.style.display = "none";
                        todoCorrecto = false;
                    }
                    tipoDeCamaSeleccionada=true;
                }
                break;
            case 'numCamaIndividual':
                let regexNumCamaIndividual=/[1-9]{1}/;
                if(camaIndividual.checked){

                    if(input.value != "" && input.value.match(regexNumCamaIndividual)){
                        input.nextElementSibling.style.display = "block";
                        input.nextElementSibling.nextElementSibling.style.display = "none";
                    }
                    else{
                        input.nextElementSibling.nextElementSibling.style.display = "block";
                        input.nextElementSibling.style.display = "none";
                        todoCorrecto = false;
                    }
                    tipoDeCamaSeleccionada=true;
                }
            break;
            case 'precio':
                //Numero como string
                    let regexPrecio=/(\d{2,6}).?(\d{2})/;
                    if(input.value != "" && input.value.match(regexPrecio)){
                        input.nextElementSibling.style.display = "block";
                        input.nextElementSibling.nextElementSibling.style.display = "none";
                    }
                    else{
                        input.nextElementSibling.nextElementSibling.style.display = "block";
                        input.nextElementSibling.style.display = "none";
                        todoCorrecto = false;
                    }
                break;
            
        }

    }

    if(!todoCorrecto || !tipoDeCamaSeleccionada){
        oE.preventDefault();
        mensajeModal("Datos invalidos","Debe haber al menos un tipo de cama.");
    }
    else{

        let id = hotel.generarId('Habitacion');
        let nombre = inputAll[0].value.trim();
        let numCamaMatrimonio = inputAll[1].value.trim();
        let numCamaIndividual = inputAll[2].value.trim();
        let precio = inputAll[3].value.trim();

        let arrayCamas = [['Matrimonio', numCamaMatrimonio],['Individual', numCamaIndividual]];

        let oHabitacion = new Habitacion(id, nombre, precio, arrayCamas);
        let mensaje = hotel.anadirHabitacion(oHabitacion);
        mensajeModal("Habitación añadida", mensaje);
        frmAltaHabitacion.reset();
        let valido=document.querySelectorAll('#frmAltaHabitacion div.valid-feedback');
                
                for (const cosa of valido) {
                    cosa.style.display="none";
                }
    }

}

//validar modificar reserva
function validarModificarReserva(oEvento)
{
    let oE=oEvento || window.event;
    oE.preventDefault();
    let todoCorrecto=true;
    let fechasCorrectas=false;

    let selects=document.querySelectorAll('#frmModificarReserva select');
    let fechas=document.querySelectorAll("#frmModificarReserva input[type='date']");

    for (const cosa of selects) {
        switch(cosa.id)
        {
            case 'selectModificarReserva':
                {
                    if(cosa.selectedIndex ==0){
                        cosa.nextElementSibling.style.display = "none";
                        cosa.nextElementSibling.nextElementSibling.style.display = "block";
                        todoCorrecto = false;
                    }
                    else{
                        cosa.nextElementSibling.nextElementSibling.style.display = "none";
                        cosa.nextElementSibling.style.display = "block";
                        
                    }
                    break;
                }
            case 'selectHabitacionReserva':
                {
                    if(cosa.selectedIndex ==0){
                        cosa.nextElementSibling.style.display = "none";
                        cosa.nextElementSibling.nextElementSibling.style.display = "block";
                        todoCorrecto = false;
                    }
                    else{
                        cosa.nextElementSibling.nextElementSibling.style.display = "none";
                        cosa.nextElementSibling.style.display = "block";
                        
                    }
                    break;
                }
            case 'selectClienteReserva':
                {
                    if(cosa.selectedIndex ==0){
                        cosa.nextElementSibling.style.display = "none";
                        cosa.nextElementSibling.nextElementSibling.style.display = "block";
                        todoCorrecto = false;
                    }
                    else{
                        cosa.nextElementSibling.nextElementSibling.style.display = "none";
                        cosa.nextElementSibling.style.display = "block";
                        
                    }
                    break;
                }
            case 'selectServicioModificar':
                {
                    if(cosa.selectedIndex ==0){
                        cosa.nextElementSibling.style.display = "none";
                        cosa.nextElementSibling.nextElementSibling.style.display = "block";
                        todoCorrecto = false;
                    }
                    else{
                        cosa.nextElementSibling.nextElementSibling.style.display = "none";
                        cosa.nextElementSibling.style.display = "block";
                        
                    }
                    break;
                }

        }

    }
    for (const cosa2 of fechas) {
        switch(cosa2.id)
        {
            case 'fechaInicioModificar':
                {
                    if(cosa2.value==null || cosa2.value=="")
                    {
                        cosa2.nextElementSibling.style.display = "none";
                        cosa2.nextElementSibling.nextElementSibling.style.display = "block";
                        
                    }
                    else
                    {
                        cosa2.nextElementSibling.nextElementSibling.style.display = "none";
                        cosa2.nextElementSibling.style.display = "block";
                        fechasCorrectas = true;
                    }
                    break;
                }
            case 'fechaFinModificar':
                {
                    if(cosa2.value==null || cosa2.value=="")
                    {
                        cosa2.nextElementSibling.style.display = "none";
                        cosa2.nextElementSibling.nextElementSibling.style.display = "block";
                        
                    }
                    else
                    {
                        cosa2.nextElementSibling.nextElementSibling.style.display = "none";
                        cosa2.nextElementSibling.style.display = "block";
                        fechasCorrectas = true;
                    }

                    break;
                }
        }
    }

    if(!todoCorrecto || !fechasCorrectas)
    {
        oE.preventDefault();
        mensajeModal("Datos invalidos","Debe completar los campos.");
    }
    else
    {
        let idReserva=frmModificarReserva.selectModificarReserva.selectedIndex;
        let idHabitacion=frmModificarReserva.selectHabitacionReserva.selectedIndex;
        let idCliente=frmModificarReserva.selectClienteReserva.selectedIndex;

        let fechaInicioModificar=frmModificarReserva.fechaInicioModificar.value;
        let fechaFinModificar=frmModificarReserva.fechaFinModificar.value;

        let idServicio=frmModificarReserva.selectServicioModificar.selectedIndex;

        let oHabitacion = hotel.buscarPorId(idHabitacion, 'Habitacion');
        let oCliente = hotel.buscarPorId(idCliente, 'Cliente');
        let oServicio = hotel.buscarPorId(idServicio, 'Servicio');

        let precioTotal = frmModificarReserva.precioTotalModificar.value;
        let resultado = hotel.modificarReserva(idReserva, oHabitacion, oCliente, fechaInicioModificar, fechaFinModificar, oServicio, precioTotal);
        mensajeModal("Modificar reserva",resultado);
        
        frmModificarReserva.reset();
        let valido=document.querySelectorAll('#frmModificarReserva div.valid-feedback');
                
                for (const cosa3 of valido) {
                    cosa3.style.display="none";
                }
    }
}

/*
/////////
////  FUNCTION XML
//////
*/

function loadXMLDoc(filename) {
    let xhttp;

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } 
    else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET", filename, false);

    xhttp.send();

    return xhttp.responseXML;
}

function procesarXML(oXML){
    importarPersonas(oXML);
    importarServicios(oXML);
    importarHabitaciones(oXML);
    importarReservas(oXML);
    
    console.log(hotel);
}

function importarPersonas(oXML){
    let personas = oXML.querySelector('personas').children;
    
    for (const persona of personas) {
        let id = hotel.generarId('Persona');
        
        let nombre = persona.querySelector('nombre').textContent;
        let dni = persona.querySelector('dni').textContent;
        let direccion = persona.querySelector('direccion').textContent;
        let fechaNacimiento = persona.querySelector('fechaNacimiento').textContent;
        let email = persona.querySelector('email').textContent;
        let telefono = persona.querySelector('telefono').textContent;

        if(persona.tagName == 'trabajador'){
            let ss = persona.querySelector('ss').textContent;
            let sueldo = persona.querySelector('sueldo').textContent;
            let puesto = persona.querySelector('puesto').textContent;

            let idTrabajador=hotel.generarId('Trabajador');
            let trabajador = new Trabajador(id, nombre, dni, direccion, fechaNacimiento, email, telefono, idTrabajador, ss, sueldo, puesto);
            hotel.anadirPersona(trabajador);
        }
        else{
            let cuentaBancaria = persona.querySelector('cuentaBancaria').textContent;
            let idCliente = hotel.generarId('Cliente');

            let cliente = new Cliente(id, nombre, dni, direccion, fechaNacimiento, email, telefono, idCliente, cuentaBancaria);
            hotel.anadirPersona(cliente);
        } 
    }

}

function importarServicios(oXML){
    let servicios = oXML.querySelector('servicios').children;

    for (const servicio of servicios) {
        let id = hotel.generarId('Servicio');

        let nombre = servicio.querySelector('nombre').textContent;
        let precio = servicio.querySelector('precio').textContent;

        let oServicio = new Servicio(id, nombre, precio);
        hotel.anadirServicio(oServicio);
    }

}

function importarHabitaciones(oXML){
    let habitaciones = oXML.querySelector('habitaciones').children;

    for (const habitacion of habitaciones) {
        let camas = [];
        let arrayCamas = habitacion.querySelector('camas').children;
        
        let id = hotel.generarId('Habitacion');
        let nombre = habitacion.querySelector('nombre').textContent;
        let precio = habitacion.querySelector('precio').textContent;


        for (const cama of arrayCamas) {
            let descripcion = cama.querySelector('descripcion').textContent;
            let cantidad = cama.querySelector('cantidad').textContent;
            
            camas.push([descripcion, cantidad]);
        }

        let oHabitacion = new Habitacion(id, nombre, precio, camas);
        hotel.anadirHabitacion(oHabitacion);
    }
}

function importarReservas(oXML){
    let reservas = oXML.querySelector('reservas').children;

    for (const reserva of reservas) {
        let servicioAsignado = reserva.querySelector('servicio');
        let idHabitacion = reserva.querySelector('idHabitacion').textContent;
        let idPersona = reserva.querySelector('idPersona').textContent;
        
        let id = hotel.generarId('Reserva');
        let habitacion = hotel.buscarPorId(idHabitacion, 'Habitacion');
        let persona = hotel.buscarPorId(idPersona, 'Persona');
        let fechaInicio = reserva.querySelector('fechaInicio').textContent;
        let fechaFin = reserva.querySelector('fechaFin').textContent;   
        
        let oServicio = hotel.buscarPorId(servicioAsignado.textContent, 'Servicio');

        let precioTotal = reserva.querySelector('precioTotal').textContent;

        // constructor(id, oHabitacion, oPersona, dateInicio, dateFecha, servicios, dbPrecio)
        let oReserva = new Reserva(id, habitacion, persona, fechaInicio, fechaFin, oServicio, precioTotal);
        hotel.anadirReserva(oReserva);
    }
}



/*
////////////////
/////   LISTADOS
//////////
*/

function generarListados(oEvento){
    
    let oE = oEvento || window.event;
    let nombreListado = oE.target.id;

    let tabla;
    

    switch(nombreListado){
        case 'mnuListadoTrabajador':
            tabla = hotel.generarTablasBasicas('listarTrabajadores');
            break;
        case 'mnuListadoCliente':
            tabla = hotel.generarTablasBasicas('listarClientes');
            break;
        case 'mnuListadoReservas':
            tabla = hotel.generarTablasBasicas('listarReservas');
            break;
        case 'btnListarReservasHabitacion':
            oE.preventDefault();

            let idHabitacion = frmListarReservasHabitacion.selectListarReservasHabitacion.value;

            if(idHabitacion != ''){
                let oHabitacion = hotel.buscarPorId(idHabitacion, 'Habitacion');
                tabla = hotel.listarReservasPorHabitacion(oHabitacion);
                
                ocultarFormularios();
                let div = document.querySelector('#divListados');
                div.style.display = "block";
            }

            break;
        case 'btnListarEntreDosFechas':
            oE.preventDefault();

            let inputFecha1 = frmListarEntreDosFechas.fechaInicioLista.value;
            let inputFecha2 = frmListarEntreDosFechas.fechaFinLista.value;
            tabla = hotel.listarReservasPorFecha(inputFecha1, inputFecha2);
            
            ocultarFormularios();
            let div = document.querySelector('#divListados');
            div.style.display = "block";

            break;
        case 'mnuListadoServicios':
            tabla = hotel.generarTablasBasicas('listarServicios');
            break;
        case 'mnuListadoHabitaciones':
            tabla = hotel.generarTablasBasicas('listarHabitaciones');
            break;
    }

    if(tabla){
        tabla.classList = "table caption-top table-dark table-striped mt-4 p-2";
        
        let divListados = document.querySelector('#divListados');
        
        //Limpia los hijos antes de añadir la tabla para que no se acumulen
        while (divListados.firstChild) {
            divListados.firstChild.remove();
        }
        divListados.appendChild(tabla);
    }
}



/*
/////////
////  MENSAJES MODALES
//////
*/
function mensajeModal(titulo, mensaje){
  
    document.querySelector("#bstModalLabel").textContent= titulo;
    document.querySelector("#btsModalBody").textContent= mensaje;
    myModal.show();
    
}
  
function btsBotonModalPulsado(){
  
    myModal.hide()
    
}
  

function actualizarPrecio(){
    let precioTotal = 0;
    let selectHabitacion = document.querySelector("#selectHabitacion");
    let selectServicio = document.querySelector("#selectServicio");
    let mostrarPrecio = document.querySelector("#precioTotal");

    if(selectHabitacion.selectedIndex !=0){
        let habitacion = hotel.buscarPorId(selectHabitacion.selectedOptions[0].value, 'Habitacion');
        precioTotal += parseFloat(habitacion.dbPrecio);
    } 

    if(selectServicio.selectedIndex !=0){
        let Servicio = hotel.buscarPorId(selectServicio.selectedOptions[0].value, 'Servicio');
        precioTotal += parseFloat(Servicio.dbPrecio);
    } 

    mostrarPrecio.value = precioTotal.toFixed(2);
}

function actualizarPrecioModificar(){
    let precioTotal = 0;
    let selectHabitacion = frmModificarReserva.selectHabitacionReserva;
    let selectServicio = frmModificarReserva.selectServicioModificar;
    let mostrarPrecio = frmModificarReserva.precioTotalModificar;

    if(selectHabitacion.selectedIndex !=0){
        let habitacion = hotel.buscarPorId(selectHabitacion.selectedOptions[0].value, 'Habitacion');
        precioTotal += parseFloat(habitacion.dbPrecio);
    } 

    if(selectServicio.selectedIndex !=0){
        let Servicio = hotel.buscarPorId(selectServicio.selectedOptions[0].value, 'Servicio');
        precioTotal += parseFloat(Servicio.dbPrecio);
    } 

    mostrarPrecio.value = precioTotal.toFixed(2);
}

function obtenerDatosReserva(){
    let selectReserva = frmModificarReserva.selectModificarReserva;
    let indiceSeleccionado = selectReserva.selectedIndex;

    if(indiceSeleccionado != 0){
        let oReserva = hotel.buscarPorId(indiceSeleccionado, 'Reserva');
        console.log(oReserva);

        // recuperar valor select habitacion
        let idHabitacion = oReserva.oHabitacion.id;
        frmModificarReserva.selectHabitacionReserva.selectedIndex = idHabitacion;

        // recuperar valor select cliente
        let idCliente = oReserva.oPersona.idCliente;
        frmModificarReserva.selectClienteReserva.selectedIndex = idCliente;

        // recuperar valor select servicio
        let idServicio = oReserva.servicioAsignado.id;
        frmModificarReserva.selectServicioModificar.selectedIndex = idServicio;

        // recuperar valor fecha inicio
        let fechaInicio = oReserva.fechaInicio;

        let ddInicio = ((fechaInicio.getDate())<10)?('0'+(fechaInicio.getDate())):(fechaInicio.getDate());
        let mmInicio = ((fechaInicio.getMonth()+1)<10)?('0'+(fechaInicio.getMonth()+1)):(fechaInicio.getMonth()+1);
        let aaaaInicio = fechaInicio.getFullYear();

        let sFechaInicio = aaaaInicio + '-' + mmInicio + '-' + ddInicio;       
        frmModificarReserva.fechaInicioModificar.value = sFechaInicio;

        // recuperar valor fecha fin
        let fechaFin = oReserva.fechaFin;

        let ddFin = ((fechaFin.getDate())<10)?('0'+(fechaFin.getDate())):(fechaFin.getDate());
        let mmFin = ((fechaFin.getMonth()+1)<10)?('0'+(fechaFin.getMonth()+1)):(fechaFin.getMonth()+1);
        let aaaaFin = fechaFin.getFullYear();

        let sFechaFin = aaaaFin + '-' + mmFin + '-' + ddFin;       
        frmModificarReserva.fechaFinModificar.value = sFechaFin;

        actualizarPrecioModificar();
    }
    else{
        frmModificarReserva.reset();
    }
}



/*
##################
########  MAIN
#####
*/
let hotel = new Hotel();
let oXML = loadXMLDoc('datos.xml');
procesarXML(oXML);

//Validaciones
document.querySelector('#btnAltaPersona').addEventListener('click', validarAltaPersona, false);
document.querySelector('#btnAltaServicio').addEventListener('click', validarAltaServicio, false);
document.querySelector("#btnAltaReserva").addEventListener("click", validarReserva);
document.querySelector("#btnAltaHabitacion").addEventListener("click", validarHabitacion);
document.querySelector("#btnModificarReservasHabitacion").addEventListener("click", validarModificarReserva, false);

//Menú
document.querySelector('#menuSuperior').addEventListener('click', gestionFormularios);
document.querySelector('#enlaceInicial').addEventListener('click', gestionFormularios);

//Modal
var myModal = new bootstrap.Modal(document.getElementById('myModal'));
document.querySelector("#btsBotonModal").addEventListener("click", btsBotonModalPulsado);

// RadioButton
document.querySelector("#trabajador").addEventListener("click", cambiarRadioPersona);
document.querySelector("#cliente").addEventListener("click", cambiarRadioPersona);

// CheckButton
document.querySelector("#camaMatrimonio").addEventListener("click", cambiarCheckHabitacion);
document.querySelector("#camaIndividual").addEventListener("click", cambiarCheckHabitacion);

// Eventos de los listados
document.querySelector('#mnuListadoTrabajador').addEventListener('click', generarListados);
document.querySelector('#mnuListadoCliente').addEventListener('click', generarListados);
document.querySelector('#mnuListadoReservas').addEventListener('click', generarListados);
document.querySelector('#btnListarReservasHabitacion').addEventListener('click', generarListados);
document.querySelector('#btnListarEntreDosFechas').addEventListener('click', generarListados);
document.querySelector('#mnuListadoServicios').addEventListener('click', generarListados);
document.querySelector('#mnuListadoHabitaciones').addEventListener('click', generarListados);

document.querySelector("#selectHabitacion").addEventListener("change", actualizarPrecio);
document.querySelector("#selectServicio").addEventListener("change", actualizarPrecio);

document.querySelector("#selectModificarReserva").addEventListener("change", obtenerDatosReserva);
document.querySelector("#selectHabitacionReserva").addEventListener("change", actualizarPrecioModificar);
document.querySelector("#selectServicioModificar").addEventListener("change", actualizarPrecioModificar);
