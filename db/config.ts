import idleDirective from 'astro/runtime/client/idle.js';
import { optional } from 'astro/zod';
import { defineDb,defineTable, column, NOW } from 'astro:db';

const Landing = defineTable({
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

const Usuario = defineTable({
   columns: {
    id: column.text({primaryKey: true}),
    correo: column.text({optional:false}),
    password: column.text({optional: false}),
    username: column.text({unique: true,optional:false}),
    telefono: column.text({optional: false})
   }
})

const Sesion = defineTable({
  columns: {
    id: column.text({optional: false,unique:true}),
    userId: column.text({optional:false,references: () => Usuario.columns.id}),
    expiresAt: column.number({optional:false})
  }
})

const Usuarioxinformacion = defineTable({
    columns: {
      idUsuario: column.text({references: () => Usuario.columns.id}),
      idLanding: column.number({references: () => Landing.columns.idLanding}),
    }
});

const Usuarioxservicio = defineTable({
  columns:{
    idUsuario: column.text({references: () => Usuario.columns.id}),
    idServicio: column.number({references: () => Servicios.columns.idServicio})
  }
})

const Usuarioxcliente = defineTable({
  columns: {
    idUsuario: column.text({references: () => Usuario.columns.id}),
    idCliente: column.number({references: () => Cliente.columns.idCliente})
  }
})

const Servicios = defineTable({
  columns: {
    idServicio: column.number({primaryKey: true}),
    nombre: column.text({optional: false}),
    imagen: column.text({optional: false}),
    descripcion: column.text({optional: false})
  }
})

const Cliente = defineTable({
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

const Clientexautomovil = defineTable({
  columns: {
    idAutomovil: column.number({references: () => Automovil.columns.idAutomovil}),
    idCliente: column.number({references: () => Cliente.columns.idCliente})
  }
})

const Clientextramite = defineTable({
  columns: {
    idTicket: column.number({references: () => TicketTramite.columns.idTicket}),
    idCliente: column.number({references: () => Cliente.columns.idCliente})
  }
})

const Automovil = defineTable({
  columns: {
    idAutomovil: column.number({primaryKey: true}),
    numeroSerie: column.text({optional: false}),
    marca: column.text(),
    modelo: column.text(),
    color: column.text()
  }
})

const TicketTramite = defineTable({
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
    Landing,
    Usuario,
    Sesion,
    Usuarioxinformacion,
    Usuarioxservicio,
    Usuarioxcliente,
    Servicios,
    Cliente,
    Clientexautomovil,
    Clientextramite,
    Automovil,
    TicketTramite
  }
});
