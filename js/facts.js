import { fetchTypes, fetchEncounters, fetchEncounterDetails } from "./api.js";

const typesContainer = document.getElementById('types-container');
const encountersContainer = document.getElementById('encounters-container');
const alltypes = await fetchTypes();

displayTypes();
displayEncounters();

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