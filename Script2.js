let pokedata;
let pokeCreations;

if (window.localStorage.getItem("pokedata")) {
    pokedata = JSON.parse(window.localStorage.getItem("pokedata"));
}
else {
    pokedata = {
        pokemon: {},
        move: {},
        ability: {},
        type: {}
    }
}

if (window.localStorage.getItem("pokeCreations")) {
    pokeCreations = JSON.parse(window.localStorage.getItem("pokeCreations"));
}
else {
    pokeCreations = {};
}

function Pokemon(name, id, image, types, abilities, moves, stats) {
    this.name = name;
    this.id = id;
    this.image = image;
    this.types = types;
    this.abilities = abilities;
    this.moves = moves;
    this.stats = stats;
}

function Move(name, id, stats, dType, cType, dClass, effect, flavor) {
    this.name = name;
    this.id = id;
    this.stats = stats;
    this.dType = dType;
    this.cType = cType;
    this.dClass = dClass;
    this.effect = effect;
    this.flavor = flavor;
}

function Ability(name, id, effect, flavor, pokemon) {
    this.name = name;
    this.id = id;
    this.effect = effect;
    this.flavor = flavor;
    this.pokemon = pokemon;
}

function Type(name, id, moves, pokemon) {
    this.name = name;
    this.id = id;
    this.moves = moves;
    this.pokemon = pokemon;
}

function saveData() {
    window.localStorage.setItem("pokedata", JSON.stringify(pokedata));
}

function saveCreations() {
    window.localStorage.setItem("pokeCreations", JSON.stringify(pokeCreations));
}

function updateQuery() {
    let topic = document.getElementById("queryTopic").value;
    if (topic == "pokemon") {
        document.getElementById("queryLabel").innerHTML = "Pok\u00E9mon's name or id:";
    }
    else if (topic == "move") {
        document.getElementById("queryLabel").innerHTML = "Pok\u00E9mon move by name or id:";
    }
    else if (topic == "ability") {
        document.getElementById("queryLabel").innerHTML = "Pok\u00E9mon ability by name or id:";
    }
    else {
        document.getElementById("queryLabel").innerHTML = "Pok\u00E9mon type by name or id:";
    }
}

function clearPage() {
    document.getElementById("queryLabel").innerHTML = "Pok\u00E9mon's name or id:";
    document.getElementById("error").innerHTML = "";
    document.getElementById("results").innerHTML = "";
}

function getQuery() {
    let queryType = document.getElementById("queryTopic").value;
    let searchItem = document.getElementById("queryText").value.toLowerCase();

    if (queryType == "pokemon") {
        if (pokedata.pokemon.hasOwnProperty(searchItem)) {
            addPokemon(pokedata.pokemon[searchItem]);
        }
        else {
            checkOnline();
        }
    }
    else if (queryType == "move") {
        if (pokedata.move.hasOwnProperty(searchItem)) {
            addPokemon(pokedata.move[searchItem]);
        }
        else {
            checkOnline();
        }
    }
    else if (queryType == "ability") {
        if (pokedata.ability.hasOwnProperty(searchItem)) {
            addPokemon(pokedata.ability[searchItem]);
        }
        else {
            checkOnline();
        }
    }
    else {
        if (pokedata.type.hasOwnProperty(searchItem)) {
            addType(pokedata.type[searchItem]);
        }
        else {
            checkOnline();
        }
    }
}

function checkOnline() {
    let url = "https://pokeapi.co/api/v2/";
    let queryType = document.getElementById("queryTopic").value + "/";
    let searchItem = document.getElementById("queryText").value.toLowerCase() + "/";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = this.responseText;
            let obj = JSON.parse(json);
            if (queryType == "pokemon/") {
                addPokemon(obj, false);
            }
            else if (queryType == "move/") {
                addMove(obj, false);
            }
            else if (queryType == "ability/") {
                addAbility(obj, false);
            }
            else {
                addType(obj, false);
            }
            document.getElementById("error").innerHTML = "";
        }
        else if (this.readyState == 4 && this.status != 200) {
            document.getElementById("error").innerHTML = "Invalid " + document.getElementById("queryTopic").value +
                " try a new inquery";
        }
    };
    xmlhttp.open("GET", url + queryType + searchItem, true)
    xmlhttp.send();
}

