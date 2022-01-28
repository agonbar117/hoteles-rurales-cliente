"use strict";

class Hotel 
{
    constructor ()
    {
        this.reservas=[];
        this.personas=[];
        this.habitaciones=[];
        this.servicios=[];

    }

    generarId(nombreClase){
        switch (nombreClase) {
            case 'Reserva':
                return this.reservas.length+1; 
                break;
            case 'Persona':
                return this.personas.length+1; 
                break;
            case 'Habitacion':
                return this.habitaciones.length+1; 
                break;
            case 'Servicio':
                return this.servicios.length+1;
                break;
            case 'Cliente':
                let contador = 0;

                for (const persona of this.personas) {
                    if(persona instanceof Cliente){
                        contador++;
                    }
                }
                return contador+1;
                break;
            case 'Trabajador':
                let contador2 = 0;
                for (const persona of this.personas) {
                    if(persona instanceof Trabajador){
                        contador2++;
                    }
                }
                return contador2+1;
                break;
            default:
                return null;
                break;
        }
    }

    buscarPorId(id, nombreClase){
        let arrayRecorrer = [];
        
        switch (nombreClase) {
            case 'Reserva':
                arrayRecorrer = this.reservas; 
                break;
            case 'Persona':
                arrayRecorrer = this.personas;
                break;
            case 'Cliente':
                for (const persona of this.personas) {
                    if(persona.idCliente == id){
                        return persona;
                    }
                }
                break;
            case 'Trabajador':
                for (const persona of this.personas) {
                    if(persona.idTrabajador == id){
                        return persona;
                    }
                }
                break;
            case 'Habitacion':
                arrayRecorrer = this.habitaciones; 
                break;
            case 'Servicio':
                arrayRecorrer = this.servicios;
                break;
        }

        for (const objeto of arrayRecorrer) {
            if(objeto.id == id){
                return objeto;
            }
        }

        return null;
    }

    anadirPersona(oPersona)
    {

        let mensaje='';

        if(oPersona instanceof Cliente)
        {
            this.personas.push(oPersona);
            mensaje='Se ha introducido un cliente nuevo';
        }
        else if(oPersona instanceof Trabajador)
        {
            this.personas.push(oPersona);
            mensaje='Se ha introducido un trabajador nuevo';
        }
        
        return mensaje;   
        
    }
    anadirReserva(oReserva)
    {
        let mensaje='Se ha añadido una nueva reserva';

        this.reservas.push(oReserva);
        
        return mensaje;    
        
    }
    modificarReserva(idReserva, oHabitacion, oCliente, sfechaInicio, sFechaFin, oServicio, precio){
        for (const reserva of this.reservas) {
            if(reserva.id == idReserva){
                reserva.oHabitacion = oHabitacion;
                reserva.oPersona = oCliente;
                reserva.fechaInicio = new Date(sfechaInicio);
                reserva.fechaFin = new Date(sFechaFin);
                reserva.oServicio = oServicio;
                reserva.dbPrecio = precio;

                return 'Reserva actualizada con éxito';
            }
        }
        return 'El ID de la reserva no ha sido encontrado';
    }
    anadirServicio(oServicio)
    {
        let mensaje='Se ha añadido un nuevo servicio';

        this.servicios.push(oServicio);
        
        return mensaje;    
        
    }
    anadirHabitacion(oHabitacion)
    {
       
        this.habitaciones.push(oHabitacion);

        let mensaje='Se ha añadido una nueva habitacion';
        return mensaje;    
        
    }

    
    cargarOptionHabitacion()
    {
        let sOptions=[];

        for (const habitacion of this.habitaciones) 
        {
            
            let option=document.createElement('option');
            option.setAttribute("value", habitacion.id);
            let nombreHabitacion=habitacion.sNombre;
            option.textContent=nombreHabitacion;
            sOptions.push(option);  
        }

        return sOptions;
    }

    cargarOptionsClientes()
    {   
        let sOptions=[];

        for (const cliente of this.personas) {
            if(cliente instanceof Cliente)
            {
                let option=document.createElement('option');
                option.setAttribute("value", cliente.id);
                let nombreCliente=cliente.sNombre;
                option.textContent=nombreCliente;
                sOptions.push(option);
            }
        }
        return sOptions;
    }

    cargarOptionsServicios()
    {
        let sOptions=[];

        for (const servicio of this.servicios) {
            let option=document.createElement('option');
            option.setAttribute("value", servicio.id);
            let nombreServicio=servicio.sNombre;
            option.textContent=nombreServicio;
            sOptions.push(option);
        }
        return sOptions;
    }

