let loadScreen;
let PokemonData;
let pageNumber = 1;
let limit = 10;

function init() {
  loadStartScreen();
}

async function loadStartScreen() {
  let apiUrl = "https://pokeapi.co/api/v2/pokemon";
  const offset = (pageNumber - 1) * limit;
  const fullUrl = `${apiUrl}?limit=${limit}&offset=${offset}`;
  let response = await fetch(fullUrl);
  loadScreen = await response.json();
  loadPokemons();
  showPokemonsAmount();
  await loadPokemonData();
}

function loadMorePokemons() {
  let selection = document.getElementById("loadmore");
  let selectedValue = selection.value;
  limit = selectedValue;
  remainingPokemons();
  document.getElementById("Pokemoncontainer").innerHTML = "";
  loadStartScreen();
}

function previousPage() {
  pageNumber--;
  if (pageNumber < 1) {
    pageNumber = 1;
  } else {
    remainingPokemons();
    document.getElementById("Pokemoncontainer").innerHTML = "";
    loadStartScreen();
  }
}

function nextPage() {
  pageNumber++;
  remainingPokemons();
  document.getElementById("Pokemoncontainer").innerHTML = "";
  loadStartScreen();
}

function remainingPokemons() {
  total = showPokemonsAmount();
  remain = total - pageNumber * limit;
  return remain;
}

function loadPokemons() {
  let pokemons = [];
  for (let i = 0; i < loadScreen["results"].length; i++) {
    const pokemon = loadScreen["results"][i]["name"];
    pokemons.push(pokemon);
  }
  return pokemons;
}

function showPokemonsAmount() {
  let pokemonAmount = loadScreen["count"];
  return pokemonAmount;
}

async function loadPokemonData() {
  let pokemons = loadPokemons();
  for (let i = 0; i < pokemons.length; i++) {
    let pokemon = pokemons[i];
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    let response = await fetch(url);
    PokemonData = await response.json();
    let imageUrl =
      PokemonData["sprites"]["other"]["official-artwork"]["front_default"];
    renderData(PokemonData, imageUrl, i);
  }
}

function loadpokemonType() {
  for (let j = 0; j < PokemonData["types"].length; j++) {
    let type = PokemonData["types"][j]["type"]["name"];
    return type;
  }
}

function renderInfos() {
  let totalPokemons = showPokemonsAmount();
  let rest = remainingPokemons();
  let infoContainer = document.getElementById("infoContainer");
  infoContainer.innerHTML = `
  <div class="infos">
    <span>Total: ${totalPokemons}</span>
    <span>Remaining Pokemons: ${rest}</span>
  </div>
  `;
}

function renderData(PokemonData, imageUrl, i) {
  renderInfos();
  let container = document.getElementById("Pokemoncontainer");
  let type = loadpokemonType();
  container.innerHTML += `
    <div id="pokemonCardContainer${i}" onclick="getClickedPokemonName('${PokemonData["name"]}')" class="pokemon-card">
      <h2> ${PokemonData["name"]}</h2>
      <span>${type}</span>
      <img src="${imageUrl}">
    </div>
    `;
  checkBackground(i, type);
}

function checkBackground(i, type) {
  let card = document.getElementById(`pokemonCardContainer${i}`);
  let typeToClass = {
    water: "water",
    grass: "grass",
    bug: "grass",
    fire: "fire",
    electric: "electro",
    normal: "normal",
    fighting: "normal",
    ground: "ground",
    poison: "poison",
    fairy: "fairy",
    psychic: "psychic",
    ghost: "psychic",
    rock: "rock",
  };
  card.classList.add("rest");
  if (type in typeToClass) {
    let className = typeToClass[type];
    card.classList.remove("rest");
    card.classList.add(className);
  }
}

function getClickedPokemonName(name) {
  let clickedName = name;
  createUrlParameter(clickedName);
}

function createUrlParameter(clickedName) {
  let name = clickedName;
  let url = `/Pokdex/PokemonInfo.html?pokemon=${name}`;
  window.location.href = url; // öffnet die URL im gleichen Fenster
}