function addPokemon(obj, inPokedata = true) {
    let element = document.getElementById("results");
    let head = document.createElement("h4");
    let body = document.createElement("p");
    let section = document.createElement("div");
    let image = document.createElement("img");
    let nameID, typeText, abilityText, moveText, statText;
    if (!inPokedata) {
        let name, id, types, imageSRC, abilities, moves, stats;
        types = [];
        abilities = [];
        moves = [];
        stats = [];
        nameID = obj.forms[0].name.charAt(0).toUpperCase() + obj.forms[0].name.slice(1) + " id: " +
            obj.game_indices[0].game_index;
        name = obj.forms[0].name;
        id = obj.game_indices[0].game_index;
        imageSRC = obj.sprites.front_default;
        image.src = obj.sprites.front_default;
        typeText = "Type: ";
        for (let i = 0; i < obj.types.length; i++) {
            types.push(obj.types[i].type.name);
            typeText += obj.types[i].type.name;
            if (i < obj.types.length - 2) {
                typeText += ", ";
            }
            else if (i < obj.types.length - 1) {
                if (obj.types.length > 2) {
                    typeText += ", and ";
                }
                else {
                    typeText += " and ";
                }
            }
        }
        abilityText = "Abilities: ";
        for (let i = 0; i < obj.abilities.length; i++) {
            abilities.push(obj.abilities[i].ability.name);
            abilityText += obj.abilities[i].ability.name;
            if (i < obj.abilities.length - 2) {
                abilityText += ", ";
            }
            else if (i < obj.abilities.length - 1) {
                if (obj.abilities.length > 2) {
                    abilityText += ", and ";
                }
                else {
                    abilityText += " and ";
                }
            }
        }
        moveText = "Moves: "
        for (let i = 0; i < obj.moves.length; i++) {
            moves.push(obj.moves[i].move.name);
            moveText += obj.moves[i].move.name;
            if (i < obj.moves.length - 2) {
                moveText += ", ";
            }
            else if (i < obj.moves.length - 1) {
                moveText += ", and ";
            }
        }
        statText = "Base Stats: "
        for (let i = 0; i < obj.stats.length; i++) {
            stats.push({
                name: obj.stats[i].stat.name,
                base: obj.stats[i].base_stat
            });
            statText += obj.stats[i].stat.name + ": " + obj.stats[i].base_stat;
            if (i < obj.stats.length - 2) {
                statText += ", ";
            }
            else if (i < obj.stats.length - 1) {
                statText += ", and ";
            }
        }
        pokedata.pokemon[name.toLowerCase()] = new Pokemon(name, id, imageSRC, types, abilities, moves, stats);
        pokedata.pokemon[id] = new Pokemon(name, id, imageSRC, types, abilities, moves, stats);
    }
    else {
        nameID = obj.name.charAt(0).toUpperCase() + obj.name.slice(1) + " id: " +
            obj.id;
        image.src = obj.image;
        typeText = "Type: ";
        for (let i = 0; i < obj.types.length; i++) {
            typeText += obj.types[i];
            if (i < obj.types.length - 2) {
                typeText += ", ";
            }
            else if (i < obj.types.length - 1) {
                if (obj.types.length > 2) {
                    typeText += ", and ";
                }
                else {
                    typeText += " and ";
                }
            }
        }
        abilityText = "Abilities: ";
        for (let i = 0; i < obj.abilities.length; i++) {
            abilityText += obj.abilities[i];
            if (i < obj.abilities.length - 2) {
                abilityText += ", ";
            }
            else if (i < obj.abilities.length - 1) {
                if (obj.abilities.length > 2) {
                    abilityText += ", and ";
                }
                else {
                    abilityText += " and ";
                }
            }
        }
        moveText = "Moves: "
        for (let i = 0; i < obj.moves.length; i++) {
            moveText += obj.moves[i];
            if (i < obj.moves.length - 2) {
                moveText += ", ";
            }
            else if (i < obj.moves.length - 1) {
                moveText += ", and ";
            }
        }
        statText = "Base Stats: "
        for (let i = 0; i < obj.stats.length; i++) {
            statText += obj.stats[i].name + ": " + obj.stats[i].base;
            if (i < obj.stats.length - 2) {
                statText += ", ";
            }
            else if (i < obj.stats.length - 1) {
                statText += ", and ";
            }
        }
    }
    let text1 = document.createTextNode(nameID);
    let text2 = document.createTextNode(typeText);
    let text3 = document.createTextNode(abilityText);
    let text4 = document.createTextNode(moveText);
    let text5 = document.createTextNode(statText);
    head.appendChild(text1);
    body.appendChild(text2);
    body.appendChild(document.createElement("br"));
    body.appendChild(text3);
    body.appendChild(document.createElement("br"));
    body.appendChild(text5);
    body.appendChild(document.createElement("br"));
    body.appendChild(text4);
    section.appendChild(image);
    section.appendChild(head);
    section.appendChild(body);
    element.insertBefore(section, element.childNodes[0]);
    if (!inPokedata) {
        saveData();
    }
}

