function updateQuery() {
    let topic = document.getElementById("queryTopic").value;
    if (topic == "pokemon") {
        document.getElementById("queryLabel").innerHTML = "Pokémon's name or id:";
    }
    else if (topic == "move") {
        dcoument.getElementById("queryLabel").innerHTML = "Pokémon moves by name or id:";
    }
    else if (topic == "ability") {
        dcoument.getElementById("queryLabel").innerHTML = "Pokémon abilities by name or id:";
    }
    else {
        document.getElementById("queryLabel").innerHTML = "Pokémon types by name or id:";
    }
}

function clearPage() {

}

function getQuery() {

}

function additionalInfo(key, name) {

}