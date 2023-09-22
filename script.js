let currentPokemon;
let species;
let evolution;


async function loadPokemon() {
  let url = "https://pokeapi.co/api/v2/pokemon/charmander";
  let response = await fetch(url);
  currentPokemon = await response.json();
  console.log(currentPokemon);
  await loadSpeciesInformation();
  await loadEvolutionChain();
  renderPokemonInfo();
  renderColor();
  aboutCard()
 
}

async function loadSpeciesInformation(){
  let id = currentPokemon["id"];
  let url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
  let response = await fetch(url);
  species = await response.json();
  console.log(species);
}

async function loadEvolutionChain(){
  let url = species["evolution_chain"]["url"] ;
  let response = await fetch(url);
  evolution = await response.json();
  console.log(evolution);
}

function renderPokemonInfo() {
  let type =  getTypes();
  document.getElementById("pokemonType").innerHTML = type;
  document.getElementById("pokemonName").innerHTML = currentPokemon["name"];
  document.getElementById("pokemonGene").innerHTML =species["genera"][7]["genus"];
  let id = currentPokemon["id"];
  let  paddedNum = "#" + id.toString().padStart(3, '0');
  document.getElementById("pokemonId").innerHTML += `${paddedNum}`;
  document.getElementById("pokemonImage").src =
    currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
}

function renderColor() {
let type =  getTypes();
let pokedex = document.getElementById("pokedex");
let colortype = document.getElementById("pokemonType");
if (type == "fire"){
  pokedex.classList.add("fire");
  colortype.classList.add("fire-type");
}
}

function aboutCard(){
  let height =(currentPokemon["height"]*10/100).toFixed(2);
  let weight =(currentPokemon["weight"]/100*10).toFixed(2);
  let abilitis =getAbilities();
  let egggroup = getEggGroups();

  renderAbout(weight,height,abilitis,egggroup);
}

function getAbilities() {
  let abilities = [];
  for (let i = 0; i < currentPokemon["abilities"].length; i++) {
    let ability = currentPokemon["abilities"][i]["ability"]["name"];
    abilities.push(ability);
  }
  return abilities;
}

function getTypes() {
  let types = [];
  for (let i = 0; i < currentPokemon["types"].length; i++) {
    let type = currentPokemon["types"][i]["type"]["name"];
    types.push(type);
  }
  return types;
}

function getEggGroups(){
  let egggroups = [];
  for (let i = 0; i < species["egg_groups"].length; i++) {
    let egggroup = species["egg_groups"][i]["name"];
    egggroups.push(egggroup);
  }
  return egggroups;
}

function getEvolution(){
  let firstEvolution = evolution["chain"]["species"]["name"];
  let  secondEvolution =evolution["chain"]["evolves_to"][0]["species"]["name"];
  let thirdEvolution =evolution["chain"]["evolves_to"][0]["evolves_to"][0]["species"]["name"];

  console.log(firstEvolution,secondEvolution,thirdEvolution)
}


function renderAbout(weight,height,abilitis,egggroup){
  let about =  document.getElementById("pokemonInfoAbout");

  about.innerHTML +=`
  <tbody>
  <tr>
    <th scope="row">height</th>
    <td>${height} cm</td>
  </tr>
  <tr>
    <th scope="row">weight</th>
    <td>${weight} kg</td>
  </tr>
  <tr>
    <th scope="row">Abilities</th>
    <td>${abilitis} </td>
  </tr>
</tbody>
  <h4>Breeding</h4>
  <tbody>
  <tr>
    <th scope="row">Egg Groups</th>
    <td>${egggroup}</td>
  </tr>
</tbody>
`
}