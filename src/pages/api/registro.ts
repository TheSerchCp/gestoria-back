import type { APIContext } from "astro";
import { generateId } from "lucia"; //generar id unico para usuario
import { Argon2id } from "oslo/password";
import { Usuario, db } from "astro:db";
import { Lucia } from "lucia";
import { lucia } from "@/auth";

export async function POST(context:APIContext): Promise<Response>{
    //parse del formulario de datos
    const formData = await context.request.formData();
    const username = formData.get('correo');
    const password = formData.get('contrasena');
    //validar los datos
    if(!username || !password){
        return new Response('El correo y contraseña son requeridos',{status:400});
    }

    if(typeof username !== 'string' || username.length < 10){
        return new Response("El correo no es correcto",{status:400});
    }

    if(typeof password !== 'string' || password.length < 4){
        return new Response('La contraseña debe tener al menos 4 caracteres');
    }

    //Insertar el usuario a la base
    const userId = generateId(15);
    //hash a contraseña
    const hashPassword = await new Argon2id().hash(password);

    await db.insert(Usuario).values([
        {
        id:userId,
        correo:'',
        username,
        password:hashPassword,
        telefono:''
         },
]);

//crear sesion
const session = await lucia.createSession(userId,{});
const sessionCookie = lucia.createSessionCookie(session.id); //crear la cookie con esa sesion

//poner cookie en el navegador
context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes);

    //redireccionar a pagina principal
    // return context.redirect('/');
    return new Response('success',{status:200}); 

}