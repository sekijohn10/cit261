function it1Ended() {
    let el = document.getElementById("it1");
    el.innerHTML = "Transition has Ended";
    el.style.color = "red";
}

function it1Started() {
    let el = document.getElementById("it1");
    el.innerHTML = "Transition has Started";
    el.style.color = "blue";
}

function it2Ended() {
    let el = document.getElementById("it2");
    el.innerHTML = "Animation has Ended";
    el.style.fontFamily = "cursive";
    el.style.color = "brown";
}

function it2Started() {
    let el = document.getElementById("it2");
    el.innerHTML = "Animation has Started";
    el.style.fontFamily = "sans-serif";
    el.style.color = "green";
}

function startAnimation() {

}