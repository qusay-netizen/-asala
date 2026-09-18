/* =========================
   Elements
========================= */

const intro = document.getElementById("intro");

const startButton =
    document.getElementById("startButton");

const mainContent =
    document.getElementById("mainContent");


const introDays =
    document.getElementById("introDays");

const introHours =
    document.getElementById("introHours");

const introMinutes =
    document.getElementById("introMinutes");

const introSeconds =
    document.getElementById("introSeconds");

const introBirthdayMessage =
    document.getElementById(
        "introBirthdayMessage"
    );


const heartsContainer =
    document.getElementById(
        "heartsContainer"
    );


/* =========================
   Lock Page
========================= */

document.body.classList.add("locked");


/* =========================
   Open Website
========================= */

startButton.addEventListener(
    "click",
    function () {

        intro.classList.add("hidden");

        mainContent.classList.add("visible");

        document.body.classList.remove(
            "locked"
        );

        startHeartAnimation();

        setTimeout(
            revealVisibleElements,
            500
        );

    }
);


/* =========================
   Birthday Countdown
========================= */

function getBirthdayTarget() {

    const now = new Date();

    const year =
        now.getFullYear();


    const birthdayThisYear =
        new Date(
            year,
            8,
            19,
            0,
            0,
            0
        );


    /*
       إذا كان اليوم هو 19 سبتمبر
    */

    if (
        now.getMonth() === 8 &&
        now.getDate() === 19
    ) {

        return birthdayThisYear;

    }


    /*
       إذا لم يأتِ عيد الميلاد
       هذا العام
    */

    if (
        now < birthdayThisYear
    ) {

        return birthdayThisYear;

    }


    /*
       الانتقال للعام القادم
    */

    return new Date(
        year + 1,
        8,
        19,
        0,
        0,
        0
    );

}


/* =========================
   Update Countdown
========================= */

function updateCountdown() {

    const now =
        new Date();

    const birthday =
        getBirthdayTarget();


    /*
       إذا كان اليوم عيد الميلاد
    */

    if (
        now.getMonth() === 8 &&
        now.getDate() === 19
    ) {

        introDays.textContent = "00";

        introHours.textContent = "00";

        introMinutes.textContent = "00";

        introSeconds.textContent = "00";


        introBirthdayMessage.style.display =
            "block";


        return;

    }


    const difference =
        birthday.getTime() -
        now.getTime();


    if (difference <= 0) {

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                difference /
                (1000 * 60 * 60)
            ) % 24
        );


    const minutes =
        Math.floor(
            (
                difference /
                (1000 * 60)
            ) % 60
        );


    const seconds =
        Math.floor(
            (
                difference /
                1000
            ) % 60
        );


    introDays.textContent =
        String(days).padStart(
            2,
            "0"
        );


    introHours.textContent =
        String(hours).padStart(
            2,
            "0"
        );


    introMinutes.textContent =
        String(minutes).padStart(
            2,
            "0"
        );


    introSeconds.textContent =
        String(seconds).padStart(
            2,
            "0"
        );

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =========================
   Reveal Animation
========================= */

function revealVisibleElements() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    elements.forEach(
        function (element) {

            const rect =
                element.getBoundingClientRect();


            if (
                rect.top <
                window.innerHeight * 0.9
            ) {

                element.classList.add(
                    "show"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    revealVisibleElements
);


/* =========================
   Floating Hearts
========================= */

function createHeart() {

    const heart =
        document.createElement(
            "span"
        );


    heart.className =
        "floating-heart";


    heart.textContent =
        Math.random() > 0.5
            ? "♥"
            : "♡";


    const size =
        Math.random() * 18 + 10;


    const left =
        Math.random() * 100;


    const duration =
        Math.random() * 5 + 6;


    heart.style.left =
        left + "%";


    heart.style.fontSize =
        size + "px";


    heart.style.animationDuration =
        duration + "s";


    heartsContainer.appendChild(
        heart
    );


    setTimeout(
        function () {

            heart.remove();

        },
        duration * 1000
    );

}


function startHeartAnimation() {

    createHeart();


    setInterval(
        function () {

            createHeart();

        },
        700
    );

}


/* =========================
   Initial Reveal
========================= */

setTimeout(
    revealVisibleElements,
    1000
);ر