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
    let url = "https://pokeapi.co/api/v2/";
    let queryType = document.getElementById("queryTopic").value + "/";
    let searchItem = document.getElementById("queryText").value.toLowerCase() + "/";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = this.responseText;
            let obj = JSON.parse(json);
            if (queryType == "pokemon/") {
                addPokemon(obj);
            }
            else if (queryType == "move/") {
                addMove(obj);
            }
            else if (queryType == "ability/") {
                addAbility(obj);
            }
            else {
                addType(obj);
            }
            document.getElementById("error").innerHTML = "";
        }
        else if (this.readyState == 4 && this.status != 200) {
            document.getElementById("error").innerHTML = "Invalid " + document.getElementById("queryTopic").value +
                " inquery " + this.statusText + " make sure to use all lowercase";
        }
    };
    xmlhttp.open("GET", url + queryType + searchItem, true)
    xmlhttp.send();
}

function addPokemon(obj) {
    let element = document.getElementById("results");
    let head = document.createElement("h4");
    let body = document.createElement("p");
    let section = document.createElement("div");
    let nameID = obj.forms[0].name.charAt(0).toUpperCase() + obj.forms[0].name.slice(1) + " id: " +
        obj.game_indices[0].game_index;
    let text1 = document.createTextNode(nameID);
    let image = document.createElement("img");
    image.src = obj.sprites.front_default;
    let type = "Type: ";
    for (let i = 0; i < obj.types.length; i++) {
        type += obj.types[i].type.name;
        if (i < obj.types.length - 2) {
            type += ", ";
        }
        else if (i < obj.types.length - 1) {
            if (obj.types.length > 2) {
                type += ", and ";
            }
            else {
                type += " and ";
            }
        }
    }
    let ability = "Abilities: ";
    for (let i = 0; i < obj.abilities.length; i++) {
        ability += obj.abilities[i].ability.name;
        if (i < obj.abilities.length - 2) {
            ability += ", ";
        }
        else if (i < obj.abilities.length - 1) {
            if (obj.abilities.length > 2) {
                ability += ", and ";
            }
            else {
                ability += " and ";
            }
        }
    }
    let move = "Moves: "
    for (let i = 0; i < obj.moves.length; i++) {
        move += obj.moves[i].move.name;
        if (i < obj.moves.length - 2) {
            move += ", ";
        }
        else if(i < obj.moves.length - 1) {
            move += ", and ";
        }
    }
    let stat = "Base Stats: "
    for (let i = 0; i < obj.stats.length; i++) {
        stat += obj.stats[i].stat.name + ": " + obj.stats[i].base_stat;
        if (i < obj.stats.length - 2) {
            stat += ", ";
        }
        else if (i < obj.stats.length - 1) {
            stat += ", and ";
        }
    }
    let text2 = document.createTextNode(type);
    let text3 = document.createTextNode(ability);
    let text4 = document.createTextNode(move);
    let text5 = document.createTextNode(stat);
    head.appendChild(text1);
    body.appendChild(text2);
    body.appendChild(document.createElement("br"));
    body.appendChild(text3);
    body.appendChild(document.createElement("br"));
    body.appendChild(text4);
    body.appendChild(document.createElement("br"));
    body.appendChild(text5);
    section.appendChild(image);
    section.appendChild(head);
    section.appendChild(body);
    element.appendChild(section);
}

function addMove(obj) {
    let element = document.getElementById("results");
    let head = document.createElement("h4");
    let body = document.createElement("p");
    let section = document.createElement("div");
    let nameID = obj.names[2].name + " id: " + obj.id;
    let text1 = document.createTextNode(nameID);
    let stat = "Power: " + obj.power + ", Accuracy: " + obj.accuracy + ", PP: " + obj.pp;
    let type = "Damage type: " + obj.type.name + ", Damage class: " + obj.damage_class.name +
        ", Contest type: " + obj.contest_type.name;
    let effect = "Effect: " + obj.effect_entries[0].short_effect;
    let flavor = "Flavor text: " + obj.flavor_text_entries[2].flavor_text;
    let text2 = document.createTextNode(stat);
    let text3 = document.createTextNode(type);
    let text4 = document.createTextNode(effect);
    let text5 = document.createTextNode(flavor);
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
    element.appendChild(section);
}

function addAbility(obj) {
    let element = document.getElementById("results");
    let head = document.createElement("h4");
    let body = document.createElement("p");
    let section = document.createElement("div");
    let nameID = obj.names[2].name + " id: " + obj.id;
    let text1 = document.createTextNode(nameID);
    let effect = "Effect: " + obj.effect_entries[0].short_effect;
    let flavor = "Flavor text: " + obj.flavor_text_entries[2].flavor_text;
    let pokemon = "Pok\u00E9mon that can have this ability: ";
    for (let i = 0; i < obj.pokemon.length; i++) {
        pokemon += obj.pokemon[i].pokemon.name;
        if (i < obj.pokemon.length - 2) {
            pokemon += ", ";
        }
        else if (i < obj.pokemon.length - 1) {
            pokemon += ", and ";
        }
    }
    let text2 = document.createTextNode(effect);
    let text3 = document.createTextNode(flavor);
    let text4 = document.createTextNode(pokemon);
    head.appendChild(text1);
    body.appendChild(text2);
    body.appendChild(document.createElement("br"));
    body.appendChild(text3);
    body.appendChild(document.createElement("br"));
    body.appendChild(text4);
    section.appendChild(head);
    section.appendChild(body);
    element.appendChild(section);
}

function addType(obj) {
    let element = document.getElementById("results");
    let head = document.createElement("h4");
    let body = document.createElement("p");
    let section = document.createElement("div");
    let nameID = obj.names[6].name + " id: " + obj.id;
    let text1 = document.createTextNode(nameID);
    let moves = "Moves that are this type: ";
    for (let i = 0; i < obj.moves.length; i++) {
        moves += obj.moves[i].name;
        if (i < obj.moves.length - 2) {
            moves += ", ";
        }
        else if (i < obj.moves.length - 1) {
            moves += ", and ";
        }
    }
    let pokemon = "Pokemon that are this type: ";
    for (let i = 0; i < obj.pokemon.length; i++) {
        pokemon += obj.pokemon[i].pokemon.name;
        if (i < obj.pokemon.length - 2) {
            pokemon += ", ";
        }
        else if (i < obj.pokemon.length - 1) {
            pokemon += ", and ";
        }
    }
    let text2 = document.createTextNode(moves);
    let text3 = document.createTextNode(pokemon);
    head.appendChild(text1);
    body.appendChild(text2);
    body.appendChild(document.createElement("br"));
    body.appendChild(text3);
    section.appendChild(head);
    section.appendChild(body);
    element.appendChild(section);
}

function stringifyExample(obj) {
    let url = "saveObjects.php";
    let json = JSON.stringify(obj);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Successfully saved json " + json);
    };
    xmlhttp.open("GET", url + "?q=" + json, true)
    xmlhttp.send();
}