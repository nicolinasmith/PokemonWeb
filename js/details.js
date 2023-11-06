import { fetchPokemon, fetchCharacteristics } from "./api.js";

const queryString = window.location.search;
const params = new URLSearchParams(queryString.slice(1));
const pokemonID = params.get('id');

const pokemonContainer = document.getElementById('pokemon-details');
pokemonContainer.classList.add('pokemon-details');
const name = document.getElementById('name');
const img = document.getElementById('image');
const description = document.getElementById('description');
const types = document.getElementById('type');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const abilities = document.getElementById('abilities');
const moves = document.getElementById('moves');
name.classList.add('text-shadow');

displayPokemon();

async function displayPokemon() {

    const pokemon = await fetchPokemon(`/${pokemonID}`);
    console.log(pokemon);
    const characteristics = await fetchCharacteristics(pokemonID);
    const thisAbility = pokemon.abilities.map(ability => ability.ability.name).join(', ');
    const thisMoves = pokemon.moves.map(move => move.move.name).join(', ');
    const heightInMeters = (pokemon.height / 10).toFixed(1);
    const weightInKg = (pokemon.weight / 10).toFixed(1);
    const thisTypes = pokemon.types.map(type => type.type.name).join(', ');

    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg`;
    img.alt = `Picture of ${pokemon.name}`;
    img.onerror = function() {
        img.src = '/img/no-pic.jpg';
    };
    name.textContent = pokemon.name.toUpperCase();
    types.textContent = `Type: ${thisTypes[0].toUpperCase() + thisTypes.slice(1)}.`;
    description.textContent = `Characteristics: ${characteristics}.`;
    abilities.textContent = `Abilities: ${thisAbility[0].toUpperCase() + thisAbility.slice(1)}.`;
    height.textContent = `Height: ${heightInMeters} m.`;
    weight.textContent = `Weight: ${weightInKg} kgs.`;
    moves.textContent = `Moves: ${thisMoves[0].toUpperCase() + thisMoves.slice(1)}.`;
}
