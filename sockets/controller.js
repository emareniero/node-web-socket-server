// Este es el controlador de las comunicaciones por socket

const socketController = (socket) => {
    // // Con esto vemos que al actializa la paringa se conecta el socket y a su vez podemos ver su id
    console.log("Cliente conectado", socket.id);

    // Aca vemos cuando se desconecta
    socket.on("disconnect", () => {
      console.log("Cliente desconectado", socket.id);
    });

    // Del lado de nuestro sever escuchamos el evvento enviar-mensaje que viene del lado del cliente
    // Se suele llamar payload a la informacion que viene en el evento
    // El callback se ejecuta cuando todo salio bien (que seria el id que enviamos desde el cliente)
    socket.on("enviar-mensaje", (payload, callback) => {

      // Imaginemos que el id siguiente es provniente de una bd
      const id = 1234564543;

      //Le enviamos por ejemplo que su mensaje se guardo correctamente y el id que tiene
      callback(id)
      // // Con el mensaje e nconsola confirmamos que el server recibio el mensaje
      // console.log(payload);

      // Ahora vamos a enviar el objeto recibido y lo vamos a enviar a todos los lcientes, para eso usamos la propiedad boradcast
      socket.broadcast.emit('enviar-mensaje', payload)

    });
  }

export {socketController}