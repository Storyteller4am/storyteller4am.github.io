```javascript
// =====================================
// SOURABH STORIES
// =====================================

// Smooth entrance animation

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

// Notify Button

const notifyButton = document.querySelector(".notify-btn");

if (notifyButton) {

    notifyButton.addEventListener("click", () => {

        alert(
            "Thank you for your interest! The book launch announcement will be coming soon."
        );

    });

}

// Social Card Hover Enhancement

const cards = document.querySelectorAll(".social-card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-12px) scale(1.04)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0px) scale(1)";

    });

});
```
