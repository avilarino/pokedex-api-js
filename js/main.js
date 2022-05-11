console.log("Welcome to Poke Api - 🎴🎴🎴")

const pokeCard = document.querySelector("[data-poke-card]")
const pokeName = document.querySelector("[data-poke-name]")
const containerImage = document.querySelector("[data-container-image]")
const pokeImage = document.querySelector("[data-poke-img]")
const pokeId = document.querySelector("[data-poke-id]")
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

const pokemonColors = {
  electric: '#FFEA70',
  normal: '#B09398',
  fire: '#FF675C',
  water: '#0596C7',
  ice: '#AFEAFD',
  rock: '#999799',
  flying: '#7AE7C7',
  grass: '#4A9681',
  psychic: '#FFC6D9',
  ghost: '#561D25',
  bug: '#A2FAA3',
  poison: '#795663',
  ground: '#D2B074',
  dragon: '#DA627D',
  steel: '#1D8A99',
  fighting: '#2F2F2F',
  default: '#2A1A1F',
};

const getPokemon = event => {
  event.preventDefault();
  const {value} = event.target.pokemon
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
  .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
      
}

const renderPokemonData = data => {
  const sprite =  data.sprites.front_default;
  const { stats, types } = data;
  pokeName.textContent = data.name
  pokeName.style.textAlign = "center"
  pokeImage.src = sprite
  pokeId.textContent = `nº ${data.id}`
  setCardColor(types)
  renderPokemonTypes(types)
  renderPokemonStats(stats)
  console.log(data)
}

const setCardColor = types => {
  const colorOne = pokemonColors[types[0].type.name];
  pokeImage.style.background =  ` ${colorOne}`;
  pokeImage.style.backgroundSize = ' 5px 5px'; 
}

// hay varios tipos
const renderPokemonTypes = types => {
  pokeTypes.innerHTML = '';
  types.forEach(type => {
      const typeTextElement = document.createElement("div");
      typeTextElement.style.color = pokemonColors[type.type.name]; // busca el color 
      typeTextElement.textContent = type.type.name; // nombre tipo
      typeTextElement.style.marginRight = "15px"
      pokeTypes.appendChild(typeTextElement);
  });
}


const renderPokemonStats = stats => {
  pokeStats.innerHTML = '';
  stats.forEach(stat => {
      const statElement = document.createElement("div");
      const statElementName = document.createElement("div");
      const statElementAmount = document.createElement("div");
      statElement.style.display = "flex"
      statElement.style.marginTop = "20px"
      statElementName.textContent = stat.stat.name;
      statElementAmount.textContent = stat.base_stat;
      statElementName.style.marginRight = "15px";
      
      statElement.appendChild(statElementName);
      statElement.appendChild(statElementAmount);
      pokeStats.appendChild(statElement);
  });
}

const renderNotFound = () => {
  pokeName.textContent = 'No encontrado';
  pokeImage.setAttribute('src', 'pokeball.png');
  pokeImage.style.background =  '#fff';
  pokeTypes.innerHTML = '';
  pokeStats.innerHTML = '';
  pokeId.textContent = '';
}