function addMove(obj, inPokedata = true) {
    let element = document.getElementById("results");
    let head = document.createElement("h4");
    let body = document.createElement("p");
    let section = document.createElement("div");
    let nameID, statText, typeText, effectText, flavorText;
    if (!inPokedata) {
        let name, id, stats, dType, dClass, cType, effect, flavor;
        stats = {};
        name = obj.names[2].name;
        id = obj.id;
        nameID = obj.names[2].name + " id: " + obj.id;
        stats.power = obj.power;
        stats.accuracy = obj.accuracy;
        stats.pp = obj.pp;
        statText = "Power: " + obj.power + ", Accuracy: " + obj.accuracy + ", PP: " + obj.pp;
        dType = obj.type.name;
        dClass = obj.damage_class.name;
        cType = obj.contest_type.name;
        typeText = "Damage type: " + obj.type.name + ", Damage class: " + obj.damage_class.name +
            ", Contest type: " + obj.contest_type.name;
        effect = obj.effect_entries[0].short_effect;
        effectText = "Effect: " + obj.effect_entries[0].short_effect;
        flavor = obj.flavor_text_entries[2].flavor_text;
        flavorText = "Flavor text: " + obj.flavor_text_entries[2].flavor_text;
        pokedata.move[name.toLowerCase()] = new Move(name, id, stats, dType, cType, dClass, effect, flavor);
        pokedata.move[id] = new Move(name, id, stats, dType, cType, dClass, effect, flavor);
    }
    else {
        nameID = obj.name + " id: " + obj.id;
        statText = "Power: " + obj.stats.power + ", Accuracy: " + obj.stats.accuracy + ", PP: " + obj.stats.pp;
        typeText = "Damage type: " + obj.dType + ", Damage class: " + obj.dClass +
            ", Contest type: " + obj.cType;
        effectText = "Effect: " + obj.effect;
        flavorText = "Flavor text: " + obj.flavor;
    }
    let text1 = document.createTextNode(nameID);
    let text2 = document.createTextNode(statText);
    let text3 = document.createTextNode(typeText);
    let text4 = document.createTextNode(effectText);
    let text5 = document.createTextNode(flavorText);
    head.appendChild(text1);
    body.appendChild(text2);
    body.appendChild(document.createElement("br"));
    body.appendChild(text3);
    body.appendChild(document.createElement("br"));
    body.appendChild(text4);
    body.appendChild(document.createElement("br"));
    body.appendChild(text5);
    section.appendChild(head);
    section.appendChild(body);
    element.insertBefore(section, element.childNodes[0]);
    if (!inPokedata) {
        saveData();
    }
}

