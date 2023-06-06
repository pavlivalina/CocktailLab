import {
    getRandomDrink,
    getPopularDrink, getCocktailById,
} from './request.js';

const randomButton = document.querySelector('#random-recipe-button');
const recipeTitle = document.querySelector('#random-recipe-title');
const randomRecipeImg = document.querySelector('#random-cocktail-img');
const randomRecipeImgBack = document.querySelector('#random-cocktail-img-back');
const randomRecipeInstr = document.querySelector('#random-instr');
const ingredients = document.querySelector('.ingredient-list');
const glass = document.querySelector('#random-glass');
const popularCocktails = ['11000', '178336', '11118', '16271', '11003', '13938', '17118', '178364', '11004', '17196', '12692', '17202', '11410'];
const hexContainer = document.querySelector('.hexagon-gallery');
const categoryList = document.querySelector('#collections-container').querySelectorAll('.collection');
const letters = document.querySelector('#alphabet').querySelectorAll('.letter');
const input = document.querySelector('.search-input');
const searchSubmit = document.querySelector('.search-btn');
const more = document.querySelector('#instr-more');
const detailed = document.querySelector('#random-detailed-instr');

const addHex = (block) => {
    hexContainer.appendChild(block);
};

const addIngr = (block) => {
    ingredients.appendChild(block);
};


const card = document.querySelector('.card');
card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
});

const search = document.querySelector('.search');
search.addEventListener('click', () => {
    search.classList.add('is-clicked');
});


const randomCocktail = async () => {
    getRandomDrink().then((data) => {
        data = data.drinks[0];
        recipeTitle.innerHTML = `${data.strDrink}`;
        randomRecipeImg.setAttribute('src', `${data.strDrinkThumb}`);
        randomRecipeImgBack.setAttribute('src', `${data.strDrinkThumb}`);
        glass.innerHTML = `${data.strGlass}`;
        randomRecipeInstr.innerHTML = `${data.strInstructions}`;
        detailed.innerHTML = `${data.strInstructions}`;
        if (data.strInstructions.length > 230) {
            randomRecipeInstr.style.overflow = 'hidden';
            more.style.display = 'contents';
        } else {
            more.style.display = 'none';
        }
        for (let i = 1; i <= 6; i += 1) {
            const ingredient = data[`strIngredient${i}`];
            const measure = data[`strMeasure${i}`];
            if (!ingredient) {
                break;
            }
            if (!measure) {
                measure = '';
            }
            const ingredientItem = document.createElement('li');
            ingredientItem.classList.add('ingr-item');
            ingredientItem.innerHTML = `
            ${measure} ${ingredient}
            `;
            addIngr(ingredientItem);
        }
    });
};

const showPopularList = async () => {
    const cocktailPromises = popularCocktails.map((cocktail) => getCocktailById(cocktail));
    Promise.all(cocktailPromises).then((cocktails) => {
        cocktails.forEach((cocktail) => {
            addHex(getPopularDrink(
                cocktail.idDrink,
                cocktail.strDrink,
                cocktail.strDrinkThumb,
            ));
        });
    });
};


randomButton.addEventListener('click', () => {
    randomCocktail();
    ingredients.innerHTML = '';
});


[...categoryList].forEach(
    (elem) => elem.addEventListener(
        'click',
        async () => {
            const currCategory = elem.getAttribute('category');
            window.location.href = `category-cocktails.html?currCategory=${currCategory}`;
        },
    ),
);

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
    showPopularList();
});
