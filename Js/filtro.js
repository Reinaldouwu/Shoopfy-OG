const Catalogodejuegos = () => {
     const listadejuegos = [
        { id: 1, titulo: "Grand Theft Auto VI", consola: "ps5", precio: 69.99, imagen: "../imgs/gta6log.jpg", enlace: "../juegos html/GTA6.html", claseEnlace: "Link-gta6" },
        { id: 2, titulo: "Call of Duty BlackOps IV", consola: "ps5", precio: 59.99, imagen: "../imgs/blackops4 copy.jpg", enlace: "../juegos html/blackops.html", claseEnlace: "Link-callofduty" },
        { id: 3, titulo: "Spider-Man 2", consola: "ps5", precio: 25.66, imagen: "../imgs/spiderman2.jpg", enlace: "../juegos html/spiderman2.html", claseEnlace: "Link-spiderman2" },
        { id: 4, titulo: "Elden Ring", consola: "ps4", precio: 59.99, imagen: "../imgs/eldenring.jpg", enlace: "../juegos html/eldenring.html", claseEnlace: "Link-eldenring" },
        { id: 5, titulo: "Forza Horizon 5", consola: "xbox", precio: 29.99, imagen: "../imgs/forzahorizon5.jpg", enlace: "../juegos html/Fh5.html", claseEnlace: "Link-forzahorizon5" },
        { id: 6, titulo: "Red Dead Redemption 2", consola: "ps4", precio: 15.99, imagen: "../imgs/RD2.jpg", enlace: "../juegos html/RD2.html", claseEnlace: "RD2" }
   ];

    const [categoria, setCategoria] = React.useState("todos");

    const juegosVisibles = categoria === "todos" 
        ? listadejuegos
        : listadejuegos.filter(juego => juego.consola === categoria);

    return (
        <div className="catalogo-categoria" style={{ width: "100%", marginTop: "20px" }}>
            {/* --- BOTONES DE FILTRO --- */}
            <div className="filtro-categoria" style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
                <button
                    style={{ padding: "10px 20px", borderRadius: "12px", cursor: "pointer", border: "none", fontWeight: "bold", backgroundColor: categoria === "todos" ? "#000" : "#ccc", color: categoria === "todos" ? "#fff" : "#000" }}
                    onClick={() => setCategoria("todos")}
                >
                    Todos
                </button>
                <button
                    className="CatalogoPs5"
                    style={{ padding: "10px 20px", borderRadius: "12px", cursor: "pointer", border: "none", fontWeight: "bold", backgroundColor: categoria === "ps5" ? "#fff" : "#ccc", color: categoria === "ps5" ? "#000" : "#000", border: categoria === "ps5" ? "2px solid #000" : "none" }}
                    onClick={() => setCategoria("ps5")}
                >
                    PS5
                </button>
                <button
                    className="CatalogoPs4"
                    style={{ padding: "10px 20px", borderRadius: "12px", cursor: "pointer", border: "none", fontWeight: "bold", backgroundColor: categoria === "ps4" ? "rgb(16, 83, 252)" : "#ccc", color: categoria === "ps4" ? "#fff" : "#000" }}
                    onClick={() => setCategoria("ps4")}
                >
                    PS4
                </button>
                <button
                    className="CatalogoXbox"
                    style={{ padding: "10px 20px", borderRadius: "12px", cursor: "pointer", border: "none", fontWeight: "bold", backgroundColor: categoria === "xbox" ? "#007F00" : "#ccc", color: categoria === "xbox" ? "#fff" : "#000" }}
                    onClick={() => setCategoria("xbox")}
                >
                    Xbox
                </button>
            </div>
            
            {/* --- GRILLA DE JUEGOS FILTRADOS --- */}
            <section className="mainContainer">
                {juegosVisibles.map(juego => (
                    <article key={juego.id} className="tarjeta-juego">
                        <a href={juego.enlace} className={juego.claseEnlace}>
                            <img src={juego.imagen} alt={`Portada ${juego.titulo}`} className="portada-juego" />
                            <h3>{juego.titulo}</h3>
                            <h2>{juego.precio.toString().replace('.', ',')}$</h2>
                        </a>
                    </article>
                ))}
            </section>
        </div>
    );
} 

ReactDOM.createRoot(document.getElementById("Catalogodejuegos")).render(<Catalogodejuegos />);