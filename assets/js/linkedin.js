// =====================================
// LINKEDIN PAGE — THE LIBRARY (BOOK ONE + BOOK TWO)
// =====================================

// EDIT THESE ARRAYS: one object per chapter.
// title -> chapter title
// link  -> the actual LinkedIn post URL
// cover -> path to cover image (drop file in assets/images/), or "" for a placeholder

const book1Chapters = [
    { num: "01", title: "The Waiting Loop", link: "https://www.linkedin.com/in/4amstoryteller/", cover: "" },
    { num: "02", title: "Chapter Two — title coming", link: "#", cover: "" },
    { num: "03", title: "Chapter Three — title coming", link: "#", cover: "" },
    { num: "04", title: "Chapter Four — title coming", link: "#", cover: "" },
    { num: "05", title: "Chapter Five — title coming", link: "#", cover: "" },
    { num: "06", title: "Chapter Six — title coming", link: "#", cover: "" },
    { num: "07", title: "Chapter Seven — title coming", link: "#", cover: "" },
    { num: "08", title: "Chapter Eight — title coming", link: "#", cover: "" },
    { num: "09", title: "Chapter Nine — title coming", link: "#", cover: "" },
    { num: "10", title: "Chapter Ten — title coming (4:00am post)", link: "#", cover: "" },
];

const book2Chapters = [
    { num: "01", title: "The Unfair Advantage", link: "#", cover: "" },
    { num: "02", title: "Chapter Two — title coming", link: "#", cover: "" },
    { num: "03", title: "Chapter Three — title coming", link: "#", cover: "" },
    { num: "04", title: "Chapter Four — title coming", link: "#", cover: "" },
    { num: "05", title: "Chapter Five — title coming", link: "#", cover: "" },
    { num: "06", title: "Chapter Six — title coming", link: "#", cover: "" },
    { num: "07", title: "Chapter Seven — title coming", link: "#", cover: "" },
    { num: "08", title: "Chapter Eight — title coming", link: "#", cover: "" },
    { num: "09", title: "Chapter Nine — title coming", link: "#", cover: "" },
    { num: "10", title: "Chapter Ten — title coming", link: "#", cover: "" },
];

// Build a chapter grid into the given container id

function buildGrid(containerId, chapters){
    const container = document.getElementById(containerId);

    chapters.forEach(ch => {
        const card = document.createElement("a");
        card.className = "li-card";
        card.href = ch.link;
        card.target = "_blank";
        card.rel = "noopener";

        const coverHTML = ch.cover
            ? `<img src="${ch.cover}" alt="" onerror="this.parentElement.textContent='Cover coming'">`
            : `Cover coming`;

        card.innerHTML = `
            <div class="li-card-cover">${coverHTML}</div>
            <span class="li-card-num">Chapter ${ch.num}</span>
            <h3>${ch.title}</h3>
        `;

        container.appendChild(card);
    });
}

buildGrid("chapterGridInner1", book1Chapters);
buildGrid("chapterGridInner2", book2Chapters);

// Library <-> chapter grid transitions

const library = document.getElementById("bookLibrary");
const cover1 = document.getElementById("bookCover1");
const cover2 = document.getElementById("bookCover2");
const grid1 = document.getElementById("chapterGrid1");
const grid2 = document.getElementById("chapterGrid2");

function openBook(cover, grid){

    // small "snap" on the cover before the library collapses away
    cover.style.transform = "scale(1.06)";

    setTimeout(() => {
        library.classList.add("li-collapsed");
        grid.classList.add("li-visible");

        // stagger the cards in
        const cards = grid.querySelectorAll(".li-card");
        cards.forEach((card, i) => {
            setTimeout(() => card.classList.add("li-card-in"), i * 80);
        });

        grid.scrollIntoView({ behavior: "smooth", block: "start" });

    }, 180);

}

function closeToLibrary(grid){
    grid.classList.remove("li-visible");
    library.classList.remove("li-collapsed");
    cover1.style.transform = "";
    cover2.style.transform = "";

    grid.querySelectorAll(".li-card").forEach(card => card.classList.remove("li-card-in"));

    library.scrollIntoView({ behavior: "smooth", block: "start" });
}

cover1.addEventListener("click", () => openBook(cover1, grid1));
cover2.addEventListener("click", () => openBook(cover2, grid2));

[cover1, cover2].forEach((cover, i) => {
    cover.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openBook(cover, i === 0 ? grid1 : grid2);
        }
    });
});

// Back link: if a chapter grid is open, return to the library first;
// only navigate to index.html when already on the library view

const backLink = document.getElementById("backLink");

backLink.addEventListener("click", (e) => {
    if (grid1.classList.contains("li-visible")) {
        e.preventDefault();
        closeToLibrary(grid1);
    } else if (grid2.classList.contains("li-visible")) {
        e.preventDefault();
        closeToLibrary(grid2);
    }
    // else: let the default link behavior send us to index.html
});