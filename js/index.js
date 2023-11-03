import { fetchPokemon, fetchCharacteristics } from "./api.js";

const pokemonContainer = document.getElementById('pokemon-container');

await displayPokemon();

async function displayPokemon() {
    try {
        const pokemons = await fetchPokemon();
        const promises = pokemons.results.map(async pokemon => {
            const url = pokemon.url;
            const findID = url.split('/');
            const pokemonID = findID[findID.length - 2]; 

            const containerElement = document.createElement('div');
            const textContainer = document.createElement('div');
            const nameElement = document.createElement('b');
            const imgElement = document.createElement('img');
            const characteristicsElement = document.createElement('i');
            
            imgElement.src = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonID}.svg`;
            imgElement.alt = pokemon.name;

            let pokemonCharacteristics = await fetchCharacteristics(pokemonID);
            characteristicsElement.textContent = pokemonCharacteristics;
            nameElement.textContent = pokemon.name.toUpperCase();

            imgElement.classList.add('pokemon-img');
            containerElement.classList.add('pokemon-style');

            containerElement.appendChild(imgElement);
            textContainer.appendChild(nameElement);
            textContainer.appendChild(characteristicsElement);
            containerElement.appendChild(textContainer);
            pokemonContainer.appendChild(containerElement);
        });

        await Promise.all(promises);
    } catch (error) {
        console.error("Error:" + error);
    }
}

