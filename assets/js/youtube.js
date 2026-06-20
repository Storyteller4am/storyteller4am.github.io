// =====================================
// YOUTUBE PAGE — SCREENING ROOM
// =====================================

const CHANNEL_URL = "http://www.youtube.com/@4AMStoryteller";

const playBtn = document.getElementById("playBtn");

if (playBtn) {
    playBtn.addEventListener("click", () => {

        playBtn.classList.add("yt-pressed");

        // brief press feedback before the redirect opens in a new tab
        setTimeout(() => {
            window.open(CHANNEL_URL, "_blank", "noopener");
            playBtn.classList.remove("yt-pressed");
        }, 180);

    });
}