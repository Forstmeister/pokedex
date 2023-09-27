let currentPokemon;
let species;
let evolution;

function extractPokemonName() {
  const urlParams = new URLSearchParams(window.location.search);
  return (extractetName = urlParams.get("pokemon"));
}

async function loadPokemon() {
  let name = extractPokemonName();
  let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  let response = await fetch(url);
  currentPokemon = await response.json();
  console.log(currentPokemon);
  await loadSpeciesInformation();
  await loadEvolutionChain();
  renderPokemonInfo();
  renderColor();
  aboutCard();
}

async function loadSpeciesInformation() {
  let id = currentPokemon["id"];
  let url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
  let response = await fetch(url);
  species = await response.json();
  console.log(species);
}

async function loadEvolutionChain() {
  let url = species["evolution_chain"]["url"];
  let response = await fetch(url);
  evolution = await response.json();
}

function renderPokemonInfo() {
  let type = getTypes();
  document.getElementById("pokemonType").innerHTML = type;
  document.getElementById("pokemonName").innerHTML = currentPokemon["name"];
  document.getElementById("pokemonGene").innerHTML =
    species["genera"][7]["genus"];
  let id = currentPokemon["id"];
  let paddedNum = "#" + id.toString().padStart(3, "0");
  document.getElementById("pokemonId").innerHTML += `${paddedNum}`;
  document.getElementById("pokemonImage").src =
    currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
}

function showNavigation() {
  let pokemonInfoMenu = document.getElementById("pokemonInfoNavigation");
  pokemonInfoMenu.classList.remove("d-none");
}

function renderColor() {
  let type = getTypes()[0];
  let pokedex = document.getElementById("pokedex");
  let colortype = document.getElementById("pokemonType");
  if (type == "fire") {
    pokedex.classList.add("fire");
    colortype.classList.add("fire-type");
  }
}

function aboutCard() {
  removActiveclass();
  let about = document.getElementById("about");
  let height = ((currentPokemon["height"] * 10) / 100).toFixed(2);
  let weight = ((currentPokemon["weight"] / 100) * 10).toFixed(2);
  let abilitis = getAbilities();
  let egggroup = getEggGroups();
  let habitat = species["habitat"]["name"];
  let text = species["flavor_text_entries"][3]["flavor_text"];
  about.classList.add("active");
  renderAbout(weight, height, abilitis, egggroup, habitat, text);
}

function statsCard() {
  removActiveclass();
  let stats = document.getElementById("baseStats");
  let hp = currentPokemon["stats"][0]["base_stat"];
  let attack = currentPokemon["stats"][1]["base_stat"];
  let defense = currentPokemon["stats"][2]["base_stat"];
  let specialAttack = currentPokemon["stats"][3]["base_stat"];
  let specialDefense = currentPokemon["stats"][4]["base_stat"];
  let speed = currentPokemon["stats"][5]["base_stat"];
  let sumStat = hp + attack + defense + specialAttack + specialDefense + speed;
  stats.classList.add("active");
  renderStats(
    hp,
    attack,
    defense,
    specialDefense,
    specialAttack,
    speed,
    sumStat
  );
}

function removActiveclass() {
  document.getElementById("about").classList.remove("active");
  document.getElementById("baseStats").classList.remove("active");
  document.getElementById("evolution").classList.remove("active");
  document.getElementById("moves").classList.remove("active");
}

function getMoves() {
  let moves = [];
  for (let i = 0; i < currentPokemon["moves"].length; i++) {
    let move = currentPokemon["moves"][i]["move"]["name"];
    moves.push(move);
  }
  return moves;
}

function renderMoves() {
  removActiveclass();
  let moves = getMoves();
  let movesCard = document.getElementById("moves");
  movesCard.classList.add("active");
  let showMoves = document.getElementById("infoContainer");
  showMoves.innerHTML = "";
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    showMoves.innerHTML += `
      <table class="table table-borderless">
      <tbody>
        <tr>
          <th scope="row">${i + 1}. Move Name:</th>
          <td class="w-75">${move}</td>
         </tr>
      </tbody>
    </table>
      `;
  }
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

function getEggGroups() {
  let egggroups = [];
  for (let i = 0; i < species["egg_groups"].length; i++) {
    let egggroup = species["egg_groups"][i]["name"];
    egggroups.push(egggroup);
  }
  return egggroups;
}

function getEvolution() {
  let firstEvolution = evolution["chain"]["species"]["name"];
  let secondEvolution = evolution["chain"]["evolves_to"][0]["species"]["name"];
  let thirdEvolution =
    evolution["chain"]["evolves_to"][0]["evolves_to"][0]["species"]["name"];
  renderEvolution(firstEvolution, secondEvolution, thirdEvolution);
}

