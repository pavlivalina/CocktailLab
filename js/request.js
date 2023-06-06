const KEY = '1';
const cocktailByNameURL = (cocktail) => `https://www.thecocktaildb.com/api/json/v1/${KEY}/search.php?s=${cocktail}`;
const cocktailByLetterURL = (letter) => `https://www.thecocktaildb.com/api/json/v1/${KEY}/search.php?f=${letter}`;
const cocktailByIdURL = (id) => `https://www.thecocktaildb.com/api/json/v1/${KEY}/lookup.php?i=${id}`;
const randomCocktailURL = () => 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const alcoholicURL = (category) => `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${category}`;
const categoryURL = (category) => `https://www.thecocktaildb.com/api/json/v1/${KEY}/filter.php?c=${category}`;

const getRequest = async (endpoint) => (await fetch(endpoint, { method: 'GET' })).json();
const postRequest = async (endpoint) => (await fetch(endpoint, { method: 'POST' })).json();

export function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getCocktailById = async (id) => {
    const request = await getRequest(cocktailByIdURL(id)).then(
        (data) => data.drinks[0],

    );
    if(request===503)
    {
        const notAvail= document.createElement('div');
        notAvail.innerHTML = `Server isn't available`;
    }
    return request;
};

export const getCocktailFull = async (id) => {
    const request = await getRequest(cocktailByIdURL(id)).then(
        (data) => data,

    );
    return request;
};

export const getRandomDrink = async () => {
    
    const request = await postRequest(randomCocktailURL()).then(
        (data) => data,
    );
    return request;
};

export const getIngrItem = (ingr, measure) => {
    const ingredient = document.createElement('li');
    ingredient.classList.add('ingr-item');
    if (!measure) {
        measure = '';
    }
    ingredient.innerHTML = `
      ${measure} ${ingr}
    `;
    return ingredient;
};

export const getPopularDrink = (id, title, img) => {
    const polygonBox = document.createElement('div');
    polygonBox.classList.add('hex');
    polygonBox.innerHTML = `
  <img class="polygon-image" src=${img} alt="some">
  <a href="./cocktail-page.html?idDrink=${id}" class="cocktail-name-hex">${title}</a>
  `;

    return polygonBox;
};

export const getCocktail = (id, title, img) => {
    const cocktailItem = document.createElement('a');
    cocktailItem.classList.add('cocktail');
    cocktailItem.setAttribute('href', `./cocktail-page.html?idDrink=${id}`);
    cocktailItem.innerHTML = `
    <img src="${img}">
    <div class="cocktail-name-list">
        ${title}
    </div>
  `;
    return cocktailItem;
};

export const getByCategory = async (category) => {
    let request;
    if (category === 'Ordinary_Drink' || category === 'Shot') {
        request = await getRequest(categoryURL(category)).then(
            (cocktails) => cocktails,
        );
    }
    if (category === 'Alcoholic' || category === 'Non_Alcoholic') {
        request = await getRequest(alcoholicURL(category)).then(
            (cocktails) => cocktails,
        );
    }
    return request;
};

export const getByLetter = async (letter) => {
    const request = await getRequest(cocktailByLetterURL(letter)).then(
        (cocktails) => cocktails,
    );
    return request;
};

export const getByName = async (text) => {
    const request = await getRequest(cocktailByNameURL(text)).then(
        (cocktails) => cocktails,
    );
    return request;
};
