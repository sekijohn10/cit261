function updateQuery() {
    let topic = document.getElementById("queryTopic").value;
    if (topic == "pokemon") {
        document.getElementById("queryLabel").innerHTML = "Pok\u00E9mon's name or id:";
    }
    else if (topic == "move") {
        document.getElementById("queryLabel").innerHTML = "Pok\u00E9mon moves by name or id:";
    }
    else if (topic == "ability") {
        document.getElementById("queryLabel").innerHTML = "Pok\u00E9mon abilities by name or id:";
    }
    else {
        document.getElementById("queryLabel").innerHTML = "Pok\u00E9mon types by name or id:";
    }
}

function clearPage() {

}

function getQuery() {

}

function additionalInfo(key, name) {

}