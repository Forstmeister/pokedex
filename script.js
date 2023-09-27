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
  removActiveclass();
  let about = document.getElementById("about");
  let height = (currentPokemon["height"] * 10 / 100).toFixed(2);
  let weight = (currentPokemon["weight"] / 100 * 10).toFixed(2);
  let abilitis = getAbilities();
  let egggroup = getEggGroups();
  about.classList.add("active");
  renderAbout(weight, height, abilitis, egggroup);
}

function statsCard(){
  removActiveclass();
  let stats =  document.getElementById("baseStats");
  let hp = currentPokemon["stats"][0]["base_stat"];
  let attack  = currentPokemon["stats"][1]["base_stat"];
  let  defense  = currentPokemon["stats"][2]["base_stat"];
  let specialAttack =  currentPokemon["stats"][3]["base_stat"];
  let specialDefense = currentPokemon["stats"][4]["base_stat"];
  let speed = currentPokemon["stats"][5]["base_stat"];
 stats.classList.add("active");
 renderStats(hp,attack,defense,specialDefense,specialAttack,speed);
}


function removActiveclass(){
  document.getElementById("about").classList.remove("active");
  document.getElementById("baseStats").classList.remove("active");
  document.getElementById("evolution").classList.remove("active");
  document.getElementById("moves").classList.remove("active");
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
}


function renderAbout(weight,height,abilitis,egggroup){
   
  let about =  document.getElementById("infoContainer");

 return about.innerHTML =`
 <table class="table table-borderless">
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
  <tr>
    <th scope="row">Egg Groups</th>
    <td>${egggroup}</td>
  </tr>
</tbody>
</table>
`
}

function renderStatBar(hp,attack,defense,specialDefense,specialAttack,speed) {
  let maxHp= 100;
  let loadElement = document.querySelector('.load');
  let percent = (hp / maxHp) * 100; // Annahme: maxHp ist der maximale Wert
  loadElement.style.width = percent + '%';

  if (percent > 50) {
    loadElement.style.backgroundColor = 'green'; // Zum Beispiel grün, wenn über 50%
  } else {
    loadElement.style.backgroundColor = 'red'; // Andernfalls rot
  }

}


function renderStats(hp,attack,defense,specialDefense,specialAttack,speed){
 
 let stats = document.getElementById("infoContainer");
  stats.innerHTML =`
<div class="stat-container ">
<div class=" d-flex align-items-center">
  <div class="col-2">
    <span>Hp: ${hp}</span>
  </div>
  <div class="col" style="position: relative;">
    <div id="hp" style="background-color: #f5f6f5;" class="load outside-load"></div>
    <div class=" load inside-load"></div>
  </div>
</div>
 

  <span>attack: ${attack}</span><br>
  <span>defense: ${defense}</span><br>
  <span>spec. Def.: ${specialDefense}</span><br>
  <span>spec.Att.: ${specialAttack}</span><br>
  <span>speed: ${speed}</span>
</div>
 `;
 renderStatBar(hp,attack,defense,specialDefense,specialAttack,speed);
}