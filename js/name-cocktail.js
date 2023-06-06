import {
    getCocktail,
    getCocktailById,
    getByName,
} from './request.js';

const cocktailsContainer = document.querySelector('cocktail-list-container');
const letters = document.querySelector('#alphabet').querySelectorAll('.letter');
const input = document.querySelector('search-input');
const searchSubmit = document.querySelector('search-btn');

const addDrink = (block) => {
    cocktailsContainer.appendChild(block);
};

const removeDrink = () => {
    cocktailsContainer.innerHTML = '';
};

const search = document.querySelector('.search');
search.addEventListener('click', () => {
    search.classList.add('is-clicked');
});

const loadFunc = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('currName')) {
        window.location.href = './index.html';
    }
    const currName = urlParams.get('currName');

    getByName(currName).then((cocktails) => {
        removeDrink();
        if (!cocktails.drinks) {
            cocktailsContainer.classList.remove('cocktail-list-container');
            cocktailsContainer.innerHTML = `<div><img src="https://cdn-icons-png.flaticon.com/512/4522/4522214.png"><br>
        There are no drinks</div>`;
            cocktailsContainer.classList.add('no-drinks');
        } else {
            const cocktailPromises = cocktails.drinks.map((cocktail) => (
                getCocktailById(cocktail.idDrink)
            ));
            Promise.all(cocktailPromises).then((cocktails2) => {
                cocktails2.forEach((cocktail) => {
                    addDrink(getCocktail(
                        cocktail.idDrink,
                        cocktail.strDrink,
                        cocktail.strDrinkThumb,
                    ));
                });
            });
        }
    });
};

[...letters].forEach(
    (elem) => elem.addEventListener(
        'click',
        async () => {
            const currLetter = elem.getAttribute('category');
            window.location.href = `letter-cocktails.html?currLetter=${currLetter}`;
        },
    ),
);

searchSubmit.addEventListener('click', async () => {
    const input2 = input.value;
    if (input2) {
        window.location.href = `name-cocktail.html?currName=${input2}`;
    }
});

input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const input2 = input.value;
        if (input2) {
            window.location.href = `name-cocktail.html?currName=${input2}`;
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadFunc();
});
