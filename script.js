```javascript
/* =========================================
   SCROLL TO INVITATION
========================================= */

function scrollToInvitation() {

    const invitation =
        document.getElementById("invitation");

    invitation.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================================
   MUSIC
========================================= */

const music =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicButton");

let musicPlaying = false;

musicButton.addEventListener("click", function () {

    if (musicPlaying) {

        music.pause();

        musicButton.innerHTML = "♫";

        musicPlaying = false;

    } else {

        music.play();

        musicButton.innerHTML = "Ⅱ";

        musicPlaying = true;

    }

});


/* =========================================
   COUNTDOWN
========================================= */

const weddingDate =
    new Date("October 20, 2026 17:30:00").getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        weddingDate - now;


    if (distance <= 0) {

        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";

        return;
    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (distance %
            (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (distance %
            (1000 * 60 * 60)) /
            (1000 * 60)
        );

    const seconds =
        Math.floor(
            (distance %
            (1000 * 60)) /
            1000
        );


    document.getElementById("days").innerHTML =
        String(days).padStart(2, "0");

    document.getElementById("hours").innerHTML =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").innerHTML =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").innerHTML =
        String(seconds).padStart(2, "0");

}


setInterval(updateCountdown, 1000);

updateCountdown();
```
