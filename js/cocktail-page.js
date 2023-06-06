import {
    getCocktailById, getCocktailFull,
} from './request.js';

const recipeTitle = document.querySelector('#recipe-title');
const recipeImg = document.querySelector('#recipe-img');
const recipeImgBack = document.querySelector('#recipe-img-back');
const recipeInstr = document.querySelector('#recipe-instr');
const ingredients = document.querySelector('#ingr-list');
const recipeGlass = document.querySelector('#recipe-glass');
const input = document.querySelector('.search-input');
const searchSubmit = document.querySelector('.search-btn');
const more = document.querySelector('#instr-more');
const detailed = document.querySelector('#random-detailed-instr');

const card = document.querySelector('.card');
card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
});

const search = document.querySelector('.search');
search.addEventListener('click', () => {
    search.classList.add('is-clicked');
});

const addIngr = (block) => {
    ingredients.appendChild(block);
};


const onLoad = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (!urlParams.has('idDrink')) {
        window.location.href = './index.html';
    }

    const idDrink = urlParams.get('idDrink');

    await getCocktailFull(idDrink).then((data) => {
        if (!data.drinks) {
            window.location.href = 'index.html';
        }
    });

    await getCocktailById(idDrink).then((data) => {
        recipeTitle.innerHTML = `${data.strDrink}`;
        recipeImg.setAttribute('src', `${data.strDrinkThumb}`);
        recipeImgBack.setAttribute('src', `${data.strDrinkThumb}`);
        recipeGlass.innerHTML = `${data.strGlass}`;
        recipeInstr.innerHTML = `${data.strInstructions}`;
        detailed.innerHTML = `${data.strInstructions}`;
        if (data.strInstructions.length > 230) {
            recipeInstr.style.overflow = 'hidden';
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
    onLoad();
});
