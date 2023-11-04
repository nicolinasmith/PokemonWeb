import config from "./app.js";

const baseUrl = config.apis.pokeApi;
const endpoints = config.endpoints;

async function fetchPokemon(params) {

    try {
      const url = baseUrl + endpoints.fetchPokemon + params;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Something went wrong. Error status: ${response.status}`);
      }
      
      const allPokemon = await response.json();
      return allPokemon;
    } catch (error) {
      console.error('Error:', error);
    }
}

async function fetchCharacteristics(pokemonID) {

    try {
      const url = baseUrl + endpoints.fetchCharacteristics + pokemonID;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Something went wrong. Error status: ${response.status}`);
      }
      const data = await response.json();
      const englishDescription = data.descriptions.find(description => description.language.name === 'en');
      return englishDescription ? englishDescription.description : 'Description is missing.';

    } catch (error) {
      console.error('Fel vid hämtning av Kanto-pokemon:', error);
    }
}

async function fetchTypes() {

    try {
      const url = baseUrl + endpoints.fetchTypes;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Something went wrong. Error status: ${response.status}`);
      }
      
      const data = await response.json();
      const types = data.results;
      return types.map(type => type.name);
    } catch (error) {
      console.error('Error:', error);
    }

}

async function fetchEncounters() {

  try {
    const url = baseUrl + endpoints.fetchEncounters;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Something went wrong. Error status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function fetchEncounterDetails(url) {

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Something went wrong. Error status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

  

/*
  https://medium.com/@sergio13prez/fetching-them-all-poke-api-62ca580981a2
  https://pokeapi.co/docs/v2#pokemon
*/

export {fetchPokemon};
export {fetchCharacteristics};
export {fetchTypes};
export {fetchEncounters};
export {fetchEncounterDetails};