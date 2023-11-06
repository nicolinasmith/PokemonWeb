import { fetchPokemon } from "./api.js";

const queryString = window.location.search;
const params = new URLSearchParams(queryString.slice(1));
const type = params.get('type');

const container = document.getElementById('pokemon-by-types');
const header = document.getElementById('type-header');
const comment = document.getElementById('type-comment');
header.textContent = `Pokemons of type '${type[0].toUpperCase() + type.slice(1)}':`;

const allPokemons = await fetchPokemon('/?limit=1000');
const allPokemonsData = allPokemons.results.map(pokemon => ({
    id: pokemon.url.split('/').slice(-2)[0],
}));

const list = await getPokemonsByType();
comment.textContent = `Found ${list.length} pokemons.`;
await displayPokemons();

async function getPokemonsByType() {

    const specifikPokemonData = [];

    for (const pokemon of allPokemonsData) {
        const specifikPokemon = await fetchPokemon(`/${pokemon.id}`);
        const specifikData = {
            name: specifikPokemon.name,
            id: specifikPokemon.id,
            types: specifikPokemon.types.map(type => type.type.name),
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${specifikPokemon.id}.svg`,
        };
        specifikPokemonData.push(specifikData);
    }
    const pokemonsWithSpecificType = specifikPokemonData.filter(pokemon => {
        return pokemon.types.includes(type);
    });

    return pokemonsWithSpecificType;
}


async function displayPokemons() {
    list.sort((a, b) => a.name.localeCompare(b.name));
    list.forEach(pokemon => {
        const pokemonContainer = document.createElement('div');
        const pokemonName = document.createElement('b');
        const pokemonImage = document.createElement('img');
        const linkElement = document.createElement('a');
        pokemonName.textContent = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
        pokemonImage.src = pokemon.imageUrl;
        pokemonImage.alt = pokemon.name;
        linkElement.href = `details.html?id=${pokemon.id}`;

        pokemonImage.onerror = function() {
            pokemonImage.src = '/img/no-pic.jpg';
        };

        pokemonContainer.appendChild(pokemonName);
        pokemonContainer.appendChild(pokemonImage);
        pokemonContainer.classList.add('type-pokemon-style');
        container.appendChild(pokemonContainer);

        pokemonContainer.addEventListener('click', () => {
            window.location.href = `details.html?id=${pokemon.id}`;
        });
    });
}