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
      console.error('Fel vid hämtning av Kanto-pokemon:', error);
    }
}

/*
function fetchImg(pokemonID) {

    try {
        const response = fetch( `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonID}.svg`);

      } catch (error) {
        console.error('Fel vid hämtning av Kanto-pokemon:', error);
      }

}*/
  

/*
  https://medium.com/@sergio13prez/fetching-them-all-poke-api-62ca580981a2
  https://pokeapi.co/docs/v2#pokemon
*/

export {fetchPokemon};
//export {fetchImg};