const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonprev = document.querySelector('.btn-prev');
const buttonnext = document.querySelector('.btn-next');

let searchpokemon = 1;

const fetchpokemon = async (pokemon) => {
    const APIresponse =  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIresponse.status == 200) {
        const data = await APIresponse.json();
        return data;
    }
}

const renderpokemon = async (pokemon) => {

    pokemonName.innerHTML = 'loading ...'

    const data = await fetchpokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        searchpokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderpokemon(input.value.toLowerCase());
    input.value = '';
});

buttonprev.addEventListener('click', () => {
    if (searchpokemon > 1) {
        searchpokemon -= 1;
        renderpokemon(searchpokemon)
    }
});

buttonnext.addEventListener('click', () => {
    searchpokemon += 1;
    renderpokemon(searchpokemon)
});

renderpokemon('1')