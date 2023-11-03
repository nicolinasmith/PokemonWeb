import { fetchTypes } from "./api.js";

const typesContainer = document.getElementById('types-container');
const alltypes = await fetchTypes();
displayTypes();

function displayTypes() {
    alltypes.forEach(type => {
        const typeElement = document.createElement('div');
        typeElement.textContent = type;
        typesContainer.appendChild(typeElement);
        typeElement.classList.add('type-style');
    });
}