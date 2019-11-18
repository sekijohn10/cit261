let pokedata;
if (localStorage.getItem("pokedata")) {
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
        name = obj.forms[0].name.charAt(0).toUpperCase() + obj.forms[0].name.slice(1);
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
            stats[i].name = obj.stats[i].stat.name;
            stats[i].base = obj.stats[i].base_stat;
            statText += obj.stats[i].stat.name + ": " + obj.stats[i].base_stat;
            if (i < obj.stats.length - 2) {
                statText += ", ";
            }
            else if (i < obj.stats.length - 1) {
                statText += ", and ";
            }
        }
        pokedata.pokemon[name] = new Pokemon(name, id, imageSRC, types, abilities, moves, stats);
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
        pokedata.Move[name] = new Move(name, id, stats, dType, cType, dClass, effect, flavor);
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
        pokedata.ability[name] = new Ability(name, id, effect, flavor, pokemon);
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
        pokedata.type[name] = new Type(name, id, moves, pokemon);

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