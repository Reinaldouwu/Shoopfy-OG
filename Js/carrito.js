// ==============================================================================
//  CARRITO DE COMPRAS CON REACT (EXPLICADO PASO A PASO PARA PRINCIPIANTES)
// ==============================================================================
// Hola! Este archivo controla todo el carrito de compras. Vamos a usar React, que es 
// una herramienta que nos permite crear "Componentes" (como piezas de Lego) para 
// armar nuestra pAgina.

// 1. Extraemos las herramientas necesarias de React.
// React tiene un baAol de herramientas. AquA- estamos sacando dos muy importantes:
// - useState: Nos permite crear "variables que React vigila". Si esta variable cambia, React actualiza la pantalla automAticamente.
// - useEffect: Sirve para ejecutar cA3digo en momentos especA-ficos (ejemplo: cuando la pAgina acaba de cargar).
const { useState, useEffect } = React;

// 2. Creamos nuestro componente principal llamado "Carrito".
// Un componente en React no es mdas que una funciA3n de JavaScript que devuelve cA3digo HTML (JSX).
function Carrito() {
  // --- A. CREANDO NUESTRO "ESTADO" (Nuestras variables especiales) ---
  
  // Aqui creamos el estado de nuestro carrito. 
  // 'items' es la lista (un arreglo) que guardarA todos los juegos que el usuario quiere comprar.
  // 'setItems' es la AUNICA funciA3n autorizada para modificar esa lista.
  // Empezamos con una lista vacA-a: []
  const [items, setItems] = useState([]);

  // AquA- creamos otra variable para saber si el menAoa lateral estA abierto o cerrado.
  // 'carritoAbierto' puede ser falso (cerrado) o verdadero (abierto).
  // 'setCarritoAbierto' es la funciA3n para cambiarlo. Empezamos en falso (false).
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  // --- B. CARGANDO Y GUARDANDO DATOS (LOCALSTORAGE) ---
  
  // useEffect funciona asA-: useEffect( funciA3n_a_ejecutar , [cosas_que_vigila] )
  // Si los corchetes estAn vacA-os [], significa: "Ejecuta esto solo UNA VEZ cuando cargue la pAgina".
  useEffect(() => {
    // Cuando cargamos cualquier pAgina (como el index o la del gta6), queremos revisar 
    // si ya habA-amos guardado cosas en el carrito antes (en el 'localStorage' del navegador).
    // localStorage es como un cajA3n secreto del navegador que no se borra si cambias de pAgina.
    const datosGuardados = localStorage.getItem("miCarrito");
    
    // Si encontramos algo guardado...
    if (datosGuardados) {
      // Lo transformamos de texto (JSON) a una lista real de JavaScript y lo ponemos en nuestro carrito
      setItems(JSON.parse(datosGuardados));
    }

    // AHORA: Vamos a escuchar un "evento personalizado" para cuando alguien haga clic en "Añadir al Carrito" 
    // en otra parte de la página (por ejemplo en el HTML del GTA6).
    const escucharNuevosJuegos = (evento) => {
      // El evento nos trae la informaciA3n del juego nuevo.
      const nuevoJuego = evento.detail;
      // AquA- usamos 'setItems' pero de una forma especial: tomamos la lista anterior (listaAnterior),
      // y creamos una nueva lista metiendo todo lo viejo (...listaAnterior) y agregando el juego nuevo al final.
      setItems(listaAnterior => {
        const nuevaLista = [...listaAnterior, nuevoJuego];
        // AdemAs de actualizar React, lo guardamos en el cajA3n del navegador (localStorage)
        // para no perderlo si cambiamos de pagina.
        localStorage.setItem("miCarrito", JSON.stringify(nuevaLista));
        return nuevaLista;
      });
      // Abrimos el carrito automAticamente para que el usuario vea que se agregA3
      setCarritoAbierto(true);
    };

    // Le decimos a la ventana del navegador que "escuche" este evento especial llamado "juegoAgregado"
    window.addEventListener("juegoAgregado", escucharNuevosJuegos);

    // Esto de aqui es "limpieza". Cuando el componente se borra, quitamos el "oido" para no gastar memoria.
    return () => {
      window.removeEventListener("juegoAgregado", escucharNuevosJuegos);
    };
  }, []); // <-- Los corchetes vacA-os significan "solo ejecuta esto al inicio"

  // --- C. FUNCIONES PARA INTERACTUAR CON EL CARRITO ---

  // FunciA3n para abrir o cerrar el panel lateral
  const toggleCarrito = () => {
    // Si estaba abierto (true), lo pone cerrado (false), y viceversa. 
    // El simbolo '!' significa lo contrario.
    setCarritoAbierto(!carritoAbierto);
  };

  // FunciA3n para eliminar un juego del carrito
  const eliminarJuego = (idParaEliminar) => {
    // Filtramos la lista: dejamos pasar a todos los juegos, EXCEPTO el que tiene el ID que queremos eliminar
    const nuevaLista = items.filter(juego => juego.id !== idParaEliminar);
    // Actualizamos React con la nueva lista sin ese juego
    setItems(nuevaLista);
    // Y actualizamos nuestro cajA3n (localStorage) para que el cambio se guarde
    localStorage.setItem("miCarrito", JSON.stringify(nuevaLista));
  };

  const total = items.reduce((acumulado, juego) => acumulado + juego.precio, 0);
  //funcion del whatsapp
  const finalizarCompra = () => { 
    if(items.length === 0)return;

const numeroWhatsapp = "584243392970" 
let mensaje = "Hola, quiero comprar los siguientes juegos:\n\n";

items.forEach((juego,index) => {
mensaje += `${index + 1}. *${juego.nombre}* - $${juego.precio}\n`;
});
mensaje += `\n*total a apagar:* $${total.toFixed(2)}`;

const mensajeCodificado = encodeURIComponent(mensaje);

const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${mensajeCodificado}`;
window.open(urlWhatsapp, "_blank");
};

  // --- D. LO QUE REACT DIBUJA EN LA PANTALLA (JSX) ---
  // JSX parece HTML, pero en realidad es JavaScript disfrazado. Nos permite mezclar HTML con variables (usando llaves {})

  return (
    <div>
      {/* 1. EL BOTON DEL CARRITO (Se muestra en el ASIDE como si fuera un enlace de cataAlogo) */}
      <button onClick={toggleCarrito} className="boton-abrir-carrito">
        🛒 Ver Carrito ({items.length})
      </button>

      {/* 2. EL FONDO OSCURO (Solo se dibuja si 'carritoAbierto' es true) */}
      {carritoAbierto && (
        <div className="overlay-carrito" onClick={toggleCarrito}></div>
      )}

      {/* 3. EL PANEL LATERAL DEL CARRITO */}
      {/* Si carritoAbierto es true, le agregamos la clase "abierto" para que se deslice en la pantalla */}
      <div className={`carrito-lateral ${carritoAbierto ? 'abierto' : ''}`}>
        
        {/* Boton X para cerrar el panel */}
        <button className="cerrar-carrito" onClick={toggleCarrito}>X</button>
        
        <h2 style={{ textAlign: "center", marginTop: "10px" }}>Mi Carrito</h2>
        
        <div className="items-del-carrito">
          {/* Aca viene la magia de React. Verificamos si hay cosas en el carrito (items.length === 0 significa vacio) */}
          {items.length === 0 ? (
            <p className="carrito-vacio">El carrito esta vacio.</p>
          ) : (
            // Si NO esta vacio, usamos 'map'. Map agarra nuestra lista de juegos, y por cada juego,
            // crea un pedacito de HTML. Como una fAbrica en serie.
            items.map((juego, index) => (
              // Usamos la misma "fachada" que en tu index.html
              <article key={index} className="producto-en-carrito">
                {/* Mostramos la imagen usando la ruta que guardamos */}
                <img src={juego.imagen} alt={juego.nombre} />
                {/* Mostramos el nombre */}
                <h3>{juego.nombre}</h3>
                {/* Mostramos el precio */}
                <h2>{juego.precio}$</h2>
                {/* BotA3n para eliminar ESTE juego en especA-fico. 
                    Usamos una funciA3n de flecha () => para que solo se ejecute cuando hagan clic */}
                <button 
                  className="boton-eliminar" 
                  onClick={() => eliminarJuego(juego.id)}
                >
                  Eliminar
                </button>
              </article>
            ))
          )}
        </div>
           <div className="total-carrito" style={{ textAlign: "center", marginTop: "20px", color: "#000000" }}>
      <h3>Total: {total.toFixed(2)}$</h3>
     </div>
              <div className="total-carrito">
         <h3>Total: ${total.toFixed(2)}</h3>
           <button 
            className="btn-finalizar-compra" 
            onClick={finalizarCompra}
            disabled={items.length === 0}
          >
            📲 Finalizar Compra por WhatsApp
        </button>
     </div>
       </div>

    </div>

  );
}

// 3. Montar el componente en el contenedor del HTML
// Buscamos el <div id="react-carrito"></div> que pusimos en tu HTML
const lugarDondePintar = document.getElementById('react-carrito');
// Y le decimos a React que dibuje nuestro carrito ahA-.
if (lugarDondePintar) {
  const raiz = ReactDOM.createRoot(lugarDondePintar);
  raiz.render(<Carrito />);
}

// ==============================================================================
//  FAUNCION PARA LOS BOTONES EN TUS HTMLS PUROS (EJ: GTA6.html)
// ==============================================================================
// Ya que tus pAginas de los juegos (GTA6.html) son HTML normal (no estAn hechas en React),
// necesitamos una forma de que ese HTML le "hable" a React.
// Esta funciA3n la vas a poder llamar desde cualquier botA3n del HTML.
window.agregarDesdeHtml = function(idJuego, nombreJuego, precioJuego, imagenJuego) {
  // 1. Armamos un paquete (objeto) con los datos del juego que queremos agregar
  const productoNuevo = {
    // Le creamos un ID Aanico basado en la fecha exacta de ahora, para que si agregas dos veces el GTA6, sean diferentes.
    id: Date.now(), 
    nombre: nombreJuego,
    precio: precioJuego,
    imagen: imagenJuego
  };
// 1. Leemos lo que ya hay en localStorage
  const carritoActual = JSON.parse(localStorage.getItem("miCarrito")) || [];
  
  // 2. Le agregamos el nuevo producto
  const carritoActualizado = [...carritoActual, productoNuevo];
  
  // 3. ¡GUARDAMOS DE INMEDIATO EN EL NAVEGADOR! (Asi aunque presione atras, ya se guardo)
  localStorage.setItem("miCarrito", JSON.stringify(carritoActualizado));
  // 2. Creamos un "Grito" (CustomEvent) en el navegador. 
  // Es como si JavaScript agarrara un megAfono y gritara: "iEH, ACABAN DE AGREGAR UN JUEGO!"
  // Y en el detalle del grito (detail) pasamos el producto nuevo.
  const eventoDeAviso = new CustomEvent("juegoAgregado", { detail: productoNuevo });
  
  // 3. Soltamos el grito. Nuestro useEffect de arriba (en React) estA escuchando y atraparA este paquete.
  window.dispatchEvent(eventoDeAviso);
};

// --- FIN DEL ARCHIVO ---