
document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       ALUMNI MODAL
    ========================================= */

    const modalHTML = `
        <div class="alumni-modal-overlay" id="alumniModalOverlay">

            <div class="alumni-modal"
                 role="dialog"
                 aria-modal="true"
                 aria-labelledby="alumniModalName">

                <button
                    class="alumni-modal-close"
                    id="alumniModalClose"
                    type="button"
                    aria-label="Tutup modal">
                    &times;
                </button>

                <div class="alumni-modal-photo" id="alumniModalPhoto">
                    <img id="alumniModalImage" src="" alt="Foto alumni">
                    <div class="alumni-photo-placeholder" id="alumniPhotoPlaceholder">
                        FOTO ALUMNI
                    </div>
                </div>

                <div class="alumni-modal-body">

                    <span class="alumni-modal-label">
                        ALUMNI STORIES
                    </span>

                    <h2 id="alumniModalName"></h2>

                    <div
                        class="alumni-modal-role"
                        id="alumniModalRole">
                    </div>

                    <div class="alumni-modal-divider"></div>

                    <div
                        class="alumni-modal-story"
                        id="alumniModalStory">
                    </div>

                    <div class="alumni-modal-footer">
                        HOUSE ILMU INDONESIA
                    </div>

                </div>

            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const overlay = document.getElementById("alumniModalOverlay");
    const modal = overlay.querySelector(".alumni-modal");
    const closeButton = document.getElementById("alumniModalClose");

    const name = document.getElementById("alumniModalName");
    const role = document.getElementById("alumniModalRole");
    const story = document.getElementById("alumniModalStory");

    const modalImage = document.getElementById("alumniModalImage");
    const photoPlaceholder = document.getElementById("alumniPhotoPlaceholder");

    let previousFocus = null;

    /* =========================================
       AMBIL DATA ALUMNI
    ========================================= */

    function getAlumniData(card) {

        const alumniName =
            card.querySelector("h2") ||
            card.querySelector("strong") ||
            card.querySelector(".alumni-name");

        const alumniRole =
            card.querySelector(".story-role") ||
            card.querySelector(".alumni-content > span:not(.quote-mark)") ||
            card.querySelector(".alumni-role");

        const alumniStory =
            card.querySelector(".story-content p") ||
            card.querySelector(".alumni-content p") ||
            card.querySelector(".alumni-story");

        const alumniImage =
            card.querySelector(".story-image img") ||
            card.querySelector(".alumni-image img") ||
            card.querySelector(".alumni-content img") ||
            card.querySelector("img");

        const imagePath =
            card.dataset.photo ||
            (alumniImage ? alumniImage.getAttribute("src") : "");

        return {
            name: alumniName ? alumniName.textContent.trim() : "Alumni House Ilmu",
            role: alumniRole ? alumniRole.textContent.trim() : "House Ilmu Indonesia",
            story: alumniStory ? alumniStory.textContent.trim() : "Cerita alumni belum tersedia.",
            image: imagePath
        };
    }

    /* =========================================
       BUKA MODAL
    ========================================= */

    function openModal(card, trigger) {

        const data = getAlumniData(card);

        name.textContent = data.name;
        role.textContent = data.role;
        story.textContent = data.story;

        if (data.image) {
            modalImage.src = data.image;
            modalImage.alt = "Foto " + data.name;
            modalImage.style.display = "block";
            photoPlaceholder.style.display = "none";
        } else {
            modalImage.removeAttribute("src");
            modalImage.style.display = "none";
            photoPlaceholder.style.display = "flex";
        }

        previousFocus = trigger;

        overlay.classList.add("show");
        document.body.style.overflow = "hidden";

        closeButton.focus();
    }

    /* =========================================
       TUTUP MODAL
    ========================================= */

    function closeModal() {

        overlay.classList.remove("show");
        document.body.style.overflow = "";

        if (previousFocus) {
            previousFocus.focus();
        }
    }

    /* =========================================
       EVENT TOMBOL SELENGKAPNYA
    ========================================= */

    document.addEventListener("click", function (event) {

        const trigger = event.target.closest(
            ".open-alumni-modal, .story-content button, .alumni-content a, .alumni-content button"
        );

        if (!trigger) return;

        const card = trigger.closest(".story-card, .alumni-card");

        if (!card) return;

        event.preventDefault();

        openModal(card, trigger);
    });

    /* =========================================
       EVENT TUTUP
    ========================================= */

    closeButton.addEventListener("click", closeModal);

    overlay.addEventListener("click", function (event) {

        if (event.target === overlay) {
            closeModal();
        }
    });

    modal.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            overlay.classList.contains("show")
        ) {
            closeModal();
        }

    });

    /* =========================================
       FALLBACK JIKA FOTO GAGAL DIMUAT
    ========================================= */

    modalImage.addEventListener("error", function () {

        modalImage.style.display = "none";
        photoPlaceholder.style.display = "flex";

    });

});