function addAbility(obj, inPokedata = true) {
    let element = document.getElementById("results");
    let head = document.createElement("h4");
    let body = document.createElement("p");
    let section = document.createElement("div");
    let nameID, effectText, flavorText, pokemonText;
    if (!inPokedata) {
        let name, id, pokemon, effect, flavor;
        pokemon = [];
        name = obj.names[2].name;
        id = obj.id;
        effect = obj.effect_entries[0].short_effect;
        flavor = obj.flavor_text_entries[2].flavor_text;
        nameID = obj.names[2].name + " id: " + obj.id;
        effectText = "Effect: " + obj.effect_entries[0].short_effect;
        flavorText = "Flavor text: " + obj.flavor_text_entries[2].flavor_text;
        pokemonText = "Pok\u00E9mon that can have this ability: ";
        for (let i = 0; i < obj.pokemon.length; i++) {
            pokemon.push(obj.pokemon[i].pokemon.name);
            pokemonText += obj.pokemon[i].pokemon.name;
            if (i < obj.pokemon.length - 2) {
                pokemonText += ", ";
            }
            else if (i < obj.pokemon.length - 1) {
                pokemonText += ", and ";
            }
        }
        pokedata.ability[name.toLowerCase()] = new Ability(name, id, effect, flavor, pokemon);
        pokedata.ability[id] = new Ability(name, id, effect, flavor, pokemon);
    }
    else {
        nameID = obj.name + " id: " + obj.id;
        effectText = "Effect: " + obj.effect;
        flavorText = "Flavor text: " + obj.flavor;
        pokemonText = "Pok\u00E9mon that can have this ability: ";
        for (let i = 0; i < obj.pokemon.length; i++) {
            pokemonText += obj.pokemon[i];
            if (i < obj.pokemon.length - 2) {
                pokemonText += ", ";
            }
            else if (i < obj.pokemon.length - 1) {
                pokemonText += ", and ";
            }
        }
    }
    let text1 = document.createTextNode(nameID);
    let text2 = document.createTextNode(effectText);
    let text3 = document.createTextNode(flavorText);
    let text4 = document.createTextNode(pokemonText);
    head.appendChild(text1);
    body.appendChild(text2);
    body.appendChild(document.createElement("br"));
    body.appendChild(text3);
    body.appendChild(document.createElement("br"));
    body.appendChild(text4);
    section.appendChild(head);
    section.appendChild(body);
    element.insertBefore(section, element.childNodes[0]);
    if (!inPokedata) {
        saveData();
    }
}

function addType(obj, inPokedata = true) {
    let element = document.getElementById("results");
    let head = document.createElement("h4");
    let body = document.createElement("p");
    let section = document.createElement("div");
    let moveText = "Moves that are this type: ";
    let pokemonText = "Pok\u00E9mon that are this type: ";
    let nameID;
    if (!inPokedata) {
        let name = obj.names[6].name;
        let id = obj.id;
        nameID = obj.names[6].name + " id: " + obj.id;
        let moves = [];
        for (let i = 0; i < obj.moves.length; i++) {
            moves.push(obj.moves[i].name);
            moveText += obj.moves[i].name;
            if (i < obj.moves.length - 2) {
                moveText += ", ";
            }
            else if (i < obj.moves.length - 1) {
                moveText += ", and ";
            }
        }
        let pokemon = [];
        for (let i = 0; i < obj.pokemon.length; i++) {
            pokemon.push(obj.pokemon[i].pokemon.name);
            pokemonText += obj.pokemon[i].pokemon.name;
            if (i < obj.pokemon.length - 2) {
                pokemonText += ", ";
            }
            else if (i < obj.pokemon.length - 1) {
                pokemonText += ", and ";
            }
        }
        pokedata.type[name.toLowerCase()] = new Type(name, id, moves, pokemon);
        pokedata.type[id] = new Type(name, id, moves, pokemon);

    }
    else {
        nameID = obj.name + " id: " + obj.id;
        for (let i = 0; i < obj.moves.length; i++) {
            moveText += obj.moves[i];
            if (i < obj.moves.length - 2) {
                moveText += ", ";
            }
            else if (i < obj.moves.length - 1) {
                moveText += ", and ";
            }
        }
        for (let i = 0; i < obj.pokemon.length; i++) {
            pokemonText += obj.pokemon[i];
            if (i < obj.pokemon.length - 2) {
                pokemonText += ", ";
            }
            else if (i < obj.pokemon.length - 1) {
                pokemonText += ", and ";
            }
        }
    }
    let text1 = document.createTextNode(nameID);
    let text2 = document.createTextNode(moveText);
    let text3 = document.createTextNode(pokemonText);
    head.appendChild(text1);
    body.appendChild(text2);
    body.appendChild(document.createElement("br"));
    body.appendChild(text3);
    section.appendChild(head);
    section.appendChild(body);
    element.insertBefore(section, element.childNodes[0]);
    if (!inPokedata) {
        saveData();
    }
}

