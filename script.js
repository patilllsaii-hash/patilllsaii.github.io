/* =========================
   LOADING SCREEN
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .getElementById("loader")
            .classList.add("hide");

    }, 2800);

});


/* =========================
   MOUSE GLOW
========================= */

const cursorGlow =
    document.getElementById("cursorGlow");

document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left =
        event.clientX + "px";

    cursorGlow.style.top =
        event.clientY + "px";

});


/* =========================
   3D PHOTO EFFECT
========================= */

const photoCard =
    document.getElementById("photoCard");

const card =
    photoCard.querySelector(".photo-card");

photoCard.addEventListener("mousemove", (event) => {

    const rect =
        photoCard.getBoundingClientRect();

    const x =
        event.clientX - rect.left;

    const y =
        event.clientY - rect.top;

    const centerX =
        rect.width / 2;

    const centerY =
        rect.height / 2;

    const rotateX =
        ((y - centerY) / centerY) * -10;

    const rotateY =
        ((x - centerX) / centerX) * 10;

    card.style.transform =
        `rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         scale(1.03)`;

});


photoCard.addEventListener("mouseleave", () => {

    card.style.transform =
        "rotateX(0deg) rotateY(0deg) scale(1)";

});


/* =========================
   HEART EXPLOSION
========================= */

const button =
    document.getElementById("loveButton");

button.addEventListener("click", () => {

    document
        .getElementById("surprise")
        .classList.add("show");

    button.innerHTML =
        "<span>You found my heart</span> ❤️";

    createHeartExplosion();

    setTimeout(() => {

        document
            .getElementById("surprise")
            .scrollIntoView({
                behavior: "smooth"
            });

    }, 600);

});


function createHeartExplosion() {

    for (let i = 0; i < 100; i++) {

        const heart =
            document.createElement("div");

        heart.className =
            "floating-heart";

        heart.innerHTML =
            Math.random() > .5
            ? "❤️"
            : "💗";

        heart.style.left =
            "50%";

        heart.style.top =
            "50%";

        const x =
            (Math.random() - .5) * 1000;

        const y =
            (Math.random() - .5) * 1000;

        heart.style.setProperty(
            "--x",
            x + "px"
        );

        heart.style.setProperty(
            "--y",
            y + "px"
        );

        heart.style.fontSize =
            (10 + Math.random() * 30) + "px";

        heart.style.animationDelay =
            Math.random() * .5 + "s";

        document.body.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 3500);

    }

}


/* =========================
   PARTICLE SYSTEM
========================= */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


function createParticles() {

    particles = [];

    const amount =
        window.innerWidth < 600
        ? 80
        : 150;

    for (let i = 0; i < amount; i++) {

        particles.push({

            x:
                Math.random()
                * canvas.width,

            y:
                Math.random()
                * canvas.height,

            size:
                Math.random() * 2 + .5,

            speed:
                Math.random() * .4 + .1,

            opacity:
                Math.random() * .6 + .2

        });

    }

}

createParticles();


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p => {

        p.y -= p.speed;

        if (p.y < 0) {

            p.y =
                canvas.height;

        }

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,120,190,${p.opacity})`;

        ctx.fill();

    });

    requestAnimationFrame(
        animateParticles
    );

}

animateParticles();