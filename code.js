let prev, next, rand;
let quoteContainer, pre, fflam, post;
let citation, book, chNo, chName;
let urlParams;

window.onload = () => {
    prev = document.getElementById("prev");
    prev.onclick = () => loadPrev();
    next = document.getElementById("next");
    next.onclick = () => loadNext();
    rand = document.getElementById("rand");
    rand.onclick = () => loadRandom();
    quoteContainer = document.getElementById("quote-content");
    pre = document.getElementById("pre");
    fflam = document.getElementById("fflam");
    post = document.getElementById("post");
    citation = document.getElementById("citation");
    book = document.getElementById("book");
    chNo = document.getElementById("ch-no");
    chName = document.getElementById("ch-name");
    urlParams = new URL(window.location.href).searchParams
    loadCurrent();
}

window.onpopstate = (event) => {
    setTimeout(() => loadQuote(event.state.i), 0);
}

document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowRight") {
        loadNext();
    } else if (e.code === "ArrowLeft"){
        loadPrev();
    } else if (e.code === "Space") {
        loadRandom();
    }
});

function queryUrl() {
    let i = parseInt(urlParams.get("fflam"));
    if ((! i && i != 0) || i < 0 || i > quotes.length - 1) {
        i = Math.floor(Math.random() * quotes.length);
    } 
    updateUrl(i, false);
    return i;
}

function loadCurrent() {
    loadQuote(queryUrl());
}

function loadPrev() {
    const i = Math.max(0, queryUrl() - 1);
    updateUrl(i);
    loadQuote(i);
}

function loadRandom() {
    const i = Math.floor(Math.random() * quotes.length);
    updateUrl(i);
    loadQuote(i);
}

function loadNext() {
    const i = Math.min(quotes.length - 1, queryUrl() + 1);
    updateUrl(i);
    loadQuote(i);
}

function loadQuote(i) {
    let quote = quotes[i];
    pre.innerHTML = quote.text.pre;
    fflam.innerHTML = quote.text.fflam;
    post.innerHTML = quote.text.post;
    book.innerHTML = books[quote.book];
    chNo.innerHTML =  quote.chapter.no;
    chName.innerHTML = quote.chapter.name;
}

function updateUrl(i, push=true) {
    urlParams.set("fflam", i);
    var newUrl = window.location.pathname + '?' + urlParams.toString();
    if (push) {
        history.pushState({ "i": i }, '', newUrl);
    } else {
        history.replaceState({ "i": i }, '', newUrl)
    }
}