/* =====================================================================
   ASTRA — shared script (script.js)
   Loaded on every page. Handles the mobile nav menu and the
   scroll-reveal animation used on the Timeline page.
   ===================================================================== */

// --- Mobile navigation toggle ---
function toggleNav() {
    const links = document.getElementById('navLinks');
    if (links) links.classList.toggle('open');
}

// Close the mobile menu after tapping a link
document.addEventListener('DOMContentLoaded', function () {
    const links = document.getElementById('navLinks');
    if (links) {
        links.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () { links.classList.remove('open'); });
        });
    }

    // --- Scroll reveal for timeline items (only runs if they exist) ---
    const items = document.querySelectorAll('.tl-item');
    if (items.length && 'IntersectionObserver' in window) {
        const obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('in');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.18 });
        items.forEach(function (el) { obs.observe(el); });
    } else {
        items.forEach(function (el) { el.classList.add('in'); });
    }

    // --- Occasional shooting stars (skipped if user prefers reduced motion) ---
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
        function shoot() {
            var s = document.createElement('div');
            s.className = 'shooting-star';
            s.style.top = (Math.random() * 42) + '%';
            s.style.left = (Math.random() * 68) + '%';
            document.body.appendChild(s);
            setTimeout(function () { s.remove(); }, 1300);
            setTimeout(shoot, 5000 + Math.random() * 7000);
        }
        setTimeout(shoot, 2600);
    }
});
