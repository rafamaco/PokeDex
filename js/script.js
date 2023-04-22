/* DOM Input */
const pokemonName = document.querySelector('.pokemon-name')
const pokemonNumber = document.querySelector('.pokemon-number')
const pokemonImage = document.querySelector('.pokemon-image')
const pokemonMoves = document.querySelector('.pokemon-moves')
const pokemonType = document.querySelector('.pokemon-type')
const pokemonWeight = document.querySelector('.pokemon-weight')
const pokemonHeight = document.querySelector('.pokemon-height')
const form = document.querySelector('.form')
const input = document.querySelector('.pokemon-search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const btnPrevMove = document.querySelector('.btn-prev-move');
const btnNextMove = document.querySelector('.btn-next-move');

let searchPokemon = 1; // Default value for search
let selectMove = 0;
let firstLetterUp = '';
let firstLetterUp2 = '';
let firstLetterUp3 = '';


/* Reaching Pokemon API */
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    // It only will return a response if the API response
    if (APIResponse.status === 200) // 200 means success
    { 
        const data = await APIResponse.json();
        return data;
    }

};

/* Rendering Pokemon Content */
const renderPokemon = async (pokemon) => {
    // Put information while the content is rendering
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    // Call the function to fetch API
    const data = await fetchPokemon(pokemon);

    // If the API response
    if (data && data.id < 889) 
    {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = 'N&ordm;' + data.id;
        firstLetterUp = data.moves[selectMove].move.name;
        firstLetterUp2 = firstLetterUp.charAt(0).toUpperCase() + firstLetterUp.slice(1);
        pokemonMoves.innerHTML = 'Move: ' + firstLetterUp2;
        firstLetterUp = data['types']['0']['type']['name'];
        firstLetterUp3 = firstLetterUp.charAt(0).toUpperCase() + firstLetterUp.slice(1);
        pokemonType.innerHTML = 'Type: ' + firstLetterUp3;
        pokemonWeight.innerHTML = 'Weight: ' + (data.weight/10) + ' Kg';
        pokemonHeight.innerHTML = 'Height: ' + (data.height/10) + ' m';
        if (data.id < 650)
        {
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        }
        else 
        {
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['front_default'];
        }
        input.value = '';
        searchPokemon = data.id
    }
    else
    {
        pokemonImage.style.display = 'none'; // Hide the image if pokemon is not found
        pokemonName.innerHTML = "Pokemon not found";
        pokemonNumber.innerHTML = '';
    }

};

/* Search Input */
form.addEventListener('submit', (event) => {
    event.preventDefault();
    selectMove = 0;
    renderPokemon(input.value.toLowerCase());
});

/* Button Previous */
btnPrev.addEventListener('click', () => {
    if (searchPokemon > 1)
    {
        searchPokemon -= 1;
        selectMove = 0;
        renderPokemon(searchPokemon);
    }
  });

/* Button Next */
btnNext.addEventListener('click', () => {
    searchPokemon += 1;
    selectMove = 0;
    renderPokemon(searchPokemon);
});

/* Button Previous Move */
btnPrevMove.addEventListener('click', () => {
    if (selectMove >= 0)
    {
        selectMove -= 1;
        renderPokemon(searchPokemon);
    }
  });

/* Button Next Move*/
btnNextMove.addEventListener('click', () => {
    selectMove += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);