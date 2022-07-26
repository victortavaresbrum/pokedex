
const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const fetchPokemon = () => {
    const pokemonPromises = [];

    for (let i = 1; i<=151; i++){
        pokemonPromises.push( //push coloca dentro do Array
            fetch(getPokemonUrl(i)).then((response) => response.json()) //parametro conversa com parametro
            );
    }

    Promise.all(pokemonPromises).then((pokemons) => {
        const listPokemons = pokemons.reduce((accumulator, pokemon) =>{ //reduz para apenas as inforamções que vai precisar
            const types = pokemon.types.map((typeInfo) => typeInfo.type.name) //map percorre os arrays
            
            accumulator += `
                            <li class = "card ${types[0]}">
                            <img class= "card-image" alt="${pokemon.name}"
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
                            <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                            <p class="card-subtitle">${types.join(" | ")}</p>
                            </li>`;
            return accumulator;           
        }, 
        "");

        const ul = document.querySelector('[data="pokedex"]');
        ul.innerHTML = listPokemons;
    })
};

fetchPokemon();