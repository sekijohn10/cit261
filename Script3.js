let count = 0;

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

function it2Count() {
    let el = document.getElementById("it2");
    el.innerHTML = "Animation count is " + ++count;
    el.style.fontFamily = "cursive";
    el.style.color = "brown";
}

function it2Started() {
    let el = document.getElementById("it2");
    el.innerHTML = "Animation has Started";
    el.style.fontFamily = "sans-serif";
    el.style.color = "green";
}

function startPauseAnimation() {
    let el = document.getElementById("item2");
    if (el.style.animationPlayState == "paused") {
        el.style.animationPlayState = "running";
    }
    else {
        el.style.animationPlayState = "paused";
    }
}