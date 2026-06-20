// =====================================
// 4 AM STORIES
// =====================================

// Live mirrored clock — updates every second, ties to the "Mirror Hours" motif

function updateClock(){
    const now = new Date();
    const h = String(now.getHours()).padStart(2,"0");
    const m = String(now.getMinutes()).padStart(2,"0");
    const time = `${h}:${m}`;

    const clock = document.getElementById("liveClock");
    const mirror = document.getElementById("liveClockMirror");

    if (clock) clock.textContent = time;
    if (mirror) mirror.textContent = time;
}

updateClock();
setInterval(updateClock, 1000 * 30);

// Scroll reveal

const revealEls = document.querySelectorAll(".reveal");

if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
}

// Notify button — inline toast instead of alert()

const notifyButton = document.querySelector(".notify-btn");

if (notifyButton) {
    notifyButton.addEventListener("click", () => {
        showToast("You're on the list — the launch announcement lands here first.");
    });
}

function showToast(message){
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 3200);
}

// minimal injected styles for the toast (kept in JS so it's a true drop-in pair of files)
const toastStyle = document.createElement("style");
toastStyle.textContent = `
.toast{
    position:fixed;
    left:50%;
    bottom:30px;
    transform:translate(-50%, 20px);
    background:#d4af6a;
    color:#0a0e1c;
    padding:14px 24px;
    border-radius:30px;
    font-family:'Inter',sans-serif;
    font-weight:600;
    font-size:.9rem;
    box-shadow:0 10px 30px rgba(0,0,0,.4);
    opacity:0;
    transition:opacity .4s ease, transform .4s ease;
    z-index:100;
    max-width:90%;
    text-align:center;
}
.toast.show{ opacity:1; transform:translate(-50%, 0); }
`;
document.head.appendChild(toastStyle);

// Story card buttons — placeholder hook, ready for real links/routes

document.querySelectorAll(".story-card button").forEach(btn => {
    btn.addEventListener("click", () => {
        showToast("This chapter is being added — check back soon.");
    });
});