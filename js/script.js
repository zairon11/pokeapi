const listPokemon = document.getElementById("listaPokemon");
const botones = document.querySelectorAll(".btn-header");

// traemos la URL del pokeApi y lo guardamos en una variable
let URL = "https://pokeapi.co/api/v2/pokemon/"

// funcion para poder traer los pokemones de la API
const resulPokemon = (poke) =>{
 
    // ID
    let idPoke = poke.id.toString()
    if (idPoke.length == 1) {
        idPoke = "00" + idPoke
    }
    else if (idPoke.length == 2){
        idPoke = "0" + idPoke
    }

    // tipo de pokemon
    const tipos = poke.types.map((tipo) =>{
       return `<p class="${tipo.type.name} tipo">${tipo.type.name}</p>`
    })
    const tip = tipos.join()

    // creamos un nuevo elemento div para poder agregar la lista de pokemones
    const div = document.createElement("div")
    div.classList.add("pokemon")
    div.innerHTML = `
    <p class="pokemon-id-back">#${idPoke}</p>
    <div class="pokemon-imagen">
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
    </div>
    <!---INFORMACION DEL POKEMON---->
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${idPoke}</p>
            <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
        <div class="pokemon-tipos">
            ${tip}
        </div>
        <div class="pokemon-stat">
            <p class="stat">${poke.height}M</p>
            <p class="stat">${poke.weight}KG</p>
        </div>
    </div>
    `
    listPokemon.append(div)
}

// recorremos los 151 pokemones que se encuentran en la API
for (let i = 1; i <= 151; i ++) {
    // usamos fetch para consumir la api
    fetch (URL + i)
    .then((res) =>{
        return res.json()
    })
    .then((poke) =>{
        resulPokemon(poke)
    })
    .catch((error) =>{
        console.log("hubo un error en la conexion a la API" + error)
    })
    
}

// EVENTO BOTON PARA SELECCIONAR POR CATEGORIA
botones.forEach((boton) =>{
    boton.addEventListener("click", (e) =>{

        // tiene que empezar vacio
        listPokemon.innerHTML = ""
        const botonId = e.currentTarget.id

        // recorremos cada pokemon y por cada pokemon comparamos su id con su tipo de pokemon y asi poder filtrarlo
        for (let i = 1; i < 151; i++) {
            fetch (URL + i)
            .then((res) =>{
                return res.json()
            })
            .then ((data) =>{
                const pokTipos = data.types.map((pokeid) =>{
                    return pokeid.type.name
                })
                // condicional para ver si el id de cada boton coincide con el tipo de pokemon y asi poder mostrarlo
                if (botonId === "ver-todos") {
                    resulPokemon(data)
                }
                else if (pokTipos.some((tip) =>{
                     return tip.includes(botonId)
                })) {
                     resulPokemon(data)
                }
                    
            })
            
        }


    })
})

/*
    <!---POKEMON----->
                <div class="pokemon">
                    <p class="pokemon-id-back">#025</p>
                    <div class="pokemon-imagen">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="">
                    </div>
                    <!---INFORMACION DEL POKEMON---->
                    <div class="pokemon-info">
                        <div class="nombre-contenedor">
                            <p class="pokemon-id">#025</p>
                            <h2 class="pokemon-nombre">pikachu</h2>
                        </div>
                        <div class="pokemon-tipos">
                            <p class="electric tipo">electric</p>
                            <p class="fighting tipo">fighting</p>
                        </div>
                        <div class="pokemon-stat">
                            <p class="stat">13M</p>
                            <p class="stat">545kg</p>
                        </div>
                    </div>
                </div> 

*/

