// Select important website elements
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const currentYear = document.getElementById("currentYear");

// Display the current year automatically
currentYear.textContent = new Date().getFullYear();

// Open and close the mobile navigation
menuButton.addEventListener("click", function () {
    navLinks.classList.toggle("show");

    if (navLinks.classList.contains("show")) {
        menuButton.textContent = "✕";
        menuButton.setAttribute("aria-label", "Close menu");
    } else {
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open menu");
    }
});

// Close the mobile menu when a navigation link is clicked
document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("show");
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open menu");
    });
});

// Send contact form information through WhatsApp
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const whatsappMessage =
        `Hello Jiusman Integrated Technology,\n\n` +
        `My name is ${name}.\n` +
        `Email: ${email}\n\n` +
        `Message:\n${message}`;

    const whatsappNumber = "2348027071824";

    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=` +
        encodeURIComponent(whatsappMessage);

    window.open(whatsappURL, "_blank");
});