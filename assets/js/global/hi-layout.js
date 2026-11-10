
document.addEventListener("DOMContentLoaded", async function () {
    async function loadComponent(url, elementId) {
        const container = document.getElementById(elementId);

        if (!container) return;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Gagal memuat: " + url);
            }

            const html = await response.text();
            container.innerHTML = html;

        } catch (error) {
            console.error(error);
        }
    }

    await loadComponent("/partials/hi-nav.html", "nav-container");
    await loadComponent("/partials/hi-footer.html", "footer-container");

    const currentPath = window.location.pathname.replace(/\/$/, "");

    document.querySelectorAll(".hi-nav-link").forEach(link => {
        const prefix = link.dataset.prefix;
        const href = link.getAttribute("href");

        if (!href || href === "#") return;

        const linkPath = new URL(href, window.location.origin)
            .pathname.replace(/\/$/, "");

        const isActive = prefix
            ? currentPath.startsWith(prefix)
            : currentPath === linkPath;

        if (isActive) {
            link.classList.add("active");
        }
    });
});
