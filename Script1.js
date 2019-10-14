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
    let searchItem = document.getElementById("queryText").value + "/";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = this.responseText;
            let obj = JSON.parse(json);
            if (queryType == "pokemon/") {
                addPokemon(obj, searchItem);
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

function additionalInfo(key, name) {

}

function addPokemon(obj, name) {
    let element = document.getElementById("results");
    let head = document.createElement("h4");
    let body = document.createElement("p");
    let section = document.createElement("div");
    let text1 = document.createTextNode(name);
    let image = document.createElement("img");
    image.src = obj.sprites.front_default;
    let info = "Abilities:";
    for (let i = 0; i < obj.abilities.length; i++) {
        info += obj.abilities[i].ability.name;
        if (i < obj.abilities.size() - 1) {
            info += ", ";
        }
    }
    let text2 = document.createTextNode();
    head.appendChild(text1);
    body.appendChild(text2);
    section.appendChild(image);
    section.appendChild(head);
    section.appendChild(body);
    element.appendChild(section);
}

function addMove(obj) {
    let element = document.getElementById("results");
}

function addAbility(obj) {
    let element = document.getElementById("results");
}

function addType(obj) {
    let element = document.getElementById("results");
}