function mouseInNav(int) {
    let elem = document.getElementById('nav' + int);
    if (elem.classList.contains("hyper1")) {
        elem.classList.add("hyper2");
        elem.classList.remove("hyper1");
    }
}

function mouseOutNav(int) {
    let elem = document.getElementById('nav' + int);
    if (elem.classList.contains("hyper2")) {
        elem.classList.add("hyper1");
        elem.classList.remove("hyper2");
    }
}

function createPokemon() {
    let name, imageSRC, types, numType, abilities, numAbilities, moves, stats;
    name = document.getElementById("name").value;
    imageSRC = document.getElementById("image").value;
    if (name == "")
        return;
    if (imageSRC == "")
        return;
    numType = document.getElementById("numTypes").value;
    types = [];
    if (numType != 0) {
        for (let i = 0; i < numType; i++) {
            types.push(document.getElementById("type" + (i + 1)).value);
        }
    }
    numAbilities = document.getElementById("numAbilities").value;
    abilities = [];
    if (numAbilities != 0) {
        for (let i = 0; i < numAbilities; i++) {
            abilities.push(document.getElementById("ability" + (i + 1)).value);
        }
    }
    moves = [];
    for (let i = 0; i < 4; i++) {
        let move = document.getElementById("move" + (i + 1)).value;
        if (move != "") {
            moves.push(move);
        }
    }
    stats = [];
    let speed = document.getElementById("speed").value;
    if (speed != NaN && speed != null) {
        stats.push({
            name: "Speed",
            base: speed
        });
    }
    let special_defence = document.getElementById("special_defence").value;
    if (special_defence != NaN && special_defence != null) {
        stats.push({
            name: "Special_Defence",
            base: special_defence
        });
    }
    let special_attack = document.getElementById("special_attack").value;
    if (special_attack != NaN && special_attack != null) {
        stats.push({
            name: "Special_Attack",
            base: special_attack
        });
    }
    let defence = document.getElementById("defence").value;
    if (defence != NaN && defence != null) {
        stats.push({
            name: "Defence",
            base: defence
        });
    }
    let attack = document.getElementById("attack").value;
    if (attack != NaN && attack != null) {
        stats.push({
            name: "Attack",
            base: attack
        });
    }
    let HP = document.getElementById("HP").value;
    if (HP != NaN && HP != null) {
        stats.push({
            name: "Hit_Points",
            base: HP
        });
    }
    pokeCreations[name.toLowerCase()] = new Pokemon(name, null, imageSRC, types, abilities, moves, stats);
    saveCreations();
    let element = document.getElementById("results4");
    let head = document.createElement("h4");
    let body = document.createElement("p");
    let section = document.createElement("div");
    let image = document.createElement("img");
    let name, typeText, abilityText, moveText, statText;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    image.src = imageSRC;
    typeText = "Type: ";
    for (let i = 0; i < types.length; i++) {
        typeText += types[i];
        if (i < types.length - 2) {
            typeText += ", ";
        }
        else if (i < types.length - 1) {
            if (types.length > 2) {
                typeText += ", and ";
            }
            else {
                typeText += " and ";
            }
        }
    }
    abilityText = "Abilities: ";
    for (let i = 0; i < abilities.length; i++) {
        abilityText += abilities[i];
        if (i < abilities.length - 2) {
            abilityText += ", ";
        }
        else if (i < abilities.length - 1) {
            if (abilities.length > 2) {
                abilityText += ", and ";
            }
            else {
                abilityText += " and ";
            }
        }
    }
    moveText = "Moves: "
    for (let i = 0; i < moves.length; i++) {
        moveText += moves[i];
        if (i < moves.length - 2) {
            moveText += ", ";
        }
        else if (i < moves.length - 1) {
            moveText += ", and ";
        }
    }
    statText = "Base Stats: "
    for (let i = 0; i < stats.length; i++) {
        statText += stats[i].name + ": " + stats[i].base;
        if (i < stats.length - 2) {
            statText += ", ";
        }
        else if (i < stats.length - 1) {
            statText += ", and ";
        }
    }
    let text1 = document.createTextNode(name);
    let text2 = document.createTextNode(typeText);
    let text3 = document.createTextNode(abilityText);
    let text4 = document.createTextNode(moveText);
    let text5 = document.createTextNode(statText);
    head.appendChild(text1);
    body.appendChild(text2);
    body.appendChild(document.createElement("br"));
    body.appendChild(text3);
    body.appendChild(document.createElement("br"));
    body.appendChild(text5);
    body.appendChild(document.createElement("br"));
    body.appendChild(text4);
    section.appendChild(image);
    section.appendChild(head);
    section.appendChild(body);
    element.insertBefore(section, element.childNodes[0]);
    document.getElementById("create_a_pokemon").reset();
}

