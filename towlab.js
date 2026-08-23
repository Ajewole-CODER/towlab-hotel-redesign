/* =========================================
   HEADER
========================================= */

const header =
    document.getElementById("header");

function updateHeader() {

    header.classList.toggle(
        "scrolled",
        window.scrollY > 45
    );

}

window.addEventListener(
    "scroll",
    updateHeader
);

updateHeader();


/* =========================================
   MOBILE NAV
========================================= */

const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.getElementById("nav");


menuBtn.addEventListener(
    "click",
    () => {

        nav.classList.toggle("active");

        const icon =
            menuBtn.querySelector("i");

        if (
            nav.classList.contains("active")
        ) {

            icon.classList.replace(
                "fa-bars",
                "fa-xmark"
            );

        } else {

            icon.classList.replace(
                "fa-xmark",
                "fa-bars"
            );

        }

    }
);


document
    .querySelectorAll(".nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                nav.classList.remove("active");

                const icon =
                    menuBtn.querySelector("i");

                icon.classList.replace(
                    "fa-xmark",
                    "fa-bars"
                );

            }
        );

    });


/* =========================================
   REVEAL ANIMATION
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    !entry.isIntersecting
                ) {
                    return;
                }

                entry.target.classList.add(
                    "visible"
                );

                observer.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    observer.observe(element);

});


/* =========================================
   YEAR
========================================= */

document
    .getElementById("year")
    .textContent =
    new Date().getFullYear();


/* =========================================
   BOOKING
========================================= */

const checkIn =
    document.getElementById("checkIn");

const checkOut =
    document.getElementById("checkOut");

const guestSelector =
    document.getElementById(
        "guestSelector"
    );

const guestsControl =
    document.querySelector(
        ".guests-control"
    );

const guestCount =
    document.getElementById(
        "guestCount"
    );

const adultCount =
    document.getElementById(
        "adultCount"
    );

const childCount =
    document.getElementById(
        "childCount"
    );

const availabilityBtn =
    document.getElementById(
        "availabilityBtn"
    );


/* =========================================
   DATE MINIMUM
========================================= */

const today =
    new Date();

const todayString =
    today
        .toISOString()
        .split("T")[0];

checkIn.min =
    todayString;

checkOut.min =
    todayString;


checkIn.addEventListener(
    "change",
    () => {

        if (!checkIn.value) {
            return;
        }

        checkOut.min =
            checkIn.value;

        if (
            checkOut.value &&
            checkOut.value <=
            checkIn.value
        ) {

            checkOut.value = "";

        }

    }
);


/* =========================================
   GUEST DROPDOWN
========================================= */

guestSelector.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        guestsControl.classList.toggle(
            "active"
        );

    }
);


document.addEventListener(
    "click",
    event => {

        if (
            !guestsControl.contains(
                event.target
            )
        ) {

            guestsControl.classList.remove(
                "active"
            );

        }

    }
);


/* =========================================
   GUEST COUNTER
========================================= */

let adults = 2;

let children = 0;


document
    .querySelectorAll(
        ".counter button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const action =
                    button.dataset.action;


                if (
                    action ===
                    "adult-plus"
                ) {
                    adults++;
                }


                if (
                    action ===
                    "adult-minus" &&
                    adults > 1
                ) {
                    adults--;
                }


                if (
                    action ===
                    "child-plus"
                ) {
                    children++;
                }


                if (
                    action ===
                    "child-minus" &&
                    children > 0
                ) {
                    children--;
                }


                adultCount.textContent =
                    adults;

                childCount.textContent =
                    children;


                const total =
                    adults + children;


                guestCount.textContent =
                    `${total} ${
                        total === 1
                            ? "Guest"
                            : "Guests"
                    }`;

            }
        );

    });


/* =========================================
   CHECK AVAILABILITY
========================================= */

availabilityBtn.addEventListener(
    "click",
    () => {

        if (
            !checkIn.value ||
            !checkOut.value
        ) {

            showMessage(
                "Please select your check-in and check-out dates."
            );

            return;

        }


        const start =
            new Date(
                checkIn.value
            );

        const end =
            new Date(
                checkOut.value
            );


        if (end <= start) {

            showMessage(
                "Check-out must be after check-in."
            );

            return;

        }


        const message =
            `Hello Towlab Hotel & Suites. I would like to enquire about availability from ${formatDate(start)} to ${formatDate(end)} for ${adults} adult${adults !== 1 ? "s" : ""}${children > 0 ? ` and ${children} child${children !== 1 ? "ren" : ""}` : ""}.`;


        const whatsappURL =
            `https://wa.me/2348155246383?text=${encodeURIComponent(message)}`;


        window.open(
            whatsappURL,
            "_blank"
        );

    }
);


/* =========================================
   DATE FORMAT
========================================= */

function formatDate(date) {

    return date.toLocaleDateString(
        "en-NG",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================
   MESSAGE
========================================= */

function showMessage(message) {

    let box =
        document.querySelector(
            ".booking-message"
        );


    if (!box) {

        box =
            document.createElement(
                "div"
            );

        box.className =
            "booking-message";


        box.innerHTML = `

            <i class="
                fa-solid
                fa-circle-info
            "></i>

            <span></span>

        `;


        document.body.appendChild(
            box
        );

    }


    box.querySelector(
        "span"
    ).textContent =
        message;


    box.classList.add(
        "show"
    );


    setTimeout(
        () => {

            box.classList.remove(
                "show"
            );

        },
        3500
    );

}


/* =========================================
   SMOOTH SCROLL
========================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    targetId === "#" ||
                    targetId.length < 2
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });