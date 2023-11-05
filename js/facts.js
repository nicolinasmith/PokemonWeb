import { fetchTypes, fetchEncounters, fetchEncounterDetails } from "./api.js";

const typesContainer = document.getElementById('types-container');
const encountersContainer = document.getElementById('encounters-container');
const factsContainer = document.getElementById('fact-container');
const numberElement = document.getElementById('number-of-facts')
const pagingForward = document.getElementById('paging-fact-forward');
const pagingBack = document.getElementById('paging-fact-back');
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
    {
      text: "Ditto has the unique ability to transform into any other Pokémon it encounters. It's known for its shapeshifting abilities and has the same stats as the Pokémon it transforms into.",
      imageSrc: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/132.svg",
      alt: "Ditto Image"
    },
    {
      text: "Snorlax is one of the largest Pokémon in terms of size. It's known for blocking paths and causing traffic jams in the Pokémon games.",
      imageSrc: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/143.svg",
      alt: "Snorlax Image"
    },
    {
      text: "Meowth is known for its 'Pay Day' move, which allows trainers to earn extra in-game currency during battles. In the Pokémon world, Meowth is considered lucky due to its ability to find money.",
      imageSrc: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/52.svg",
      alt: "Meowth Image"
    },
    {
      text: "Gyarados is infamous for its destructive wrath. When it becomes enraged, it can cause storms and tidal waves with its intense anger.",
      imageSrc: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/130.svg",
      alt: "Gyaradors Image"
    },
    {
      text: "Lugia is known for its soothing and mystical song. It is said that Lugia's song can calm even the fiercest of storms.",
      imageSrc: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/249.svg",
      alt: "Lugia Image"
    },
    {
      text: "Alakazam is famous for its high IQ and incredible psychic abilities. Its IQ is said to be around 5,000, which allows it to perform complex calculations in an instant.",
      imageSrc: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/65.svg",
      alt: "Alakazam Image"
    },
    {
      text: "Aerodactyl is a resurrected Pokémon from ancient fossils. It's believed to be one of the first known flying Pokémon in history.",
      imageSrc: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/142.svg",
      alt: "Aerodactyl Image"
    },
    {
      text: "Eevee is known for its unique evolution options. Depending on various conditions, it can evolve into Vaporeon (Water), Jolteon (Electric), Flareon (Fire), Espeon (Psychic), Umbreon (Dark), Leafeon (Grass), Glaceon (Ice), or Sylveon (Fairy).",
      imageSrc: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/133.svg",
      alt: "Eevee Image"
    },
    {
      text: "Gardevoir is a Psychic/Fairy-type Pokémon known for its protective and caring nature. It will do anything to shield its trainer from harm, even if it means sacrificing itself.",
      imageSrc: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/282.svg",
      alt: "Gardevoir Image"
    },
    {
      text: "Mew is considered the ancestor of all Pokémon. It contains the genetic code of every known Pokémon species, making it one of the most mysterious and versatile Pokémon.",
      imageSrc: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/151.svg",
      alt: "Mew Image"
    },
    {
      text: "Mudkip is a Water/Ground-type Pokémon that adores mud. It's known for creating mud dams and mud puddles as part of its playful nature.",
      imageSrc: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/258.svg",
      alt: "Mudkip Image"
    },
    {
      text: "Ampharos is known for its role as a lighthouse. It can use its tail to emit a bright light that guides ships safely to shore during storms.",
      imageSrc: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/181.svg",
      alt: "Ampharos Image"
    },
    {
      text: "Despite its imposing appearance as a Dragon/Flying-type Pokémon, Dragonite is known for its gentle and friendly demeanor. It's often seen rescuing people lost at sea.",
      imageSrc: "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/149.svg",
      alt: "Dragonite Image"
    },
  ];
let currentRandomFact = 0;
numberElement.textContent = `${currentRandomFact + 1} of ${pokemonFacts.length}`;

displayTypes();
displayEncounters();
displayRandomFact();



async function displayTypes() {
    const alltypes = await fetchTypes();
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

function displayRandomFact() {
    factsContainer.innerHTML = "";
    const facts = document.createElement('div');
    const factText = document.createElement('p');
    const factImage = document.createElement('img');
    factImage.classList.add('img-size')
    factText.textContent = pokemonFacts[currentRandomFact].text;
    factImage.src = pokemonFacts[currentRandomFact].imageSrc;
    facts.appendChild(factText);
    facts.appendChild(factImage);
    factsContainer.appendChild(facts);
}

pagingForward.addEventListener('click', () => {
  if (currentRandomFact < pokemonFacts.length - 1) {
    currentRandomFact += 1;
    displayRandomFact();
    numberElement.textContent = `${currentRandomFact + 1} of ${pokemonFacts.length}`;
  }
});

pagingBack.addEventListener('click', () => {
  if (currentRandomFact > 0) {
    currentRandomFact -= 1;
    displayRandomFact();
    numberElement.textContent = `${currentRandomFact + 1} of ${pokemonFacts.length}`;
  }
});