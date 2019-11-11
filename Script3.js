let count = 0;

function it1Ended() {
    let el = document.getElementById("it1");
    el.innerHTML = "Transition has Ended";
    el.classList.add("transition2");
    if (el.classList.contains("transition1"))
        el.classList.remove("transition1");
}

function it1Started() {
    let el = document.getElementById("it1");
    el.innerHTML = "Transition has Started";
    el.classList.add("transition1");
    if (el.classList.contains("transition2"))
        el.classList.remove("transition2");
}

function it2Count() {
    let el = document.getElementById("it2");
    el.innerHTML = "Animation count is " + ++count;
    if (el.classList.contains("animation1")) {
        el.classList.add("animation2");
        el.classList.remove("animation1");
    }
    else {
        el.classList.add("animation1");
        el.classList.remove("animation2");
    }

}

function it2Started() {
    let el = document.getElementById("it2");
    el.innerHTML = "Animation has Started";
    el.classList.add("animation1");
}

function startPauseAnimation() {
    let el = document.getElementById("item2");
    if (el.style.animationPlayState == "running") {
        el.style.animationPlayState = "paused";
    }
    else {
        el.style.animationPlayState = "running";
    }
}