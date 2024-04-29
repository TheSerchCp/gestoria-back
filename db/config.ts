import idleDirective from 'astro/runtime/client/idle.js';
import { optional } from 'astro/zod';
import { defineDb,defineTable, column, NOW } from 'astro:db';

const landing = defineTable({
  columns: {
    idLanding: column.number({primaryKey: true}),
    imagenPrincipal: column.text(),
    slogan: column.text(),
    resumenGestoria: column.text(),
    telefono: column.text(),
    correoElectronico: column.text(),
    twitter: column.text({optional: true}),
    instagram: column.text({ optional: true}),
    facebook: column.text({optional: true})
  }
});

const usuario = defineTable({
   columns: {
    idUsuario: column.number({primaryKey: true}),
    correo: column.text({optional:false}),
    contrasena: column.text({optional: false}),
    telefono: column.text({optional: false})
   }

})

const usuarioxinformacion = defineTable({
    columns: {
      idUsuario: column.number({references: () => usuario.columns.idUsuario}),
      idLanding: column.number({references: () => landing.columns.idLanding}),
    }
});

const usuarioxservicio = defineTable({
  columns:{
    idUsuario: column.number({references: () => usuario.columns.idUsuario}),
    idServicio: column.number({references: () => servicios.columns.idServicio})
  }
})

const usuarioxcliente = defineTable({
  columns: {
    idUsuario: column.number({references: () => usuario.columns.idUsuario}),
    idCliente: column.number({references: () => cliente.columns.idCliente})
  }
})

const servicios = defineTable({
  columns: {
    idServicio: column.number({primaryKey: true}),
    nombre: column.text({optional: false}),
    imagen: column.text({optional: false}),
    descripcion: column.text({optional: false})
  }
})

const cliente = defineTable({
  columns: {
    idCliente: column.number({primaryKey: true}),
    nombre: column.text({optional: false}),
    aPaterno: column.text({optional:false}),
    aMaterno: column.text({optional: false}),
    calle: column.text(),
    colonia: column.text(),
    codigoPostal: column.number()
  }
})

const clientexautomovil = defineTable({
  columns: {
    idAutomovil: column.number({references: () => automovil.columns.idAutomovil}),
    idCliente: column.number({references: () => cliente.columns.idCliente})
  }
})

const clientextramite = defineTable({
  columns: {
    idTicket: column.number({references: () => ticketTramite.columns.idTicket}),
    idCliente: column.number({references: () => cliente.columns.idCliente})
  }
})

const automovil = defineTable({
  columns: {
    idAutomovil: column.number({primaryKey: true}),
    numeroSerie: column.text({optional: false}),
    marca: column.text(),
    modelo: column.text(),
    color: column.text()
  }
})

const ticketTramite = defineTable({
  columns: {
    idTicket: column.number({primaryKey: true}),
    fechaSolicitud: column.date({default: NOW}),
    fechaVencimiento: column.date({optional:true}),
    idServicio: column.number(),
    estado: column.number()
  }
})
export default defineDb({
  tables: {
    landing,
    usuario,
    usuarioxinformacion,
    usuarioxservicio,
    usuarioxcliente,
    servicios,
    cliente,
    clientexautomovil,
    clientextramite,
    automovil,
    ticketTramite
  }
});
