// =====================================
// 4 AM STORIES
// =====================================

// ---- Ocean particle canvas ----

(function(){
    const canvas = document.getElementById("oceanCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let W, H, particles;

    function resize(){
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function randomBetween(a, b){ return a + Math.random() * (b - a); }

    function createParticle(){
        return {
            x: randomBetween(0, W),
            y: randomBetween(0, H),
            r: randomBetween(0.8, 2.8),
            vx: randomBetween(-0.08, 0.08),
            vy: randomBetween(-0.14, -0.04),    // drift upward slowly
            alpha: randomBetween(0.1, 0.55),
            pulse: randomBetween(0, Math.PI * 2),
            pulseSpeed: randomBetween(0.006, 0.018),
            // color: mix of teal and soft gold
            hue: Math.random() > 0.75 ? "212,175,106" : "42,184,212"
        };
    }

    function initParticles(){
        const count = Math.min(Math.floor((W * H) / 9000), 140);
        particles = Array.from({ length: count }, createParticle);
    }

    function draw(){
        ctx.clearRect(0, 0, W, H);

        particles.forEach(p => {
            p.pulse += p.pulseSpeed;
            const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.hue},${a.toFixed(2)})`;
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;

            // wrap around edges
            if (p.y < -4)  p.y = H + 4;
            if (p.x < -4)  p.x = W + 4;
            if (p.x > W+4) p.x = -4;
        });

        requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();

    window.addEventListener("resize", () => { resize(); initParticles(); });

    // pause when tab is hidden (battery/perf)
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) draw();
    });
})();


// ---- Scroll reveal ----

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


// ---- Toast utility ----

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

const toastStyle = document.createElement("style");
toastStyle.textContent = `
.toast{
    position:fixed;
    left:50%;
    bottom:30px;
    transform:translate(-50%, 20px);
    background:#2ab8d4;
    color:#05101e;
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


// ---- Story card locked buttons ----

document.querySelectorAll(".story-card button").forEach(btn => {
    if (btn.disabled) return;
    btn.addEventListener("click", () => {
        showToast("This chapter is being added — check back soon.");
    });
});