function updateNumTypes() {
    let numTypes = document.getElementById("numTypes").value;
    for (let i = 0; i < numTypes; i++) {
        document.getElementById("type" + (i + 1)).style.display = "inline";
    }
    if (numTypes < 3) {
        for (let i = 3; i > numTypes; i--) {
            document.getElementById("type" + i).style.display = "none";
        }
    }
}

function updateNumAbilities() {
    let numAbilities = document.getElementById("numAbilities").value;
    for (let i = 0; i < numAbilities; i++) {
        document.getElementById("ability" + (i + 1)).style.display = "inline";
    }
    if (numAbilities < 3) {
        for (let i = 3; i > numAbilities; i--) {
            document.getElementById("ability" + i).style.display = "none";
        }
    }
}

function fillCreations() {

    for (const obj in pokeCreations) {
        let element = document.getElementById("results2");
        let head = document.createElement("h4");
        let body = document.createElement("p");
        let section = document.createElement("div");
        let image = document.createElement("img");
        let name, typeText, abilityText, moveText, statText;
        name = pokeCreations[obj].name.charAt(0).toUpperCase() + pokeCreations[obj].name.slice(1);
        image.src = pokeCreations[obj].image;
        typeText = "Type: ";
        for (let i = 0; i < pokeCreations[obj].types.length; i++) {
            typeText += pokeCreations[obj].types[i];
            if (i < pokeCreations[obj].types.length - 2) {
                typeText += ", ";
            }
            else if (i < pokeCreations[obj].types.length - 1) {
                if (pokeCreations[obj].types.length > 2) {
                    typeText += ", and ";
                }
                else {
                    typeText += " and ";
                }
            }
        }
        abilityText = "Abilities: ";
        for (let i = 0; i < pokeCreations[obj].abilities.length; i++) {
            abilityText += pokeCreations[obj].abilities[i];
            if (i < pokeCreations[obj].abilities.length - 2) {
                abilityText += ", ";
            }
            else if (i < pokeCreations[obj].abilities.length - 1) {
                if (pokeCreations[obj].abilities.length > 2) {
                    abilityText += ", and ";
                }
                else {
                    abilityText += " and ";
                }
            }
        }
        moveText = "Moves: "
        for (let i = 0; i < pokeCreations[obj].moves.length; i++) {
            moveText += pokeCreations[obj].moves[i];
            if (i < pokeCreations[obj].moves.length - 2) {
                moveText += ", ";
            }
            else if (i < pokeCreations[obj].moves.length - 1) {
                moveText += ", and ";
            }
        }
        statText = "Base Stats: "
        for (let i = 0; i < pokeCreations[obj].stats.length; i++) {
            statText += pokeCreations[obj].stats[i].name + ": " + pokeCreations[obj].stats[i].base;
            if (i < pokeCreations[obj].stats.length - 2) {
                statText += ", ";
            }
            else if (i < pokeCreations[obj].stats.length - 1) {
                statText += ", and ";
            }
        }
        let text1 = document.createTextNode(name);
        let text2 = document.createTextNode(typeText);
        let text3 = document.createTextNode(abilityText);
        let text4 = document.createTextNode(moveText);
        let text5 = document.createTextNode(statText);
        head.appendChild(text1);
        body.appendChild(text2);
        body.appendChild(document.createElement("br"));
        body.appendChild(text3);
        body.appendChild(document.createElement("br"));
        body.appendChild(text5);
        body.appendChild(document.createElement("br"));
        body.appendChild(text4);
        section.appendChild(image);
        section.appendChild(head);
        section.appendChild(body);
        element.insertBefore(section, element.childNodes[0]);
    }
}

