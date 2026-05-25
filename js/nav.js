(function () {
    var navLinks = document.querySelectorAll('.nav-container a[href^="#"]');
    var sections = [];

    navLinks.forEach(function (link) {
        var id = link.getAttribute('href').slice(1);
        var section = document.getElementById(id);
        if (section) {
            sections.push({ id: id, link: link, el: section });
        }
    });

    function setActive(id) {
        navLinks.forEach(function (link) {
            var isActive = link.getAttribute('href') === '#' + id;
            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'true');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function updateFromScroll() {
        var offset = 120;
        var current = sections[0];

        sections.forEach(function (item) {
            if (item.el.getBoundingClientRect().top <= offset) {
                current = item;
            }
        });

        if (current) {
            setActive(current.id);
        }
    }

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            var id = link.getAttribute('href').slice(1);
            setActive(id);
        });
    });

    window.addEventListener('scroll', updateFromScroll, { passive: true });
    updateFromScroll();
})();
