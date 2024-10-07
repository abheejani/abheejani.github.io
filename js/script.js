document.addEventListener("DOMContentLoaded", function() {
    const projectItems = document.querySelectorAll('.project-item');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    projectItems.forEach(item => {
        observer.observe(item);
    });
});
