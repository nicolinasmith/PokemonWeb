import { fetchTypes, fetchEncounters, fetchEncounterDetails } from "./api.js";

const typesContainer = document.getElementById('types-container');
const encountersContainer = document.getElementById('encounters-container');
const factsContainer = document.getElementById('fact-container');
const alltypes = await fetchTypes();
const pokemonFacts = [
    {
      text: "Pikachu's original Japanese name is 'Rikachu.' The name was changed to 'Pikachu' when the Pokémon franchise was localized for the international market.",
      imageSrc: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/25.svg",
      alt: "Pikachu Image"
    },
    {
      text: "Magikarp is often considered one of the weakest Pokémon. However, it evolves into Gyarados, a powerful Water/Flying-type Pokémon known for its strength and intimidating appearance.",
      imageSrc: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/129.svg",
      alt: "Magikarp Image"
    },
  ];

displayTypes();
displayEncounters();
createRandomFact();


function displayTypes() {
    alltypes.forEach(type => {
        const typeElement = document.createElement('p');
        typeElement.textContent = type[0].toUpperCase() + type.slice(1);
        typesContainer.appendChild(typeElement);
        typeElement.classList.add('fact-list-style');
    });
}

async function displayEncounters() {
    const allEncounters = await fetchEncounters(); // Hämta alla möten

    for (const encounter of allEncounters) {
        const container = document.createElement('div');
        const encounterElement = document.createElement('p');
        const descriptionElement = document.createElement('i');

        encounterElement.textContent = encounter.name[0].toUpperCase() + encounter.name.slice(1);

        const description = await fetchEncounterDetails(encounter.url);
        const englishDescription = description.names.find(name => name.language.name === 'en');
        descriptionElement.textContent = englishDescription ? englishDescription.name : 'Description is missing.';

        container.appendChild(encounterElement);
        container.appendChild(descriptionElement);
        encountersContainer.appendChild(container);
        container.classList.add('fact-list-style');
    }
}

function createRandomFact() {
    const facts = document.createElement('div');
    const factText = document.createElement('p');
    const factImage = document.createElement('img');
    factText.textContent = pokemonFacts[0].text;
    factImage.src = pokemonFacts[0].imageSrc;
    facts.appendChild(factText);
    facts.appendChild(factImage);
    factsContainer.appendChild(facts);
}

