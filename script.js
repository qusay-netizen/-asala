"use strict";


/* =========================
   العناصر
========================= */

const intro =
    document.getElementById("intro");

const startButton =
    document.getElementById("startButton");

const heartsContainer =
    document.getElementById("hearts");


/* =========================
   منع التمرير قبل فتح الرسالة
========================= */

document.body.style.overflow = "hidden";


/* =========================
   زر فتح الرسالة
========================= */

startButton.addEventListener(
    "click",
    function () {

        intro.classList.add("hidden");

        document.body.style.overflowY = "auto";

        startHearts();

    }
);


/* =========================
   عناصر العداد
========================= */

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


/* =========================
   تحديد عيد الميلاد
========================= */

function getBirthdayTarget() {

    const now = new Date();

    const year = now.getFullYear();


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
       إذا كان اليوم 19 سبتمبر،
       نعرض العداد بصفر.
    */

    if (
        now.getMonth() === 8 &&
        now.getDate() === 19
    ) {

        return birthdayThisYear;

    }


    /*
       إذا لم يأتِ 19 سبتمبر
       نستخدم عيد هذه السنة.
    */

    if (now < birthdayThisYear) {

        return birthdayThisYear;

    }


    /*
       إذا انتهى 19 سبتمبر،
       نحسب للعام القادم.
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
   تحديث العداد
========================= */

function updateCountdown() {

    const now =
        new Date();

    const birthday =
        getBirthdayTarget();

    const difference =
        birthday.getTime()
        -
        now.getTime();


    /*
       يوم الميلاد
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
        String(days).padStart(2, "0");


    introHours.textContent =
        String(hours).padStart(2, "0");


    introMinutes.textContent =
        String(minutes).padStart(2, "0");


    introSeconds.textContent =
        String(seconds).padStart(2, "0");

}


/* تشغيل العداد */

updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =========================
   القلوب المتحركة
========================= */

function createHeart() {

    const heart =
        document.createElement("span");


    heart.classList.add(
        "floating-heart"
    );


    heart.textContent =
        Math.random() > 0.5
            ? "♡"
            : "♥";


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        Math.random() * 18 + 10 + "px";


    heart.style.animationDuration =
        Math.random() * 7 + 6 + "s";


    heartsContainer.appendChild(
        heart
    );


    setTimeout(
        function () {

            heart.remove();

        },
        14000
    );

}


function startHearts() {

    setInterval(
        function () {

            createHeart();

        },
        650
    );

}


/* =========================
   ظهور العناصر أثناء النزول
========================= */

const revealElements =
    document.querySelectorAll(
        ".letter__box, .gallery-item, .birthday__content"
    );


const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    function (element) {

        element.style.opacity =
            "0";

        element.style.transform =
            "translateY(35px)";

        element.style.transition =
            "opacity 1s ease, transform 1s ease";

        observer.observe(element);

    }
);