    cargarOptionsReserva()
    {
        let sOptions=[];

        for (const reserva of this.reservas) {
            let option=document.createElement('option');
            option.setAttribute("value", reserva.id);
            let nombreReserva=reserva.id;
            option.textContent=nombreReserva;
            sOptions.push(option);
        }
        return sOptions;
    }



    generarTablasBasicas(nombreTabla){
        let oTabla = document.createElement('table');
        let tituloTabla = oTabla.createCaption();
        let header = oTabla.createTHead();
        let filaHeader = header.insertRow();
        let tBody = oTabla.createTBody();

        let camposHeader;
        let arrayIterar;
        let clase;

        switch(nombreTabla){
            case 'listarTrabajadores':
                tituloTabla.textContent = "Listado de trabajadores";
                camposHeader = ['Nombre', 'DNI', 'Dirección', 'Fecha de nacimiento', 'Email', 'Tlfn', 'Número SS', 'Sueldo', 'Puesto'];
                arrayIterar = this.personas;
                clase = Trabajador;
                break;
            case 'listarClientes':
                tituloTabla.textContent = "Listado de clientes";
                camposHeader = ['Nombre', 'DNI', 'Dirección', 'Fecha de nacimiento', 'Email', 'Tlfn', 'sTarjetaCredito'];
                arrayIterar = this.personas;
                clase = Cliente;
                break;
            case 'listarReservas':
                tituloTabla.textContent = "Listado de reservas";
                camposHeader = ['Habitación', 'Cliente', 'Fecha de inicio', 'Fecha de fin', 'Servicios asignados', 'Precio total'];
                arrayIterar = this.reservas;
                break;
            case 'listarServicios':
                tituloTabla.textContent = "Listado de servicios";
                camposHeader = ['Nombre', 'Precio'];
                arrayIterar = this.servicios;
                break;
            case 'listarHabitaciones':
                tituloTabla.textContent = "Listado de habitaciones";
                camposHeader = ['Nombre', 'Camas', 'Precio'];
                arrayIterar = this.habitaciones;
                break;

        }
        
        for (const campo of camposHeader) {
            let th = document.createElement('th');
            th.textContent = campo;
            filaHeader.appendChild(th);
        }
        
        if(clase == Trabajador || clase == Cliente){
            for (const i of arrayIterar) {
                if(i instanceof clase){
                    tBody.appendChild(i.toHTMLRow());
                }
            }
        }
        else{
            for (const i of arrayIterar) {
                tBody.appendChild(i.toHTMLRow());
            }
        }

        return oTabla;
    }


    listarReservasPorHabitacion(oHabitacion){
        let oTabla = document.createElement('table');
        let tituloTabla = oTabla.createCaption();
        let header = oTabla.createTHead();
        let filaHeader = header.insertRow();
        let tBody = oTabla.createTBody();

        tituloTabla.textContent = "Listado de reservas de una habitación";
        let camposHeader = ['Habitación', 'Cliente', 'Fecha de inicio', 'Fecha de fin', 'Servicios asignados', 'Precio total'];
  
        for (const campo of camposHeader) {
            let th = document.createElement('th');
            th.textContent = campo;
            filaHeader.appendChild(th);
        }
        
        for (const reserva of this.reservas) {
            if(reserva.oHabitacion.id == oHabitacion.id){
                tBody.appendChild(reserva.toHTMLRow());
            }
        }
        
        return oTabla;
    }

    listarReservasPorFecha(dtFechaInicio, dtFechaFin){
        let oTabla = document.createElement('table');
        let tituloTabla = oTabla.createCaption();
        let header = oTabla.createTHead();
        let filaHeader = header.insertRow();
        let tBody = oTabla.createTBody();

        tituloTabla.textContent = "Listado de reservas entre dos fechas";
        let camposHeader = ['Habitación', 'Cliente', 'Fecha de inicio', 'Fecha de fin', 'Servicios asignados', 'Precio total'];
  
        for (const campo of camposHeader) {
            let th = document.createElement('th');
            th.textContent = campo;
            filaHeader.appendChild(th);
        }
        
        let fecha1 = new Date(dtFechaInicio).getTime();
        let fecha2 = new Date(dtFechaFin).getTime();

        for (const reserva of this.reservas) {

            if(!((fecha1 < reserva.fechaInicio.getTime() && fecha2 < reserva.fechaInicio.getTime()) || (fecha1 > reserva.fechaFin.getTime() && fecha2 > reserva.fechaFin.getTime()))){
                tBody.appendChild(reserva.toHTMLRow());
            }
        }
        

        
        return oTabla;
    }
}

