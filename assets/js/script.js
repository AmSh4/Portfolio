document.addEventListener("DOMContentLoaded", function() {

    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); // Match CSS transition time
    });

    // Typed.js for Hero Section (only if the element exists)
    const typedElement = document.getElementById('typed');
    if (typedElement) {
        new Typed('#typed', {
            strings: ['Software Engineer', 'Full-Stack Developer', 'UI Specialist', 'Problem Solver'],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            backDelay: 2000,
        });
    }

    // Contact Form AJAX Submission
    const contactForm = document.getElementById('contact-form');
    const formResult = document.getElementById('form-result');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
            const json = JSON.stringify(object);
            formResult.innerHTML = "Sending...";

            fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                })
                .then(async (response) => {
                    let jsonResponse = await response.json();
                    if (response.status == 200) {
                        formResult.innerHTML = `<div class="alert alert-success mt-3">Message sent successfully!</div>`;
                    } else {
                        console.log(response);
                        formResult.innerHTML = `<div class="alert alert-danger mt-3">${jsonResponse.message}</div>`;
                    }
                })
                .catch(error => {
                    console.log(error);
                    formResult.innerHTML = `<div class="alert alert-danger mt-3">Something went wrong!</div>`;
                })
                .then(function() {
                    contactForm.reset();
                    setTimeout(() => {
                        formResult.style.display = "none";
                    }, 5000);
                });
        });
    }

    // Active navigation link highlighting
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
});

function downloadAndOpen(event) {
    event.preventDefault();
    const resumePath = 'assets/resume.pdf'; // <-- Make sure this path is correct!
    
    // Open in new tab
    window.open(resumePath, '_blank');

    // Trigger download
    const link = document.createElement('a');
    link.href = resumePath;
    link.setAttribute('download', 'Ambuj_Shrivastav_Resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}