import { fetchPokemon, fetchCharacteristics } from "./api.js";

const pokemonContainer = document.getElementById('pokemon-container');
const pagingBack = document.getElementById('paging-back');
const pagingForward = document.getElementById('paging-forward');

document.addEventListener('DOMContentLoaded', () => {
    updatePokemonList();
});

let currentPageIndex = 0;

pagingBack.addEventListener('click', async () => {
    if (currentPageIndex > 0) {
        currentPageIndex -= 1;
        await updatePokemonList();
    }
});

pagingForward.addEventListener('click', async () => {
    currentPageIndex += 1;
    await updatePokemonList();
});

async function updatePokemonList() {
    try {
        pokemonContainer.innerHTML = '';
        const offset = currentPageIndex * 12;
        const pokemons = await fetchPokemon(`?limit=12&offset=${offset}`);

        const promises = pokemons.results.map(async pokemon => {
            const url = pokemon.url;
            const findID = url.split('/');
            const pokemonID = findID[findID.length - 2]; 

            const containerElement = document.createElement('div');
            const textContainer = document.createElement('div');
            const linkElement = document.createElement('a');
            const nameElement = document.createElement('b');
            const imgElement = document.createElement('img');
            const characteristicsElement = document.createElement('i');
            
            imgElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg`;
            imgElement.alt = pokemon.name;
            imgElement.onerror = function() {
                imgElement.src = '/img/no-pic.jpg';
            };

            linkElement.href = `details.html?id=${pokemonID}`;

            let pokemonCharacteristics = await fetchCharacteristics(pokemonID);
            characteristicsElement.textContent = pokemonCharacteristics !== undefined ? pokemonCharacteristics : "Characteristics not found";
            nameElement.textContent = pokemon.name.toUpperCase();

            imgElement.classList.add('pokemon-img');
            containerElement.classList.add('pokemon-style');

            containerElement.appendChild(imgElement);
            textContainer.appendChild(nameElement);
            textContainer.appendChild(characteristicsElement);
            containerElement.appendChild(textContainer);
            pokemonContainer.appendChild(containerElement);

            containerElement.addEventListener('click', () => {
                window.location.href = `details.html?id=${pokemonID}`;
            });
        });

        await Promise.all(promises);
    } catch (error) {
        console.error("Error:" + error);
    }
}

