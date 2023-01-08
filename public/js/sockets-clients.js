// Aca abajo tengo mis referencias del HTML
const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");
const txtMensaje = document.querySelector("#txtMensaje");
const btnEnviar = document.querySelector("#btnEnviar");

// Ahora vamos a definir el socket del cliente
const socket = io();

// Aca vamos a poner listeners para que el socket del cliente se entere
// cuando hubo un cambio en el servidor. En este caso le avisamos al front end
// que estamos conectados
socket.on("connect", () => {
  // Mostamos en la consola del navegador el estado del servidor
  //console.log("Conectado al servidor");

  // Cuando se conecta al servidor oculatamos el boton de offline
  lblOffline.style.display = "none";
  // y dejamos que si se vea el Online
  lblOnline.style.display = "";
});

// Ahora le vamos a avisar que estamos desconectados
socket.on("disconnect", () => {
  // Mostramos en el navegador el estado del servidor
  //console.log("Desconectado del servidor");

  // Avisamos en el front end que estamos desconectados del servidor
  lblOnline.style.display = "none";
  // Mostrmos que estamos desconectados
  lblOffline.style.display = "";
});

// Escuchamos el mensaje ahora que viene del servidor
socket.on('enviar-mensaje', (payload)=> {
    // Tomamos solo el mensaje del payload
    const { mensaje } = payload;

    // Lo vemos en consola
    console.log(mensaje)
})

// Configuramos el evento que sucede al hacer click en el boton
btnEnviar.addEventListener("click", () => {
  // Creamos una constante que va a tener el texto que escribamos en el input
  const mensaje = txtMensaje.value;

  // Generalmente vamos a enviar un payload en formato de objeto al servidor
  const payload = {
    mensaje,
    id: 'asdf2342tdsf',
    fecha: new Date().getTime()
  }

  // // lo leemos en la consola para chequear si todo esta bien
  // console.log(mensaje)

  // Para enviar el mensaje a nuestro servidor necesitamos usar la variable socket
  // que definimos mas arriba que es la que mantiene la conexion con nuestro servidor
  // lo hacemos de la siguiente manera, usamos el emit para emitir un evento
  // Podemos enviar un 3 argumento para avisar al lciente que su evente se realizo con exito
  socket.emit("enviar-mensaje", payload, (id)=>{
    console.log('Desde el server', id)
  });
});
