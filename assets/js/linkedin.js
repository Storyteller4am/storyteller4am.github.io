// =====================================
// LINKEDIN PAGE — BOOK ONE
// =====================================

// EDIT THIS ARRAY: one object per chapter.
// title      -> chapter title
// link       -> the actual LinkedIn post URL
// cover      -> path to cover image (drop file in assets/images/, e.g. "assets/images/ch1.jpg")
//               leave empty string "" to show the styled placeholder instead

const chapters = [
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

// Build the grid

const gridInner = document.getElementById("chapterGridInner");

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

    gridInner.appendChild(card);
});

// Hero -> grid transition

const bookHero = document.getElementById("bookHero");
const openBtn = document.getElementById("openChapters");
const chapterGrid = document.getElementById("chapterGrid");
const bookCover = document.getElementById("bookCover");

openBtn.addEventListener("click", () => {

    // small "snap" on the cover before it collapses away
    bookCover.style.transform = "scale(1.06)";

    setTimeout(() => {
        bookHero.classList.add("li-collapsed");
        chapterGrid.classList.add("li-visible");

        // stagger the cards in
        const cards = gridInner.querySelectorAll(".li-card");
        cards.forEach((card, i) => {
            setTimeout(() => card.classList.add("li-card-in"), i * 80);
        });

        chapterGrid.scrollIntoView({ behavior: "smooth", block: "start" });

    }, 180);

});