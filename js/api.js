//import config from "./app";

async function fetchPokemon() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=25');
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
      const url = `https://pokeapi.co/api/v2/characteristic/${pokemonID}/`
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Something went wrong. Error status: ${response.status}`);
      }
      const data = await response.json();

      let englishDescription = '';

      for (const description of data.descriptions) {
        if (description.language.name === 'en') {
            englishDescription = description.description;
            break;
        }
      }

    return englishDescription;

    } catch (error) {
      console.error('Fel vid hämtning av Kanto-pokemon:', error);
    }
}

async function fetchTypes() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/type/');
      if (!response.ok) {
        throw new Error(`Something went wrong. Error status: ${response.status}`);
      }
      
      const allTypes = await response.json();
      const types = allTypes.results;
      return types.map(type => type.name);
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