function renderEvolution(firstEvolution, secondEvolution, thirdEvolution) {
  removActiveclass();
  let showEvolution = document.getElementById("evolution");
  showEvolution.classList.add("active");
  let evolution = document.getElementById("infoContainer");
  return (evolution.innerHTML = `
  <table class="table table-borderless">
  <tbody>
    <tr>
      <th scope="row">1.Evolution</th>
      <td><b>${firstEvolution}</b></td>
    </tr>
    <tr>
      <th scope="row">2.Evolution</th>
      <td><b>${secondEvolution}</b></td>
    </tr>
    <tr>
      <th scope="row">3.Evolution</th>
      <td><b>${thirdEvolution}</b></td>
    </tr>
  </tbody>
</table>

`);
}

function renderAbout(weight, height, abilitis, egggroup, habitat, text) {
  let about = document.getElementById("infoContainer");
  return (about.innerHTML = `
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
      <td>${abilitis}</td>
    </tr>
    <tr>
      <th scope="row">Egg Groups</th>
      <td>${egggroup}</td>
    </tr>
    <tr>
      <th scope="row">Habitat:</th>
      <td>${habitat}</td>
    </tr>
    <tr>
    <th scope="row">About me:</th>
    <td>${text}</td>
  </tr>
  </tbody>
</table>
`);
}

function renderStatBar(
  hp,
  attack,
  defense,
  specialDefense,
  specialAttack,
  speed
) {
  let progressHp = document.getElementById("progressHp");
  let progressAtt = document.getElementById("progressAtt");
  let progressDef = document.getElementById("progressDef");
  let progressSpecDef = document.getElementById("progressSpecDef");
  let progressSpecAtt = document.getElementById("progressSpecAtt");
  let progressSpeed = document.getElementById("progressSpeed");

  let progressBars = [
    progressHp,
    progressAtt,
    progressDef,
    progressSpecDef,
    progressSpecAtt,
    progressSpeed,
  ];

  let stats = [hp, attack, defense, specialDefense, specialAttack, speed];
  for (let i = 0; i < stats.length; i++) {
    let cssClass = "bg-success";
    if (stats[i] <= 50) {
      cssClass = "bg-danger";
    }
    progressBars[i].classList.add(cssClass);
  }
}

function renderStats(
  hp,
  attack,
  defense,
  specialDefense,
  specialAttack,
  speed,
  sumStat
) {
  let stats = document.getElementById("infoContainer");
  stats.innerHTML = `
  <div class="stat-container">
  <table class="table table-responsive-sm table-borderless w-auto">
    <tbody>
      <div class="d-flex align-items-center">
        <tr>
          <th>HP:</th>
          <td>${hp}</td>
          <td class="w-100">
            <div class="col progress">
              <div
                id="progressHp"
                class="progress-bar bg-success"
                style="width: ${hp}%"
              ></div>
            </div>
          </td>
        </tr>
      </div>
      <div class="d-flex align-items-center">
        <tr>
          <th>Attack:</th>
          <td>${attack}</td>
          <td class="w-100">
            <div class="col progress">
              <div
                id="progressAtt"
                class="progress-bar bg-success"
                style="width: ${attack}%"
              ></div>
            </div>
          </td>
        </tr>
      </div>
      <div class="d-flex align-items-center">
        <tr>
          <th>Defense:</th>
          <td>${defense}</td>
          <td class="w-100">
            <div class="col progress">
              <div
                id="progressDef"
                class="progress-bar bg-success"
                style="width: ${defense}%"
              ></div>
            </div>
          </td>
        </tr>
      </div>
      <div class="d-flex align-items-center">
        <tr>
          <th>Spec.Def.:</th>
          <td>${specialDefense}</td>
          <td class="w-100">
            <div class="col progress">
              <div
                id="progressSpecDef"
                class="progress-bar bg-success"
                style="width: ${specialDefense}%"
              ></div>
            </div>
          </td>
        </tr>
      </div>
      <div class="d-flex align-items-center">
        <tr>
          <th>Spec.Att.:</th>
          <td>${specialAttack}</td>
          <td class="w-100">
            <div class="col progress">
              <div
                id="progressSpecAtt"
                class="progress-bar bg-success"
                style="width: ${specialAttack}%"
              ></div>
            </div>
          </td>
        </tr>
      </div>
      <div class="d-flex align-items-center">
        <tr>
          <th>Speed:</th>
          <td>${speed}</td>
          <td class="w-100">
            <div class="col progress">
              <div
                id="progressSpeed"
                class="progress-bar bg-success"
                style="width: ${speed}%"
              ></div>
            </div>
          </td>
        </tr>
      </div>
      <div class="d-flex align-items-center">
        <tr>
          <th>Total:</th>
          <td>${sumStat}</td>
          <td class="w-100">
          </td>
        </tr>
      </div>
    </tbody>
  </table>
</div>

 `;
  renderStatBar(hp, attack, defense, specialDefense, specialAttack, speed);
}