function fillSearches() {
    for (const obj in pokedata.pokemon) {
        let element = document.getElementById("results3");
        let head = document.createElement("h4");
        let body = document.createElement("p");
        let section = document.createElement("div");
        let image = document.createElement("img");
        let nameID, typeText, abilityText, moveText, statText;

        nameID = pokedata.pokemon[obj].name.charAt(0).toUpperCase() + pokedata.pokemon[obj].name.slice(1) + " id: " +
            pokedata.pokemon[obj].id;
        image.src = pokedata.pokemon[obj].image;
        typeText = "Type: ";
        for (let i = 0; i < pokedata.pokemon[obj].types.length; i++) {
            typeText += pokedata.pokemon[obj].types[i];
            if (i < pokedata.pokemon[obj].types.length - 2) {
                typeText += ", ";
            }
            else if (i < pokedata.pokemon[obj].types.length - 1) {
                if (pokedata.pokemon[obj].types.length > 2) {
                    typeText += ", and ";
                }
                else {
                    typeText += " and ";
                }
            }
        }
        abilityText = "Abilities: ";
        for (let i = 0; i < pokedata.pokemon[obj].abilities.length; i++) {
            abilityText += pokedata.pokemon[obj].abilities[i];
            if (i < pokedata.pokemon[obj].abilities.length - 2) {
                abilityText += ", ";
            }
            else if (i < pokedata.pokemon[obj].abilities.length - 1) {
                if (pokedata.pokemon[obj].abilities.length > 2) {
                    abilityText += ", and ";
                }
                else {
                    abilityText += " and ";
                }
            }
        }
        moveText = "Moves: "
        for (let i = 0; i < pokedata.pokemon[obj].moves.length; i++) {
            moveText += pokedata.pokemon[obj].moves[i];
            if (i < pokedata.pokemon[obj].moves.length - 2) {
                moveText += ", ";
            }
            else if (i < pokedata.pokemon[obj].moves.length - 1) {
                moveText += ", and ";
            }
        }
        statText = "Base Stats: "
        for (let i = 0; i < pokedata.pokemon[obj].stats.length; i++) {
            statText += pokedata.pokemon[obj].stats[i].name + ": " + pokedata.pokemon[obj].stats[i].base;
            if (i < pokedata.pokemon[obj].stats.length - 2) {
                statText += ", ";
            }
            else if (i < pokedata.pokemon[obj].stats.length - 1) {
                statText += ", and ";
            }
        }
        let text1 = document.createTextNode(nameID);
        let text2 = document.createTextNode(typeText);
        let text3 = document.createTextNode(abilityText);
        let text4 = document.createTextNode(moveText);
        let text5 = document.createTextNode(statText);
        head.appendChild(text1);
        body.appendChild(text2);
        body.appendChild(document.createElement("br"));
        body.appendChild(text3);
        body.appendChild(document.createElement("br"));
        body.appendChild(text5);
        body.appendChild(document.createElement("br"));
        body.appendChild(text4);
        section.appendChild(image);
        section.appendChild(head);
        section.appendChild(body);
        element.insertBefore(section, element.childNodes[0]);
    }
}