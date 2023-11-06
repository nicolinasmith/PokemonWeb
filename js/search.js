import {fetchPokemon} from './api.js';

const input = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchComment = document.getElementById('search-comment');
const searchResult = document.getElementById('search-result');

const allPokemons = await fetchPokemon('/?limit=1000');
console.log(allPokemons);
const allPokemonsData = allPokemons.results.map(pokemon => ({
    name: pokemon.name,
    id: pokemon.url.split('/').slice(-2)[0],
    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.url.split('/').slice(-2)[0]}.svg`,
}));


searchButton.addEventListener('click', () => {
    executeSearch();
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        executeSearch();
    }
});

async function displayPokemon(matchingPokemons, isSearchedByString) {
    
    searchComment.textContent = '';
    searchResult.innerHTML = '';

    if (matchingPokemons.length > 0) {

        if (!isSearchedByString) {
            searchComment.textContent = `Found a pokemon with the id '${input.value}'.`;
        } else {
            searchComment.textContent = `Found ${matchingPokemons.length} pokemon(s) matching '${input.value}'.`;
        }

        matchingPokemons.forEach(pokemon => {
            const pokemonContainer = document.createElement('div');    
            const pokemonName = document.createElement('b');
            const pokemonImage = document.createElement('img');
            const linkElement = document.createElement('a');
            pokemonName.textContent = pokemon.name.toUpperCase();
            pokemonImage.src = pokemon.imageUrl;
            pokemonImage.onerror = function() {
                pokemonImage.src = '/img/no-pic.jpg';
            };
            pokemonImage.alt = pokemon.name;
            linkElement.href = `details.html?id=${pokemon.id}`;
        
            pokemonContainer.appendChild(pokemonName);
            pokemonContainer.appendChild(pokemonImage);
            pokemonContainer.classList.add('matched-pokemon-style');
            pokemonImage.classList.add('matched-pokemon-image');
            searchResult.appendChild(pokemonContainer);
        
            pokemonContainer.addEventListener('click', () => {
                window.location.href = `details.html?id=${pokemon.id}`;
            });
        });
    } else {
        searchComment.textContent = `No matching pokemon found for '${input.value}'.`;
    }
}

async function executeSearch() {

    searchComment.textContent = '';
    searchResult.innerHTML = '';
    const searchValue = input.value.trim();
    let isSearchedByString = true;

    if (searchValue){

        if (isNaN(searchValue)) {
            const searchValue = input.value.toLowerCase();
            const matchingPokemons = allPokemonsData.filter(pokemon => pokemon.name.toLowerCase().startsWith(searchValue));
            displayPokemon(matchingPokemons, isSearchedByString);
        }
        else {
            isSearchedByString = false;
            const pokemon = await fetchPokemon(`/${searchValue}`);
            const thisPokemon = {
                name: pokemon.name,
                id: pokemon.id,
                imageUrl: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg`,
            };
            displayPokemon([thisPokemon], isSearchedByString);
        }
    } else {
        searchComment.textContent = 'Please enter a pokemon name or id.';
    }
}