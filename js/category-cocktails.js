import {
    getCocktail,
    getCocktailById,
    getByCategory,
} from './request.js';

const cocktailsContainer = document.querySelector('.cocktail-list-container');
const pageTitle = document.querySelector('.cocktail-list-header');
const input = document.querySelector('.search-input');
const searchSubmit = document.querySelector('.search-btn');

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

const onLoad = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('currCategory')) {
        window.location.href = './index.html';
    }
    const category = urlParams.get('currCategory');
    if (category === 'Ordinary_Drink') {
        pageTitle.innerHTML = 'Ordinary Drinks';
    } else if (category === 'Non_Alcoholic') {
        pageTitle.innerHTML = 'Non-Alcoholic';
    } else if (category === 'Shot') {
        pageTitle.innerHTML = 'Shots';
    } else {
        pageTitle.innerHTML = `${category}`;
    }
    await getByCategory(category).then((cocktails) => {
        removeDrink();
        const cocktailPromises = cocktails.drinks.map((cocktail) => (
            getCocktailById(cocktail.idDrink)));
        Promise.all(cocktailPromises).then((cocktails2) => {
            cocktails2.forEach((cocktail) => {
                addDrink(getCocktail(
                    cocktail.idDrink,
                    cocktail.strDrink,
                    cocktail.strDrinkThumb,
                ));
            });
        });
    });
};

searchSubmit.addEventListener('click', async () => {
    const input2 = input.value;
    if (input2) {
        window.location.href = `name-cocktail.html?currName=${input2}`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    onLoad();
});
