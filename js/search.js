import {fetchPokemon} from './api.js';

const input = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchComment = document.getElementById('search-comment');
const searchResult = document.getElementById('search-result');

//https://pokeapi.co/api/v2/pokemon?limit=1292 ALL POKEMON

searchButton.addEventListener('click', () => {
    executeSearch();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        executeSearch();
    }
});

function displayPokemon(pokemon) {
    
        searchComment.textContent = '';
        searchResult.innerHTML = '';

        const pokemonContainer = document.createElement('div');    
        const pokemonName = document.createElement('b');
        const pokemonImage = document.createElement('img');
        const linkElement = document.createElement('a');
        pokemonName.textContent = pokemon.name.toUpperCase();
        pokemonImage.src = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;
        pokemonImage.alt = pokemon.name;
        linkElement.href = `details.html?id=${pokemon.id}`;
    
        pokemonContainer.appendChild(pokemonName);
        pokemonContainer.appendChild(pokemonImage);
        pokemonContainer.classList.add('pokemon-style');
        searchResult.appendChild(pokemonContainer);

        pokemonContainer.addEventListener('click', () => {
            window.location.href = `details.html?id=${pokemon.id}`;
        });

}

async function executeSearch() {

    if (input.value){
        try {
            const pokemon = await fetchPokemon(`/${input.value}`);
            if (pokemon === undefined) {
                searchComment.textContent = 'No pokemon found.';
                return;
            }
            else {
                displayPokemon(pokemon);
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    } else {
        searchComment.textContent = 'Please enter a pokemon name or id.';
    }
}