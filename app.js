/* =====================================================
   TRUNG & TRANG — WEDDING 2027
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const scrollLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    scrollLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /*
     * RSVP
     * -------------------------------------------------
     * Firebase sẽ được kết nối ở bước sau.
     */

    const rsvpButton =
        document.querySelector(".rsvp button");

    if (rsvpButton) {

        rsvpButton.addEventListener("click", () => {

            alert(
                "RSVP sẽ được mở khi hệ thống Firebase được kết nối."
            );

        });

    }

});
