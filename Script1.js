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

}

function additionalInfo(key, name) {

}