class Persona
{
    // new Persona(oHotel.generarid(),safsdf, )
    constructor(id, sNombre, sDNI, sDireccion, date, sEmail, sTelefono)
    {
        this.id = id;
        this.sNombre=sNombre;
        this.sDNI=sDNI;
        this.sDireccion=sDireccion;
        this.fechaNacimiento=new Date(date);
        this.sEmail=sEmail;
        this.sTelefono=sTelefono;
    }
}

class Trabajador extends Persona
{
    constructor(id, sNombre, sDNI, sDireccion, date, sEmail, sTelefono, idTrabajador, sSs, dbSueldo, sPuesto)
    {
        super(id, sNombre, sDNI, sDireccion, date, sEmail, sTelefono);
        this.idTrabajador=idTrabajador;
        this.sSs=sSs;
        this.dbSueldo=dbSueldo;
        this.sPuesto=sPuesto;
    }

    toHTMLRow()
    {
        let fila = document.createElement('tr');
        fila.classList = "py-3";
        let valores = [
            this.sNombre,
            this.sDNI,
            this.sDireccion,
            this.fechaNacimiento.getDate() +'/'+(this.fechaNacimiento.getMonth()+1)+'/'+this.fechaNacimiento.getFullYear(),
            this.sEmail,
            this.sTelefono,
            this.sSs,
            this.dbSueldo,
            this.sPuesto
        ];

        for (const valor of valores) {
            let celda = fila.insertCell();
            celda.classList = "py-3";
            celda.textContent = valor;
        }

        return fila;
    }

}

class Cliente extends Persona
{
    constructor(id, sNombre, sDNI, sDireccion, date, sEmail, sTelefono, idCliente, sTarjetaCredito)
    {
        super(id, sNombre, sDNI, sDireccion, date, sEmail, sTelefono);
        this.idCliente=idCliente;
        this.sTarjetaCredito=sTarjetaCredito;
    }

    toHTMLRow()
    {
        let fila = document.createElement('tr');
        fila.classList = "py-3";
        let valores = [
            this.sNombre,
            this.sDNI,
            this.sDireccion,
            this.fechaNacimiento.getDate() +'/'+(this.fechaNacimiento.getMonth()+1)+'/'+this.fechaNacimiento.getFullYear(),
            this.sEmail,
            this.sTelefono,
            this.sTarjetaCredito
        ];

        for (const valor of valores) {
            let celda = fila.insertCell();
            celda.classList = "py-3";
            celda.textContent = valor;
        }

        return fila;
    }

}


class Reserva
{
    constructor(id, oHabitacion, oPersona, dateInicio, dateFecha, servicio, dbPrecio)
    {   
        this.id = id;
        this.oHabitacion=oHabitacion;
        this.oPersona=oPersona;
        this.fechaInicio=new Date(dateInicio);
        this.fechaFin=new Date(dateFecha);
        this.servicioAsignado=servicio;
        this.dbPrecio=dbPrecio;
    }

    toHTMLRow()
    {
        let fila = document.createElement('tr');

        let valores = [
            this.oHabitacion.sNombre,
            this.oPersona.sNombre,
            this.fechaInicio.getDate() +'/'+(this.fechaInicio.getMonth()+1)+'/'+this.fechaInicio.getFullYear(),
            this.fechaFin.getDate() +'/'+(this.fechaFin.getMonth()+1)+'/'+this.fechaFin.getFullYear(),
        ];

        let sServicio=this.servicioAsignado.sNombre;  
        valores.push(sServicio, this.dbPrecio);

        for (const valor of valores) {
            let celda = fila.insertCell();
            celda.textContent = valor;
        }

        return fila;

    }
}


class Servicio
{
    constructor(id, sNombre, dbPrecio)
    {
        this.id = id;
        this.sNombre=sNombre;
        this.dbPrecio=dbPrecio;
    }

    toHTMLRow()
    {
        let fila = document.createElement('tr');

        let valores = [
            this.sNombre,
            this.dbPrecio
        ];

        for (const valor of valores) {
            let celda = fila.insertCell();
            celda.textContent = valor;
        }

        return fila;
    }

}


class Habitacion
{
    constructor(id,sNombre, dbPrecio, camas)
    {
        this.id = id;
        this.sNombre=sNombre;
        this.aCamas=camas;
        this.dbPrecio=dbPrecio;
    }

    toHTMLRow()
    {
        let fila = document.createElement('tr');

        let valores = [
            this.sNombre
        ];

        // aCamas: Array(2)
        // 0: (2) ['Matrimonio', '1']
        // 1: (2) ['Individual', '1']

        let sCamas = '';
        for (const cama of this.aCamas) {
            sCamas += cama[1] + 'x' + cama[0] + ', ';
        }
        valores.push(sCamas, this.dbPrecio);

        for (const valor of valores) {
            let celda = fila.insertCell();
            celda.textContent = valor;
        }

        return fila;
    }
}

