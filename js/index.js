import { fetchPokemon } from "./api.js";

const container = document.getElementById('pokemon-container');

await displayPokemon();

async function displayPokemon() {
    try {
        const pokemons = await fetchPokemon();
        console.log(pokemons);
        

        pokemons.results.forEach(pokemon => {
            const url = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.url.match(/\/(\d+)\/$/)[1]}.svg`;

            const pokemonDiv = document.createElement('div');
            const pokemonName = document.createElement('p');
            const imgElement = document.createElement('img');
            imgElement.src = url;
            imgElement.alt = pokemon.name;

            imgElement.classList.add('pokemon-img');
            pokemonDiv.classList.add('pokemon-style');

            pokemonName.textContent = pokemon.name.toUpperCase();
            pokemonDiv.appendChild(imgElement);
            pokemonDiv.appendChild(pokemonName);
            container.appendChild(pokemonDiv);
        });
    } catch (error) {
        console.error("Ett fel uppstod: " + error);
    }
}

