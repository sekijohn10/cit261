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
        if (i < obj.types.length - 1) {
            type += ", ";
        }
    }
    let ability = "Abilities: ";
    for (let i = 0; i < obj.abilities.length; i++) {
        ability += obj.abilities[i].ability.name;
        if (i < obj.abilities.length - 1) {
            ability += ", ";
        }
    }
    let move = "Moves: "
    for (let i = 0; i < obj.moves.length; i++) {
        move += obj.moves[i].move.name;
        if (i < obj.moves.length - 1) {
            move += ", ";
        }
    }
    let stat = "Base Stats: "
    for (let i = 0; i < obj.stats.length; i++) {
        stat += obj.stats[i].stat.name + ": " + obj.stats[i].base_stat;
        if (i < obj.stats.length - 1) {
            stat += ", ";
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
    let nameID = obj.name.name + " id: " + obj.id;
    let text1 = document.createTextNode(nameID);
    let stat = "Power: " + obj.power + " Accuracy: " + obj.accuracy + " PP: " + obj.pp;
    let type = "Damage type: " + obj.type.name + " Damage class: " + obj.damage_class +
        " Contest type: " + obj.contest_type;
    let effect = "Effect: " + obj.effect_entries.short_effect;
    let flavor = "Flavor Text: " + obj.flavor_text_entries.flavor_text;
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
}

function addType(obj) {
    let element = document.getElementById("results");
}